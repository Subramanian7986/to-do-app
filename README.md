# To-Do List Web Application 


A simple web application to manage your tasks. Users can register, log in, and organize their to-do items efficiently. Built using **Node.js**, **Express.js**, and **MongoDB**.

## Features

- **User Authentication**: Register, login, and logout functionality with session management.
- **Task Management**: Add, view, complete, and delete tasks.
- **User-Specific Data**: Each user's tasks are stored and managed separately.
- **Responsive Design**: User-friendly interface styled with CSS.
- **Secure**: Passwords are hashed using **bcryptjs**, and sessions are protected.

---

## Installation and Setup

Follow these steps to set up and run the project locally.

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (Local or Atlas)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start MongoDB:
   - For a local instance:
     ```bash
     mongod
     ```
   - Or, connect to **MongoDB Atlas** by updating the connection string in `server.js`.

4. Run the application:
   ```bash
   node server.js
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Project Structure

```
├── public
│   └── style.css        # Styling for the app
├── views
│   ├── index.ejs        # Home page
│   ├── register.ejs     # User registration page
│   ├── login.ejs        # User login page
│   ├── dashboard.ejs    # User dashboard for managing tasks
├── server.js            # Main server file
├── package.json         # Dependencies and scripts
└── README.md            # Documentation
```

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Templating**: EJS
- **Styling**: CSS
- **Authentication**: bcryptjs, express-session

---

## Future Enhancements

- Add task prioritization and due dates.
- Enable email verification during registration.
- Implement a password reset feature.
- Deploy the app using a cloud platform.

---

## License

This project is licensed under the MIT License. Feel free to use and modify it as per your needs.

---

## Acknowledgments

Inspired by the simplicity of to-do applications and the need for task organization in day-to-day life.

--- 
