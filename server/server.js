const express = require("express");
const ytdl = require("ytdl-core");
const cors = require("cors");
const { ServerApiVersion } = require("mongodb");
require("dotenv").config();
const helmet = require("helmet");
const Database = require('./db/database');

const app = express();

const db = new Database(process.env.URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});
db.connect().catch((err) => {
    console.error(
        `Error connecting to MongoDB: errorLog 1`
    )
});

app.use(express.json());
app.use(cors());
app.use(helmet({
    contentSecurityPolicy: true,
    strictTransportSecurity: true
}));
app.use(function(req, res, next) {
    console.log('Middleware Called!');
    next();
});
app.get('/download', (req, res) => {
    var URL = req.query.URL;

    res.header('Content-Disposition', 'attachment; filename="video.mp4"');

    ytdl(URL, {
        format: 'mp4',
    }).pipe(res);
    
    res.json({url:URL});
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(
        `Server running on ${port} __SILENCE SCALLYWAG!!`
    )
});

module.exports = app;