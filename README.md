# Playwright Automation Framework

Welcome to the **Playwright Automation Framework**!  
This project provides a robust, scalable, and maintainable solution for end-to-end testing of modern web applications using [Playwright](https://playwright.dev/) and **TypeScript**.

---

## 🌟 Overview

This framework is designed to automate web application testing, ensuring reliability and speed in your CI/CD pipeline. It leverages Playwright’s powerful browser automation capabilities, TypeScript’s type safety, and follows best practices for test organization and security.

---

## 🚀 Key Features

- **Cross-browser Testing:** Run tests on Chromium, Firefox, and WebKit.
- **Parallel Execution:** Speed up test runs with parallelization.
- **Page Object Model (POM):** Clean, reusable, and maintainable test code.
- **API Testing:** Validate backend APIs using Playwright’s APIRequest.
- **Trace & Debug:** Automatic trace, screenshot, and video capture on failures.
- **HTML Reporting:** Visual test reports for easy analysis.
- **Environment Management:** Secure handling of credentials and environment variables.
- **Cookie-based Authentication:** Fast login using stored session cookies.

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
├── .env.template         # Environment variable template
├── playwright.config.ts  # Playwright configuration
├── tests/                # Test scripts and setup files
│   ├── setup/            # Authentication and environment setup
│   └── dashboard.spec.ts # Example test spec
├── LoginData/            # Stores login session cookies
├── .github/              # GitHub workflows and chatmodes (ignored)
├── README.md             # Project documentation
└── package.json          # Project dependencies and scripts
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

## 📖 Documentation

- [Playwright Docs](https://playwright.dev/docs/intro)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

---

## 🤝 Contributing

Contributions are welcome!  
Please open issues or submit pull requests for improvements and bug fixes.

---

## 📄 License

This project is licensed under the MIT License.

---

**Happy Testing! 🚀**

