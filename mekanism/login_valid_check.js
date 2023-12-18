function login_valid_check(login, rules) {
    if (login.length < rules.min_user_login_length) {
        return [false, `Логин слишком короткий. Мининум ${rules.min_user_login_length} символов.`];
    }
    if (login.length > rules.max_user_login_length) {
        return [false, `Логин слишком длинный. Максимум ${rules.max_user_login_length} символов.`];
    }
    return [true, "Данные прошли тест на валидность."];
}

module.exports = login_valid_check;