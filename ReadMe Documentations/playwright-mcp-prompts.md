# Playwright MCP - Quick Start Prompts

## 🎯 Essential Prompts for Playwright MCP Testing

This is your quick reference for using Playwright MCP to test the Football Universe app. Use these prompts with your AI assistant (GitHub Copilot, Claude, etc.) that has MCP access.

---

## 🚀 Getting Started

### 1. Run Your Existing Tests

```bash
# Run all tests with UI (best for learning)
npx playwright test --ui

# Run all tests in terminal
npx playwright test

# Run specific test file
npx playwright test tests/teams.spec.js

# Run with visible browser
npx playwright test --headed
```

---

## 🤖 MCP Prompts for Test Generation

### Basic Navigation Tests

```
"Create a Playwright test that navigates to http://localhost:5174 
and verifies the page title contains 'Football' and the main heading 
'WORLDWIDE FOOTBALL UNIVERSE' is visible"
```

**Note:** Frontend is currently running on port **5174** (updated from 5173)

### Feature Testing

```
"Generate Playwright tests for the Teams tab that:
1. Click the Teams tab in navigation
2. Wait for teams container to load
3. Verify at least 5 team cards are displayed
4. Check each card has team name, stadium, and league"
```

```
"Create tests for the Players section:
1. Navigate to Players tab
2. Verify player cards show name, team, position
3. Check that stats (goals, assists, appearances) are displayed
4. Test that player avatars are visible"
```

```
"Write tests for the Matches section that:
1. Switch to Matches tab
2. Verify match cards show home and away teams
3. Check scores are displayed
4. Verify status is either 'upcoming' or 'completed'"
```

### Filter Tests

```
"Create tests for the filter functionality:
1. On Teams tab, select a specific league from dropdown
2. Verify only teams from that league are shown
3. Check the results count updates correctly
4. Test the search input filters teams by name"
```

```
"Generate tests for Players filter:
1. Select a position (e.g., 'Forward') from dropdown
2. Verify all displayed players have that position
3. Test league filter works correctly
4. Verify search input filters by player name"
```

### API Tests

```
"Create Playwright API tests that:
1. Test GET /api/teams returns array of teams with id, name, stadium, league
2. Test GET /api/players returns array with all player properties
3. Test GET /api/matches returns matches with scores and status
4. Test GET /api/leagues returns array of league names
5. Verify 404 is returned for non-existent endpoints"
```

### Responsive Tests

```
"Generate tests for responsive design:
1. Test the site on mobile viewport (iPhone 12)
2. Verify navigation is accessible
3. Check that cards stack properly on mobile
4. Test filters work on mobile layout"
```

### Visual Tests

```
"Create tests that verify visual elements:
1. Check team badge emojis are displayed on team cards
2. Verify player photos/avatars are visible
3. Test hover effects on cards (transform/scale)
4. Verify gradient animations on heading work"
```

---

## 🔍 Debugging Prompts

### When Tests Fail

```
"The test in tests/teams.spec.js is failing at line 25. 
It can't find the element with testid 'teams-container'. 
Analyze the test and suggest fixes."
```

```
"My players test is timing out. It seems like the data isn't loading. 
Help me debug this and add proper wait conditions."
```

### Code Review

```
"Review my test file tests/matches.spec.js and suggest improvements:
- Better assertions
- Proper wait conditions
- More descriptive test names
- Edge cases I should test"
```

---

## 🛠️ Enhancement Prompts

### Add More Test Coverage

```
"Look at my existing tests and identify gaps in coverage. 
Generate tests for:
- Edge cases (empty states, no results)
- Error handling (API failures)
- User interactions (clicking, hovering, keyboard navigation)
- Accessibility features"
```

### Performance Testing

```
"Create tests that verify performance:
1. Page loads within 3 seconds
2. Navigation between tabs is smooth
3. Filters update results within 500ms
4. API responses are fast"
```

### E2E User Journey

```
"Create an end-to-end test simulating a real user:
1. Visit the site
2. Browse teams in Premier League
3. Click on a team to see details
4. Switch to Players tab
5. Filter by a specific team
6. Verify correct players are shown"
```

