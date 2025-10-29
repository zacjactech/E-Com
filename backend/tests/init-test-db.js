const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Set test database URL
process.env.DATABASE_URL = 'file:./prisma/test.db';

const testDbPath = path.join(__dirname, '../prisma/test.db');

console.log('🧪 Initializing test database...');

// Remove existing test database
if (fs.existsSync(testDbPath)) {
  fs.unlinkSync(testDbPath);
  console.log('   Removed old test database');
}

// Run migrations on test database
try {
  execSync('npx prisma migrate deploy', {
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, DATABASE_URL: 'file:./prisma/test.db' },
    stdio: 'inherit',
  });
  console.log('✅ Test database initialized');
} catch (error) {
  console.error('❌ Failed to initialize test database:', error.message);
  process.exit(1);
}
