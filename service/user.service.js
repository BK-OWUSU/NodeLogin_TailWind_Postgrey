const db = require('../database/database');

module.exports.existByEmail = async(email) => {
    const record = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    return record.rowCount > 0;
}

module.exports.getUserByEmail = async(email) => {
    const record = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (record.rowCount === 1) {
        return record.rows[0];
    }else {
        return null;
    }
}

module.exports.findById = async(id) => {
    const record = await db.query("SELECT * FROM users WHERE id = $1", [id])
    if (record.rowCount === 1) {
        return record.rows[0];
    }else {
        return null;
    }
}

module.exports.registerUser = async(firstname, lastname, email , password) => {
    try {
    const query = `INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [firstname, lastname, email, password];
    const { rows } = await db.query(query, values);
    return rows[0];
    } catch (error) {
        console.error("Error registering user: ", error);
        throw error;
    }
}