---

## 📝 Test File Generation

### Create New Test File

```
"Create a new test file tests/filters.spec.js that comprehensively 
tests all filter functionality across Teams, Players, and Matches tabs. 
Include tests for:
- League dropdown filtering
- Position filtering (Players)
- Status filtering (Matches)
- Search input
- Results count accuracy
- Filter reset when switching tabs"
```

---

## 🎨 Visual Regression Testing

```
"Set up visual regression tests using Playwright screenshots:
1. Capture screenshots of each tab (Teams, Players, Matches, Standings)
2. Take screenshots of different viewport sizes
3. Compare against baseline images
4. Alert if there are visual differences"
```

---

## ⚡ Quick Commands Reference

```bash
# Record test actions (Codegen)
npx playwright codegen http://localhost:5174

# Debug specific test
npx playwright test tests/teams.spec.js --debug

# Run in specific browser
npx playwright test --project=firefox

# Generate HTML report
npx playwright show-report

# Update test snapshots
npx playwright test --update-snapshots

# Run only failed tests
npx playwright test --last-failed

# Run tests in parallel (4 workers)
npx playwright test --workers=4
```

---

## 🎯 Real-World Example Prompt

Here's a complete prompt you can use right now:

```
"I need comprehensive Playwright tests for my Football Universe application 
running on http://localhost:5174. Create tests that:

1. NAVIGATION:
   - Verify all 4 tabs (Teams, Players, Matches, Standings) are clickable
   - Check active tab styling changes
   - Test keyboard navigation (Tab key)

2. TEAMS TAB:
   - Verify 34 teams are loaded from API
   - Check league filter dropdown works
   - Test search input filters by team name
   - Verify team cards show badge emoji, name, stadium, league, country
   - Test hover effects on cards

3. PLAYERS TAB:
   - Verify 28 players are loaded
   - Test position filter (GK, Defender, Midfielder, Forward)
   - Test league filter
   - Verify player cards show photo, name, team, stats (goals, assists, apps)
   - Check player avatar displays

4. MATCHES TAB:
   - Verify matches are displayed
   - Test league filter
   - Test status filter (upcoming/completed)
   - Check match cards show teams, scores, date, stadium

5. STANDINGS TAB:
   - Verify standings table displays
   - Test league filter
   - Check position, team, points, wins are shown

6. API TESTS:
   - Test all endpoints (/api/teams, /api/players, /api/matches, /api/standings, /api/leagues)
   - Verify data structure and required fields

7. RESPONSIVE:
   - Test on mobile viewport
   - Verify filters stack properly on small screens

Create separate test files for each major section and use proper data-testid 
selectors. Include helper functions and follow Playwright best practices."
```

---

## 📚 More Resources

- **Full Guide**: See [PLAYWRIGHT_MCP_GUIDE.md](./PLAYWRIGHT_MCP_GUIDE.md) for detailed documentation
- **Example Test**: Check [example-playwright-test.spec.js](./example-playwright-test.spec.js) for reference
- **Existing Tests**: Browse the [tests/](./tests/) directory for working examples
- **Playwright Docs**: https://playwright.dev/docs/intro

---

## 💡 Pro Tips

1. **Always start servers first**:
   ```bash
   # Terminal 1: Start backend
   cd backend && npm start
   
   # Terminal 2: Start frontend
   cd frontend && npm run dev
   
   # Terminal 3: Run tests
   npx playwright test
   ```

2. **Use UI mode for development**: `npx playwright test --ui`
   - Step through tests visually
   - See what's happening in real-time
   - Debug failures easily

3. **Use data-testid attributes**: They're already added to key elements in the app
   - `data-testid="teams-tab"`
   - `data-testid="teams-container"`
   - `data-testid="team-1"`
   - etc.

4. **Start simple, then enhance**: 
   - First: Basic navigation and visibility tests
   - Then: User interactions and filters
   - Finally: Complex scenarios and edge cases

5. **Let MCP help you**: Don't write tests from scratch - use the prompts above to generate initial tests, then refine them

---

**Ready to test? Start with:** `npx playwright test --ui` 🚀
