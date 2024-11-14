const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todoApp')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'mysecret',
  resave: true,
  saveUninitialized: true,
}));
app.use(flash());

// Set views folder and view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// User schema and model
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// To-do schema and model
const todoSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  task: String,
  completed: Boolean,
});

const Todo = mongoose.model('Todo', todoSchema);

// Routes

// Root route
app.get('/', (req, res) => {
  res.render('index');
});

// Register route
app.get('/register', (req, res) => {
  res.render('register', { message: req.flash('error') });
});

app.post('/register', async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    req.flash('error', 'Passwords do not match');
    return res.redirect('/register');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    req.flash('error', 'Email is already registered');
    return res.redirect('/register');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();
  res.redirect('/login');
});

// Login route
app.get('/login', (req, res) => {
  res.render('login', { message: req.flash('error') });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    req.flash('error', 'Invalid email or password');
    return res.redirect('/login');
  }

  req.session.userId = user._id;
  res.redirect('/dashboard');
});

// Dashboard route
app.get('/dashboard', async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  const todos = await Todo.find({ userId: req.session.userId });
  res.render('dashboard', { todos });
});

// Add new to-do
app.post('/add-todo', async (req, res) => {
  const { task } = req.body;
  const newTodo = new Todo({
    userId: req.session.userId,
    task,
    completed: false,
  });
  await newTodo.save();
  res.redirect('/dashboard');
});

// Mark to-do as completed
app.post('/complete-todo/:id', async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndUpdate(id, { completed: true });
  res.redirect('/dashboard');
});

// Delete to-do
app.post('/delete-todo/:id', async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.redirect('/dashboard');
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
