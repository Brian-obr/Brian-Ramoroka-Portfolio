# Usability test plan: 5-second test and first-click test

**Tool:** Lyssna (free plan allows short tests; paid panel optional, so recruit yourself first). Alternative: a 10-minute Google Meet with screen share.
**Participants:** 5 people. 3 South African SME owners or managers (any trade, ideally Cape Town), 2 contacts at European agencies (NL/BE/DE/UK). Not developers, not friends who know the site.
**When:** on the Vercel preview after phase 5 (page rebuilds), and once more 4 weeks after launch.
**Stimulus:** screenshots of the home page at 1440px and 375px (desktop for agency contacts, mobile for SME owners).

## Test 1: 5-second test

Script: "You'll see a web page for 5 seconds. Then I'll ask a few questions. There are no wrong answers."

Questions after 5 seconds:
1. What does this person offer? (open text)
2. Who is it for? (open text)
3. Where are they based? (open text)
4. What would you do next if you were interested? (open text)
5. How much do you trust this person, 1 to 5? Why?

**Success:** at least 4 of 5 name a web or SEO service AND Cape Town or South Africa in Q1 or Q3; at least 4 of 5 mention contacting or getting a quote in Q4.

## Test 2: first-click test

Tasks (one at a time, first click recorded):
1. "You run a small plumbing business in Cape Town and want more calls from Google. Where would you click first?" Expected: Local SEO service link or "Get a quote".
2. "You want to see work he has done before." Expected: "Work" nav item or the case-study section.
3. "You want to ask for a price." Expected: "Get a quote" button (header or hero).
4. "You are a recruiter and want his CV." Expected: "Hire me" nav or footer link.

**Success:** at least 4 of 5 first clicks land on the expected target for tasks 1 and 3 (the conversion tasks); at least 3 of 5 for tasks 2 and 4. Median time to first click under 10 seconds.

## Also checked in the same sessions (manual)

- VoiceOver (macOS Safari) pass by you or one participant: rotor lists one H1 per page, the landmarks (banner, nav, main, contentinfo) and the form labels.
- Keyboard-only: Tab from page top reaches the skip link, nav, hero CTA, form fields and submit, with visible focus each time.

## Recording results

Add a table to `audit/2026-10/progress.md`: participant type, Q1-Q5 answers, first clicks, pass/fail per criterion, quotes worth reusing in copy (with permission).
