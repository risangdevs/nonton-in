const { ChatRoom } = require("../models/");

class ChatRoomController {
    static getMessages(req, res) {
        ChatRoom.findAll({ include: "User" })
            .then((messages) => res.send(messages))
            .catch((err) => res.send(err));
    }

    static createMessage(req, res) {
        const { text, username } = request.body;
        const params = { text, username };
        ChatRoom.create(params)
            .then((messages) => res.send(messages))
            .catch((err) => res.send(err));
    }

    static getSocketMessages() {
        return new Promise((resolve, reject) => {
            ChatRoom.findAll({ include: "User" })
                .then((messages) => resolve(messages))
                .catch((err) => reject(err));
        });
    }

    static createSocketMessage(messageObj) {
        const { message, MovieId, UserId } = messageObj;
        const params = { message, UserId, MovieId };

        return new Promise((resolve, reject) => {
            ChatRoom.create(params)
                .then((data) => resolve(data.dataValues))
                .catch((err) => reject(err));
        });
    }
}

module.exports = ChatRoomController;
