## Description
Please include a summary of the change and which issue it fixes. Also list any relevant dependencies.

Fixes # (issue)

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Clinical formula adjustment / Question bank addition
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Mathematical & Clinical Safety Checklist
- [ ] Formula execution tested against manual dimensional analysis.
- [ ] ISMP leading zero format verified (`0.X`, never `.X`).
- [ ] ISMP trailing zero prohibition verified (`X`, never `X.0`).
- [ ] All automated unit tests in `server/tests/` pass with zero failures (`npm test`).
- [ ] Mobile UI checked on narrow viewport (360px–420px).
