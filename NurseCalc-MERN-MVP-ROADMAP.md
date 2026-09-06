# NurseCalc MERN MVP Roadmap

## Stack
HTML5, CSS3, JavaScript, React, Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs.

## MVP shipped in this package
- Public landing page
- Responsive student UI
- Register/login with JWT
- MongoDB/Mongoose models
- Five learning topics and 15 seeded lessons
- 100 seeded fictional educational questions
- Deterministic calculation service for conversion, tablet mathematics, liquid mathematics, flow-rate mathematics and percentages
- Server-side validation and rate limiting
- Practice sessions with answer submission and step-by-step educational feedback
- Progress aggregation and topic accuracy
- Educational safety notices
- Bookmark API
- Health endpoint
- Seed script

## Day-by-day roadmap
### Day 1
Install Node 20+, MongoDB or MongoDB Atlas. Configure server/.env. Run install and seed. Verify /api/health.

### Day 2
Test authentication and database persistence. Test all five topics and lessons on desktop/mobile.

### Day 3
Audit calculation engine with a reviewed golden dataset. Add unit and edge-case tests before public beta.

### Day 4
Expand the question bank from 100 to 250+ reviewed questions. Add question metadata, reviewed status and content versioning.

### Day 5
Finish mistake intelligence: classify unit, decimal, arithmetic, formula, reading and rounding errors; recommend weak-topic practice.

### Day 6
Add AI 'Explain My Mistake' behind the Express server. AI must explain approved calculations, never act as a real-patient dosing authority.

### Day 7
QA: registration -> learn -> practice -> answer -> result -> progress. Test Chrome/Edge/Android, accessibility, API authorization, rate limits and MongoDB failure handling.

## Launch gates
- Calculation test suite passes
- All public questions reviewed by appropriate nursing/math reviewers
- No real patient data collected
- Safety disclaimer on calculator/practice/AI areas
- Privacy policy and terms published
- Production secrets configured outside source control
- MongoDB backups enabled
- HTTPS enabled
- CORS restricted to production client origin
- Error monitoring configured
- Play Store wrapper/app built only after the web MVP is stable

## Data/content pipeline
1. Research from authoritative nursing education and official health/medication references.
2. Write original educational lessons and fictional scenarios.
3. Encode calculations as structured data.
4. Validate expected results with deterministic code.
5. Human nursing/math review.
6. Publish only reviewed content.
7. Track content version and corrections.

Do not scrape competitor apps or copy their question banks.

## Production architecture
Browser/React -> Express API -> Mongoose -> MongoDB
                         -> deterministic calculation service
                         -> AI service (optional, server-side only)

## Environment
PORT=5000
MONGODB_URI=<MongoDB Atlas or local URI>
JWT_SECRET=<long random secret>
CLIENT_URL=<production frontend URL>
NODE_ENV=production

## Local commands
npm run install:all
npm run seed
npm run dev

Frontend: http://localhost:5173
API: http://localhost:5000/api/health
Demo: student@nursecalc.local / Demo1234!
