function enter_accaunt(body, data_manager) {
    let private_accaunt_data = data_manager.getPrivateAccauntData(body.login, body.password);
    if (private_accaunt_data[0]) {
        return [true, "Успешная авторизация"];
    } else {
        return [false, "Неверные данные"];
    }
}

module.exports = enter_accaunt;