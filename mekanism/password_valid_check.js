function password_valid_check(password, rules) {
    if (password.length < rules.min_user_password_length) {
        return [false, `Пароль слишком короткий. Мининум ${rules.min_user_password_length} символов.`];
    }
    if (password.length > rules.max_user_password_length) {
        return [false, `Пароль слишком длинный. Максимум ${rules.max_user_password_length} символов.`];
    }
    return [true, "Данные прошли тест на валидность."];
}

module.exports = password_valid_check;