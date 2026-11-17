import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from 'cors';
import bcrypt from "bcrypt";

const app = express();


// Database connection setup

const split = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
});


//database schema:
    // Users table: user_id [PK] (int), username (varchar(255)), password (varchar(255))
    // Expenses table: user_id[PK][FK] (int), amount (numeric(10,2)), description (varchar(255)), date (date), type (varchar(255))
    // Members table: user_id [PK][FK] (int), group_1 [FK] (int), group_2 [FK] (int), group_3 [FK] (int), group_4 [FK] (int), group_5 [FK] (int)
    // Groups table: group_id [PK] (int), name (varchar(255)), created_by [FK] (int) 
        //*Each member can belong to up to 5 groups

//How to connect to the database:
    // copy the splitData file
    // open pgAdmin
    // create a new database
    // right click on it, select restore
    // select the splitData file to restore
    // change the connection setup, port number, password, and database name if necessary
        
    

const port = process.env.PORT || 5000;

async function startServer() {
    try {
        await split.connect();

        console.log("Connected to SplitBuddy PostgreSQL database!");

        app.listen(port, () => {
            console.log(`Server running on port ${port}.`);
        });

    } catch (err) {
        console.error("Database connection failed:", err.message);
        process.exit(1);
    }
}
app.use(cors()); 
app.use(express.json());
app.use(express.static('public'));
let currentUser = -1;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));


// ==========================================
// AUTHENTICATION ROUTES
// ==========================================

// Register a new user
app.post("/api/auth/signup", async (req, res) => {
    const { name, email, username, password } = req.body;

    if (!name?.trim() || !email?.trim() || !username?.trim() || !password) {
        return res.status(400).json({
            error: "Please fill in all required fields."
        });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({
        error: "Please enter a valid email address."
    });
}

    if (password.length < 8) {
        return res.status(400).json({
            error: "Password must be at least 8 characters."
        });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = username.trim();

    try {
        // Check whether the username or email already exists
        const existingUser = await split.query(
            `SELECT user_id
             FROM users
             WHERE LOWER(username) = LOWER($1)
                OR LOWER(email) = LOWER($2)`,
            [normalizedUsername, normalizedEmail]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                error: "That username or email is already registered."
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Start a database transaction
        await split.query("BEGIN");

        try {
            // Create the user
            const result = await split.query(
                `INSERT INTO users (full_name, email, username, password)
                 VALUES ($1, $2, $3, $4)
                 RETURNING user_id, full_name, email, username`,
                [name.trim(), normalizedEmail, normalizedUsername, hashedPassword]
            );

            const newUser = result.rows[0];

            // Create an empty members record
            await split.query(
                "INSERT INTO members (user_id) VALUES ($1)",
                [newUser.user_id]
            );

            await split.query("COMMIT");

            return res.status(201).json({
                message: "Account created successfully.",
                user: {
                    id: newUser.user_id,
                    name: newUser.full_name,
                    email: newUser.email
                }
            });

        } catch (err) {
            await split.query("ROLLBACK");
            throw err;
        }

    } catch (err) {
        console.error("Signup error:", err.message);

        if (err.code === "23505") {
            return res.status(409).json({
                error: "That username or email is already registered."
            });
        }

        return res.status(500).json({
            error: "Unable to create your account."
        });
    }
});


// Log in an existing user
app.post("/api/auth/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username?.trim() || !password) {
        return res.status(400).json({
            error: "Please enter your username and password."
        });
    }

    try {
        // Find the account using its username
        const result = await split.query(
            `SELECT user_id, full_name, email, password
             FROM users
             WHERE LOWER(username) = LOWER($1)`,
            [username.trim()]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                error: "Incorrect username or password."
            });
        }

        const account = result.rows[0];

        // Compare submitted password against the stored hash
        const passwordMatches = await bcrypt.compare(
            password,
            account.password
        );

        if (!passwordMatches) {
            return res.status(401).json({
                error: "Incorrect username or password."
            });
        }

        return res.status(200).json({
            message: "Login successful.",
            user: {
                id: account.user_id,
                name: account.full_name,
                email: account.email
            }
        });

    } catch (err) {
        console.error("Login error:", err.message);

        return res.status(500).json({
            error: "Unable to log in."
        });
    }
});


// Function to get expenses for a specific user
async function getExpenses(user_id) {
  
    const results = await split.query('SELECT * FROM Expenses WHERE user_id = $1', [user_id]);

    if (results.rows.length > 0) {
        return results.rows;
    }
    return []; 
}

//returns a list of group ids corresponding to a user
    //group ids are stored in the members table under group_1, group_2, etc.
async function getGroupIdsByUser(user_id) {
    
    const results = await split.query('SELECT * FROM members WHERE user_id = $1', [user_id]);

    if (results.rows.length > 0) {
        const groupIds = [];
        for (let i = 1; i <= 5; i++) {
            const groupId = results.rows[0][`group_${i}`];
            if (groupId !== null) {
                groupIds.push(groupId);
            }
        }
        return groupIds;
    }
    return []; 
}

