Legal Advice | ElevenLabs Integration
1. Purpose
This paper outlines the legal and commercial risks associated with the proposed integration of ElevenLabs’ speech-to-text (STT) and text-to-speech (TTS) services into Culture Amp’s AI tool, Coach. The primary focus is on financial exposure, liability for user-generated content, regulatory compliance regarding biometric data, and data sovereignty obligations under the Data Processing Addendum (DPA). This paper concludes by offering specific recommendations for risk mitigation.
2. Background
Culture Amp is seeking to enhance Coach by leveraging ElevenLabs’ specialized audio AI models. This integration involves the transmission of biometric user information (including voice recordings and transcriptions) to ElevenLabs for processing. Biometric information is considered PII under the GDPR. Consequently, ElevenLabs must be formally identified and disclosed as a subprocessor under our existing data privacy framework.
Furthermore, unlike standard "vendor-customer" relationships, this integration involves Culture Amp providing ElevenLabs’ services as a core component of our own product. This necessitates a "sublicensing" or "resale" framework that is not currently explicit in ElevenLabs' standard terms. Due to the current projected spend, ElevenLabs has indicated that their standard agreements are non-negotiable. Consequently, this paper serves to identify the inherent risks in the "as-is" contracts that Culture Amp must accept should we proceed with this vendor.
3. Overview
3.1. Unpredictable Financial and Commercial Terms
	3.1.1. Lack of Usage Alerts
Section 5.A of the ElevenLabs Order Form says, “For each Tier, any usage exceeding the volume covered by the monthly Minimum Fee will be charged at a Flexible Usage Rate, which applies the percentage premium specified in Section 4(B) to the applicable committed rate pricing for each Service.” 
This means that once Culture Amp exceeds the monthly volume covered by the Minimum Fee, any additional usage is automatically billed at a premium rate. Because ElevenLabs is not contractually obligated to provide usage alerts when these thresholds are crossed, Culture Amp is essentially operating without a financial dashboard to monitor spend. This creates a high risk of significant overages that are only identified at the end of the billing cycle.
3.1.2. Resale Restrictions

Section 1.3 of the Services Agreement requires that the Order Form expressly states that the ElevenLabs services may be made available for resale to a third party. 
The current agreement lacks an express statement that ElevenLabs services may be made available for resale to third parties, which is fundamental to how we deliver our own services and how we deliver Coach.
3.2. Disproportionate Liability and Indemnification
	3.2.1. Strict Liability for Access
Sections 2.3 and 2.4 of the Services Agreement, supplemented by Section 2.3 of the Customer Solution Terms and Conditions, holds Culture Amp fully responsible for account security and usage. Specifically, the language states that Culture Amp is responsible for "all uses of Customer’s account... with or without Customer’s knowledge or consent." This means that if Culture Amp’s credentials or API keys are compromised by a third party, Culture Amp would remain contractually and financially liable for any resulting usage charges or breaches of terms, regardless of whether we were at fault or even aware of the intrusion.
The risk is further compounded by Section 2.4, which extends this responsibility to any access provided "directly or indirectly." In the context of our AI coaching tool, this effectively makes Culture Amp a guarantor for the actions of our End Users. Under the Customer Solution Terms, we are explicitly held responsible for "unauthorized third parties purporting to be End Users."
This creates a significant legal imbalance. While ElevenLabs limits its own liability for service failures, Culture Amp accepts liability for security incidents that may occur outside of our direct control. Without the ability to redline these sections to include a carve-outs or an exception for breaches caused by ElevenLabs’ own systems, this remains a high-impact risk that necessitates robust internal credential management and multi-factor authentication protocols. 
3.2.2. Uncapped Exposure

The indemnification framework is heavily weighted against Culture Amp, creating a scenario where we assume nearly all the risk associated with the content processed by the tool, while receiving limited protection in return.

