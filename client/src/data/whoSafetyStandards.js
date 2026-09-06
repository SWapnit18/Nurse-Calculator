/**
 * WHO Patient Safety & Medication Without Harm Global Standards
 * Reference: World Health Organization (https://www.who.int)
 * - WHO Global Patient Safety Challenge: Medication Without Harm
 * - WHO 5 Moments for Medication Safety
 * - WHO High-Alert Medications (HAMs) Protocols
 * - The 5 Rights of Medication Administration
 */

export const whoPatientSafetyStandards = {
  organization: "World Health Organization (WHO)",
  sourceUrl: "https://www.who.int/initiatives/medication-without-harm",
  campaign: "Medication Without Harm: WHO Global Patient Safety Challenge",
  objective: "Reduce severe, avoidable medication-associated harm by 50% globally through standardized protocols, independent checks, and error prevention.",
  
  // 1. The 5 Rights of Medication Administration (WHO Clinical Standard)
  fiveRights: [
    {
      id: "right_patient",
      title: "1. Right Patient",
      rule: "Always verify identity using at least two independent identifiers (Full Legal Name, Medical Record Number/DOB). Never use room or bed number.",
      whoCheck: "Compare MAR wristband barcode and ask the alert patient to state their full name and date of birth."
    },
    {
      id: "right_drug",
      title: "2. Right Drug",
      rule: "Confirm medication matches the exact prescription order. Be vigilant with Look-Alike, Sound-Alike (LASA) medications.",
      whoCheck: "Check label three times: 1) when retrieving from storage, 2) during dosage calculation/preparation, and 3) immediately prior to administration."
    },
    {
      id: "right_dose",
      title: "3. Right Dose",
      rule: "Perform precise calculation adhering to ISMP zero-rules (leading zero required, trailing zeros banned). Verify within standard therapeutic range.",
      whoCheck: "Require mandatory independent double-check for pediatric, neonatal, and high-alert medication doses."
    },
    {
      id: "right_route",
      title: "4. Right Route",
      rule: "Verify prescribed route (PO, IV, IM, SC, SL). Never administer enteral formulations parenterally, or IV medications via oral syringe.",
      whoCheck: "Ensure use of route-specific connectors (e.g., NRFit for neuraxial, ENFit for enteral) to prevent fatal route transposition."
    },
    {
      id: "right_time",
      title: "5. Right Time",
      rule: "Administer within hospital standard time window (typically ±30 minutes for time-critical, ±60 minutes for routine scheduled meds).",
      whoCheck: "Confirm last administered dose time to avoid accidental dose-stacking or prolonged subtherapeutic intervals."
    }
  ],

  // 2. WHO 5 Moments for Medication Safety (Patient & Clinician Partnership)
  fiveMoments: [
    {
      moment: 1,
      title: "Starting a Medication",
      question: "What is this medication called and what is it for? What are its potential risks and side-effects?",
      clinicalAction: "Confirm indication, allergy history, and baseline organ function (renal/hepatic clearance)."
    },
    {
      moment: 2,
      title: "Taking / Administering My Medication",
      question: "When should it be taken and how much at each dose? What if a dose is delayed or missed?",
      clinicalAction: "Calibrate exact volume using calibrated equipment (e.g. 1 mL syringe for < 1 mL doses) and document on MAR."
    },
    {
      moment: 3,
      title: "Adding a Medication",
      question: "Can this new drug interact with what I am already taking? Does it alter existing blood levels?",
      clinicalAction: "Perform full drug-drug and drug-food interaction screening; verify therapeutic drug monitoring levels."
    },
    {
      moment: 4,
      title: "Reviewing My Medication",
      question: "How long is this medication required? Are all current medications still clinically indicated?",
      clinicalAction: "De-prescribing evaluation: reconcile discharge and transfer orders against admission baseline."
    },
    {
      moment: 5,
      title: "Stopping My Medication",
      question: "When and why should this medication be discontinued? Does it require tapering to prevent rebound crisis?",
      clinicalAction: "Discontinue with clear weaning instructions for corticosteroids, beta-blockers, and opioids."
    }
  ],

  // 3. WHO High-Alert Medications (HAMs) Safety Protocols
  highAlertCategories: [
    {
      category: "PINCH Class High-Alert Meds",
      acronym: "A-PINCH",
      drugs: "Anti-infectives (aminoglycosides/vancomycin), Potassium/concentrated electrolytes, Insulin, Narcotics/Opioids, Chemotherapy, Heparin/Anticoagulants",
      whoProtocol: "Mandatory independent double-check before dispensing and administration. Standardized premixed concentrations only."
    },
    {
      category: "Concentrated Injectable Electrolytes",
      acronym: "CIE",
      drugs: "Potassium Chloride (KCl), Potassium Phosphate, Hypertonic Saline (3% NaCl)",
      whoProtocol: "STRICT PROHIBITION of concentrated KCl vials in patient care units. Dilution must occur exclusively in the pharmacy."
    },
    {
      category: "Intravenous Infusion Safety",
      acronym: "IV-DERS",
      drugs: "Vasoactive inotropes (Norepinephrine, Epinephrine, Dopamine), Vasodilators",
      whoProtocol: "Dose Error Reduction Systems (DERS) smart infusion pumps with hard and soft dose limits and dual-nurse verification."
    }
  ],

  // 4. Clinical Educational Disclaimer (WHO & Regulatory Safe-Harbor)
  educationalDisclaimer: "NurseCalcPro is an interactive educational training simulator strictly designed for healthcare students and licensed clinicians to practice and master clinical arithmetic, syringe graduation reading, and WHO/ISMP error prevention workflows. It does not replace clinical judgment, electronic health record MAR verification, institutional hospital protocols, or licensed physician prescription authorization. In clinical settings, always perform independent double-checks."
};
