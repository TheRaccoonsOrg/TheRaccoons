# TheRaccoons

Welcome to the project! This document outlines the recommended practices for making commits and pull requests to ensure a smooth and organized development process.

## Branching Strategy

1. **Feature Branches:**
   - Create a separate feature branch for each new feature or bug fix.
   - Naming convention: `feature/your-feature-name` or `bugfix/your-bugfix-name`.

2. **Pull Request to `dev` Branch:**
   - Create a pull request from your feature branch to the `dev` branch.
   - Use conventional commits to structure your commit messages.

3. **Review and Merge to `dev`:**
   - Ensure that your pull request passes any required checks (tests, linting, etc.).
   - Receive code reviews from your peers.
   - Merge your feature branch into `dev` once approved.

4. **Pull Request to `main` Branch:**
   - Create a new pull request from the `dev` branch to the `main` branch.
   - Use the squash and merge option to keep a clean commit history.

5. **Release:**
   - After merging into `main`, consider tagging the commit for the release.

## Conventional Commits

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for our commit messages. Please ensure that your commit messages adhere to this standard.

### Example Conventional Commit Messages

- `feat: add new feature`
- `fix: resolve bug in the component`
- `chore: update dependencies`

## Pull Request Template

When creating a pull request, use the following template to provide context and necessary information:

```markdown
# Pull Request Title

## Changes Made

- Concise list of changes made in bullet-point format.

## Context

Briefly describe the purpose and context of the changes.

## Checklist

- [ ] Commits follow Conventional Commits standards.
- [ ] Changes have been tested locally.
- [ ] Documentation has been updated (if applicable).
- [ ] Code has been reviewed by peers.
```
## Getting Help

If you have any questions or need assistance, feel free to [open an issue](https://github.com/mihaildanilov/TheRaccoons/issues).