Under Section 8.2, Culture Amp is required to indemnify ElevenLabs for any claims related to our "Input," any "Customer-Derived Output," and the "Customer Application" itself (Coach). Because Section 9.2 excludes these indemnification obligations from the general 12-month liability cap, Culture Amp faces uncapped financial exposure for these claims. Furthermore, Section 9.1 ensures that if Culture Amp violates or misappropriates ElevenLabs’ IP, we cannot rely on the standard waiver of indirect damages. Essentially, if a third party sues ElevenLabs because of something a Culture Amp end user said or created, Culture Amp is on the hook for the entire cost of that litigation and any resulting damages, without a contractual limit.
In contrast, the protection ElevenLabs provides to us is significantly restricted. While ElevenLabs offers an indemnity for third-party claims arising from IP infringement (Section 8.2), this protection is subject to a critical exclusion: it does not apply if the infringement arises from Culture Amp’s "Input" or any portion of the "Output" derived from that Input. Since the entire purpose of our engagement of ElevenLabs and utilization of it within Coach is to generate audio based on user input, this creates a circular logic where the vast majority of our activity is likely excluded from ElevenLabs’ coverage.

The result is a major liability gap. Culture Amp provides a broad, uncapped indemnity to ElevenLabs for almost everything we do with the service, while ElevenLabs provides a narrow indemnity that effectively vanishes as soon as our data is involved. This leaves Culture Amp as the primary risk-bearer for any intellectual property or content-related litigation, a position exacerbated by our inability to negotiate these terms or apply a super cap to limit our total financial risk.
3.3 Regulatory and Data Privacy Concerns
3.3.1. Biometric Consent Burden

Under Section 3.4 of the Services Agreement and Section 3.1 of the Customer Solution Terms, the entire legal burden for regulatory compliance regarding voice data is shifted to Culture Amp. Culture Amp must represent and warrant that it has obtained prior written consent, releases, or permissions from every individual whose voice or likeness appears in the provided input. This is not merely a procedural requirement but a substantive legal obligation to ensure that ElevenLabs’ processing of this data is fully authorized under global privacy laws.
Specifically, the contract mandates that Culture Amp obtain verifiable consent to process biometric data and recordings in accordance with GDPR and other applicable laws. Because voiceprints are increasingly classified as sensitive biometric identifiers, this creates a high-stakes compliance hurdle. Culture Amp is effectively guaranteeing to ElevenLabs that all end-user data has been collected legally; any failure to secure these specific permissions would result in Culture Amp being in immediate breach of the agreement, while simultaneously bearing the full brunt of any resulting regulatory fines or litigation.
3.3.2. Subprocessor Control

The DPA grants ElevenLabs significant autonomy regarding its subprocessor ecosystem while providing Culture Amp with very limited visibility or protection. Under Section 6.1, ElevenLabs uses a "general authorization" model where their subprocessors are listed via a static hyperlink. Critically, this hyperlink lacks a subscription mechanism, meaning Culture Amp is not automatically alerted when the list changes. This places an administrative burden on our team to manually monitor the link for changes to ensure we remain compliant with our own customer disclosures.
Furthermore, while Section 6.3 requires ElevenLabs to provide 30 days' notice before appointing a new subprocessor, the contract is ambiguous regarding how or where these notifications are delivered. If Culture Amp identifies a legitimate security or privacy concern and objects to a new subprocessor, the only available remedy (should a resolution not be reached) is the termination of the affected service. However, the agreement explicitly fails to offer a pro-rata refund for any prepaid fees in this scenario. Consequently, if we are legally or ethically forced to stop using the service due to ElevenLabs' choice of a risky subprocessor, Culture Amp would be required to forfeit its remaining investment.
3.4 Mandatory Co-Branding Trigger
Section 2.4 of the Customer Solution Terms creates a conditional branding obligation. If Culture Amp develops any "substantially similar" or "competitive" AI audio technology (such as our own in-house Text-to-Speech, Speech-to-Text or audio enhancement), we are contractually required to prominently co-brand the ElevenLabs services. This includes displaying ElevenLabs’ trademarks and logos within our platform and on all promotional materials. This limits our ability to develop our own solution and forces us to promote ElevenLabs’s brand within our own marketing ecosystem if we choose to innovate in the audio AI space.he proposed integration creates several distinct legal risk issues centered on financial unpredictability, liability caps, and biometric privacy.
3.5 Regulatory & Business Continuity Risk (EU AIA)

