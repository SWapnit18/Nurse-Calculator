# Changelog — NurseCalc Pro

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0-MVP] - 2026-09-22

### Added
- **1 Million User Scale Architecture**: Multi-core process clustering (`cluster.js`, `ecosystem.config.js`), 100-connection pooling, dynamic Brotli payload compression, and Redis 7 Alpine micro-caching.
- **Defensive Security Hardening**: Integrated `helmet` HTTP headers, strict origin CORS whitelist, and BOLA/IDOR user isolation guards.
- **Capacitor Android Native**: Synced Android native project targeting Android SDK 36 with `com.nursecalc.pro`.
- **Pediatric & Critical Care Test Suites**: Added unit test coverage for Clark's rule, weight-based dosing, ICU titration, IV gravity infusion, and Glasgow Coma Scale scoring.
- **Supabase PostgreSQL Schema**: High-concurrency B-Tree compound indexes, Row-Level Security (RLS) policies, and full 105 NCLEX question seed sets.
- **CI/CD Automation**: GitHub Actions workflow for automatic multi-version Node testing and build verification.

### Changed
- Refactored `studentController.js` to enforce cryptographic token session resolution.
- Optimized static curriculum endpoints with `Cache-Control: public, max-age=3600, stale-while-revalidate=86400`.
- Mobile responsive viewport tuning for 360px–503px screens with zero horizontal overflow.
