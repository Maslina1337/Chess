const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require("path");
const crypto = require("crypto");
const session = require("express-session");
const { Server } = require("socket.io");
const io = new Server(server);

const login_valid_check = require("./mekanism/login_valid_check");
const password_valid_check = require("./mekanism/password_valid_check");
const nickname_valid_check = require("./mekanism/nickname_valid_check");
const about_valid_check = require("./mekanism/about_valid_check");

const host = "0.0.0.0";
const port = 1337;

app.use(express.json()); // Инициализирует request.body
app.use(express.urlencoded({extended: true}));

const random_about_placeholders = [
    "Привяу, хочешь анекдот?",
    "Кто я?",
    "Я думаю, что у тебя отличная прическа.",
    "А потом меня ещё спрашивают: \"Зачем тебе столько бетона?\""
]

return_field_path_ignore = [
    "/multiplayer_play_page"
]

const dataManager = require(path.join(__dirname, "data/data_manager.js"));
const consignmentSearch = require(path.join(__dirname, "data/consignment_search.js"));
const consignmentPlays = require(path.join(__dirname, "data/consignment_plays.js"));
const loginSockets = require(path.join(__dirname, "data/login_sockets.js"));
const loginSocketsDates = require(path.join(__dirname, "data/login_sockets_dates.js"));
const login_password_valid_check = require(path.join(__dirname, "mekanism/login_password_valid_check.js"));
const create_accaunt = require(path.join(__dirname, "mekanism/create_accaunt.js"));
const enter_accaunt = require(path.join(__dirname, "mekanism/enter_accaunt.js"));

let data_manager = new dataManager();
let consignment_search = new consignmentSearch();
let consignment_plays = new consignmentPlays();
let login_sockets = new loginSockets(data_manager.getAllLogins());
let login_sockets_dates = new loginSocketsDates(data_manager.getAllLogins());

setInterval(() => {
    if (consignment_search.consignmentsWaitForAccept.length === 0) {
        return;
    }
    consignment_search.consignmentsWaitForAccept.forEach((element, index) => {
        if (element.accept_status[2] > 0) {
            element.accept_status[2]--;
        } else {
            consignment_search.denyGameTwoLogins(element.login1, element.login2, io, login_sockets);
            console.log("denyed");
        }
    });
}, 1000);

const public_server_values = {
    min_user_login_length: 5,
    max_user_login_length: 20,
    min_user_password_length: 8,
    max_user_password_length: 30,
    min_user_nickname_length: 5,
    max_user_nickname_length: 20,
    min_user_about_length: 0,
    max_user_about_length: 200,
    game_accept_time: consignment_search.acceptTime,
}

app.use(express.static(path.join(__dirname, "public")));

const sessionMiddleware = session({
    secret: crypto.randomBytes(32).toString("hex"),
    resave: true,
    saveUninitialized: true,
})
app.use(sessionMiddleware);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "views"));

app.use((request, response, next) => {
    console.log("(●'^'●)");
    next();
});

app.get("/", (request, response) => {
    const page_session = request.session;
    is_authorized = false;
    let accaunt_data = null;
    if (page_session.authorization) {
        accaunt_data = data_manager.getPrivateAccauntData(page_session.authorization.login, page_session.authorization.password);
        is_authorized = accaunt_data[0];
    }

    response.render("main_page.hbs", {
        title: "Cheess - Главная",
        is_authorized: is_authorized,
        user_nickname: (is_authorized ? accaunt_data[1].nickname : "Гость"),
        user_elo: (is_authorized ? accaunt_data[1].elo : "???"),
        user_avatar: (is_authorized ? accaunt_data[1].avatar : "empty-avatar.png"),
        min_user_login_length: public_server_values.min_user_login_length,
        max_user_login_length: public_server_values.max_user_login_length,
        min_user_password_length: public_server_values.min_user_password_length,
        max_user_password_length: public_server_values.max_user_password_length,
        min_user_nickname_length: public_server_values.min_user_nickname_length,
        max_user_nickname_length: public_server_values.max_user_nickname_length,
        random_about_placeholder: random_about_placeholders[Math.floor(Math.random()*random_about_placeholders.length)],
    });
});

