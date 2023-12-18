function about_valid_check(about, rules) {
    if (about.length < rules.min_user_about_length) {
        return [false, `Как то мало подробностей. Мининум ${rules.min_user_about_length} символов.`];
    }
    if (about.length > rules.max_user_about_length) {
        return [false, `Я не хочу знать о тебе настолько много подробностей. Максимум ${rules.max_user_about_length} символов.`];
    }
    return [true, "Данные прошли тест на валидность."];
}

module.exports = about_valid_check;