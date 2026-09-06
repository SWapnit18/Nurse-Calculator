# NurseCalc — Mobile-First Educational Nursing Calculation Platform

NurseCalc is a production-quality, mobile-first educational medication calculation application tailored for nursing students (B.Sc Nursing, GNM, NCLEX-RN candidates) and nurse educators.

> **CRITICAL EDUCATIONAL DISCLAIMER**:
> NurseCalc provides simulated nursing calculation practice for educational purposes only. It does **NOT** provide patient-specific medication administration instructions, nor does it authorize or claim that any calculated result is clinically safe to administer to real patients.

---

## Technical Stack

- **Frontend**: React.js, HTML5, CSS3 (Vanilla CSS + Tailwind utilities), Font Awesome
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens), bcrypt password hashing
- **Testing**: Jest (Unit & Integration)
- **Mobile Packaging**: Capacitor (Android & iOS)

---

## Key Features

1. **Deterministic Calculation Engine**:
   - Zero AI for actual mathematics.
   - Dual-path independent calculation verification (Formula vs Dimensional Analysis).
   - Strict ISMP leading zero enforcement (`0.5`, never `.5`) and trailing zero elimination (`5`, never `5.0`).
   - Physiological limit checks and single-site injection capacity warnings.
2. **Mistake Intelligence Engine**:
   - Classifies errors into `DECIMAL_SLIP_10X`, `ROUNDING_MISMATCH`, `UNIT_CONVERSION_ERROR`, and `ARITHMETIC_OR_FORMULA_ERROR`.
   - Pedagogical AI Tutor ("Explain My Mistake") that explains concepts without performing math calculations.
3. **Interactive Syringe Calibration**:
   - Visual SVG barrel scale with real-time rubber stopper graduation matching (1.0 mL and 3.0 mL).
4. **Mobile-First 5-Tab Navigation**:
   - `Home`, `Learn`, `Practice`, `Calculator`, `Profile`.
5. **WHO Medication Without Harm Standard**:
   - Integrated guidance covering The 5 Rights, 5 Moments for Medication Safety, and High-Alert Medications.
6. **16-Point Automated Clinical QA Suite**:
   - Live browser assertion runner testing edge cases, rounding, float precision, and pediatric limits.

---

## Project Structure

```
Nurse/
├── client/                     # React Frontend (Vite)
│   ├── src/
│   │   ├── App.jsx             # Mobile 5-Tab Layout & 30-Screen Flow
│   │   ├── index.css           # Design tokens, themes & animations
│   │   ├── data/               # Local seed curriculum & WHO guidelines
│   ├── capacitor.config.json   # Mobile app identifier & webDir
│   └── package.json
├── server/                     # Node.js / Express Backend
│   ├── config/db.js            # MongoDB Mongoose connection
│   ├── controllers/            # Auth, curriculum, student, & AI controllers
│   ├── models/                 # User, Topic, Lesson, Question, Attempt, Mistake, Progress, Bookmark
│   ├── services/calculation/   # Modular deterministic calculation engine
│   ├── tests/                  # Jest test suites (API & SafeMath)
│   ├── data/seedDatabase.js    # 5 topics, 15 lessons, 105+ questions
│   ├── server.js               # Express API endpoints
│   └── package.json
└── package.json                # Root development scripts
```

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally on `127.0.0.1:27017` or configured via `MONGODB_URI`)

### 1. Install Dependencies
```bash
npm install
cd client && npm install
cd ../server && npm install
cd ..
```

### 2. Seed the Database
Populates MongoDB with 5 accredited topics, 15 worked lessons, and 105+ reviewed NCLEX questions:
```bash
npm run seed
```

### 3. Run Automated Tests
```bash
npm test
```
All 22 backend Jest tests will execute with zero failures.

### 4. Start Development Servers
```bash
# Concurrently starts backend (:5000) and client dev server (:5173)
npm run dev
```

### 5. Build & Sync to Mobile (Android / iOS)
```bash
npm run sync:mobile
```
To open in native IDEs:
```bash
npm run open:android    # Opens in Android Studio
npm run open:ios        # Opens in Xcode (macOS only)
```

---

## Environment Variables

Create `.env` in `server/`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/nursecalc
JWT_SECRET=nursecalc_super_secret_jwt_key_2026
NODE_ENV=development
```