app.get("/register_page", (request, response) => {
    response.render("register_page.hbs", {
        title: "Cheess - Регистрация",
        is_authorized: false,
        // user_avatar: (this.is_authorized ? path.join(__dirname, "data/user-avatars/empty-avatar.png") : path.join(__dirname, "public/img/empty-avatar.png")),
        min_user_login_length: public_server_values.min_user_login_length,
        max_user_login_length: public_server_values.max_user_login_length,
        min_user_password_length: public_server_values.min_user_password_length,
        max_user_password_length: public_server_values.max_user_password_length,
    });
});

app.get("/authorization_page", (request, response) => {
    response.render("authorization_page.hbs", {
        title: "Cheess - Регистрация",
        is_authorized: false,
        // user_avatar: (this.is_authorized ? path.join(__dirname, "data/user-avatars/empty-avatar.png") : path.join(__dirname, "public/img/empty-avatar.png")),
        min_user_login_length: public_server_values.min_user_login_length,
        max_user_login_length: public_server_values.max_user_login_length,
        min_user_password_length: public_server_values.min_user_password_length,
        max_user_password_length: public_server_values.max_user_password_length,
    });
});

app.get("/multiplayer_page", (request, response) => {
    const page_session = request.session;
    is_authorized = false;
    let accaunt_data = null;
    if (page_session.authorization) {
        accaunt_data = data_manager.getPrivateAccauntData(page_session.authorization.login, page_session.authorization.password);
        is_authorized = accaunt_data[0];
    }

    response.render("multiplayer_page.hbs", {
        title: "Cheess - Мультиплеер",
        is_authorized: is_authorized,
        user_nickname: (is_authorized ? accaunt_data[1].nickname : "Гость"),
        user_elo: (is_authorized ? accaunt_data[1].elo : "???"),
        user_avatar: (is_authorized ? accaunt_data[1].avatar : "empty-avatar.png"),
        min_user_login_length: public_server_values.min_user_login_length,
        max_user_login_length: public_server_values.max_user_login_length,
        min_user_password_length: public_server_values.min_user_password_length,
        max_user_password_length: public_server_values.max_user_password_length,
        min_user_nickname_length: public_server_values.min_user_nickname_length,
        max_user_nickname_length: public_server_values.max_user_nickname_length,
        random_about_placeholder: random_about_placeholders[Math.floor(Math.random()*random_about_placeholders.length)],
    });
});

app.get("/multiplayer_play_page", (request, response) => {
    const page_session = request.session;
    is_authorized = false;
    let accaunt_data = null;
    if (page_session.authorization) {
        accaunt_data = data_manager.getPrivateAccauntData(page_session.authorization.login, page_session.authorization.password);
        is_authorized = accaunt_data[0];
    }

    response.render("multiplayer_play_page.hbs", {
        title: "Cheess - Игра",
        is_authorized: is_authorized,
        user_nickname: (is_authorized ? accaunt_data[1].nickname : "Гость"),
        user_elo: (is_authorized ? accaunt_data[1].elo : "???"),
        user_avatar: (is_authorized ? accaunt_data[1].avatar : "empty-avatar.png"),
        min_user_login_length: public_server_values.min_user_login_length,
        max_user_login_length: public_server_values.max_user_login_length,
        min_user_password_length: public_server_values.min_user_password_length,
        max_user_password_length: public_server_values.max_user_password_length,
        min_user_nickname_length: public_server_values.min_user_nickname_length,
        max_user_nickname_length: public_server_values.max_user_nickname_length,
        random_about_placeholder: random_about_placeholders[Math.floor(Math.random()*random_about_placeholders.length)],
    });
});

//MEKANISM SECTION
app.get("/mekanism/get_public_server_values", (request, response) => {
    response.json(JSON.stringify(public_server_values));
});

app.post("/mekanism/create_accaunt", (request, response) => {
    const page_session = request.session;
    let is_valid = login_password_valid_check(request.body, public_server_values);
    if (is_valid[0]) {
        let is_created = create_accaunt(request.body, data_manager);
        if (is_created[0]) {
            page_session.authorization = {login: request.body.login, password: request.body.password};
            response.status(200).send(JSON.stringify(is_created));
        } else {
            response.status(200).send(JSON.stringify(is_created));
        }
    } else {
        response.status(400).send(JSON.stringify(is_valid));
    }
});

app.post("/mekanism/enter_accaunt", (request, response) => {
    const page_session = request.session;
    const is_entered = enter_accaunt(request.body, data_manager);
    if (is_entered[0]) {
        page_session.authorization = {login: request.body.login, password: request.body.password};
        response.status(200).send(JSON.stringify(is_entered));
    } else {
        response.status(200).send(JSON.stringify(is_entered));
    }
});

