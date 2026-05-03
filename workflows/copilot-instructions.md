# Copilot Instructions for .github

These instructions apply to all repositories under this organization. They help GitHub Copilot provide suggestions that align with our engineering standards and best practices.

## General Guidelines

- Always prioritize **code readability** and **maintainability** over clever or overly compact solutions.
- Write clear, descriptive comments for complex logic, public APIs, and any non‑obvious behavior.
- Follow the **language‑specific community best practices** (e.g., PEP 8 for Python, Effective Java for Java, StandardJS for JavaScript).
- Prefer **explicit imports** over wildcard imports (e.g., `from module import name` instead of `from module import *`).
- Avoid **deep nesting** – refactor deeply nested conditionals or loops into well‑named helper functions.
- Use **meaningful variable, function, and class names** that reveal intent.
- Include **error handling** for operations that can fail (file I/O, network calls, user input, etc.). Do not silently swallow exceptions.

## Security & Reliability

- Never suggest hardcoded secrets, credentials, or tokens. Use environment variables or a secrets manager.
- Validate and sanitize all external inputs (user input, API responses, file contents).
- Prefer parameterized queries or an ORM to prevent SQL injection.
- Avoid using `eval()` or dynamically executing strings as code.

## Testing

- When suggesting new functions or classes, also suggest **unit tests** using the organization’s preferred framework (e.g., JUnit, pytest, Jest).
- Tests should be **deterministic** – no hidden state or reliance on unpredictable external systems.
- Name test methods/functions clearly: `test_<scenario>_<expected_behavior>`.

## Documentation

- For public APIs, modules, and classes, generate **docstrings** or **JSDoc** comments that describe purpose, parameters, return values, and possible exceptions.
- Keep `README.md` and inline documentation up to date when suggesting structural changes.

## Language‑Specific Preferences

### Python
- Follow **PEP 8** (indentation, line length, naming conventions).
- Use **type hints** for function signatures and complex data structures.
- Prefer `pathlib` over `os.path` for file path manipulation.

### JavaScript / TypeScript
- Use **ES6+ syntax** (const/let, arrow functions, template literals, destructuring).
- Prefer **TypeScript** for new projects; provide accurate type definitions.
- Use `async/await` instead of raw promises or callbacks for asynchronous code.

### Go
- Follow **Effective Go** and `gofmt` style.
- Use explicit error handling; do not ignore returned errors.
- Prefer interfaces that are small and focused.

### Java
- Follow **Google Java Style Guide** or the organization’s internal standard.
- Use **optional** instead of returning `null` where appropriate.
- Prefer `try‑with‑resources` for Autocloseable resources.

### Rust
- Follow **Rust API Guidelines**.
- Handle all `Result` and `Option` types deliberately – avoid `unwrap()` except in prototypes or tests.

## Pull Requests & Code Review

- When suggesting code in a pull request context, consider:
  - Backward compatibility – avoid breaking changes without a deprecation path.
  - Performance implications – avoid O(n²) algorithms in hot paths.
  - Consistency with the existing codebase.
- Suggest commit messages that follow the [Conventional Commits](https://www.conventionalcommits.org/) format (`feat:`, `fix:`, `docs:`, `refactor:`).

## Limitations & Overrides

- Individual repositories can override or extend these instructions by placing their own `copilot-instructions.md` file in `.github/` within that repository.
- If a repository uses a framework or domain‑specific pattern not covered here, prefer the local instructions.

