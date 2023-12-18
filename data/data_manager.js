const fs = require("fs");
const path = require("path");

class dataManager {
    constructor() {
        console.log("data readen start");
        this.accaunts = JSON.parse(fs.readFileSync(path.join(__dirname, "accaunts.json")));
        console.log("data readen");
    }

    getAllLogins() {
        let logins = [];
        this.accaunts.forEach((element, index) => {
            logins.push(element.login);
        })
        console.log(logins);
        return logins;
    }

    findAccaunt(login) {
        let find = null;
        this.accaunts.forEach(element => {
            if (element.login === login) {
                find = element;
            }
        });
        return find;
    }

    findAccauntIndex(login) {
        let find = null;
        this.accaunts.forEach((element, index) => {
            if (element.login === login) {
                find = index;
            }
        });
        return find;
    }

    addAccaunt(login, password, about, elo, avatar, nickname, login_sockets, login_sockets_dates) {
        if (!login || !password) {
            return [false, "Not enough data"];
        }
        this.accaunts.push({
            login: login,
            password: password,
            about: (about ? about : ""),
            elo: (elo ? elo : 100), 
            avatar: (avatar ? avatar : "empty-avatar.png"),
            nickname: (nickname ? nickname : login),
            // consingment: null,
        })
        fs.writeFileSync(path.join(__dirname, "accaunts.json"), JSON.stringify(this.accaunts));

        //Добовление в сокеты
        login_sockets.addLogin(login);
        login_sockets_dates.addLogin(login);

        return [true, "accaunt added"];
    }

    getPrivateAccauntData(login, password) {
        if (!login || !password) {
            return [false, null];
        }
        let accaunt_data = this.findAccaunt(login);
        if (accaunt_data !== null) {
            if (accaunt_data.password === password) {
                // console.log("Private data given: ", accaunt_data);
                return [true, accaunt_data];
            } else {
                return [false, null];
            }
        } else {
            return [false, null];
        }
    }

    getPublicAccauntData(login) {
        if (!login) {
            return [false, null];
        }
        let accaunt_data = this.findAccaunt(login);
        if (accaunt_data !== null) {
            return [true, {
                nickname: accaunt_data.nickname,
                elo: accaunt_data.elo,
                avatar: accaunt_data.avatar,
                about: accaunt_data.about,
            }]
        } else {
            return [false, null];
        }
    }

    simpleUpdateAccaunt(original_login, original_password, nickname, login, password, about) {
        if (this.getPrivateAccauntData(original_login, original_password)[0]) {
            const index = this.findAccauntIndex(original_login);
            if (nickname !== null) {
                this.accaunts[index].nickname = nickname;
            }
            if (login !== null) {
                this.accaunts[index].login = login;
            }
            if (password !== null) {
                this.accaunts[index].password = password;
            }
            if (about !== null) {
                this.accaunts[index].about = about;
            }
            fs.writeFileSync(path.join(__dirname, "accaunts.json"), JSON.stringify(this.accaunts));
            return [true, "Accaunt updated"];
        } else {
            return [false, "Wrong login or password"];
        }
    }

    // setConsingmentStatus(login, status) {
    //     let index = this.findAccauntIndex(login);
    //     if (index !== null) {
    //         this.accaunts[index].consingment = status;
    //         return 
    //     } else {
    //         return [false, "Accaunt not found."]
    //     }
    // }
}

module.exports = dataManager;