const path = require("path");
const getData = require(path.join(__dirname, "../main_data.js"));

create_accaunt = require(path.join(__dirname, "../mekanism/create_accaunt.js"));
enter_accaunt = require(path.join(__dirname, "../mekanism/enter_accaunt.js"));

function mekanism(app, io) {

    // Таймер (лучше убрать куда нибудь)
    setInterval(() => {
        if (getData("consignment_search").consignmentsWaitForAccept.length === 0) {
            return;
        }
        getData("consignment_search").consignmentsWaitForAccept.forEach((element, index) => {
            if (element.accept_status[2] > 0) {
                element.accept_status[2]--;
            } else {
                getData("consignment_search").denyGameTwoLogins(element.login1, element.login2, io);
                console.log("denyed");
            }
        });
    }, 1000);

    app.get("/mekanism/get_public_server_values", (request, response) => {
        response.json(JSON.stringify(getData("public_server_values")));
    });
    
    app.post("/mekanism/create_accaunt", (request, response) => {
        const page_session = request.session;

        //Выход из поиска
        let is_already_auth = getData("data_manager").getPrivateAccauntData(page_session.authorization.login, page_session.authorization.password);
        if (page_session.authorization) {
            if (is_already_auth[0]) {
                getData("consignment_search").denyGameOneLogin(page_session.authorization.login, io, getData("login_sockets"));
                getData("consignment_search").deleteConsignmentSearch(page_session.authorization.login);
            }
        }

        let is_valid = getData("login_password_valid_check")(request.body, getData("public_server_values"));
        if (is_valid[0]) {
            let is_created = create_accaunt(request.body);
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

        //Выход из поиска
        if (page_session.authorization) {
            let is_already_auth = getData("data_manager").getPrivateAccauntData(page_session.authorization.login, page_session.authorization.password);
            if (is_already_auth[0]) {
                getData("consignment_search").denyGameOneLogin(page_session.authorization.login, io, getData("login_sockets"));
                getData("consignment_search").deleteConsignmentSearch(page_session.authorization.login);
            }
        }

        let is_entered = enter_accaunt(request.body);
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
            const private_accaunt_data = getData("data_manager").getPrivateAccauntData(page_session.authorization.login, page_session.authorization.password);
            console.log(private_accaunt_data);
            response.status(200).send(JSON.stringify(private_accaunt_data));
        } else {
            response.status(200).send(JSON.stringify([false, "Not authorized"]));
        }
    });
    
    app.get("/mekanism/exit_accaunt", (request, response) => {
        const page_session = request.session;
        if (page_session.authorization) {
            getData("consignment_search").deleteConsignmentSearch(page_session.authorization.login);
            if(getData("consignment_search").findConsignmentIndexByLoginInWFA(page_session.authorization.login)[0]) {
                getData("consignment_search").denyGameOneLogin(page_session.authorization.login, io, getData("login_sockets"));
            }
            page_session.authorization = null;
            page_session.last_game_search_info = null;
            response.status(200).send(JSON.stringify([true, "Успешный выход"]));
        } else {
            response.status(200).send(JSON.stringify([false, "Not authorized"]));
        }
    });
    
    app.put("/mekanism/update_accaunt_data", (request, response) => {
        const page_session = request.session;
        if (page_session.authorization) {
            //Если этот челик с кем тот там игру катает, то ему нельзя менять свои данные.
            if (getData("consignment_plays").isLoginPlayRightNow(page_session.authorization.login)) {
                response.status(200).send(JSON.stringify([false, "Сначала заверши свою каточку."]));
                return;
            } 
    
            //valid tests
            if (!getData("login_valid_check")(request.body.login, getData("public_server_values"))[0]) {
                response.status(200).send(JSON.stringify(getData("login_valid_check")(request.body.login, getData("public_server_values"))));
                return;
            } else if (!getData("password_valid_check")(request.body.password, getData("public_server_values"))[0]) {
                response.status(200).send(JSON.stringify(getData("password_valid_check")(request.body.password, getData("public_server_values"))));
                return;
            } else if (!getData("nickname_valid_check")(request.body.nickname, getData("public_server_values"))[0]) {
                response.status(200).send(JSON.stringify(getData("nickname_valid_check")(request.body.nickname, getData("public_server_values"))));
                return;
            } else if (!getData("about_valid_check")(request.body.about, getData("public_server_values"))[0]) {
                response.status(200).send(JSON.stringify(getData("about_valid_check")(request.body.about, getData("public_server_values"))));
                return;
            }
            //update accaunt
            const is_updated = getData("data_manager").simpleUpdateAccaunt(
                page_session.authorization.login,
                page_session.authorization.password,
                request.body.nickname,
    
                // Если что вдруг передумаешь, удаляй это...
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
        } else {
            response.status(200).send(JSON.stringify([false, "Not authorized"]));
        }
    });
    
    app.post("/mekanism/update_accaunt_avatar", (request, response) => {
        const page_session = request.session;
        if (page_session.authorization) {
            //Если этот челик с кем тот там игру катает, то ему нельзя менять свои данные.
            if (getData("consignment_plays").isLoginPlayRightNow(page_session.authorization.login)) {
                response.status(200).send(JSON.stringify([false, "Сначала заверши свою каточку."]));
                return;
            } 
    
            //update accaunt
            const is_updated = getData("data_manager").simpleUpdateAvatar(
                page_session.authorization.login,
                page_session.authorization.password,
                request.files.file,
            );
    
            if (is_updated[0]) {
                response.status(200).send(JSON.stringify(is_updated));
            } else {
                response.status(200).send(JSON.stringify(is_updated));
            }
        } else {
            response.status(200).send(JSON.stringify([false, "Not authorized"]));
        }
    });
    
    app.post("/mekanism/multiplayer_search", (request, response) => {
        const page_session = request.session;
        if (page_session.authorization) {
            const is_entered = getData("data_manager").getPrivateAccauntData(page_session.authorization.login, page_session.authorization.password);
            if (is_entered[0]) {
                if (!getData("consignment_plays").findConsignmentIndexByLogin(page_session.authorization.login)[0]) {
                    let consignment_create_result = getData("consignment_search").addConsignmentSearch(request.body.mode, request.body.is_ranked, getData("data_manager").findAccaunt(page_session.authorization.login).elo, request.body.search_speed, page_session.authorization.login);
                    if (consignment_create_result[0]) {
                        getData("consignment_search").checkPossiblePair(getData("consignment_search").consignmentSearchPipes[getData("consignment_search").getRightPipe(request.body.mode, request.body.is_ranked)], io, getData("login_sockets"), getData("data_manager"));
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
            const is_entered = getData("data_manager").getPrivateAccauntData(page_session.authorization.login, page_session.authorization.password);
            if (is_entered[0]) {
                getData("consignment_search").denyGameOneLogin(page_session.authorization.login, io, getData("login_sockets"));
                response.status(200).send(JSON.stringify(getData("consignment_search").deleteConsignmentSearch(page_session.authorization.login)));
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
            const is_entered = getData("data_manager").getPrivateAccauntData(page_session.authorization.login, page_session.authorization.password);
            if (is_entered[0]) {
                let deny_status = getData("consignment_search").denyGameOneLogin(page_session.authorization.login, io, getData("login_sockets"));
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
            const is_entered = getData("data_manager").getPrivateAccauntData(page_session.authorization.login, page_session.authorization.password);
            if (is_entered[0]) {
                console.log("accept.");
                let accept_status = getData("consignment_search").acceptGame(page_session.authorization.login, io, getData("login_sockets"), getData("consignment_plays"));
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
            const is_entered = getData("data_manager").getPrivateAccauntData(page_session.authorization.login, page_session.authorization.password);
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
            const is_entered = getData("data_manager").getPrivateAccauntData(page_session.authorization.login, page_session.authorization.password);
            if (is_entered[0]) {
                let consignment_index = getData("consignment_plays").findConsignmentIndexByLogin(page_session.authorization.login);
                if (consignment_index[0]) {
                    consignment_index = consignment_index[1];
                    let data = getData("consignment_plays").getChessClientData(consignment_index);
                    response.status(200).send(JSON.stringify([true, data]));
                } else {
                    response.status(200).send(JSON.stringify([false, "No game"]));
                }
            } else {
                response.status(200).send(JSON.stringify(is_entered));
            }
        } else {
            response.status(200).send(JSON.stringify([false, "Not authorized"]));
        }
    });
    
    app.get("/mekanism/get_chess_client_color", (request, response) => {
        const page_session = request.session;
        if (page_session.authorization) {
            const is_entered = getData("data_manager").getPrivateAccauntData(page_session.authorization.login, page_session.authorization.password);
            if (is_entered[0]) {
                let consignment_index = getData("consignment_plays").findConsignmentIndexByLogin(page_session.authorization.login);
                if (consignment_index[0]) {
                    consignment_index = consignment_index[1];
                    if (getData("consignment_plays").consigments[consignment_index].player_white === page_session.authorization.login) {
                        response.status(200).send(JSON.stringify([true, "white"]));
                    } else if (getData("consignment_plays").consigments[consignment_index].player_black === page_session.authorization.login) {
                        response.status(200).send(JSON.stringify([true, "black"]));
                    } else {
                        response.status(200).send(JSON.stringify([false, "Strange"]));
                    }
                } else {
                    response.status(200).send(JSON.stringify([false, "No game"]));
                }
            } else {
                response.status(200).send(JSON.stringify(is_entered));
            }
        } else {
            response.status(200).send(JSON.stringify([false, "Not authorized"]));
        }
    });
    
    app.post("/mekanism/chess_move_figure", (request, response) => {
        const page_session = request.session;
        if (page_session.authorization) {
            const is_entered = getData("data_manager").getPrivateAccauntData(page_session.authorization.login, page_session.authorization.password);
            if (is_entered[0]) {
                let consignment_index = getData("consignment_plays").findConsignmentIndexByLogin(page_session.authorization.login);
                if (consignment_index[0]) {
                    consignment_index = consignment_index[1];
                    let move_status = getData("consignment_plays").move_piece(page_session.authorization.login, request.body.from_y, request.body.from_x, request.body.to_y, request.body.to_x, request.body.piece);
                    if (move_status[0]) {
                        if (move_status[1] === "wait_for_pick") {
                            console.log("WAIT FOR PICK");
                            getData("login_sockets").getSockets(page_session.authorization.login).forEach(socket => {
                                io.to(socket).emit("piece_pick", getData("consignment_plays").consigments[consignment_index].chess_logic_class.get_allowed_pieces_pick(getData("consignment_plays").consigments[consignment_index].chess_logic_class.turn));
                            })
                        } else {
                            let player_white = getData("consignment_plays").consigments[consignment_index].player_white;
                            let player_black = getData("consignment_plays").consigments[consignment_index].player_black;
    
                            getData("login_sockets").getSockets(player_white).forEach((socket) => {
                                io.to(socket).emit("piece_moved", getData("consignment_plays").getChessClientData(consignment_index));
                            });
    
                            getData("login_sockets").getSockets(player_black).forEach((socket) => {
                                io.to(socket).emit("piece_moved", getData("consignment_plays").getChessClientData(consignment_index));
                            });
    
                            if (move_status[2][0]) {
                                let winner = "";
                                let loser = "";
                                let mode = getData("consignment_plays").consigments[consignment_index].mode;
                                let is_ranked = getData("consignment_plays").consigments[consignment_index].is_ranked;
    
                                getData("consignment_plays").consigments[consignment_index].end_date = new Date();
    
                                getData("consignment_plays").saveConsignmentJSON(consignment_index);
    
                                if (move_status[2][3] === "w") {
                                    winner = player_white;
                                    loser = player_black;
                                    getData("consignment_plays").givePresents(winner, loser, mode, is_ranked, getData("data_manager"));
    
                                    getData("login_sockets").getSockets(winner).forEach((socket) => {
                                        io.to(socket).emit("game_end", {
                                            title: move_status[2][1],
                                            description: move_status[2][2],
                                            elo: (is_ranked ? getData("consignment_plays").getEloTable(mode).winner : "Ранг не изменился"),
                                        });
                                    });
            
                                    getData("login_sockets").getSockets(loser).forEach((socket) => {
                                        io.to(socket).emit("game_end", {
                                            title: move_status[2][1],
                                            description: move_status[2][2],
                                            elo: (is_ranked ? getData("consignment_plays").getEloTable(mode).loser : "Ранг не изменился"),
                                        });
                                    });
    
                                } else if (move_status[2][3] === "b") {
                                    winner = player_black;
                                    loser = player_white;
                                    getData("consignment_plays").givePresents(winner, loser, mode, is_ranked, getData("data_manager"));
    
                                    getData("login_sockets").getSockets(loser).forEach((socket) => {
                                        io.to(socket).emit("game_end", {
                                            title: move_status[2][1],
                                            description: move_status[2][2],
                                            elo: (is_ranked ? getData("consignment_plays").getEloTable(mode).loser : "Ранг не изменился"),
                                        });
                                    });
            
                                    getData("login_sockets").getSockets(winner).forEach((socket) => {
                                        io.to(socket).emit("game_end", {
                                            title: move_status[2][1],
                                            description: move_status[2][2],
                                            elo: (is_ranked ? getData("consignment_plays").getEloTable(mode).winner : "Ранг не изменился"),
                                        });
                                    });
                                } else {
                                    getData("login_sockets").getSockets(player_white).forEach((socket) => {
                                        io.to(socket).emit("game_end", {
                                            title: move_status[2][1],
                                            description: move_status[2][2],
                                            elo: 0,
                                        });
                                    });
            
                                    getData("login_sockets").getSockets(player_black).forEach((socket) => {
                                        io.to(socket).emit("game_end", {
                                            title: move_status[2][1],
                                            description: move_status[2][2],
                                            elo: 0,
                                        });
                                    });
                                }
    
                                getData("consignment_plays").deleteConsingmentByLogin(page_session.authorization.login);
                            }
                        }
                    }
                    response.status(200).send(JSON.stringify([true, "Looks great"]));
                } else {
                    response.status(200).send(JSON.stringify([false, "No game"]));
                }
            } else {
                response.status(200).send(JSON.stringify(is_entered));
            }
        } else {
            response.status(200).send(JSON.stringify([false, "Not authorized"]));
        }
    });
    
    app.post("/mekanism/chess_chat_msg_send", (request, response) => {
        const page_session = request.session;
        if (page_session.authorization) {
            const is_entered = getData("data_manager").getPrivateAccauntData(page_session.authorization.login, page_session.authorization.password);
            if (is_entered[0]) {
                let consignment_index = getData("consignment_plays").findConsignmentIndexByLogin(page_session.authorization.login);
                if(!consignment_index[0]) {
                    response.status(200).send(JSON.stringify([false, "Нет такой игры"]));
                    return;
                }
                consignment_index = consignment_index[1];
    
                if (request.body.msg.length > getData("public_server_values").max_length_chat_msg) {
                    // Сообщени слишком длинное
                    response.status(200).send(JSON.stringify([false, "Сообщение слишком длинное."]));
                    return;
                }
    
                let now = new Date();
    
                // Не спамитли этот дружочек?
                if (getData("consignment_plays").consigments[consignment_index].chat_history.length > 0) {
                    // Мы просматриваем только 2 последних сообщения в самом противном случее. Лень обьяснять
    
                    // последнее сообщение
                    // Это наш челик?
                    if (getData("consignment_plays").consigments[consignment_index].chat_history[getData("consignment_plays").consigments[consignment_index].chat_history.length - 1][0] === page_session.authorization.login) {
                        // Если время между сообщениями маленькое
                        if ((now - getData("consignment_plays").consigments[consignment_index].chat_history[getData("consignment_plays").consigments[consignment_index].chat_history.length - 1][2]) / 1000 < getData("public_server_values").chat_msg_delay) {
                            console.log("DIFF: ", (now - getData("consignment_plays").consigments[consignment_index].chat_history[getData("consignment_plays").consigments[consignment_index].chat_history.length - 1][2]) / 1000);
                            response.status(200).send(JSON.stringify([false, "Без спама пожалуйста."]));
                            return;
                        }
                    }
    
                    // предпоследнее сообщение
                    if (getData("consignment_plays").consigments[consignment_index].length > 1) {
                        // Это наш челик?
                        if (getData("consignment_plays").consigments[consignment_index].chat_history[getData("consignment_plays").consigments[consignment_index].chat_history.length - 2][0] === page_session.authorization.login) {
                            // Если время между сообщениями маленькое
                            if ((now - getData("consignment_plays").consigments[consignment_index].chat_history[getData("consignment_plays").consigments[consignment_index].chat_history.length - 2][2]) / 1000 < getData("public_server_values").chat_msg_delay) {
                                console.log("DIFF: ", (now - getData("consignment_plays").consigments[consignment_index].chat_history[getData("consignment_plays").consigments[consignment_index].chat_history.length - 2][2]) / 1000);
                                response.status(200).send(JSON.stringify([false, "Без спама пожалуйста."]));
                                return;
                            }
                        }
                    }
                }
    
                // Если я здесь, значит это можно отправлять и это не спам.
                getData("consignment_plays").consigments[consignment_index].chat_history.push([page_session.authorization.login, request.body.msg, now]);
    
                // Отдаём только время ЧЧ:ММ
                let format_date = (String(now.getHours()).length > 1 ? String(now.getHours()) : "0" + String(now.getHours())) + ":" + (String(now.getMinutes()).length > 1 ? String(now.getMinutes()) : "0" + String(now.getMinutes()));
                
                getData("login_sockets").getSockets(getData("consignment_plays").consigments[consignment_index].player_white).forEach((socket) => {
                    io.to(socket).emit("chat_msg_come", {
                        nickname: is_entered[1].nickname,
                        msg: request.body.msg,
                        date: format_date,
                    });
                });
    
                getData("login_sockets").getSockets(getData("consignment_plays").consigments[consignment_index].player_black).forEach((socket) => {
                    io.to(socket).emit("chat_msg_come", {
                        nickname: is_entered[1].nickname,
                        msg: request.body.msg,
                        date: format_date,
                    });
                });
    
                response.status(200).send(JSON.stringify([true, "Отправлено"]));
            } else {
                response.status(200).send(JSON.stringify(is_entered));
            }
        } else {
            response.status(200).send(JSON.stringify([false, "Not authorized"]));
        }
    });
    
    app.get("/mekanism/chess_chat_restore", (request, response) => {
        const page_session = request.session;
        if (page_session.authorization) {
            const is_entered = getData("data_manager").getPrivateAccauntData(page_session.authorization.login, page_session.authorization.password);
            if (is_entered[0]) {
                // Восстанавливаем историю чата
                let chat_history_html = "";
                let index = getData("consignment_plays").findConsignmentIndexByLogin(page_session.authorization.login);
                console.log("MEMES");
                if (index[0]) {
                    index = index[1];
                    console.log("RESTORING: ");
                    getData("consignment_plays").consigments[index].chat_history.forEach((i) => {
    
                        // Отдаём только время ЧЧ:ММ
                        let format_date = (String(i[2].getHours()).length > 1 ? String(i[2].getHours()) : "0" + String(i[2].getHours())) + ":" + (String(i[2].getMinutes()).length > 1 ? String(i[2].getMinutes()) : "0" + String(i[2].getMinutes()));
                        let nickname = getData("data_manager").getPublicAccauntData(i[0])[1].nickname;
    
                        chat_history_html += `
                        <div class="message-box">
                            <div class="msg-header">
                                <div class="nickname">${nickname}</div>
                                <div class="date">${format_date}</div>
                            </div>
                            <p class="msg-text">${i[1]}</p>
                        </div>`
                    })
                }
    
                response.status(200).send(JSON.stringify([true, chat_history_html]));
            } else {
                response.status(200).send(JSON.stringify(is_entered));
            }
        } else {
            response.status(200).send(JSON.stringify([false, "Not authorized"]));
        }
    });
    
    app.post("/titikaka", (req, res) => {
        const page_session = req.session;
        console.log("SEARCH: ", getData("consignment_search").allConsignmentsInSearch);
        console.log("PIPES: ", getData("consignment_search").consignmentSearchPipes);
        console.log("WAIT: ", getData("consignment_search").consignmentsWaitForAccept);
        console.log("DATES: ", getData("login_sockets_dates").getData());
        console.log("AUTH: ", page_session.authorization);
        console.log("LAST GAME SEARCH INFO: ", page_session.last_game_search_info);
        console.log("PLAYS: ", getData("consignment_plays").consigments);
        res.status(200).send(JSON.stringify("hello"));
    })
}

module.exports = mekanism;