ElevenLabs’ Acceptable Use Policy prohibits "High Risk" use cases as defined by the EU AI Act. While our current deployment is not classified as High Risk, any shift in regulatory interpretation or product evolution could trigger a violation of ElevenLabs' Acceptable Use Policy.

Furthermore, ElevenLabs reserves the right to audit usage and unilaterally suspend service if they deem a use case "High Risk." This creates a "kill-switch" risk that sits outside our negotiated MSA.
3.6 Customer Data Retention
The current Service Terms contain a significant loophole regarding data lifecycle management: ElevenLabs is only contractually obligated to destroy data upon the formal termination of the agreement. This allows them to legally hold customer recordings for the entire duration of our contract. While the agreement provides protection against the use of our data for general model training, it is critical to recognize that training and retention are legally distinct concepts. A prohibition on the former does not prevent the latter; consequently, ElevenLabs could stop training on our data while still maintaining audio logs for years under the guise of "troubleshooting" or "system optimization."
Furthermore, while ElevenLabs markets "Zero Retention" as a product feature on their website, this remains a product description rather than a binding legal warranty. Although ElevenLabs has communicated via email that this policy is included in our current plan, such informal assurances are generally superseded by the Section 16(a) of the Terms of Service (which says that the Terms reflect the entire agreement between the parties) and hold no legal weight in a dispute. Without explicitly incorporating the Zero Retention policy into the Order Form, we lack a contractually enforceable guarantee. Relying on a non-binding URL or an email thread leaves us vulnerable to unilateral policy changes and prevents us from truthfully representing to our customers that their data is not being stored.
4. Mitigation and Controls
As the agreement is non-negotiable, legal protections cannot be achieved via redlining. Risk must instead be managed through operational controls and product architecture.

