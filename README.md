# 🛒 Vibe Commerce - E-Commerce Shopping Cart

A modern, full-stack shopping cart application built with React, Node.js, and SQLite. Features product browsing, cart management with image thumbnails, and a complete mock checkout flow.

![Vibe Commerce](./frontend/public/screenshots/banner.png)

## 📸 Screenshots

<div align="center">

### Product Catalog
![Product Grid](./frontend/public/screenshots/home.png)
*Browse 10 tech products with high-quality images from Unsplash*

### Shopping Cart
![Shopping Cart](./frontend/public/screenshots/cart.png)
*Manage cart items with product thumbnails, quantity controls, and real-time totals*

### Checkout & Receipt
![Checkout](./frontend/public/screenshots/checkout.png)
*Complete mock checkout with receipt generation*

</div>

## ✨ Features

### Core Functionality
- 🛍️ **Product Catalog** - Browse 10 tech products with images, prices, and descriptions
- 🛒 **Shopping Cart** - Add/remove items with quantity controls
- 🖼️ **Product Thumbnails** - Visual cart items with 80x80px images
- 💰 **Real-time Totals** - Automatic calculation of subtotals and totals
- 📦 **Mock Checkout** - Complete order flow with receipt generation
- 💾 **Persistent State** - Cart data saved in SQLite database
- 📱 **Responsive Design** - Mobile-first UI that works on all devices

### Technical Features
- ⚡ **Fast Development** - Vite for instant HMR
- 🧪 **Comprehensive Testing** - 28 tests with Jest and Vitest
- 🔒 **Secure** - Helmet for security headers, CORS protection
- 🎨 **Clean Code** - ESLint + Prettier for code quality
- 🚀 **CI/CD Ready** - GitHub Actions workflow included
- 🗄️ **Database Isolation** - Separate test database for safe testing

## 🛠 Tech Stack

### Frontend

- **React 18** with Vite for fast development
- **Axios** for API communication
- **Vitest + React Testing Library** for testing
- **CSS3** for responsive styling

### Backend

- **Node.js 18** with Express 4
- **Prisma ORM** with SQLite database
- **Jest + Supertest** for API testing
- **Helmet** for security headers
- **Morgan** for request logging
- **CORS** for cross-origin requests

### Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌──────────────┐
│                 │         │                 │         │              │
│  React Frontend │◄───────►│  Express API    │◄───────►│   SQLite DB  │
│  (Port 5173)    │  HTTP   │  (Port 4000)    │  Prisma │  (dev.db)    │
│                 │         │                 │         │              │
└─────────────────┘         └─────────────────┘         └──────────────┘
       │                            │
       │                            │
       ▼                            ▼
  Vitest + RTL              Jest + Supertest
```

## 📁 Project Structure

```
vibe-commerce-cart/
├── backend/
│   ├── src/
│   │   ├── server.js           # Express app entry
│   │   ├── routes/             # API route definitions
│   │   ├── controllers/        # Request handlers
│   │   ├── services/           # Business logic
│   │   ├── middleware/         # Custom middleware
│   │   ├── utils/              # Helper functions
│   │   └── db/                 # Database client
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema
│   │   └── seed.js             # Seed data script
│   ├── tests/                  # Jest + Supertest tests
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── main.jsx            # App entry point
│   │   ├── App.jsx             # Root component
│   │   ├── api/                # Axios client
│   │   ├── components/         # React components
│   │   ├── pages/              # Page components
│   │   ├── context/            # React context
│   │   ├── hooks/              # Custom hooks
│   │   └── styles/             # CSS files
│   ├── tests/                  # Vitest + RTL tests
│   ├── public/                 # Static assets
│   └── package.json
├── .github/workflows/
│   └── ci.yml                  # CI pipeline
└── package.json                # Root scripts
```

## 🚀 Quick Start Guide

### Prerequisites

Before you begin, ensure you have installed:
- **Node.js 18+** ([Download here](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Git** ([Download here](https://git-scm.com/))

### Step-by-Step Installation

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/zacjactech/E-Com.git
cd E-Com
```

#### 2️⃣ Install Dependencies

**Quick method:**
```bash
npm run install:all
```

**Manual method:**
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
cd ..
```

#### 3️⃣ Setup Backend & Database

```bash
cd backend

# Copy environment configuration
cp .env.example .env

# Run database migrations
npx prisma migrate dev

# Seed database with 10 products
npm run seed
```

✅ You should see:
```
✅ Seeded 10 products
📦 Products in database:
   1. Wireless Headphones - $79.99
   2. Smart Watch - $199.99
   3. Laptop Stand - $34.99
   ...
```

#### 4️⃣ Start the Application

**Option A: Run both servers together (Recommended)**
```bash
# From root directory
npm run dev
```

**Option B: Run servers separately**
```bash
# Terminal 1 - Backend API (port 4000)
cd backend
npm run dev