app.get("/mekanism/get_private_accaunt_data", (request, response) => {
    const page_session = request.session;
    if (page_session.authorization) {
        const private_accaunt_data = data_manager.getPrivateAccauntData(page_session.authorization.login, page_session.authorization.password);
        if (private_accaunt_data[0]) {
            response.status(200).send(JSON.stringify(private_accaunt_data[1]));
        } else {
            response.status(200).send(JSON.stringify(private_accaunt_data[1]));
        }
    } else {
        response.status(200).send(JSON.stringify([false, "Not authorized"]));
    }
});

app.get("/mekanism/exit_accaunt", (request, response) => {
    const page_session = request.session;
    if (page_session.authorization) {
        consignment_search.deleteConsignmentSearch(page_session.authorization.login);
        if(consignment_search.findConsignmentIndexByLoginInWFA(page_session.authorization.login)[0]) {
            consignment_search.denyGameOneLogin(page_session.authorization.login, io, login_sockets);
        }
        page_session.authorization = null;
        page_session.last_game_search_info = null;
        console.log("Ну вроде я из аккаунта вышел....", page_session.authorization);
        response.status(200).send(JSON.stringify([true, "Успешный выход"]));
    } else {
        response.status(200).send(JSON.stringify([false, "Not authorized"]));
    }
});

app.put("/mekanism/update_accaunt_data", (request, response) => {
    const page_session = request.session;
    if (page_session.authorization) {
        //valid tests
        if (!login_valid_check(request.body.login, public_server_values)[0]) {
            response.status(200).send(JSON.stringify(login_valid_check(request.body.login, public_server_values)));
        } else if (!password_valid_check(request.body.password, public_server_values)[0]) {
            response.status(200).send(JSON.stringify(login_valid_check(request.body.password, public_server_values)));
        } else if (!nickname_valid_check(request.body.nickname, public_server_values)[0]) {
            response.status(200).send(JSON.stringify(login_valid_check(request.body.nickname, public_server_values)));
        } else if (!about_valid_check(request.body.about, public_server_values)[0]) {
            response.status(200).send(JSON.stringify(login_valid_check(request.body.about, public_server_values)));
        } else {
            //update accaunt
            const is_updated = data_manager.simpleUpdateAccaunt(
                page_session.authorization.login,
                page_session.authorization.password,
                request.body.nickname,
                request.body.login,
                request.body.password,
                request.body.about
            );
            if (is_updated[0]) {
                page_session.authorization.login = request.body.login;
                page_session.authorization.password = request.body.password;
                response.status(200).send(JSON.stringify(is_updated));
            } else {
                response.status(200).send(JSON.stringify(is_updated));
            }
        }
    } else {
        response.status(200).send(JSON.stringify([false, "Not authorized"]));
    }
});

app.post("/mekanism/multiplayer_search", (request, response) => {
    const page_session = request.session;
    if (page_session.authorization) {
        const is_entered = data_manager.getPrivateAccauntData(page_session.authorization.login, page_session.authorization.password);
        if (is_entered[0]) {
            if (!consignment_plays.findConsignmentIndexByLogin(page_session.authorization.login)[0]) {
                let consignment_create_result = consignment_search.addConsignmentSearch(request.body.mode, request.body.is_ranked, data_manager.findAccaunt(page_session.authorization.login).elo, request.body.search_speed, page_session.authorization.login);
                if (consignment_create_result[0]) {
                    consignment_search.checkPossiblePair(consignment_search.consignmentSearchPipes[consignment_search.getRightPipe(request.body.mode, request.body.is_ranked)], login_sockets, io, data_manager);
                    response.status(200).send(JSON.stringify([true, "Поиск начат."]));
                } else {
                    response.status(200).send(JSON.stringify([false, "Поиск уже начат."]));
                }
            } else {
                response.status(200).send(JSON.stringify([false, "Игра уже начата."]));
            }
        } else {
            response.status(200).send(JSON.stringify(is_entered));
        }
    } else {
        response.status(200).send(JSON.stringify([false, "Not authorized"]));
    }
});

