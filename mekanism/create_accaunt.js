function create_accaunt(body, data_manager) {
    if (data_manager.findAccaunt(body.login) !== null) {
        return [false, "Аккаунт с таким логином уже существует."];
    } else {
        if (data_manager.addAccaunt(body.login, body.password)) {
            return [true, "Аккаунт создан."];
        } else {
            return [false, "Ошибка создания."];
        }
    }
}

module.exports = create_accaunt;