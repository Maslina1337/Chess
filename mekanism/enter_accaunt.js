const path = require("path");
const getData = require(path.join(__dirname, "../main_data.js"));

function enter_accaunt(body) {
    console.log(getData);
    let private_accaunt_data = getData("data_manager").getPrivateAccauntData(body.login, body.password);
    if (private_accaunt_data[0]) {
        return [true, "Успешная авторизация"];
    } else {
        return [false, "Неверные данные"];
    }
}

module.exports = enter_accaunt;