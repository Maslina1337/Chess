const path = require("path");
const getData = require(path.join(__dirname, "../main_data.js"));

function create_accaunt(body) {
    if (getData("data_manager").findAccaunt(body.login) !== null) {
        return [false, "Аккаунт с таким логином уже существует."];
    } else {
        if (getData("data_manager").addAccaunt(getData("login_sockets"), getData("login_sockets_dates"), body.login, body.password)) {
            return [true, "Аккаунт создан."];
        } else {
            return [false, "Ошибка создания."];
        }
    }
}

module.exports = create_accaunt;