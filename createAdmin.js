const bcrypt = require("bcryptjs");
const prisma = require("./config/prismaClient"); // adjust path if needed

async function createAdmin(email, password) {
  try {
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create admin
    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    console.log("✅ Admin created successfully:", admin);
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

// --- Run script with args ---
// Example: node createAdmin.js admin@example.com mypassword
const [,, email, password] = process.argv;
if (!email || !password) {
  console.error("Usage: node createAdmin.js <email> <password>");
  process.exit(1);
}

createAdmin(email, password);
