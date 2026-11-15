# Playwright Automation Framework

Welcome to the **Playwright Automation Framework**!  
This project provides a robust, scalable, and maintainable solution for end-to-end testing of modern web applications using [Playwright](https://playwright.dev/) and **TypeScript**.

---

## 🌟 Overview

This framework is designed to automate web application testing, ensuring reliability and speed in your CI/CD pipeline. It leverages Playwright’s powerful browser automation capabilities, TypeScript’s type safety, and follows best practices for test organization and security.

---

## 🚀 Key Features

- **✅ Page Object Model** - 6 page classes encapsulating UI interactions and selectors
- **✅ 24 Comprehensive Tests** - Complete coverage of all major user flows and features
- **✅ Test Data Externalization** - 15 JSON files for centralized test parameters and expected values
- **✅ Helper Utilities** - Reusable utilities for data loading, logging, and common actions
- **✅ Feature-Based Organization** - Tests organized by business features (products, cart, checkout, account, order)
- **✅ Parallel Execution** - 6 concurrent workers running ~22.5 seconds total
- **✅ 100% Pass Rate** - All tests passing with verified reliability
- **✅ API Testing** - 6 backend endpoint tests for service validation
- **✅ Cookie-based Authentication** - Fast login with persistent session storage
- **✅ HTML Reporting** - Comprehensive test reports with artifacts
- **✅ Environment Management** - Secure credential handling via .env
as
---

## 🧰 Tech Stack

- [Playwright](https://playwright.dev/)  
- **TypeScript**  
- **Node.js**  
- **VS Code**

---

## 📁 Project Structure

```
Playwright_Automation/
├── pages/                          # 📄 Page Object Model Classes
│   ├── BasePage.ts                # Base class with common methods
│   ├── LoginPage.ts               # Login page operations
│   ├── DashboardPage.ts           # Dashboard & product operations
│   ├── CartPage.ts                # Shopping cart operations
│   ├── CheckoutPage.ts            # Checkout & country selection
│   ├── OrderConfirmationPage.ts   # Order confirmation handling
│   └── index.ts                   # Export all page objects
│
├── helpers/                        # 🛠️ Helper Utilities
│   ├── TestDataLoader.ts          # Load test data from JSON files
│   ├── TestLogger.ts              # Formatted logging utilities
│   ├── CommonActions.ts           # Common test actions
│   ├── productUtils.ts            # Product-specific helpers
│   ├── typeaheadHelper.ts         # Typeahead dropdown helper
│   └── index.ts                   # Export all helpers
│
├── testData/                       # 📊 Test Data (JSON Files)
│   ├── productBrowsing.json       # TC-001: Browse products
│   ├── addToCart.json             # TC-002: Add to cart
│   ├── updateCart.json            # TC-003: Update quantities
│   ├── removeFromCart.json        # TC-004: Remove from cart
│   ├── singleProductPurchase.json # TC-005: Single purchase
│   ├── multipleProductPurchase.json # TC-006: Multiple purchase
│   ├── orderHistory.json          # TC-007: Order history
│   ├── productSearch.json         # TC-008: Search products
│   ├── productPrices.json         # TC-009: Product prices
│   ├── couponCode.json            # TC-010: Coupon codes
│   ├── logoutLogin.json           # TC-011: Logout/Login
│   ├── dashboardNavigation.json   # TC-012: Navigation
│   ├── responsiveUI.json          # TC-013: UI elements
│   ├── cartSummary.json           # TC-014: Cart summary
│   └── orderDetails.json          # TC-015: Order details
│
├── tests/                          # ✅ Test Files (Organized by Feature)
│   ├── setup/
│   │   └── auth.setup.ts          # Authentication setup
│   │
│   ├── api/
│   │   └── api.spec.ts            # API endpoint tests
│   │
│   ├── products/                  # 🛍️ Product Tests
│   │   ├── products.spec.ts       # TC-001, TC-008, TC-009
│   │   └── ui-navigation.spec.ts  # TC-012, TC-013
│   │
│   ├── cart/                      # 🛒 Cart Tests
│   │   └── cart.spec.ts           # TC-002, TC-003, TC-004, TC-014
│   │
│   ├── checkout/                  # 💳 Checkout Tests
│   │   └── checkout.spec.ts       # TC-005, TC-006, TC-010
│   │
│   ├── account/                   # 👤 Account Tests
│   │   └── account.spec.ts        # TC-011
│   │
│   ├── order/                     # 📦 Order Tests
│   │   └── order.spec.ts          # TC-007, TC-015
│   │
│   ├── dashboard.spec.ts          # Dashboard tests (existing)
│   └── buy-product.spec.ts        # Buy product tests (existing)
│
├── playwright.config.ts           # Playwright configuration
├── playwright-report/             # HTML test reports
├── test-results/                  # Test results artifacts
├── .env.template                  # Environment variable template
├── .env                           # Environment variables (not committed)
├── package.json                   # Dependencies and scripts
├── README.md                      # This file
├── E2E_TEST_REPORT.md             # E2E test coverage report
├── POM_IMPLEMENTATION_REPORT.md   # Detailed POM documentation
└── TEST_EXECUTION_SUMMARY.md      # Test results summary
```

---

## 🔒 Security & Best Practices

- **Sensitive files** like `.env` and session cookies are ignored via `.gitignore`.
- Use `.env.template` to share environment variable structure without exposing secrets.
- Never commit real credentials or authentication files to version control.

---

## ⚡ Getting Started

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd Playwright_Automation
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.template` to `.env` and fill in your credentials.

4. **Run tests:**
   ```sh
   npx playwright test
   ```

---

## 🏗️ Page Object Architecture

The framework implements a robust **Page Object Model** with 6 page classes:

### Base Page
- **Purpose:** Common methods used across all pages
- **Key Methods:**
  - `navigate(url)` - Navigate to a specific URL
  - `click(locator)` - Click an element
  - `fill(locator, text)` - Fill input fields
  - `getText(locator)` - Extract element text
  - `isVisible(locator)` - Check element visibility
  - `waitForElement(locator)` - Wait for element presence
  - `getLocator(locator)` - Get raw locator object

### Page Classes
| Page | File | Responsibilities |
|------|------|------------------|
| **LoginPage** | `pages/LoginPage.ts` | User login, authentication, visibility checks |
| **DashboardPage** | `pages/DashboardPage.ts` | Product browsing, cart navigation, user actions |
| **CartPage** | `pages/CartPage.ts` | Add/remove items, update quantities, checkout |
| **CheckoutPage** | `pages/CheckoutPage.ts` | Country selection, order placement, email capture |
| **OrderConfirmationPage** | `pages/OrderConfirmationPage.ts` | Order verification, order details, history |

---

## 📊 Test Data Organization

All test data is **externalized into JSON files** in the `testData/` folder for:
- **Maintainability** - Easy updates without code changes
- **Reusability** - Share test data across multiple tests
- **Clarity** - Separate test logic from test data

### Test Data Files (15 Total)

| File | Test Case | Purpose |
|------|-----------|---------|
| `productBrowsing.json` | TC-001 | Browse and filter products |
| `addToCart.json` | TC-002 | Add items to shopping cart |
| `updateCart.json` | TC-003 | Update product quantities |
| `removeFromCart.json` | TC-004 | Remove items from cart |
| `singleProductPurchase.json` | TC-005 | Purchase single product |
| `multipleProductPurchase.json` | TC-006 | Purchase multiple products |
| `orderHistory.json` | TC-007 | View order history |
| `productSearch.json` | TC-008 | Search for specific products |
| `productPrices.json` | TC-009 | Verify product pricing |
| `couponCode.json` | TC-010 | Apply discount coupons |
| `logoutLogin.json` | TC-011 | Account logout/login |
| `dashboardNavigation.json` | TC-012 | Dashboard navigation flow |
| `responsiveUI.json` | TC-013 | UI responsiveness |
| `cartSummary.json` | TC-014 | Cart summary validation |
| `orderDetails.json` | TC-015 | Order details verification |

---

## 🛠️ Helper Utilities

### TestDataLoader
**File:** `helpers/TestDataLoader.ts`
- `loadTestData(fileName)` - Load JSON test data file
- `getAllTestData()` - Retrieve all test data across files

**Usage:**
```typescript
import { TestDataLoader } from '../helpers';

const testData = TestDataLoader.loadTestData('productBrowsing.json');
```

### TestLogger
**File:** `helpers/TestLogger.ts`
- `log(message)` - General logging
- `info(message)` - Information messages (ℹ️ prefix)
- `warn(message)` - Warning messages (⚠️ prefix)
- `error(message)` - Error messages (❌ prefix)
- `testStart(testName)` - Test start logging (🏁 prefix)
- `testPass(testName)` - Test pass logging (✅ prefix)
- `testFail(testName, error)` - Test failure logging (❌ prefix)

**Usage:**
```typescript
import { TestLogger } from '../helpers';

TestLogger.testStart('TC-001: Browse Products');
TestLogger.testPass('TC-001: Browse Products');
```

### CommonActions
**File:** `helpers/CommonActions.ts`
- `navigateTo(url)` - Navigate to URL
- `waitForElement(locator, timeout)` - Wait for element visibility
- `verifyElementVisibility(locator)` - Check element visibility
- `getElementText(locator)` - Extract element text
- `fillInput(locator, text)` - Fill input with text
- `clickElement(locator)` - Click element
- `retryAction(action, retries)` - Retry action with fallback

---

## 📋 Test Coverage

### Test Organization by Feature

**🛍️ Products Module** (5 tests)
- TC-001: Browse and filter products
- TC-008: Search product functionality
- TC-009: Verify product prices
- TC-012: Dashboard navigation flows
- TC-013: Responsive UI elements

**🛒 Cart Module** (4 tests)
- TC-002: Add products to cart
- TC-003: Update product quantities
- TC-004: Remove items from cart
- TC-014: Cart summary validation

**💳 Checkout Module** (3 tests)
- TC-005: Purchase single product
- TC-006: Purchase multiple products
- TC-010: Apply coupon codes

**👤 Account Module** (1 test)
- TC-011: Logout and login flow

**📦 Order Module** (2 tests)
- TC-007: View order history
- TC-015: View order details

**API Module** (6 tests)
- API endpoint validation and integration tests

**Existing Tests** (4 tests)
- Authentication setup
- Dashboard display
- Buy product flow
- Additional API tests

**Total: 24 Tests | 100% Pass Rate | ~22.5 seconds execution time**

---

## 🔄 Running Tests

### Run all tests
```sh
npx playwright test
```

### Run tests by feature
```sh
npx playwright test tests/products/      # Run product tests
npx playwright test tests/cart/          # Run cart tests
npx playwright test tests/checkout/      # Run checkout tests
npx playwright test tests/account/       # Run account tests
npx playwright test tests/order/         # Run order tests
```

### Run specific test
```sh
npx playwright test -g "TC-001"          # Run by test name
npx playwright test tests/products/products.spec.ts  # Run specific file
```

### Run with debug mode
```sh
npx playwright test --debug
```

### View test report
```sh
npx playwright show-report
```

---

## 📖 Documentation

- [Playwright Docs](https://playwright.dev/docs/intro)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [POM_IMPLEMENTATION_REPORT.md](./POM_IMPLEMENTATION_REPORT.md) - Detailed POM documentation
- [TEST_EXECUTION_SUMMARY.md](./TEST_EXECUTION_SUMMARY.md) - Test execution results

---

## 🤝 Contributing

Contributions are welcome!  
Please open issues or submit pull requests for improvements and bug fixes.

---

## 📄 License

This project is licensed under the MIT License.

---

## 📈 Project Statistics

| Metric | Value |
|--------|-------|
| **Total Tests** | 24 |
| **Pass Rate** | 100% |
| **Execution Time** | ~22.5s |
| **Parallel Workers** | 6 |
| **Page Objects** | 6 classes |
| **Test Data Files** | 15 JSON files |
| **Helper Utilities** | 3 modules |
| **Test Categories** | 7 (Product, Cart, Checkout, Account, Order, API, Setup) |

---

**Happy Testing! 🚀**