# Terminal 2 - Frontend UI (port 5173)
cd frontend
npm run dev
```

#### 5️⃣ Open in Browser

Navigate to **http://localhost:5173** 🎉

You should see the product catalog with 10 tech products!

### Verify Installation

Check that everything is working correctly:

```bash
# Test backend health
curl http://localhost:4000/health
# Expected: {"status":"ok","timestamp":"..."}

# Test products API
curl http://localhost:4000/api/products
# Expected: JSON array with 10 products

# Run all tests
npm test
# Expected: 28 tests passing ✅
```

## 🧪 Testing

**Important:** Tests use a separate test database (`test.db`) to avoid interfering with your development data.

### Run all tests

```bash
npm test
```

### Backend tests (Jest + Supertest)

```bash
cd backend
npm test              # Run once (auto-initializes test DB)
npm run test:watch    # Watch mode
npm run test:coverage # With coverage
```

**Note:** The test database is automatically created and migrated before each test run. Your development database (`dev.db`) and seeded products remain untouched.

### Frontend tests (Vitest + RTL)

```bash
cd frontend
npm test              # Run once
npm run test:watch    # Watch mode
npm run test:coverage # With coverage
```

### Linting

```bash
npm run lint          # Lint all
npm run format        # Format all with Prettier
```

## 📡 API Documentation

Base URL: `http://localhost:4000/api`

### Authentication

All endpoints accept an optional `X-User-Id` header. Defaults to `"demo-user"` if not provided.

### Endpoints

#### `GET /api/products`

Fetch all available products.

**Response:**

```json
[
  {
    "id": 1,
    "name": "Wireless Headphones",
    "price": 79.99,
    "priceCents": 7999,
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    "description": "Premium wireless headphones with noise cancellation"
  }
]
```

**Note:** Returns 10 products seeded from the database with high-quality Unsplash images.

#### `GET /api/cart`

Get current user's cart with computed totals.

**Response:**

```json
{
  "id": 1,
  "userId": "demo-user",
  "items": [
    {
      "id": 1,
      "productId": 1,
      "name": "Wireless Headphones",
      "price": 79.99,
      "qty": 2,
      "lineTotal": 159.98
    }
  ],
  "subtotal": 159.98,
  "total": 159.98,
  "itemCount": 2
}
```

#### `POST /api/cart`

Add or update item in cart.

**Request:**

```json
{
  "productId": 1,
  "qty": 2
}
```

**Response:** Updated cart (same shape as GET /api/cart)

**Validation:**

- `productId` (required): valid product ID
- `qty` (required): integer >= 0 (0 removes the item)

#### `DELETE /api/cart/:id`

Remove cart item by cart item ID.

**Response:** Updated cart

#### `POST /api/checkout`

Process checkout and generate receipt.

**Request:**

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response:**

```json
{
  "receiptId": "receipt_1234567890",
  "userId": "demo-user",
  "name": "John Doe",
  "email": "john@example.com",
  "items": [...],
  "total": 159.98,
  "timestamp": "2025-10-28T12:34:56.789Z"
}
```

**Side effect:** Clears the user's active cart.

### Error Responses

All errors return JSON with this structure:

```json
{
  "error": {
    "message": "Product not found",
    "code": "PRODUCT_NOT_FOUND"
  }
}
```

Status codes: `400` (validation), `404` (not found), `500` (server error)

## ⚙️ Configuration

### Environment Variables

**Backend** (`.env`):

```env
PORT=4000
DATABASE_URL="file:./dev.db"
NODE_ENV=development
USE_FAKE_STORE_API=false
```

- `PORT`: Backend server port (default: 4000)
- `DATABASE_URL`: Prisma database connection
- `USE_FAKE_STORE_API`: Toggle to use external Fake Store API for products (bonus feature)

### Fake Store API Integration (Bonus)

Set `USE_FAKE_STORE_API=true` in backend `.env` to fetch products from `https://fakestoreapi.com/products` instead of the local database. The API response is mapped to match our schema.

## 🎨 Features

### Implemented

✅ Product catalog with grid layout  
✅ Add to cart functionality  
✅ Cart management (add/remove/update quantities)  
✅ Real-time total calculations  
✅ Mock checkout with receipt generation  
✅ Persistent cart state (SQLite)  
✅ Responsive mobile-first design  
✅ Loading states and error handling  
✅ Empty state messages  
✅ Multi-user support via X-User-Id header  
✅ Comprehensive test coverage  
✅ CI/CD pipeline with GitHub Actions

### Future Enhancements

- Product search and filtering
- Product categories
- Discount codes and promotions
- Tax and shipping calculations
- Order history
- User authentication
- Payment gateway integration
- Admin dashboard

## 💡 How It Works

### Application Flow

