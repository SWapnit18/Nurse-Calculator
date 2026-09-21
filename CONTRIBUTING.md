# Contributing to NurseCalc Pro

Thank you for your interest in improving NurseCalc Pro! As an educational clinical math platform, we maintain rigorous standards for accuracy, code quality, and patient safety conventions.

---

## 1. Development Workflow

1. **Fork the Repository**:
   Fork the repo and clone your copy locally:
   ```bash
   git clone https://github.com/SWapnit18/Nurse-Calculator.git
   cd Nurse-Calculator
   ```

2. **Branching Strategy**:
   Always create a descriptive branch off `main`:
   ```bash
   git checkout -b feature/pediatric-titration-tests
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   cd client && npm install
   cd ../server && npm install
   ```

4. **Run Verification Tests**:
   Before committing, all automated unit tests must pass:
   ```bash
   cd server
   npm test
   ```

---

## 2. Calculation Engine Contribution Rules

Any contribution modifying `server/services/calculationService.js` or `client/src/services/` MUST comply with:
- **Zero Generative AI for Mathematics**: Mathematics must be 100% deterministic arithmetic.
- **ISMP Rule Compliance**:
  - Always use leading zeros: `0.25 mL`, never `.25 mL`.
  - Never use trailing zeros: `5 mg`, never `5.0 mg`.
- **Unit Precision**:
  - Heparin & Insulin: 2 decimal places max.
  - Gravity drip rates: Whole integers (drops cannot be divided).
  - Oral tablets: Scored half-tablets allowed, fractions below 0.5 disallowed unless specified.

---

## 3. Submitting a Pull Request (PR)

- Write clear, conventional commit messages (`feat: ...`, `fix: ...`, `test: ...`, `docs: ...`).
- Include test cases demonstrating calculation accuracy.
- Ensure all CI workflow checks pass.
