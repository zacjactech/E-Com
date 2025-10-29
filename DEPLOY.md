# Deployment Guide

## 🚀 Push to GitHub

### First Time Setup

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Name: `vibe-commerce-cart` (or your preferred name)
   - Description: "Full-stack e-commerce shopping cart with React, Node.js, and SQLite"
   - Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
   - Click "Create repository"

2. **Initialize and push from your local repository:**

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Vibe Commerce cart application

- Full-stack shopping cart with React 18 + Vite
- Node.js 18 + Express 4 backend with Prisma ORM
- SQLite database with 10 seeded products
- Product images from Unsplash
- Cart management with image thumbnails
- Mock checkout with receipt generation
- Comprehensive test coverage (28 tests)
- CI/CD pipeline with GitHub Actions
- Responsive mobile-first design"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Subsequent Pushes

```bash
# Check status
git status

# Add changes
git add .

# Commit with message
git commit -m "Your commit message"

# Push to GitHub
git push
```

## 📋 Pre-Push Checklist

Before pushing to GitHub, verify:

- ✅ All tests passing: `npm test`
- ✅ No sensitive data in code (API keys, passwords, etc.)
- ✅ .env files are in .gitignore
- ✅ Database files (.db) are in .gitignore
- ✅ node_modules are in .gitignore
- ✅ README.md is complete and accurate
- ✅ All temporary/debug files removed

## 🔒 Security Notes

**Files that should NEVER be committed:**
- `.env` files (contains secrets)
- `*.db` files (database with user data)
- `node_modules/` (dependencies)
- API keys or tokens
- Private credentials

**Already protected by .gitignore:**
- Environment variables (.env)
- Database files (*.db)
- Dependencies (node_modules/)
- Build outputs (dist/, build/)
- IDE settings (.vscode/, .idea/)

## 📝 Recommended Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
git commit -m "feat: add product image thumbnails to cart"
git commit -m "fix: resolve SQLite enum compatibility issue"
git commit -m "docs: update README with setup instructions"
git commit -m "test: add image field validation to cart tests"
```

## 🌿 Branch Strategy (Optional)

For team development:

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: your feature description"

# Push feature branch
git push -u origin feature/your-feature-name

# Create Pull Request on GitHub
# After review and merge, update main:
git checkout main
git pull origin main
```

## 🔄 Keeping Your Fork Updated

If you forked this repository:

```bash
# Add upstream remote (original repo)
git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPO.git

# Fetch upstream changes
git fetch upstream

# Merge upstream changes
git checkout main
git merge upstream/main

# Push to your fork
git push origin main
```

## 📦 Release Tags

To create a release:

```bash
# Create annotated tag
git tag -a v1.1.0 -m "Release v1.1.0: Add cart image thumbnails"

# Push tag to GitHub
git push origin v1.1.0

# Or push all tags
git push --tags
```

## 🎯 GitHub Actions

The repository includes a CI workflow (`.github/workflows/ci.yml`) that automatically:
- Runs on push to main/develop branches
- Runs on pull requests
- Executes linting checks
- Runs all tests (backend + frontend)

View workflow runs at: `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/actions`

## 🐛 Troubleshooting

**Issue: "remote: Repository not found"**
- Check repository URL is correct
- Verify you have access to the repository
- Ensure you're authenticated with GitHub

**Issue: "failed to push some refs"**
- Pull latest changes first: `git pull origin main`
- Resolve any conflicts
- Then push: `git push`

**Issue: Large files rejected**
- Check file sizes: `git ls-files -s | sort -k 2 -n -r | head -10`
- Remove large files from git history if needed
- Consider using Git LFS for large files

## 📚 Additional Resources

- [GitHub Docs](https://docs.github.com)
- [Git Documentation](https://git-scm.com/doc)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