// Function to get expenses for a specific group
async function getExpensesByGroup(group_id) {
    const results = await split.query('SELECT * FROM Expenses WHERE group_id = $1', [group_id]);

    if (results.rows.length > 0) {
        return results.rows;
    }
    return []; 
}


// Function to get members for a specific group
async function getMembersByGroup(group_id) {
    const results = await split.query('SELECT * FROM members WHERE group_1 = $1 OR group_2 = $1 OR group_3 = $1 OR group_4 = $1 OR group_5 = $1', [group_id]);

    if (results.rows.length > 0) {
        const memberIds = [];
        for (const row of results.rows) {
            memberIds.push(row.user_id);
        }
        return memberIds;
    }
    return []; 
}

// Function to get groups for a specific user
async function getGroups(user_id) {
    const groupIds = await getGroupIdsByUser(user_id);
    if (groupIds.length === 0) {
        return [];
    }
    const results = await split.query('SELECT * FROM groups WHERE group_id = ANY($1)', [groupIds]);
    return results.rows;
}

// Function to add an expense
async function addExpense(user_id, amount, date, description, type, group_id = null) {
    const results = await split.query(
        'INSERT INTO Expenses (user_id, amount, date, description, type, group_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [user_id, amount, date, description, type, group_id]
    );
    return results.rows[0];
}

// Function to add a group
async function addGroup(creator, name) {
    const results = await split.query(
        'INSERT INTO groups (creator, name) VALUES ($1, $2) RETURNING *',
        [creator, name]
    );
    await addUserToGroup(creator, results.rows[0].group_id);
    return results.rows[0];
}

// Function to add a user
async function addUser(password,username){
    const results = await split.query(
        'INSERT INTO users (password, username) VALUES ($1, $2) RETURNING *',
        [password, username]
    );
    const results2 = await split.query(
        'INSERT INTO members (user_id) VALUES ($1) RETURNING *',
        [results.rows[0].id]
    );
    return results.rows[0];
}

// Function to add a user to a group
async function addUserToGroup(user_id, group_id) {
    const results = await split.query(
        'UPDATE members SET group_1 = $2 WHERE user_id = $1 AND group_1 IS NULL RETURNING *',
        [user_id, group_id]
    );
    if (results.rows.length === 0) {
        const results2 = await split.query(
            'UPDATE members SET group_2 = $2 WHERE user_id = $1 AND group_2 IS NULL RETURNING *',
            [user_id, group_id]
        );
        if (results2.rows.length === 0) {
            const results3 = await split.query(
                'UPDATE members SET group_3 = $2 WHERE user_id = $1 AND group_3 IS NULL RETURNING *',
                [user_id, group_id]
            );
            if (results3.rows.length === 0) {
                const results4 = await split.query(
                    'UPDATE members SET group_4 = $2 WHERE user_id = $1 AND group_4 IS NULL RETURNING *',
                    [user_id, group_id]
                );
                if (results4.rows.length === 0) {
                    const results5 = await split.query(
                        'UPDATE members SET group_5 = $2 WHERE user_id = $1 AND group_5 IS NULL RETURNING *',
                        [user_id, group_id]
                    );
                    if (results5.rows.length === 0) {
                        throw new Error('User is already in 5 groups');
                    }
                    return results5.rows[0];
                }
                return results4.rows[0];
            }
            return results3.rows[0];
        }
        return results2.rows[0];
    }
    return results.rows[0];
}

// Function to remove a user from a group
async function removeUserFromGroup(user_id, group_id) {
    const results = await split.query(
        'UPDATE members SET group_1 = NULL WHERE user_id = $1 AND group_1 = $2 RETURNING *',
        [user_id, group_id]
    );
    if (results.rows.length === 0) {
        const results2 = await split.query(
            'UPDATE members SET group_2 = NULL WHERE user_id = $1 AND group_2 = $2 RETURNING *',
            [user_id, group_id]
        );
        if (results2.rows.length === 0) {
            const results3 = await split.query(
                'UPDATE members SET group_3 = NULL WHERE user_id = $1 AND group_3 = $2 RETURNING *',
                [user_id, group_id]
            );
            if (results3.rows.length === 0) {
                const results4 = await split.query(
                    'UPDATE members SET group_4 = NULL WHERE user_id = $1 AND group_4 = $2 RETURNING *',
                    [user_id, group_id]
                );
                if (results4.rows.length === 0) {
                    const results5 = await split.query(
                        'UPDATE members SET group_5 = NULL WHERE user_id = $1 AND group_5 = $2 RETURNING *',
                        [user_id, group_id]
                    );
                    if (results5.rows.length === 0) {
                        throw new Error('User is not in this group');
                    }
                    return results5.rows[0];
                }
                return results4.rows[0];
            }
            return results3.rows[0];
        }
        return results2.rows[0];
    }
    return results.rows[0];
}





startServer();



