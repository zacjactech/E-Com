# Vibe Commerce - Mock E-Commerce Cart

A full-stack shopping cart application demonstrating modern e-commerce flows with product browsing, cart management, and mock checkout functionality.

## 🎯 Overview

This project showcases a complete e-commerce cart implementation with:

- Product catalog browsing
- Add/remove items to/from cart
- Quantity management with real-time totals
- Mock checkout flow with receipt generation
- Persistent cart state across sessions
- Responsive, mobile-first UI

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

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** and npm
- Git

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/zacjactech/E-Com.git
   cd E-Com
   ```

2. **Install all dependencies**

   ```bash
   npm run install:all
   ```

   Or manually:

   ```bash
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. **Setup backend**

   ```bash
   cd backend
   cp .env.example .env
   npx prisma migrate dev --name init
   npm run seed
   ```

4. **Run the application**

   From the root directory:

   ```bash
   npm run dev
   ```

   This starts both backend (port 4000) and frontend (port 5173) concurrently.

   Or run separately:

   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173`

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

## 💡 Design Decisions

### Currency Handling

Prices are stored as **cents** (integers) in the database to avoid floating-point precision issues. The frontend formats them as currency using `Intl.NumberFormat`.

### State Management

The **backend is the source of truth** for cart state. The frontend fetches fresh data after mutations to ensure consistency. Optimistic UI updates could be added for better UX.

### User Identification

Uses a simple `X-User-Id` header for demo purposes. In production, this would be replaced with proper authentication (JWT, sessions, etc.).

### Database Choice

SQLite via Prisma provides a lightweight, zero-config database perfect for local development and demos. For production, migrate to PostgreSQL or MySQL.

### Testing Strategy

- **Backend**: Unit tests for services, integration tests for API endpoints
- **Frontend**: Component tests for UI interactions, integration tests for user flows

## 🐛 Known Limitations

- No real payment processing (mock checkout only)
- No user authentication (demo user only)
- No product inventory management
- No order persistence (receipts not saved)
- Single currency support (USD)
- No image uploads (placeholder URLs)

## 📸 Screenshots

Screenshots can be added to `/frontend/public/screenshots/`:

- `home.png` - Product grid
- `cart.png` - Shopping cart
- `checkout.png` - Checkout form
- `receipt.png` - Order receipt

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
