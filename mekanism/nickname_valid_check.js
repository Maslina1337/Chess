function nickname_valid_check(nickname, rules) {
    if (nickname.length < rules.min_user_nickname_length) {
        return [false, `Никнейм слишком короткий. Мининум ${rules.min_user_nickname_length} символов.`];
    }
    if (nickname.length > rules.max_user_nickname_length) {
        return [false, `Никнейм слишком длинный. Максимум ${rules.max_user_nickname_length} символов.`];
    }
    return [true, "Данные прошли тест на валидность."];
}

module.exports = nickname_valid_check;