import { mkdir } from "node:fs/promises";
import {
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  makeWASocket,
  useMultiFileAuthState,
  type ConnectionState,
} from "@whiskeysockets/baileys";
import qrcode from "qrcode-terminal";
import type { Config } from "../config.js";

type Socket = ReturnType<typeof makeWASocket>;

const INITIAL_RETRY_MS = 3_000;
const MAX_RETRY_MS = 60_000;
let retryDelay = INITIAL_RETRY_MS;

export async function createWhatsAppConnection(
  config: Config,
  onReady: (sock: Socket) => void,
): Promise<Socket> {
  await mkdir(config.credentialsDir, { recursive: true });

  const { state, saveCreds } = await useMultiFileAuthState(config.credentialsDir);
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, undefined as any),
    },
    version,
    printQRInTerminal: false,
    browser: ["PAI", "CLI", "1.0"],
    syncFullHistory: false,
    markOnlineOnConnect: false,
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update: Partial<ConnectionState>) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log("\nScan this QR code in WhatsApp → Linked Devices:\n");
      qrcode.generate(qr, { small: true });
    }

    if (connection === "open") {
      console.log("[pai] WhatsApp connected.");
      console.log(`[pai] Connected as: ${sock.user?.id ?? "unknown"}`);
      retryDelay = INITIAL_RETRY_MS;
      onReady(sock);
    }

    if (connection === "close") {
      const statusCode =
        (lastDisconnect?.error as any)?.output?.statusCode ??
        (lastDisconnect?.error as any)?.status;

      if (statusCode === DisconnectReason.loggedOut) {
        console.error("[pai] WhatsApp logged out. Delete credentials and re-scan QR.");
        process.exit(1);
      }

      const delay = retryDelay;
      retryDelay = Math.min(retryDelay * 2, MAX_RETRY_MS);
      console.log(`[pai] WhatsApp disconnected (${statusCode ?? "unknown"}). Reconnecting in ${delay / 1000}s...`);
      setTimeout(() => {
        createWhatsAppConnection(config, onReady);
      }, delay);
    }
  });

  // Handle WebSocket errors to prevent crashes
  if (sock.ws && typeof (sock.ws as any).on === "function") {
    (sock.ws as any).on("error", (err: Error) => {
      console.error("[pai] WebSocket error:", err.message);
    });
  }

  return sock;
}