app.get("/mekanism/multiplayer_search_exit", (request, response) => {
    const page_session = request.session;
    if (page_session.authorization) {
        const is_entered = data_manager.getPrivateAccauntData(page_session.authorization.login, page_session.authorization.password);
        if (is_entered[0]) {
            console.log("ITS HERE");
            consignment_search.denyGameOneLogin(page_session.authorization.login, io, login_sockets);
            response.status(200).send(JSON.stringify(consignment_search.deleteConsignmentSearch(page_session.authorization.login)));
        } else {
            response.status(200).send(JSON.stringify(is_entered));
        }
    } else {
        response.status(200).send(JSON.stringify([false, "Not authorized"]));
    }
});

app.get("/mekanism/multiplayer_search_deny", (request, response) => {
    const page_session = request.session;
    if (page_session.authorization) {
        const is_entered = data_manager.getPrivateAccauntData(page_session.authorization.login, page_session.authorization.password);
        if (is_entered[0]) {
            console.log("try to deny.")
            console.log(page_session.authorization.login);
            let deny_status = consignment_search.denyGameOneLogin(page_session.authorization.login, io, login_sockets);
            console.log(deny_status);
            response.status(200).send(JSON.stringify(deny_status));
        } else {
            response.status(200).send(JSON.stringify(is_entered));
        }
    } else {
        response.status(200).send(JSON.stringify([false, "Not authorized"]));
    }
});

app.get("/mekanism/multiplayer_search_accept", (request, response) => {
    const page_session = request.session;
    if (page_session.authorization) {
        const is_entered = data_manager.getPrivateAccauntData(page_session.authorization.login, page_session.authorization.password);
        if (is_entered[0]) {
            console.log("accept.");
            let accept_status = consignment_search.acceptGame(page_session.authorization.login, consignment_plays, login_sockets, io);
            response.status(200).send(JSON.stringify(accept_status));
        } else {
            response.status(200).send(JSON.stringify(is_entered));
        }
    } else {
        response.status(200).send(JSON.stringify([false, "Not authorized"]));
    }
});

app.get("/mekanism/get_game_search_field_info", (request, response) => {
    const page_session = request.session;
    if (page_session.authorization) {
        const is_entered = data_manager.getPrivateAccauntData(page_session.authorization.login, page_session.authorization.password);
        if (is_entered[0]) {
            response.status(200).send(JSON.stringify([true, page_session.last_game_search_info]));
        } else {
            response.status(200).send(JSON.stringify([false, is_entered]));
        }
    } else {
        response.status(200).send(JSON.stringify([false, "Not authorized"]));
    }
});

app.get("/mekanism/get_chess_client_info", (request, response) => {
    const page_session = request.session;
    if (page_session.authorization) {
        const is_entered = data_manager.getPrivateAccauntData(page_session.authorization.login, page_session.authorization.password);
        if (is_entered[0]) {
            let consignment_index = consignment_plays.findConsignmentIndexByLogin(page_session.authorization.login);
            if (consignment_index[0]) {
                consignment_index = consignment_index[1];
                response.status(200).send(JSON.stringify([true, consignment_plays[consignment_index].getChessClientData()]));
            } else {
                response.status(200).send(JSON.stringify([false, "No game"]));
            }
        } else {
            response.status(200).send(JSON.stringify([false, is_entered]));
        }
    } else {
        response.status(200).send(JSON.stringify([false, "Not authorized"]));
    }
});

app.post("/titikaka", (req, res) => {
    const page_session = req.session;
    console.log("SEARCH: ", consignment_search.allConsignmentsInSearch);
    console.log("PIPES: ", consignment_search.consignmentSearchPipes);
    console.log("WAIT: ", consignment_search.consignmentsWaitForAccept);
    console.log("DATES: ", login_sockets_dates.getData());
    console.log("AUTH: ", page_session.authorization);
    console.log("LAST GAME SEARCH INFO: ", page_session.last_game_search_info);
    console.log("PLAYS: ", consignment_plays.consigments);
    res.status(200).send(JSON.stringify("hello"));
})

app.use((request, response, next) => {
    response.status(404).send("Four Zero Four");
});

io.engine.use(sessionMiddleware); // Даёт мне возможность использовать сеансы в сокетах

