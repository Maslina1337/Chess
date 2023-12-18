const fs = require("fs");
const path = require("path");

class loginSocketsDates {
    constructor(logins) {
        this.loginDates = {};
        logins.forEach((element) => {
            this.loginDates[element] = null;
        });
        console.log(logins, this.loginDates);
    }

    getDate(login) {
        return this.loginDates[login];
    }

    updateDate(login) {
        this.loginDates[login] = new Date();
    }

    addLogin(login) {
        this.loginDates[login] = null;
    }

    getData() {
        return this.loginDates;
    }

    // deleteSocket(login, socket_id) {
    //     const splice_index = this.loginDates[login].indexOf(socket_id);
    //     // console.log("INDEX: " + splice_index);
    //     if (splice_index > -1) {
    //         this.loginDates[login].splice(splice_index, 1);
    //     }
    // }
}

module.exports = loginSocketsDates;