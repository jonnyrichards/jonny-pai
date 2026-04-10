Purpose
This document is intended to capture and evaluate a specific risk around Zero Retention Mode (ZRM) certainty should we decide to progress the contract with ElevenLabs in its current state 

Background

We are in the late stages of evaluating ElevenLabs as a new Vendor for providing TTS (Text to Speech) and STT (Speech to Text) capabilities to AI Coach. 

The current proposal is for engaging with the lowest Enterprise Tier at US$1100/month (US$13k/year) equivalent to 15Million mins/month. This tier includes Zero Retention Mode (ZRM), where the vendor commits to not logging any content from our use of the service. It does not include the option to modify the contract or provide redlines (that would be a higher enterprise tier with minimum US$50k/year spend)

We are not expecting high use of voice mode, and nowhere near the capacity of the first enterprise tier. The primary reason for building it into Coach is comparability to competitor offerings. 

There are other legal and security risks raised. But this specific one seems to be the most impactful for VP level review
The issue
The Order form from ElevenLabs does not list out the Zero retention mode as a contracted component of the Service. All we have is an email assurance from the APAC GTM Director Kenny Chen that it is included: 


The question is if this is sufficient for us to maintain and honor our customer commitments of Zero Retention by third parties without impacting sales.
Risk and Implications

We frequently are asked for assurances by customers in due diligence questionnaires how customer data is used and where it is stored, particularly in regard with third parties (where we must declare them as subprocessors). In the context of LLM use we normally respond with the following (from FAQ): 

“Customer data is processed ephemerally, solely to generate the outputs requested at the time of use, and is not retained by the third-party provider.”

This is on the basis that T&C with AWS and GCP commit to zero data retention or training. 

Ideally this needs to also be true for any new subprocessor handling customer data.

The Risk is:

Eleven Labs may well commit it in the service today, but could remove it in the future and we have no contractual protection for its inclusions

Implications of signing:
…. 


Mitigations / Considerations on this risk

Why this risk may be acceptable:

Mitigation
Comments
There is an assurance that the ZRM is included for the tier we are buying (email)


The utilisation of ZRT is in CultureAmps control. When we call the service we specify “logging=false”.

 Jonathan Richards to confirm if ZRM is not included in the account we would receive an error message (i.e. we would know if it was ever disabled or turned off by ElevenLabs
 


There would be a very low cost to ElevenLabs to provide this service. So it is unlikely to be a “charge more for” lever - and they have not positioned it beyond first tier of enterprise offering today


There is potential we push for some contractual protection to help close the deal


Not sure if this is the worst/biggest risk?

Comment from Angela in this doc:
@daniel.fraser@cultureamp.com this cannot be considered sufficient. We specifically tell customers in our AI FAQs, and in our own contractual agreements that we will never allow third party vendors to train using their data. A non-binding email, and policy is not sufficient to maintain those customer commitments. The contract is King aka, if it is not in the contract - Eleven Labs can do whatever they want.




