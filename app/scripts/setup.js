const fs = require("fs");

if (fs.existsSync(".env.local")) {
  console.log(".env.local already exists.");
  process.exit(0);
}

fs.copyFileSync(".env.example", ".env.local");
console.log("Created .env.local from .env.example");
