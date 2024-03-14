const path = require("path");
const getData = require(path.join(__dirname, "../main_data.js"));

function pages(app, io) {
    app.get("/", (request, response) => {
        const page_session = request.session;
        is_authorized = false;
        let accaunt_data = null;
        if (page_session.authorization) {
            accaunt_data = getData("data_manager").getPrivateAccauntData(page_session.authorization.login, page_session.authorization.password);
            is_authorized = accaunt_data[0];
        }
    
        response.render("main_page.hbs", {
            title: "Cheess - Главная",
            is_authorized: is_authorized,
            user_nickname: (is_authorized ? accaunt_data[1].nickname : "Гость"),
            user_elo: (is_authorized ? accaunt_data[1].elo : "???"),
            user_avatar: (is_authorized ? accaunt_data[1].avatar : "empty-avatar.png"),
            min_user_login_length: getData("public_server_values").min_user_login_length,
            max_user_login_length: getData("public_server_values").max_user_login_length,
            min_user_password_length: getData("public_server_values").min_user_password_length,
            max_user_password_length: getData("public_server_values").max_user_password_length,
            min_user_nickname_length: getData("public_server_values").min_user_nickname_length,
            max_user_nickname_length: getData("public_server_values").max_user_nickname_length,
            random_about_placeholder: getData("random_about_placeholders")[Math.floor(Math.random()*getData("random_about_placeholders").length)],
        });
    });
    
    app.get("/register_page", (request, response) => {
        response.render("register_page.hbs", {
            title: "Cheess - Регистрация",
            is_authorized: false,
            // user_avatar: (this.is_authorized ? path.join(__dirname, "data/user-avatars/empty-avatar.png") : path.join(__dirname, "public/img/empty-avatar.png")),
            min_user_login_length: getData("public_server_values").min_user_login_length,
            max_user_login_length: getData("public_server_values").max_user_login_length,
            min_user_password_length: getData("public_server_values").min_user_password_length,
            max_user_password_length: getData("public_server_values").max_user_password_length,
        });
    });
    
    app.get("/authorization_page", (request, response) => {
        response.render("authorization_page.hbs", {
            title: "Cheess - Регистрация",
            is_authorized: false,
            // user_avatar: (this.is_authorized ? path.join(__dirname, "data/user-avatars/empty-avatar.png") : path.join(__dirname, "public/img/empty-avatar.png")),
            min_user_login_length: getData("public_server_values").min_user_login_length,
            max_user_login_length: getData("public_server_values").max_user_login_length,
            min_user_password_length: getData("public_server_values").min_user_password_length,
            max_user_password_length: getData("public_server_values").max_user_password_length,
        });
    });
    
    app.get("/multiplayer_page", (request, response) => {
        const page_session = request.session;
        is_authorized = false;
        let accaunt_data = null;
        if (page_session.authorization) {
            accaunt_data = getData("data_manager").getPrivateAccauntData(page_session.authorization.login, page_session.authorization.password);
            is_authorized = accaunt_data[0];
        }
    
        response.render("multiplayer_page.hbs", {
            title: "Cheess - Мультиплеер",
            is_authorized: is_authorized,
            user_nickname: (is_authorized ? accaunt_data[1].nickname : "Гость"),
            user_elo: (is_authorized ? accaunt_data[1].elo : "???"),
            user_avatar: (is_authorized ? accaunt_data[1].avatar : "empty-avatar.png"),
            min_user_login_length: getData("public_server_values").min_user_login_length,
            max_user_login_length: getData("public_server_values").max_user_login_length,
            min_user_password_length: getData("public_server_values").min_user_password_length,
            max_user_password_length: getData("public_server_values").max_user_password_length,
            min_user_nickname_length: getData("public_server_values").min_user_nickname_length,
            max_user_nickname_length: getData("public_server_values").max_user_nickname_length,
            random_about_placeholder: getData("random_about_placeholders")[Math.floor(Math.random()*getData("random_about_placeholders").length)],
        });
    });
    
    app.get("/multiplayer_play_page", (request, response) => {
        const page_session = request.session;
        is_authorized = false;
        let accaunt_data = null;
        if (page_session.authorization) {
            accaunt_data = getData("data_manager").getPrivateAccauntData(page_session.authorization.login, page_session.authorization.password);
            is_authorized = accaunt_data[0];
        }
    
        response.render("multiplayer_play_page.hbs", {
            title: "Cheess - Игра",
            is_authorized: is_authorized,
            user_nickname: (is_authorized ? accaunt_data[1].nickname : "Гость"),
            user_elo: (is_authorized ? accaunt_data[1].elo : "???"),
            user_avatar: (is_authorized ? accaunt_data[1].avatar : "empty-avatar.png"),
            min_user_login_length: getData("public_server_values").min_user_login_length,
            max_user_login_length: getData("public_server_values").max_user_login_length,
            min_user_password_length: getData("public_server_values").min_user_password_length,
            max_user_password_length: getData("public_server_values").max_user_password_length,
            min_user_nickname_length: getData("public_server_values").min_user_nickname_length,
            max_user_nickname_length: getData("public_server_values").max_user_nickname_length,
            random_about_placeholder: getData("random_about_placeholders")[Math.floor(Math.random()*getData("random_about_placeholders").length)],
        });
    });
}

module.exports = pages;