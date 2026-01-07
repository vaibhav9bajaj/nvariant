# nvariant Design Contract Enforcement Wrapper

Input: immutable ZIPs in ./zips
Output: derived workspace in ./build/assembled and reports in ./reports

Run: make enforce
- assembles ZIPs
- fingerprints UI tech
- injects design overlay (tokens.css + overrides.css)
- runs best-effort remediation in derived output
- scans and reports (warn-only)

Run: make enforce-strict to fail on remaining violations.
