const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const usersFile = path.join(__dirname, "users.json");

function getUsers() {
    const data = fs.readFileSync(usersFile, "utf8");
    return JSON.parse(data);
}

function saveUsers(data) {
    fs.writeFileSync(
        usersFile,
        JSON.stringify(data, null, 2)
    );
}

app.post("/api/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const data = getUsers();

        const existingUser = data.users.find(
            user => user.email.toLowerCase() === email.toLowerCase()
        );

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: Date.now(),
            name,
            email,
            password: hashedPassword
        };

        data.users.push(newUser);

        saveUsers(data);

        res.status(201).json({
            message: "Account created successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});


app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const data = getUsers();

        const user = data.users.find(
            user => user.email.toLowerCase() === email.toLowerCase()
        );

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        res.json({
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

const API_URL = "http://localhost:5000";

authForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!signupMode) {

        const response = await fetch(`${API_URL}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            message.textContent = "Login successful!";
            message.className = "message success";
        } else {
            message.textContent = data.message;
            message.className = "message error";
        }
    }
});

if (signupMode) {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword =
        document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match";
        message.className = "message error";
        return;
    }

    const response = await fetch(`${API_URL}/api/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    });

    const data = await response.json();

    if (response.ok) {
        message.textContent = "Account created successfully!";
        message.className = "message success";
    } else {
        message.textContent = data.message;
        message.className = "message error";
    }
}


app.listen(5000, () => {
    console.log("Server running on port 5000");
});
