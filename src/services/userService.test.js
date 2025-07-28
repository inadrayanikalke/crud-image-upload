require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const userService = require("./userService");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("User Service", () => {
  let userId;

  it("should create a user", async () => {
    const user = await userService.createUser({
      name: "Test User",
      email: "testuser@example.com",
      phone: "1234567890",
      role: "user",
      password: "password123",
    });
    userId = user._id;
    expect(user).toHaveProperty("_id");
    expect(user.email).toBe("testuser@example.com");
  });

  it("should get users", async () => {
    const { users, total } = await userService.getUsers(
      {},
      { page: 1, limit: 10 }
    );
    expect(Array.isArray(users)).toBe(true);
    expect(typeof total).toBe("number");
  });

  it("should get user by id", async () => {
    const user = await userService.getUserById(userId);
    expect(user).toBeTruthy();
    expect(user.email).toBe("testuser@example.com");
  });

  it("should update user", async () => {
    const updated = await userService.updateUser(userId, {
      name: "Updated Name",
    });
    expect(updated.name).toBe("Updated Name");
  });

  it("should set profile pic", async () => {
    const updated = await userService.setProfilePic(userId, "testpic.jpg");
    expect(updated.profilePic).toBe("testpic.jpg");
  });

  it("should delete user", async () => {
    const deleted = await userService.deleteUser(userId);
    expect(deleted._id.toString()).toBe(userId.toString());
  });
});