io.on('connection', (socket) => {
    let page_req = socket.request; // Получение сеанса

    let socket_id = socket.id;

    // В целях прикола заносим в эту переменную логин подключившегося пользавателя.
    let current_socket_login = null; 
    if (page_req.session.authorization) {
        if (data_manager.getPrivateAccauntData(page_req.session.authorization.login, page_req.session.authorization.password)[0]) {
            current_socket_login = page_req.session.authorization.login;
            login_sockets.addSocket(current_socket_login, socket_id);
        }
    }

    // Проверяем время отсутствия пользователя.
    if (login_sockets_dates.getDate(current_socket_login) !== null && page_req.session.last_game_search_info && page_req.session.authorization) {
        if (page_req.session.last_game_search_info !== null && data_manager.getPrivateAccauntData(page_req.session.authorization.login, page_req.session.authorization.password)[0]) {
            if ((new Date() - login_sockets_dates.getDate(current_socket_login)) / 1000 > 1) {
                // Не возобновляем поиск.
            } else {
                // Возобновляем поиск.
                if (page_req.session.last_game_search_info.type === "search") {
                    let consignment_create_result = consignment_search.addConsignmentSearch(page_req.session.last_game_search_info.mode, page_req.session.last_game_search_info.is_ranked, data_manager.findAccaunt(current_socket_login).elo, page_req.session.last_game_search_info.search_speed, current_socket_login);
                    if (consignment_create_result[0]) {
                        login_sockets.getSockets(current_socket_login).forEach((element) => {
                            io.to(element).emit("game_search_countionous", page_req.session.last_game_search_info);
                        });
                        console.log("Начал поиск на новой странице");
                    } else {
                        console.log("Не начал поиск на новой странице");
                    }
                } else if (page_req.session.last_game_search_info.type === "return" && !return_field_path_ignore.includes(page_req.url)) {
                    console.log("INCLUDES: ", return_field_path_ignore, page_req.url, return_field_path_ignore.includes(page_req.url));
                    login_sockets.getSockets(current_socket_login).forEach((element) => {
                        io.to(element).emit("game_search_countionous", page_req.session.last_game_search_info);
                    });
                }
            }
        }
    } else {
        console.log("No date or game was not started.");
    }

    console.log("user connected " + socket_id);
    
    socket.on('disconnect', () => {
        page_req.session.reload(function(err) {
            if (err) {
                console.log(err);
                console.log("ERRRRRRRRRRRRRRRRRRRRRRRRRORRRRRRRRRRRRR");
            }
        
        if (current_socket_login !== null) {
            //Обновляем дату последнего прибывания пользователя на сайте.
            login_sockets_dates.updateDate(current_socket_login);

            //Заносим данные о последнем поиске игры в сессионное хранилище. (только для возобновления поиска.)
            let index_search = consignment_search.findConsignmentIndexByLogin(current_socket_login, consignment_search.allConsignmentsInSearch);
            let index_return = consignment_plays.findConsignmentIndexByLogin(current_socket_login);
            console.log("ROYA: ", consignment_search.findConsignmentIndexByLogin(current_socket_login, consignment_search.allConsignmentsInSearch), consignment_plays.findConsignmentIndexByLogin(current_socket_login));
            if (index_search[0]) {
                console.log("CHECK 1");
                page_req.session.last_game_search_info = {
                    type: "search",
                    mode: consignment_search.allConsignmentsInSearch[index_search[1]].mode,
                    is_ranked: consignment_search.allConsignmentsInSearch[index_search[1]].is_ranked,
                    search_speed: consignment_search.allConsignmentsInSearch[index_search[1]].search_speed,
                }

                //Останавливаем поиск если сейчас отключился последний сокет(мы возобновим его, если пользователя не было максимум 1 секунду. для этого и нужны login_sockets_dates).
                if (login_sockets.getSockets(current_socket_login).length === 1) {
                    consignment_search.deleteConsignmentSearch(current_socket_login);
                }

                // page_req.session.save();
            } else if (index_return[0]) {
                console.log("CHECK 2");
                page_req.session.last_game_search_info = {
                    type: "return",
                }
                // page_req.session.save();
            } else {
                console.log("CHECK 3");
                console.log("delete a last search info.");
                page_req.session.last_game_search_info = null;
                // page_req.session.save();
            }

            //Денаем игру если она найдена.
            consignment_search.denyGameOneLogin(current_socket_login, io, login_sockets);

            //Отвязываем сокет от логина
            login_sockets.deleteSocket(current_socket_login, socket_id);
        }

            page_req.session.save();
        }) // Получение актуального сеанса

        console.log("user disconnected " + socket_id);
    })
})

server.listen({
    host: host,
    port: port,
});