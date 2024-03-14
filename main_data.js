const path = require("path");

const dataManager = require(path.join(__dirname, "data/data_manager.js"));
const consignmentSearch = require(path.join(__dirname, "data/consignment_search.js"));
const consignmentPlays = require(path.join(__dirname, "data/consignment_plays.js"));
const loginSockets = require(path.join(__dirname, "data/login_sockets.js"));
const loginSocketsDates = require(path.join(__dirname, "data/login_sockets_dates.js"));

const mainData = {
    // Функции механизма
    login_password_valid_check: require(path.join(__dirname, "mekanism/login_password_valid_check.js")),
    login_valid_check: require(path.join(__dirname, "mekanism/login_valid_check")),
    password_valid_check: require(path.join(__dirname, "mekanism/password_valid_check")),
    nickname_valid_check: require(path.join(__dirname, "mekanism/nickname_valid_check")),
    about_valid_check: require(path.join(__dirname, "mekanism/about_valid_check")),
    
    // ТУТ ---------------------------------------------------------------------------------------------------------

    // create_accaunt: require(path.join(__dirname, "mekanism/create_accaunt.js")),
    // enter_accaunt: require(path.join(__dirname, "mekanism/enter_accaunt.js")),

    // Классы даты (вроде почти бесполезно)
    // dataManager: require(path.join(__dirname, "data/data_manager.js")),
    // consignmentSearch: require(path.join(__dirname, "data/consignment_search.js")),
    // consignmentPlays: require(path.join(__dirname, "data/consignment_plays.js")),
    // loginSockets: require(path.join(__dirname, "data/login_sockets.js")),
    // loginSocketsDates: require(path.join(__dirname, "data/login_sockets_dates.js")),

    // Переменные даты
    data_manager: new dataManager(),
    consignment_search: new consignmentSearch(),
    consignment_plays: new consignmentPlays(),

    public_server_values: {
        min_user_login_length: 5,
        max_user_login_length: 20,
        min_user_password_length: 8,
        max_user_password_length: 30,
        min_user_nickname_length: 5,
        max_user_nickname_length: 20,
        min_user_about_length: 0,
        max_user_about_length: 200,
        max_avatar_file_size: 4000000, // 4 MB вроде
        game_accept_time: null,
        max_length_chat_msg: 100, // Максимальное кол-во символов в сообщении.
        chat_msg_delay: 1, // Кол-во секунд между сообщениями от одного и того же пользователя.
    },

    random_about_placeholders: [
        "Привяу, хочешь анекдот?",
        "Кто я?",
        "Я думаю, что у тебя отличная прическа.",
        "А потом меня ещё спрашивают: \"Зачем тебе столько бетона?\""
    ],
}

mainData.login_sockets = new loginSockets(mainData.data_manager.getAllLogins()),
mainData.login_sockets_dates = new loginSocketsDates(mainData.data_manager.getAllLogins()),

mainData.public_server_values.game_accept_time = mainData.consignment_search.acceptTime;

function getData(var_name) {
    return mainData[var_name];
}

module.exports = getData;