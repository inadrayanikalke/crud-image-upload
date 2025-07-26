const userService = require("../services/userService");
const jwt = require("jsonwebtoken");
const path = require("path");

exports.register = async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.getUsers({ email }, { page: 1, limit: 1 });
  if (!user.users.length)
    return res.status(400).json({ error: "Invalid credentials" });
  const bcrypt = require("bcryptjs");
  const valid = await bcrypt.compare(password, user.users[0].password);
  if (!valid) return res.status(400).json({ error: "Invalid credentials" });
  const token = jwt.sign(
    { id: user.users[0]._id, role: user.users[0].role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.json({ token });
};

exports.list = async (req, res) => {
  const { page, limit, ...filter } = req.query;
  const result = await userService.getUsers(filter, {
    page: Number(page) || 1,
    limit: Number(limit) || 10,
  });
  res.json(result);
};

exports.getById = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};

exports.update = async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};

exports.remove = async (req, res) => {
  const user = await userService.deleteUser(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ message: "User deleted" });
};

exports.uploadProfilePic = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  const user = await userService.setProfilePic(
    req.params.id,
    req.file.filename
  );
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({
    message: "Profile picture uploaded",
    filename: req.file.filename,
  });
};

exports.serveProfilePic = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user || !user.profilePic)
    return res.status(404).json({ error: "Profile picture not found" });
  res.sendFile(path.resolve(__dirname, "../../uploads", user.profilePic));
};
