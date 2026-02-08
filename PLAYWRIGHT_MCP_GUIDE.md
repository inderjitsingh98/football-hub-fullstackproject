# Playwright Testing with MCP Server Guide

## 🎯 Complete Guide to Testing Football Hub with Playwright & MCP

This guide teaches you how to use Playwright for automated testing and how to leverage the MCP (Model Context Protocol) server for intelligent test generation and execution.

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Understanding Playwright](#understanding-playwright)
3. [MCP Server Integration](#mcp-server-integration)
4. [Running Tests](#running-tests)
5. [Test Structure](#test-structure)
6. [Writing New Tests](#writing-new-tests)
7. [Using MCP to Generate Tests](#using-mcp-to-generate-tests)
8. [Debugging Tests](#debugging-tests)
9. [Best Practices](#best-practices)
10. [Common Patterns](#common-patterns)

---

## 🚀 Quick Start

### Step 1: Ensure Everything is Installed

```bash
# Check Playwright is installed
npm ls @playwright/test

# If not installed, install it
npm install -D @playwright/test @playwright/browsers
```

### Step 2: Install Browsers

```bash
# Install Playwright browsers (Chromium, Firefox, WebKit)
npx playwright install
```

### Step 3: Run Your First Test

```bash
# Run all tests
npx playwright test

# Run with UI mode (recommended for learning)
npx playwright test --ui

# Run specific test file
npx playwright test tests/teams.spec.js

# Run in headed mode (see the browser)
npx playwright test --headed
```

---

## 🎭 Understanding Playwright

### What is Playwright?

Playwright is an automation framework that lets you:
- ✅ Automate browser actions (clicks, typing, navigation)
- ✅ Test your web applications across multiple browsers
- ✅ Capture screenshots and videos
- ✅ Verify UI and API behavior
- ✅ Run tests in parallel for speed

### Key Concepts

**1. Page Object**
```javascript
const page = await browser.newPage(); // Creates a browser tab
await page.goto('http://localhost:5173'); // Navigate to URL
```

**2. Locators** (How to find elements)
```javascript
// By test ID (recommended)
page.getByTestId('teams-tab')

// By text
page.getByText('Manchester United')

// By role
page.getByRole('button', { name: 'Teams' })

// By CSS
page.locator('.card')
```

**3. Actions**
```javascript
await page.click('button');              // Click
await page.fill('input', 'Hello');       // Type
await page.hover('.card');                // Hover
await page.selectOption('select', 'val'); // Select dropdown
```

**4. Assertions**
```javascript
await expect(page.getByText('Football Hub')).toBeVisible();
await expect(page).toHaveTitle('Football Hub');
```

---

## 🔌 MCP Server Integration

### What is MCP?

The Model Context Protocol (MCP) allows AI assistants (like GitHub Copilot or Claude) to interact with external tools and services, including Playwright.

### How MCP Works with Playwright

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│  You (User) │ ◄─────► │  MCP Server  │ ◄─────► │  Playwright │
│             │  Chat   │  (AI Agent)  │  Auto   │   Browser   │
└─────────────┘         └──────────────┘         └─────────────┘
```

### Setting Up MCP with Playwright

**Option 1: Using Playwright MCP Server (Recommended)**

If you have access to Playwright MCP server in VS Code:

1. **Connect MCP Server**: The Playwright MCP should already be available if configured
2. **Point to Your Site**: MCP will use the baseURL from `playwright.config.js`
3. **Ask MCP to Generate Tests**: See examples below

**Option 2: Manual Configuration**

Configure MCP settings (if using Claude Desktop or similar):

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-playwright"],
      "env": {
        "PLAYWRIGHT_BASE_URL": "http://localhost:5173"
      }
    }
  }
}
```

---

## 🏃 Running Tests

### Basic Commands

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/teams.spec.js

# Run tests matching a pattern
npx playwright test teams

# Run in UI mode (interactive)
npx playwright test --ui

# Run with visible browser
npx playwright test --headed

# Run specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run on mobile viewport
npx playwright test --project="Mobile Chrome"
```

### Advanced Commands

```bash
# Debug mode (step through tests)
npx playwright test --debug

# Run tests in parallel
npx playwright test --workers=4

# Update snapshots
npx playwright test --update-snapshots

# Generate test report
npx playwright show-report

# Run only failed tests
npx playwright test --last-failed

# Run with specific timeout
npx playwright test --timeout=60000
```

---

## 📁 Test Structure

### Our Test Organization

```
tests/
├── helpers/
│   └── testHelpers.js       # Reusable functions
├── teams.spec.js             # Teams section tests
├── players.spec.js           # Players section tests
├── matches.spec.js           # Matches section tests
├── standings.spec.js         # Standings section tests
├── navigation.spec.js        # Navigation tests
├── api.spec.js               # API endpoint tests
└── responsive.spec.js        # Responsive design tests
```

### Anatomy of a Test File

```javascript
import { test, expect } from '@playwright/test';
import { navigateToApp } from './helpers/testHelpers.js';

// Test suite (group of related tests)
test.describe('Teams Section', () => {
  
  // Runs before each test
  test.beforeEach(async ({ page }) => {
    await navigateToApp(page);
  });

  // Individual test case
  test('should display teams by default', async ({ page }) => {
    // Arrange (setup is in beforeEach)
    
    // Act
    const container = page.getByTestId('teams-container');
    
    // Assert
    await expect(container).toBeVisible();
  });
});
```

---

## ✍️ Writing New Tests

### Step-by-Step Guide

**Step 1: Identify What to Test**
- User actions (clicking, typing)
- Visual elements (is it visible?)
- Data accuracy (correct information?)
- Edge cases (errors, empty states)

**Step 2: Create a Test File**

```javascript
// tests/new-feature.spec.js
import { test, expect } from '@playwright/test';

test.describe('My New Feature', () => {
  test('should do something', async ({ page }) => {
    // Your test goes here
  });
});
```

**Step 3: Use Helper Functions**

```javascript
import { navigateToApp, ensureDataLoaded } from './helpers/testHelpers.js';

test('my test', async ({ page }) => {
  await navigateToApp(page);
  await ensureDataLoaded(page);
  
  // Your assertions
});
```

**Step 4: Write Assertions**

```javascript
// Visibility
await expect(page.getByText('Hello')).toBeVisible();

// Text content
await expect(page.locator('h1')).toContainText('Football Hub');

// Count
await expect(page.locator('.card')).toHaveCount(6);

// URL
await expect(page).toHaveURL('/dashboard');

// Attribute
await expect(page.locator('button')).toHaveAttribute('disabled');
```

---

## 🤖 Using MCP to Generate Tests

### Method 1: Ask MCP to Generate Tests

If you have MCP with Playwright access:

#### Example Prompts:

**Generate a Test:**
```
"Generate a Playwright test that:
1. Navigates to http://localhost:5174
2. Clicks the Players tab
3. Verifies at least 5 player cards are displayed
4. Checks that each player has goals, assists, and appearances stats"
```

**✅ Example Generated:** See `tests/players-mcp-example.spec.js` for a complete working example!

**Generate Tests for Specific Feature:**
```
"Create Playwright tests for the Matches section that verify:
- Match cards display team names
- Scores are shown in format 'X - Y'
- Upcoming matches show 'upcoming' status
- Completed matches show 'completed' status"
```

**Generate API Tests:**
```
"Write Playwright API tests for:
- GET /api/teams returns array with id, name, stadium
- GET /api/players/:id returns specific player
- Server returns 404 for non-existent resources"
```

### Method 2: Use Playwright Codegen

Playwright can record your actions and generate test code:

```bash
# Start codegen
npx playwright codegen http://localhost:5173

# With specific browser
npx playwright codegen --browser=firefox http://localhost:5173

# With mobile device
npx playwright codegen --device="iPhone 12" http://localhost:5173
```

**How to use Codegen:**
1. Run the command above
2. Browser and Inspector window open
3. Interact with your site (click, type, navigate)
4. Codegen generates test code in real-time
5. Copy the generated code into your test file

### Method 3: Ask MCP to Enhance Existing Tests

```
"Look at tests/teams.spec.js and add tests for:
- Hover effects on team cards
- Keyboard navigation between cards
- Screen reader accessibility"
```

### Method 4: MCP-Assisted Debugging

```
"The test in teams.spec.js line 25 is failing. 
Analyze why and suggest a fix."
```

---

## 🐛 Debugging Tests

### Visual Debugging

```bash
# UI Mode (best for debugging)
npx playwright test --ui

# Headed mode (see browser)
npx playwright test --headed

# Debug mode (step through)
npx playwright test --debug

# Slow motion (see what's happening)
npx playwright test --headed --slow-mo=1000
```

### Using `page.pause()`

```javascript
test('debug this test', async ({ page }) => {
  await page.goto('/');
  
  await page.pause(); // <-- Execution stops here
  
  // Opens Playwright Inspector
  await page.click('button');
});
```

### Screenshots & Videos

```javascript
test('take screenshot', async ({ page }) => {
  await page.goto('/');
  
  // Take screenshot
  await page.screenshot({ path: 'screenshot.png' });
  
  // Full page screenshot
  await page.screenshot({ 
    path: 'full-page.png', 
    fullPage: true 
  });
});
```

Videos are automatically recorded on failure (configured in `playwright.config.js`).

### Console Logs

```javascript
// Listen to console messages from the page
page.on('console', msg => console.log('PAGE LOG:', msg.text()));

// Listen to page errors
page.on('pageerror', error => console.log('PAGE ERROR:', error));
```

### Examine Test Results

```bash
# Show HTML report
npx playwright show-report

# Show trace viewer (for failed tests)
npx playwright show-trace trace.zip
```

---

## 💡 Best Practices

### 1. Use data-testid Attributes

✅ **Good:**
```javascript
page.getByTestId('teams-tab')
```

❌ **Avoid:**
```javascript
page.locator('nav > button:nth-child(1)')
```

**Why?** Test IDs don't break when styling changes.

### 2. Use Meaningful Test Names

✅ **Good:**
```javascript
test('should display player statistics with goals, assists, and appearances', ...)
```

❌ **Avoid:**
```javascript
test('test1', ...)
```

### 3. One Assertion Per Test (Sometimes)

For critical paths, test one thing:

```javascript
test('should display team name', async ({ page }) => {
  await expect(page.getByTestId('team-1')).toContainText('Manchester United');
});

test('should display team stadium', async ({ page }) => {
  await expect(page.getByTestId('team-1')).toContainText('Old Trafford');
});
```

For related checks, group them:

```javascript
test('should display complete team information', async ({ page }) => {
  const card = page.getByTestId('team-1');
  await expect(card).toContainText('Manchester United');
  await expect(card).toContainText('Old Trafford');
  await expect(card).toContainText('Premier League');
});
```

### 4. Use Helper Functions

Don't repeat yourself:

```javascript
// ❌ Repetitive
test('test 1', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('[data-testid="teams-tab"]');
  // ... test code
});

test('test 2', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('[data-testid="teams-tab"]');
  // ... test code
});

// ✅ Use helper
test('test 1', async ({ page }) => {
  await navigateToApp(page);
  // ... test code
});

test('test 2', async ({ page }) => {
  await navigateToApp(page);
  // ... test code
});
```

### 5. Wait for Elements Properly

Playwright auto-waits, but sometimes you need explicit waits:

```javascript
// Wait for element to be visible
await page.getByTestId('teams-container').waitFor({ state: 'visible' });

// Wait for network to be idle
await page.waitForLoadState('networkidle');

// Wait for specific condition
await page.waitForFunction(() => {
  return document.querySelectorAll('.card').length === 6;
});
```

### 6. Clean Up After Tests

```javascript
test.afterEach(async ({ page }) => {
  // Clear local storage
  await page.evaluate(() => localStorage.clear());
  
  // Close any extra pages
  await page.close();
});
```

### 7. Test in Multiple Browsers

Your config already supports this:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox  
npx playwright test --project=webkit
```

---

## 🎨 Common Patterns

### Pattern 1: Testing Navigation

```javascript
test('navigate to section', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('players-tab').click();
  await expect(page.getByTestId('players-container')).toBeVisible();
});
```

### Pattern 2: Testing Forms

```javascript
test('submit form', async ({ page }) => {
  await page.fill('input[name="search"]', 'Manchester');
  await page.click('button[type="submit"]');
  await expect(page.getByText('Search results')).toBeVisible();
});
```

### Pattern 3: Testing API Responses

```javascript
test('API returns correct data', async ({ request }) => {
  const response = await request.get('http://localhost:3001/api/teams');
  expect(response.ok()).toBeTruthy();
  
  const data = await response.json();
  expect(data.length).toBeGreaterThan(0);
});
```

### Pattern 4: Testing Responsive Design

```javascript
test('mobile layout', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  
  // Test mobile-specific behavior
  await expect(page.locator('.sidebar')).toHaveCSS('width', '100%');
});
```

### Pattern 5: Testing Error States

```javascript
test('shows error when API fails', async ({ page }) => {
  // Intercept and fail API calls
  await page.route('**/api/**', route => route.abort());
  
  await page.goto('/');
  await expect(page.locator('.error')).toBeVisible();
});
```

### Pattern 6: Testing Animations

```javascript
test('card animates on hover', async ({ page }) => {
  const card = page.getByTestId('team-1');
  
  await card.hover();
  await page.waitForTimeout(300); // Wait for animation
  
  // Verify transform was applied
  const transform = await card.evaluate(el => 
    window.getComputedStyle(el).transform
  );
  expect(transform).not.toBe('none');
});
```

---

## 🎯 MCP Workflow Examples

### Workflow 1: Generate Tests for New Feature

**You:** "I just added a search feature to Football Hub. Generate Playwright tests for it."

**MCP Response:** (Generates test file)

```javascript
test('search filters teams', async ({ page }) => {
  await page.goto('/');
  await page.fill('[data-testid="search-input"]', 'United');
  await expect(page.getByText('Manchester United')).toBeVisible();
  await expect(page.getByText('Barcelona')).not.toBeVisible();
});
```

### Workflow 2: Debug Failing Test

**You:** "My test is failing at line 15 of teams.spec.js"

**MCP:** Analyzes the code and suggests:
- Check if element selector is correct
- Verify data is loaded before testing
- Add wait conditions

### Workflow 3: Improve Test Coverage

**You:** "Analyze my test suite and suggest missing test cases"

**MCP:** Suggests:
- Edge cases (empty states, errors)
- Accessibility tests
- Performance tests
- Cross-browser compatibility

---

## 📊 Running the Full Test Suite

### Complete Test Run

```bash
# Run everything
npm test

# Or explicitly
npx playwright test

# With report
npx playwright test && npx playwright show-report
```

### What Gets Tested

✅ **UI Tests** (50+ tests)
- Navigation between sections
- Data display accuracy
- Card interactions
- Responsive layouts

✅ **API Tests** (12+ tests)
- All endpoints return correct data
- Error handling
- Performance

✅ **Integration Tests**
- Frontend + Backend working together
- Data flow from API to UI

---

## 🎓 Learning Resources

### Official Playwright Docs
- [Playwright Documentation](https://playwright.dev)
- [API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)

### Our Project Files
- `playwright.config.js` - Configuration
- `tests/helpers/testHelpers.js` - Reusable functions
- `tests/*.spec.js` - Example tests

### Video Tutorials
- Search YouTube for "Playwright Tutorial"
- Playwright's official YouTube channel

---

## ✅ Quick Reference: Common Commands

```bash
# Run tests
npx playwright test                    # All tests
npx playwright test teams             # Matching pattern
npx playwright test --ui              # UI mode
npx playwright test --headed          # See browser
npx playwright test --debug           # Debug mode

# Generate tests
npx playwright codegen localhost:5173  # Record actions

# Reports
npx playwright show-report            # View results
npx playwright show-trace trace.zip   # Debug failures

# Browsers
npx playwright install                # Install browsers
npx playwright test --project=firefox # Specific browser

# Help
npx playwright test --help            # Show all options
```

---

## 🚀 Next Steps

1. ✅ Run the test suite: `npx playwright test --ui`
2. ✅ Try codegen: `npx playwright codegen localhost:5173`
3. ✅ Write a custom test for a new feature
4. ✅ Use MCP to generate tests for edge cases
5. ✅ Set up CI/CD to run tests automatically

---

**You now have a complete Playwright testing setup with MCP integration! Happy testing! 🎉**
