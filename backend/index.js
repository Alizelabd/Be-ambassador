const express = require("express");
const mysql = require("mysql");
const app = express();
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Express Server is running at a port:" + PORT);
});
app.use(express.static("../frontend"));
app.use(express.json());
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'formdata'
});
connection.connect((err) => {
    if (!err) {
        console.log("DB CONNECTION SUCCED");
    } else {
        console.log("لم" + JSON.stringify(err, undefined, 2));

    }
});
app.get('/', (req, res) => {
    res.send("<h1>hello world</h1>");
});
app.get("/fetch", (req, res) => {
    connection.query("SELECT * FROM forms", (err, rows, fields) => {
        res.json(rows);
    });
});
app.post("/post", (req, res) => {
    const body = req.body;
    let bodyPrams = {
        name: body.name,
        nationality: body.nationality,
        adress: body.adress,
        qualification: body.qualification,
        linkedin: body.linkedin,
        facebook: body.facebook,
        twitter: body.twitter,
        instgram: body.instgram,
        tiktok: body.tiktok,
        snapchat: body.snapchat,
        linkvid: body.linkvid,
        resjoin: body.resjoin,
        points: body.points
    }
    if (!body) {
        return res.sendStatus(400);
    }
    connection.query("INSERT INTO forms SET ?",bodyPrams, (err, rows, fileds) => {
        if(err) throw err;
        res.sendStatus(200);
    });
});