const User = require('.User');

class UserCollection {
    constructor() {
        this.users = {};
    }

    addUser(user) {
        if (this.users[user.username]) {
            throw new Error("Username must be unique");
        }
        this.users[user.username] = user;
    }

    getUser(username) {
        return this.users[username] || null;
    }

    getAllUsers() {
        return Object.values(this.users);
    }
}

module.exports = UserCollection;