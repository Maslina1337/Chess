const path = require("path");
const getData = require(path.join(__dirname, "../main_data.js"));

function socket_io_stuff(io) {
    io.on('connection', (socket) => {
        let page_req = socket.request; // Получение сеанса
    
        let socket_id = socket.id;
    
        // В целях прикола заносим в эту переменную логин подключившегося пользавателя.
        let current_socket_login = null; 
        if (page_req.session.authorization) {
            if (getData("data_manager").getPrivateAccauntData(page_req.session.authorization.login, page_req.session.authorization.password)[0]) {
                current_socket_login = page_req.session.authorization.login;
                getData("login_sockets").addSocket(current_socket_login, socket_id);
            }
        }
    
        console.log("JIRONIMO: ", getData("consignment_plays"));
        if (getData("consignment_plays").isLoginPlayRightNow(current_socket_login)) {
            page_req.session.last_game_search_info = {
                type: "return",
            }
            page_req.session.save();
        }
    
        // Проверяем время отсутствия пользователя.
        if (getData("login_sockets_dates").getDate(current_socket_login) !== null && page_req.session.last_game_search_info && page_req.session.authorization) {
            if (page_req.session.last_game_search_info !== null && getData("data_manager").getPrivateAccauntData(page_req.session.authorization.login, page_req.session.authorization.password)[0]) {
                if ((new Date() - getData("login_sockets_dates").getDate(current_socket_login)) / 1000 > 1) {
                    // Не возобновляем поиск.
                } else {
                    // Возобновляем поиск.
                    if (page_req.session.last_game_search_info.type === "search") {
                        let consignment_create_result = getData("consignment_search").addConsignmentSearch(page_req.session.last_game_search_info.mode, page_req.session.last_game_search_info.is_ranked, getData("data_manager").findAccaunt(current_socket_login).elo, page_req.session.last_game_search_info.search_speed, current_socket_login);
                    }
                }
            }
        } else {
            console.log("No date or game was not started.");
        }
    
        page_req.session.save();
    
        console.log("user connected " + socket_id);
        
        socket.on('disconnect', () => {
            page_req.session.reload(function(err) {
                if (err) {
                    console.log(err);
                    console.log("ERRRRRRRRRRRRRRRRRRRRRRRRRORRRRRRRRRRRRR", err);
                }
            
            if (current_socket_login !== null) {
                //Обновляем дату последнего прибывания пользователя на сайте.
                getData("login_sockets_dates").updateDate(current_socket_login);
    
                //Заносим данные о последнем поиске игры в сессионное хранилище. (только для возобновления поиска.)
                let index_search = getData("consignment_search").findConsignmentIndexByLogin(current_socket_login, getData("consignment_search").allConsignmentsInSearch);
                let index_return = getData("consignment_plays").findConsignmentIndexByLogin(current_socket_login);
                if (index_search[0]) {
                    page_req.session.last_game_search_info = {
                        type: "search",
                        mode: getData("consignment_search").allConsignmentsInSearch[index_search[1]].mode,
                        is_ranked: getData("consignment_search").allConsignmentsInSearch[index_search[1]].is_ranked,
                        search_speed: getData("consignment_search").allConsignmentsInSearch[index_search[1]].search_speed,
                    }
    
                    //Останавливаем поиск если сейчас отключился последний сокет(мы возобновим его, если пользователя не было максимум 1 секунду. для этого и нужны getData("login_sockets_dates")).
                    if (getData("login_sockets").getSockets(current_socket_login).length === 1) {
                        getData("consignment_search").deleteConsignmentSearch(current_socket_login);
                    }
    
                } else if (index_return[0]) {
                    page_req.session.last_game_search_info = {
                        type: "return",
                    }
                } else {
                    console.log("delete a last search info.");
                    page_req.session.last_game_search_info = null;
                }
    
                //Денаем игру если она найдена.
                getData("consignment_search").denyGameOneLogin(current_socket_login, io, getData("login_sockets"));
    
                //Отвязываем сокет от логина
                getData("login_sockets").deleteSocket(current_socket_login, socket_id);
            }
    
                // Сохраняем сессию
                page_req.session.save();
            })
    
            console.log("user disconnected " + socket_id);
        })
    })
}

module.exports = socket_io_stuff;