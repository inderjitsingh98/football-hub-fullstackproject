# Teams Tab Filter Validation Test Plan

## Application Overview

Comprehensive test plan for validating filter functionality on the Teams tab of the Worldwide Football Universe application. The filter system includes a league dropdown (13 options) and a search input that work independently and in combination to filter the 34 teams across 12 major football leagues.

## Test Scenarios

### 1. League Filter Functionality

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify league dropdown contains all options

**File:** `tests/teams-filters/league-dropdown.spec.ts`

**Steps:**
  1. Navigate to http://localhost:5174
    - expect: Page loads successfully
    - expect: Teams tab is active by default
  2. Click on the league dropdown
    - expect: Dropdown opens
    - expect: 13 options are visible: 'All Leagues' plus 12 league names (Brasileirão, Bundesliga, Eredivisie, La Liga, Liga MX, Ligue 1, MLS, Premier League, Primeira Liga, Primera División, Saudi Pro League, Serie A)

#### 1.2. Filter by Premier League

**File:** `tests/teams-filters/premier-league-filter.spec.ts`

**Steps:**
  1. Navigate to http://localhost:5174
    - expect: Initial count shows '34 teams'
  2. Select 'Premier League' from league dropdown
    - expect: Dropdown shows 'Premier League' as selected
    - expect: Results count updates to '5 teams'
    - expect: Exactly 5 team cards are displayed
    - expect: All displayed teams show 'League: Premier League' and 'Country: England'
    - expect: Teams shown: Manchester City, Liverpool, Arsenal, Manchester United, Chelsea

#### 1.3. Filter by La Liga

**File:** `tests/teams-filters/la-liga-filter.spec.ts`

**Steps:**
  1. Navigate to http://localhost:5174
    - expect: Initial count shows '34 teams'
  2. Select 'La Liga' from league dropdown
    - expect: Dropdown shows 'La Liga' as selected
    - expect: Results count updates to '3 teams'
    - expect: Exactly 3 team cards are displayed
    - expect: All displayed teams show 'League: La Liga' and 'Country: Spain'
    - expect: Teams shown: Real Madrid, Barcelona, Atlético Madrid

#### 1.4. Filter by each league and validate team count

**File:** `tests/teams-filters/all-leagues-filter.spec.ts`

**Steps:**
  1. Navigate to http://localhost:5174
    - expect: Teams tab is active
  2. Iterate through each of the 12 leagues and select them one by one
    - expect: For each league selection:
    - expect: - Dropdown shows the selected league
    - expect: - Results count updates to show correct number of teams for that league
    - expect: - Only teams from the selected league are displayed
    - expect: - All team cards show the correct league and country information
  3. Select 'All Leagues' option
    - expect: Results count returns to '34 teams'
    - expect: All 34 teams are displayed again

### 2. Search Filter Functionality

**Seed:** `tests/seed.spec.ts`

#### 2.1. Search with partial team name

**File:** `tests/teams-filters/search-partial-match.spec.ts`

**Steps:**
  1. Navigate to http://localhost:5174
    - expect: Search input is empty
    - expect: All 34 teams displayed
  2. Type 'Manchester' in the search input
    - expect: Results count updates to '2 teams'
    - expect: Exactly 2 teams displayed: Manchester City and Manchester United
    - expect: Both teams contain 'Manchester' in their name

#### 2.2. Search across all leagues

**File:** `tests/teams-filters/search-global.spec.ts`

**Steps:**
  1. Navigate to http://localhost:5174
    - expect: League dropdown shows 'All Leagues'
    - expect: All 34 teams displayed
  2. Type 'Bayern' in the search input
    - expect: Results count updates to '1 team'
    - expect: Only Bayern Munich from Bundesliga is displayed
    - expect: Team shows 'League: Bundesliga' and 'Country: Germany'

#### 2.3. Search with no matching results

**File:** `tests/teams-filters/search-no-results.spec.ts`

**Steps:**
  1. Navigate to http://localhost:5174
    - expect: All teams displayed initially
  2. Type 'xyz123notfound' in the search input
    - expect: Results count updates to '0 teams'
    - expect: No team cards are displayed
    - expect: Empty state is shown (no error message displayed)

#### 2.4. Clear search filter

**File:** `tests/teams-filters/search-clear.spec.ts`

**Steps:**
  1. Navigate to http://localhost:5174
    - expect: All teams displayed
  2. Type 'Bayern' in the search input
    - expect: Results filtered to 1 team
  3. Select all text (Cmd+A) and press Backspace to clear the search
    - expect: Search input is empty
    - expect: Results count returns to '34 teams'
    - expect: All teams are displayed again

#### 2.5. Search is case-insensitive

**File:** `tests/teams-filters/search-case-insensitive.spec.ts`

**Steps:**
  1. Navigate to http://localhost:5174
    - expect: All teams displayed
  2. Type 'MANCHESTER' (uppercase) in the search input
    - expect: Results count shows '2 teams'
    - expect: Manchester City and Manchester United are displayed
    - expect: Search works regardless of case
  3. Clear search and type 'manchester' (lowercase)
    - expect: Same 2 teams are displayed
    - expect: Case-insensitive search is confirmed

### 3. Combined Filter Functionality

**Seed:** `tests/seed.spec.ts`

#### 3.1. League filter combined with search

**File:** `tests/teams-filters/combined-league-search.spec.ts`

**Steps:**
  1. Navigate to http://localhost:5174
    - expect: All 34 teams displayed
  2. Select 'Premier League' from league dropdown
    - expect: Results filtered to 5 teams
  3. Type 'Manchester' in the search input
    - expect: Results count updates to '2 teams'
    - expect: Only Manchester City and Manchester United from Premier League are shown
    - expect: Both filters work together correctly

