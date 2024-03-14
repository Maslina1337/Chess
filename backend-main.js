const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require("path");
const crypto = require("crypto");
const session = require("express-session");
const { Server } = require("socket.io");
const io = new Server(server);
const fileUpload = require("express-fileupload");

const host = "0.0.0.0";
const port = 1337;

const getData = require(path.join(__dirname, "main_data.js"));

// Роутеры
const pages = require(path.join(__dirname, "routers/pages.js"));
const mekanism = require(path.join(__dirname, "routers/mekanism.js"));
const socket_io_stuff = require(path.join(__dirname, "routers/socket_io_stuff.js"));

//dev
// getData("consignment_plays").addConsignment("LOGIN", "cola___", "c", false);

app.use(express.json()); // Инициализирует request.body
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "public")));

const sessionMiddleware = session({
    secret: crypto.randomBytes(32).toString("hex"),
    resave: true,
    saveUninitialized: true,
})
app.use(sessionMiddleware);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "views"));

app.use((request, response, next) => {
    console.log("(●'^'●)");
    next();
});

pages(app, io);
mekanism(app, io);

app.use((request, response, next) => {
    response.status(404).send("Four Zero Four");
});

io.engine.use(sessionMiddleware); // Даёт мне возможность использовать сеансы в сокетах

socket_io_stuff(io);

server.listen({
    host: host,
    port: port,
});