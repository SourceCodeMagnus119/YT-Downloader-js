const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set({ 'strictQuery': false });

class Database {
    constructor(uri, options) {
        this.uri = uri;
        this.options = options;
    }

    async connect(req, res) {
        try {
            await mongoose.connect(this.uri);
            console.log(
                `Connected to database - Ping 1 ${mongoose.connection.db.databaseName}`
            )
        } catch(Err) {
            console.error(Err);
            res
            .status(500)
            .json({ message: `Error connecting to database` })
        }
    }

    async disconnect(req, res) {
        try {
            await mongoose.disconnect(this.uri);
            console.log(
                `Disconnected from database - Ping 0`
            );
        } catch(Err) {
            console.error(Err);
            res
            .status(500)
            .json({ message: `Error disconnecting from database` });
        }
    }
}

module.exports = Database;