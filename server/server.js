import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from 'cors';

const app = express();


// Database connection setup

const split = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "split",
    password: "123456789",
    port: 5433
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
        
                

split.connect();
app.use(cors()); 
app.use(express.json());
app.use(express.static('public'));
const port = 5000;
let currentUser = -1;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));


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

async function getExpensesByGroup(group_id) {
    const results = await split.query('SELECT * FROM Expenses WHERE group_id = $1', [group_id]);

    if (results.rows.length > 0) {
        return results.rows;
    }
    return []; 
}


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

async function getGroups(user_id) {
    const groupIds = await getGroupIdsByUser(user_id);
    if (groupIds.length === 0) {
        return [];
    }
    const results = await split.query('SELECT * FROM groups WHERE group_id = ANY($1)', [groupIds]);
    return results.rows;
}




app.listen(port, () => {
    console.log(`server running on port ${port}.`);
})



