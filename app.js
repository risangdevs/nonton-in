const express = require("express");
const router = require("./routes/index");
const sessions = require("express-session");
const HomeController = require("./controllers/homeController");

// requirement for socketio
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 8080;
// const port = 3000;

// view engine
app.set("view engine", "ejs");

// cookie parser middleware
app.use(cookieParser());

const server = app.listen(port, () => console.log(`App running on port ${port}.`));

const io = require("socket.io")(server, {
    cors: {
        origin: "https://pp-cinema-ticket-booking.herokuapp.com",
        methods: ["GET", "POST"],
    },
});

app.use(cors());

//session middleware
app.use(
    sessions({
        secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
        resave: false,
    })
);

// parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", HomeController.home);
app.use("/", router);

const ChatRoomController = require("./controllers/chatRoomController");

// sends out the 10 most recent messages from recent to old
const emitMostRecentMessges = () => {
    ChatRoomController.getSocketMessages()
        .then((result) => {
            io.emit("chat message", result);
        })
        .catch(console.log);
};

// connects, creates message, and emits top 10 messages
io.on("connection", (socket) => {
    console.log("a user connectedddd");
    // socket.on(event) event is string like "chat message"

    socket.on("chat message", (msg) => {
        console.log("masuk controller", msg);
        ChatRoomController.createSocketMessage(JSON.parse(msg))
            .then(() => {
                console.log("sukses input");
                emitMostRecentMessges();
            })
            .catch((err) => io.emit(err));
    });

    // close event when user disconnects from app
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});