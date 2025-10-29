// Set NODE_ENV to test for cleaner console output
process.env.NODE_ENV = 'test';

// Use test database (separate from dev.db)
process.env.DATABASE_URL = 'file:./prisma/test.db';

// Note: Each test file should handle its own data setup/teardown
// This ensures tests don't interfere with the development database
