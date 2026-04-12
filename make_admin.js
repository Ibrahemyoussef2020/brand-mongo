const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
if (!process.env.MONGODB_URI) {
    require('dotenv').config();
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define the MONGODB_URI environment variable inside .env");
  process.exit(1);
}

const UserSchema = new mongoose.Schema(
    {
      static_id: { type: String, required: false },
      name: {type: String, required: true},
      email: {type: String,   required: true, unique: true },
      image: { type: String, required: false },
      password: {type: String, required: false},
      isAdmin: { type: Boolean, required: true, default: false },
    },
    { timestamps: true }
  );

const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

async function makeAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    const userEmail = "ibrahimyoussef.dev@gmail.com";
    
    // First let's see if the user exists
    let user = await UserModel.findOne({ email: userEmail });
    if (!user) {
        console.log(`User ${userEmail} not found. Creating...`);
        user = new UserModel({
            email: userEmail,
            name: "Ibrahim Admin",
            isAdmin: true
        });
        await user.save();
        console.log("Admin user created successfully!");
    } else {
        user.isAdmin = true;
        await user.save();
        console.log("User updated to admin successfully!");
    }
  } catch (e) {
      console.error(e);
  } finally {
      await mongoose.disconnect();
      process.exit(0);
  }
}

makeAdmin();
