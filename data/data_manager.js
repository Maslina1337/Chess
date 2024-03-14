const fs = require("fs");
const path = require("path");

const customNamesPieces = require("../mekanism/custom_names_pieces.js");

const valid_avatar_extnames = [
    ".png", ".jpg", ".gif", ".jpeg"
]

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

    addAccaunt(login_sockets, login_sockets_dates, login, password, about, elo, avatar, nickname) {
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
            pieces_names: new customNamesPieces(),
            // consingment: null,
        })
        fs.writeFileSync(path.join(__dirname, "accaunts.json"), JSON.stringify(this.accaunts));

        //Добовление в сокеты
        login_sockets.addLogin(login);
        login_sockets_dates.addLogin(login);

        return [true, "accaunt added"];
    }

    addElo(login, add) {
        console.log("ADDING ELO");
        let accaunt_index = this.findAccauntIndex(login);
        let new_elo = this.accaunts[accaunt_index].elo + add;
        if (new_elo < 0) {
            new_elo = 0;
        }
        this.accaunts[accaunt_index].elo = new_elo;
        fs.writeFileSync(path.join(__dirname, "accaunts.json"), JSON.stringify(this.accaunts));
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
            fs.writeFileSync(path.join(__dirname, "accaunts.json"), JSON.stringify(this.accaunts)); // Сомнительная дрянь. Перезаписывать вооще все данные при изменение какой то козявки.
            return [true, "Accaunt updated"];
        } else {
            return [false, "Wrong login or password"];
        }
    }

    simpleUpdateAvatar(original_login, original_password, avatar) {
        console.log("CHECK 1: ", avatar);
        if (this.getPrivateAccauntData(original_login, original_password)[0]) {
            const index = this.findAccauntIndex(original_login);
            let extname = path.extname(avatar.name);
            console.log("CHECK 2: ", extname);
            let is_extname_valid = false;
            for (let i = 0; i < valid_avatar_extnames.length; i++) {
                if (valid_avatar_extnames[i] === extname) {
                    console.log("CHECK 3: ");
                    is_extname_valid = true;
                    break;
                }
            }
            if (!is_extname_valid) {
                return [false, "Неразрешенное расширение."];
            }
            console.log("CHECK 4: ");
            let new_avatar_name = Date.now() + extname;
            console.log("CHECK 5: ", new_avatar_name);
            console.log(avatar, new_avatar_name);
            if (avatar) {
                avatar.mv(path.join(__dirname, "../public/img/avatars", new_avatar_name))
            }

            console.log("CHECK 6: ");

            // delete old avatar
            if (this.accaunts[index].avatar !== "empty-avatar.png") {
                fs.unlink(path.join(__dirname, "../public/img/avatars", this.accaunts[index].avatar), (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }

            console.log("CHECK 7: ");

            this.accaunts[index].avatar = new_avatar_name;
            fs.writeFileSync(path.join(__dirname, "accaunts.json"), JSON.stringify(this.accaunts)); // Сомнительная дрянь. Перезаписывать вооще все данные при изменение какой то козявки.
            return [true, new_avatar_name];
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