3.1 - Financial and Commercial Mitigations
To mitigate the risk associated with lack of Usage alerts, it is suggested that the team managing our relationship with ElevenLabs implement internal real-team monitoring of our usage. It is also suggested that the Product team create limits within Coach (such as per-user or per-session character/minute limits) to ensure that end users cannot inadvertently spike usage and trigger uncapped overages.
To mitigate the risk associated with the Order Form not expressly stating that we can resell ElevenLabs services through our own services, we need to ask ElevenLabs to add language to the Service Order stating that we are able to resell.
3.2 Liability and Security Mitigations
To mitigate the risk associated with liability associated with account usage, Multi-Factor Authentication should be enabled.
To mitigate the risk of uncapped liability associated with Input, the Product team should consider utilizing filters to prevent end users from inputting copyrighted material or sensitive PII that could trigger third-party IP or privacy claims, for which we have no indemnity.
3.3 Regulatory and Data Privacy Mitigations
To mitigate the risk associated with needing affirmative consent for the collection of biometric data and recordings, the Product team should build a mandatory consent mechanism that is deployed prior to the end user utilizing the TTS or STT features within Coach.
To mitigate the risk associated with subprocessor monitoring + the lack of subprocessor updates, it is suggested that we regularly audit ElevenLabs subprocessors. This change-log should be documented to ensure Culture Amp’s own subprocessor disclosures remain accurate.
3.4 Strategic and Branding Mitigations
To mitigate the risk associated with the co-branding language, in the event Culture Amp’s Product team wants to develop our own internal audio AI (STT/TTS), a co-branding assessment should be conducted. If internal development triggers the co-branding language, Culture Amp must decide if the development of our own internal audio AI and the loss of white-label branding is offset by the cost savings of the developed internal audio AI.
Additionally, to mitigate risks associated with inadvertently triggering competitive language that would force ElevenLabs branding onto our services prematurely, all marketing materials that touch on the STT or TTS feature with Coach should be reviewed by Legal.
3.5 Regulatory & Business Continuity Risk (EU AIA) Mitigations
This is not a realized risk at this point, but the Product team should consult the Legal team on new product features to ensure Culture Amp does not inadvertently cross the threshold into a prohibited or High Risk category that would trigger ElevenLabs’ right to suspend our service. 
3.6 Customer Data Retention Mitigations
To mitigate the risk associated with the Zero Retention gap, the Product team should require that the Zero Retention policy is explicitly outlined in the Order Form and attach the current documentation as a static, versioned Exhibit to the Order Form.
5. Recommendation
Option 1: Risk Acceptance (No Mitigations Deployed)
Under this scenario, Culture Amp would proceed with the integration using ElevenLabs’ standard technical setup without additional internal controls.
Outcome: Immediate speed-to-market with minimal engineering overhead.
Residual Risk: High. Culture Amp would have zero visibility into monthly spend, potentially leading to bill shock from Flexible Usage Rates. We would be in immediate breach of the "Biometric Consent" and "Subprocessor" requirements of the contract, as ElevenLabs shifts the entire burden of verifiable consent and subprocessor monitoring to us. In the event of a security breach or IP claim, the company faces uncapped financial liability. Furthermore, Culture Amp would not be able to represent to Customers that ElevenLabs does not retain their recordings. Lastly, Culture Amp also faces immediate service termination risk if our use case is reclassified as "High Risk" under the EU AIA.
Advisory: This option is not recommended due to the high probability of regulatory fines and unpredictable financial exposure.
Option 2: Defensive Integration (Partial Deployment)
This scenario focuses on mitigating the most immediate financial and regulatory concerns through high-impact product gates.
Outcome: Mitigates the highest-probability risks (privacy violations) but leaves the company exposed to significant liability in the event of a security breach or IP litigation.
Required Controls:
Consent Gate: Implement a mandatory click-wrap for biometric and recording consent to satisfy GDPR and other privacy law requirements.
Residual Risk: Medium. Culture Amp remains strictly liable for unauthorized account access and carries the burden of uncapped indemnification for user-generated content.
Advisory: This is the “Minimum Viable Compliance" path if speed-to-market is the primary driver, provided the business explicitly accepts the uncapped liability risks.
Option 3: Strategic Risk Management (All Mitigations Deployed)
This scenario involves a full-scale operational and technical wrap-around to address the current contract gaps.
Outcome: Provides the maximum possible protection under a non-negotiable contract. Financial spend is capped by internal circuit breakers, and regulatory risk is minimized through verifiable consent and manual subprocessor audits.
Required Controls: 
	1. Consent Gate: Implement a mandatory consent for biometric and recording 
	consent to satisfy GDPR and other privacy law requirements.
	2. Hardened Security: MFA to defend against liability for unauthorized access. 
	3. Governance: A monthly manual audit of ElevenLabs’ subprocessors. 
	4. Input Filtering: Filtering of user inputs to prevent the upload of 
	copyrighted materials.
	5. Contractual Bridge: Explicitly list “Zero Retention” in the Order Form and
	attach the policy as a Static Exhibit.	
Residual Risk: Moderate. While operational risks are controlled, the contractual imbalance (uncapped indemnity and lack of IP protection from ElevenLabs) remains.
Advisory: This is the strongly recommended path. It ensures that Culture Amp’s operational reality protects the business where the contract fails to do so.
Specific Strategic Recommendation (Co-Branding): 
In addition to the foregoing options, Product and Engineering leadership should make a definitive strategic decision regarding the long-term development of internal AI audio tools prior to engagement. If Culture Amp intends to build or license any substantially similar audio technology in the future, the business must explicitly accept that this will trigger the mandatory display of ElevenLabs' branding within the Coach platform and promotional materials. If a white-label brand is a non-negotiable requirement, the team must commit to a roadmap that excludes the development of competitive audio technologies for the duration of the contract.

Specific Strategic Recommendation (EU AI Act):

To address the risk of unilateral service termination under ElevenLabs’ "High Risk" usage policy, we recommend that the Product team solicit input from the Legal team for all new product features. This control requires that any proposed functionality (particularly those involving biometric analysis, educational tools, or workplace monitoring) undergo a mandatory legal vetting process prior to development. During this review, each feature would be mapped against the specific "High-Risk" categories defined in Annex III of the EU AI Act to ensure our deployment remains within the risk classifications permitted by ElevenLabs.
