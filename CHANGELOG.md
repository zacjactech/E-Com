# Changelog

All notable changes to this project will be documented in this file.

## [1.2.0] - 2025-10-29

### Added
- **Email receipt system** - Automatic email confirmation sent after checkout
  - Beautiful HTML email template with order details
  - Plain text fallback for email clients
  - Development mode logs emails to console
  - Production mode supports SMTP (Gmail, SendGrid, etc.)
  - Non-blocking email sending (doesn't fail checkout if email fails)
- Email service with Nodemailer
- SMTP configuration in .env
- Email documentation in README

## [1.1.0] - 2025-10-29

### Added
- **Product image thumbnails in cart** - Cart items now display 80x80px product images
- 10 products with high-quality Unsplash images (previously 8 with placeholders)
- New products: Bluetooth Speaker ($54.99) and Phone Stand ($24.99)
- Image fallback handling for both product cards and cart items
- Console logging for debugging product loading
- Test environment configuration to suppress error logs during testing
- PRODUCTS.md documentation with all product details
- TROUBLESHOOTING.md guide for common issues

### Changed
- Updated all product images from placeholder URLs to Unsplash
- Cart API response now includes `image` field for each item
- CartItem component redesigned with image thumbnail on the left
- Improved mobile responsive layout for cart items
- Updated tests to validate image field in cart responses

### Fixed
- SQLite enum compatibility (changed from enum to string type)
- Floating-point precision test for currency conversion
- Test database seeding to ensure 10 products

## [1.0.0] - 2025-10-28

### Initial Release
- Full-stack e-commerce cart application
- React 18 + Vite frontend
- Node.js 18 + Express 4 backend
- SQLite database with Prisma ORM
- Product catalog with 8 items
- Shopping cart functionality (add/remove/update)
- Mock checkout with receipt generation
- Comprehensive test coverage (Jest + Vitest)
- CI/CD pipeline with GitHub Actions
- Responsive mobile-first design
