#!/usr/bin/env bash
SESSION="pai"
DIR="$(cd "$(dirname "$0")" && pwd)"

if tmux has-session -t "$SESSION" 2>/dev/null; then
  tmux attach -t "$SESSION"
  exit 0
fi

tmux new-session -d -s "$SESSION" -c "$DIR"

# Top-left: vim
tmux send-keys -t "$SESSION" 'vim' C-m

# Top-right: npm run dev
tmux split-window -h -t "$SESSION" -c "$DIR"
tmux send-keys -t "$SESSION" 'npm run dev' C-m

# Bottom-right: bash (split right pane first)
tmux split-window -v -t "$SESSION" -c "$DIR"

# Bottom-left: cc (split left pane)
tmux select-pane -t 0
tmux split-window -v -t "$SESSION" -c "$DIR"
tmux send-keys -t "$SESSION" 'cc' C-m

# Focus on vim pane
tmux select-pane -t 0

tmux attach -t "$SESSION"