```
1. User visits homepage → Fetches products from API
2. User clicks "Add to Cart" → POST /api/cart
3. Backend updates cart in database → Returns updated cart
4. User navigates to cart → GET /api/cart
5. User adjusts quantities → POST /api/cart (upsert)
6. User proceeds to checkout → Enters name/email
7. User submits order → POST /api/checkout
8. Backend generates receipt → Clears cart → Returns receipt
9. User sees receipt modal → Can return to shopping
```

### Key Design Decisions

#### 💰 Currency Handling
Prices are stored as **cents** (integers) in the database to avoid floating-point precision issues common with decimal arithmetic in JavaScript.

```javascript
// Database: 7999 cents
// Display: $79.99 (formatted with Intl.NumberFormat)
```

**Why?** Prevents errors like `0.1 + 0.2 = 0.30000000000000004`

#### 🔄 State Management
The **backend is the source of truth** for all cart data. The frontend always fetches fresh data after mutations.

**Benefits:**
- Consistent state across devices/tabs
- No sync issues
- Server-side validation
- Easy to add real-time updates later

**Trade-off:** Slightly more network requests, but ensures data integrity

#### 👤 User Identification
Uses a simple `X-User-Id` header (defaults to "demo-user") for demo purposes.

**Production alternative:** Replace with:
- JWT tokens
- Session cookies
- OAuth (Google, GitHub, etc.)
- Magic links

#### 🗄️ Database Choice
**SQLite** via Prisma ORM provides:
- Zero configuration
- File-based (no server needed)
- Perfect for local development
- Easy to migrate to PostgreSQL/MySQL later

**Migration path:**
```javascript
// Just change DATABASE_URL in .env
DATABASE_URL="postgresql://user:pass@localhost:5432/db"
```

#### 🧪 Testing Strategy
**Separate test database** ensures tests never interfere with development data:
- `dev.db` - Your seeded products (untouched by tests)
- `test.db` - Auto-created for each test run

**Coverage:**
- Backend: API integration tests + service unit tests
- Frontend: Component tests + user interaction tests
- Total: 28 tests covering critical paths

#### 🖼️ Image Handling
Product images use **Unsplash** URLs with optimized parameters:
```
https://images.unsplash.com/photo-ID?w=400&h=400&fit=crop
```

**Fallback:** If Unsplash fails, displays placeholder image

**Production:** Replace with:
- CDN (Cloudinary, Imgix)
- S3 + CloudFront
- Your own image server

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Error: Port 4000 or 5173 already in use
# Solution: Kill the process or use different ports

# Windows
netstat -ano | findstr :4000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:4000 | xargs kill -9
```

#### Database Errors
```bash
# Error: Table does not exist
# Solution: Run migrations

cd backend
npx prisma migrate dev
npm run seed
```

#### Tests Affecting Development Data
```bash
# This shouldn't happen anymore (we use test.db)
# But if it does, reseed:

cd backend
npm run seed
```

#### Images Not Loading
1. Check backend is running on port 4000
2. Check CORS is configured for localhost:5173
3. Check browser console for errors
4. Try clearing browser cache

#### Module Not Found
```bash
# Solution: Reinstall dependencies

rm -rf node_modules package-lock.json
npm install

cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

### Getting Help

1. Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for detailed guides
2. Check [TEST-DATABASE.md](./TEST-DATABASE.md) for test database info
3. Open an issue on GitHub
4. Review the [API Documentation](#-api-documentation) below

## 🚧 Known Limitations

This is a demo/screening project with intentional limitations:

- ❌ No real payment processing (mock checkout only)
- ❌ No user authentication (uses demo user)
- ❌ No product inventory tracking
- ❌ No order history/persistence
- ❌ Single currency support (USD only)
- ❌ No image uploads (uses Unsplash URLs)
- ❌ No email notifications
- ❌ No admin dashboard

**These are features you could add to extend the project!**

## 📸 Adding Your Screenshots

To make your README more attractive, add screenshots to `/frontend/public/screenshots/`:

| File | Description | Recommended Size |
|------|-------------|------------------|
| `banner.png` | Hero/banner image | 1200x400px |
| `home.png` | Product catalog | 1200x800px |
| `cart.png` | Shopping cart with items | 1200x800px |
| `checkout.png` | Checkout form | 1200x800px |
| `receipt.png` | Order receipt modal | 1200x800px |

**How to capture:**
1. Run the app: `npm run dev`
2. Open http://localhost:5173
3. Use browser DevTools (F12) → Toggle device toolbar
4. Set viewport to 1200x800
5. Take screenshots (Win+Shift+S or Cmd+Shift+4)
6. Save to `frontend/public/screenshots/`

Once added, they'll automatically display in this README!

## 🤝 Contributing

This is a screening project, but suggestions are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Run linting and tests
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning or as a portfolio piece.

## 👤 Author

Created as a screening project for Vibe Commerce.

---

**Happy Shopping! 🛒**
