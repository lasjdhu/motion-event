# Contributing to `motion-event`

## How to Contribute

1. Fork the repository on GitHub.
2. Clone your fork locally and set up the project.

   ```sh
   corepack enable
   pnpm install
   ```

3. Create a new branch for your feature or fix.
4. Make your changes.
5. Run the validation pipeline to ensure your changes pass all checks.

   ```sh
   pnpm validate
   ```

   For native Android changes, also compile the example with
   `pnpm android:example` (an Android SDK and device or emulator are required).

6. Commit your changes (Take a look at [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)).
7. Push your branch to your fork.
8. Open a Pull Request on the main repository.

## Issue Reporting

- If you find a bug, please open an issue with detailed reproduction steps.
- For feature requests, describe the desired functionality and potential use cases.

## Code Guidelines

- Follow the existing coding style.
- Write clear, concise code with comments where necessary.

Thank you for helping improve `motion-event`!
