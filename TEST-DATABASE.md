# Test Database Isolation

## ✅ Problem Solved

Tests now use a **separate test database** (`test.db`) that doesn't interfere with your development database (`dev.db`).

## How It Works

### Development Database (`dev.db`)
- Used when running the app: `npm run dev`
- Contains your seeded products (10 items with Unsplash images)
- Persists between runs
- **Never modified by tests**

### Test Database (`test.db`)
- Used only during testing: `npm test`
- Automatically created and migrated before each test run
- Tests create their own temporary data
- Isolated from development data
- Can be safely deleted

## Configuration

### Backend Test Setup (`backend/tests/setup.js`)
```javascript
// Set NODE_ENV to test for cleaner console output
process.env.NODE_ENV = 'test';

// Use test database (separate from dev.db)
process.env.DATABASE_URL = 'file:./prisma/test.db';
```

### Test Initialization (`backend/tests/init-test-db.js`)
- Runs automatically before tests
- Removes old test database
- Applies migrations to fresh test database
- Ensures clean state for every test run

## Verification

### Check Development Database
```bash
cd backend
node check-products.js
```

Expected output: 10 products with Unsplash images (IDs 100-109)

### Run Tests
```bash
npm test
```

Tests will:
1. Initialize test database
2. Run all tests against test.db
3. Leave dev.db untouched

### Verify After Tests
```bash
cd backend
node check-products.js
```

Development database should still have the same 10 products!

## File Structure

```
backend/
├── prisma/
│   ├── dev.db          # Development database (your data)
│   ├── test.db         # Test database (auto-generated)
│   ├── schema.prisma   # Database schema
│   └── seed.js         # Seeds dev.db only
├── tests/
│   ├── setup.js        # Configures test environment
│   └── init-test-db.js # Initializes test database
└── .env                # Points to dev.db by default
```

## .gitignore

Both databases are ignored:
```
*.db
*.db-journal
backend/prisma/dev.db
backend/prisma/dev.db-journal
backend/prisma/test.db
backend/prisma/test.db-journal
```

## Benefits

✅ **No data loss** - Development data never affected by tests  
✅ **Clean tests** - Each test run starts with fresh database  
✅ **Fast** - No need to reseed after tests  
✅ **Isolated** - Tests don't interfere with each other  
✅ **Predictable** - Same test results every time  

## Troubleshooting

### Tests fail with database errors
```bash
cd backend
rm prisma/test.db
npm test
```

### Development database missing products
```bash
cd backend
npm run seed
```

### Want to reset everything
```bash
cd backend
rm prisma/*.db
npx prisma migrate dev
npm run seed
```

## Scripts

```bash
# Development
npm run dev          # Uses dev.db
npm run seed         # Seeds dev.db

# Testing
npm test             # Uses test.db (auto-initialized)
npm run test:watch   # Watch mode with test.db

# Database Management
npx prisma studio    # View dev.db in browser
npx prisma migrate dev  # Run migrations on dev.db
```

## Important Notes

1. **Seeding only affects dev.db** - `npm run seed` never touches test.db
2. **Tests create their own data** - Each test file sets up its own test data
3. **Test database is ephemeral** - Recreated on every test run
4. **Development database persists** - Your seeded products stay intact

## Summary

You can now:
- Run tests without worrying about losing development data ✅
- Seed the development database anytime ✅
- Run the app with consistent product data ✅
- Push to GitHub with confidence ✅