#### 3.2. Search first then league filter

**File:** `tests/teams-filters/search-then-league.spec.ts`

**Steps:**
  1. Navigate to http://localhost:5174
    - expect: All teams displayed
  2. Type 'Real' in the search input
    - expect: Results show teams containing 'Real' from any league
  3. Select 'La Liga' from the dropdown
    - expect: Results further filtered to show only La Liga teams containing 'Real'
    - expect: Real Madrid should be displayed

#### 3.3. Combined filters with no results

**File:** `tests/teams-filters/combined-no-results.spec.ts`

**Steps:**
  1. Navigate to http://localhost:5174
    - expect: All teams displayed
  2. Select 'Premier League' from league dropdown
    - expect: 5 Premier League teams displayed
  3. Type 'Bayern' in the search (a team not in Premier League)
    - expect: Results count shows '0 teams'
    - expect: No teams displayed
    - expect: Application handles edge case correctly

### 4. Filter Persistence and Reset Behavior

**Seed:** `tests/seed.spec.ts`

#### 4.1. Filters reset when switching tabs

**File:** `tests/teams-filters/filter-reset-tab-switch.spec.ts`

**Steps:**
  1. Navigate to http://localhost:5174
    - expect: Teams tab is active
  2. Select 'Premier League' and type 'Manchester' in search
    - expect: 2 teams displayed
  3. Click on 'Players' tab
    - expect: Players tab becomes active
    - expect: Players content is displayed
  4. Click back on 'Teams' tab
    - expect: Teams tab becomes active
    - expect: League dropdown is reset to 'All Leagues'
    - expect: Search input is empty
    - expect: All 34 teams are displayed
    - expect: Filters do not persist across tab switches

#### 4.2. League filter reset to All Leagues

**File:** `tests/teams-filters/league-filter-reset.spec.ts`

**Steps:**
  1. Navigate to http://localhost:5174
    - expect: All teams displayed
  2. Select 'La Liga' from dropdown
    - expect: 3 La Liga teams displayed
  3. Select 'All Leagues' from dropdown
    - expect: Results count returns to '34 teams'
    - expect: All teams from all leagues are displayed
    - expect: Filter is successfully reset

### 5. UI and Results Count Validation

**Seed:** `tests/seed.spec.ts`

#### 5.1. Results count updates dynamically

**File:** `tests/teams-filters/results-count-updates.spec.ts`

**Steps:**
  1. Navigate to http://localhost:5174
    - expect: Results count shows '34 teams' initially
  2. Select different leagues one by one
    - expect: Results count updates immediately with each selection
    - expect: Count reflects the actual number of teams displayed
    - expect: Text uses correct pluralization ('1 team' vs 'X teams')
  3. Type in search box while different filters are active
    - expect: Count updates with each keystroke
    - expect: Count always matches the number of visible team cards

#### 5.2. Team badges display correctly with filters

**File:** `tests/teams-filters/team-badges-display.spec.ts`

**Steps:**
  1. Navigate to http://localhost:5174
    - expect: All team cards show team badges (emoji icons)
  2. Apply various filters (league selections, search terms)
    - expect: All filtered team cards continue to show correct badges
    - expect: Badges match team colors (e.g., Manchester City 🔵, Liverpool 🔴)
    - expect: Visual consistency is maintained across all filter states

#### 5.3. Team card information is complete

**File:** `tests/teams-filters/team-card-completeness.spec.ts`

**Steps:**
  1. Navigate to http://localhost:5174 and apply different filters
    - expect: Each visible team card displays:
    - expect: - Team name (h3 heading)
    - expect: - Stadium name with 🏟️ icon
    - expect: - Founded year with 📅 icon
    - expect: - League name with 🏆 icon
    - expect: - Country with 🌍 icon
    - expect: All information is accurate and complete regardless of filter state

### 6. Edge Cases and Error Handling

**Seed:** `tests/seed.spec.ts`

#### 6.1. Empty search shows all results for selected league

**File:** `tests/teams-filters/empty-search-behavior.spec.ts`

**Steps:**
  1. Navigate to http://localhost:5174
    - expect: All teams displayed
  2. Select 'Bundesliga' from dropdown
    - expect: Only Bundesliga teams displayed
  3. Ensure search input remains empty
    - expect: All Bundesliga teams continue to be displayed
    - expect: Empty search does not filter out any teams

#### 6.2. Rapid filter changes

**File:** `tests/teams-filters/rapid-filter-changes.spec.ts`

**Steps:**
  1. Navigate to http://localhost:5174
    - expect: Teams tab loaded
  2. Rapidly change league selections (click through multiple leagues quickly)
    - expect: UI updates correctly for each selection
    - expect: No visual glitches or stuck states
    - expect: Results count and team cards stay synchronized
  3. Rapidly type and delete characters in search box
    - expect: Filter responds to each change
    - expect: No lag or incorrect filtering
    - expect: Application remains responsive

#### 6.3. Special characters in search

**File:** `tests/teams-filters/search-special-characters.spec.ts`

**Steps:**
  1. Navigate to http://localhost:5174
    - expect: All teams displayed
  2. Type special characters in search: 'é' (for Atlético)
    - expect: Search handles special characters correctly
    - expect: Atlético Madrid is found when typing 'Atlético'
  3. Try searching for team names with special characters using regular ASCII characters
    - expect: Verify whether search normalizes characters or requires exact match
    - expect: Document actual behavior for future test implementation
