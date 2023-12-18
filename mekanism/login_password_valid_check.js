function login_password_valid_check(body, rules) {
    if (body.login.length < rules.min_user_login_length) {
        return [false, `Логин слишком короткий. Мининум ${rules.min_user_login_length} символов.`];
    }
    if (body.login.length > rules.max_user_login_length) {
        return [false, `Логин слишком длинный. Максимум ${rules.max_user_login_length} символов.`];
    }
    if (body.password.length < rules.min_user_password_length) {
        return [false, `Пароль слишком короткий. Мининум ${rules.min_user_password_length} символов.`];
    }
    if (body.password.length > rules.max_user_password_length) {
        return [false, `Пароль слишком длинный. Максимум ${rules.max_user_password_length} символов.`];
    }
    // if (body.about.length < rules.min_user_about_length) {
    //     return [false, `Слишком мало о вас. Минимум ${rules.min_user_about_length} символов.`];
    // }
    // if (body.about.length > rules.max_user_about_length) {
    //     return [false, `Слишком много о вас. Максимум ${rules.max_user_about_length} символов.`];
    // }
    return [true, "Данные прошли тест на валидность."];
}

module.exports = login_password_valid_check;