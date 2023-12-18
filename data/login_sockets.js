const fs = require("fs");
const path = require("path");

class loginSockets {
    constructor(logins) {
        this.loginSocketsObject = {};
        logins.forEach((element) => {
            this.loginSocketsObject[element] = [];
        });
        // JSON.parse(fs.readFileSync(path.join(__dirname, "accaunts.json"))).forEach((element, index) => {
        //     element.login
        // });
    }

    logValues() {
        console.log("BIBa: ", this.loginSocketsObject);
    }

    getSockets(login) {
        return this.loginSocketsObject[login];
    }

    addSocket(login, socket_id) {
        this.loginSocketsObject[login].push(socket_id);
    }

    addLogin(login) {
        this.loginSocketsObject[login] = [];
    }

    deleteSocket(login, socket_id) {
        const splice_index = this.loginSocketsObject[login].indexOf(socket_id);
        if (splice_index > -1) {
            this.loginSocketsObject[login].splice(splice_index, 1);
        }
    }
}

module.exports = loginSockets;