const fs = require("fs");
const path = require("path");
const loginSockets = require("./login_sockets");

const eloDiff = 100;

class consignmentSearch {
    constructor() {
        this.acceptTime = 20; // Секунд на подтверждение.
        this.consignmentsWaitForAccept = [];

        this.consignmentSearchPipes = {
            // Синтаксис: 0 элемент - сокращение названия режима, 1 элемент - массив запросов. 
            consignmentsClassicRanked: [],
            consignmentsClassicUnranked: [],
            consignmentsClassicFOA: [],
            consignmentsBlizRanked: [],
            consignmentsBlizUnranked: [],
            consignmentsBlizFOA: [],
            consignmentsFateRanked: [],
            consignmentsFateUnranked: [],
            consignmentsFateFOA: [],
        };

        // // Синтаксис: 0 элемент - сокращение названия режима, 1 элемент - массив запросов. 
        // this.consignmentsClassicRanked = [];
        // this.consignmentsClassicUnranked = [];
        // this.consignmentsClassicFOA = [];
        // this.consignmentsBlizRanked = [];
        // this.consignmentsBlizUnranked = [];
        // this.consignmentsBlizFOA = [];
        // this.consignmentsFateRanked = [];
        // this.consignmentsFateUnranked = [];
        // this.consignmentsFateFOA = [];

        //Все кто учавтвуют в поиске и так же режим в ктором они ищут
        this.allConsignmentsInSearch = [];
    }

    getRightPipe(mode, is_ranked) {
        if (is_ranked) {
            if (mode === "c") {
                return "consignmentsClassicRanked";
            } else if (mode === "b") {
                return "consignmentsBlizRanked";
            } else {
                return "consignmentsFateRanked";
            }
        } else {
            if (mode === "c") {
                return "consignmentsClassicUnranked";
            } else if (mode === "b") {
                return "consignmentsBlizUnranked";
            } else {
                return "consignmentsFateUnranked";
            }
        }
    }

    logAllArrays() {
        console.log(this.allConsignmentsInSearch);
        console.log(this.consignmentSearchPipes.consignmentsFateRanked);
        console.log(this.consignmentSearchPipes.consignmentsClassicUnranked);
        console.log(this.consignmentsWaitForAccept);
    }

    consignmentWFADenyed(login1, login2) {
        let index = -1;
        this.consignmentsWaitForAccept.forEach((element, i) => {
            if (login1 === element.login1) {
                if (login2 === element.login2) {
                    index = i;
                    console.log("BUSY ON FALSE");
                    this.moveConsignmentToEnd(login1, this.consignmentSearchPipes[this.getRightPipe(element.mode, element.is_ranked)], false);
                    this.moveConsignmentToEnd(login2, this.consignmentSearchPipes[this.getRightPipe(element.mode, element.is_ranked)], false);
                    this.consignmentsWaitForAccept.splice(index, 1);
                }
            } else if (login2 === element.login1) {
                if (login1 === element.login2) {
                    index = i;
                    console.log("BUSY ON FALSE");
                    this.moveConsignmentToEnd(login1, this.consignmentSearchPipes[this.getRightPipe(element.mode, element.is_ranked)], false);
                    this.moveConsignmentToEnd(login2, this.consignmentSearchPipes[this.getRightPipe(element.mode, element.is_ranked)], false);
                    this.consignmentsWaitForAccept.splice(index, 1);
                }
            }
        })
    }

    moveConsignmentToEnd(login, pipe, is_busy) {
        let index = this.findConsignmentIndexByLogin(login, pipe)[1];
        if (index !== null) {
            let tempConsignment = pipe[index];

            tempConsignment.is_busy = is_busy;

            pipe.splice(index, 1);
            pipe.push(tempConsignment);
            console.log(login + " moved in the end of pipe");
            console.log(pipe);
        }
    }

    findConsignmentIndexByLogin(login, consignments_array) {
        let is_exist = false;
        let find = null;
        // if (consignments_array.length === 0) {
        //     return [false, null];
        // }
        if (consignments_array.length > 0) {
            consignments_array.forEach((element, index) => {
                if (element.login === login) {
                    is_exist = true;
                    find = index;
                }
            })
        }
        return [is_exist, find];
    }

    findConsignmentIndexByLoginInWFA(login) {
        let is_exist = false;
        let find = null;
        this.consignmentsWaitForAccept.forEach((element, index) => {
            if (element.login1 === login) {
                is_exist = true;
                find = index;
            }
            if (element.login2 === login) {
                is_exist = true;
                find = index;
            }
        })
        return [is_exist, find];
    }

    addConsignmentSearch(mode, is_ranked, elo, search_speed, login) {
        // console.log(mode, is_ranked, elo, search_speed, login);
        if (this.findConsignmentIndexByLogin(login, this.allConsignmentsInSearch)[0]) {
            return [false, "consignment already exist."];
        }
        this.consignmentSearchPipes[this.getRightPipe(mode, is_ranked)].push({
            login: login,
            elo: elo,
            search_speed: search_speed,
            search_start_date: new Date(),
            is_busy: false,
        });

        this.allConsignmentsInSearch.push({
            login: login,
            mode: mode,
            is_ranked: is_ranked,
            search_start_date: new Date(),
            search_speed: search_speed,
        })
        // console.log("After");
        // this.logAllArrays();
        return [true, "consignment successfully created."];
    }

    deleteConsignmentSearch(login) {
        console.log("delete " + login + " consignment.");
        let consignment_find = this.findConsignmentIndexByLogin(login, this.allConsignmentsInSearch);
        if (consignment_find[0]) {
            let accurate_consignment_pipe = this.getRightPipe(this.allConsignmentsInSearch[consignment_find[1]].mode, consignment_find.is_ranked);
            let accurate_consignment_find = this.findConsignmentIndexByLogin(login, this.consignmentSearchPipes[accurate_consignment_pipe]);
            this.allConsignmentsInSearch.splice(consignment_find[1], 1);
            if (accurate_consignment_find[0]) {
                this.consignmentSearchPipes[accurate_consignment_pipe].splice(accurate_consignment_find[1], 1);
                return [true, "consignment deleted."];
            } else {
                return [false, "something went wrong."];
            }
        }
        return [false, "consignment do not exist."];
    }

    //Должен срабатывать когда добовляется новый запрос и только для него, а не каждую секунду и пытаться заново найти оппонента между до этого существовавшими запросами.
    checkPossiblePair(consignments_array, login_sockets, io, data_manager) {
        //Берем самого нового в очереди....
        let offset = 1;
        let newest_consigment = consignments_array[consignments_array.length - offset];
        //И пытаемся сбагрить его самому старому в очереди. (Ну потому что он же ждёт дольше всех, это справедливо.)
        for (let index = 0; index < consignments_array.length - offset; index++) {
            if (Math.abs(consignments_array[index].elo - newest_consigment.elo) < eloDiff && !consignments_array[index].is_busy && !newest_consigment.is_busy) {
                //Если эта пара подходящая.
                //Ставим занятость на true.
                consignments_array[consignments_array.length - offset].is_busy = true;
                consignments_array[index].is_busy = true;
                
                // Добовляем их партию в массив ожидающих подтверждения.
                this.consignmentsWaitForAccept.push({
                    login1: consignments_array[index].login,
                    login2: newest_consigment.login,
                    mode: this.allConsignmentsInSearch[this.findConsignmentIndexByLogin(newest_consigment.login, this.allConsignmentsInSearch)[1]].mode,
                    is_ranked: this.allConsignmentsInSearch[this.findConsignmentIndexByLogin(newest_consigment.login, this.allConsignmentsInSearch)[1]].is_ranked,
                    start_date: new Date(),
                    //Статус принятия 0-принял ли игру первый логин 1-а второй? 2-время выделенное на принятие игры.
                    accept_status: [false, false, this.acceptTime],
                });

                // Делаем событие для ихних сокетов.
                let login_socket1 = login_sockets.getSockets(consignments_array[index].login);
                let login_socket2 = login_sockets.getSockets(newest_consigment.login);

                login_socket1.forEach(socket_id => {
                    let opponent_info = data_manager.getPublicAccauntData(newest_consigment.login);
                    if (opponent_info[0]) {
                        io.to(socket_id).emit("game_found", {
                            avatar: opponent_info[1].avatar,
                            nickname: opponent_info[1].nickname,
                            elo: opponent_info[1].elo,
                        });
                    }
                })

                login_socket2.forEach(socket_id => {
                    let opponent_info = data_manager.getPublicAccauntData(consignments_array[index].login);
                    if (opponent_info[0]) {
                        io.to(socket_id).emit("game_found", {
                            avatar: opponent_info[1].avatar,
                            nickname: opponent_info[1].nickname,
                            elo: opponent_info[1].elo,
                        });
                    }
                })

                return [true, "Оппонент найден."];
            }
        }
        return [false, "В текущей очереди нет достойных оппонентов."];
    }

    //Использовать если вы уже имеете оба логина.
    denyGameTwoLogins(login1, login2, io, login_sockets) {
        this.consignmentWFADenyed(login1, login2);
        login_sockets.getSockets(login1).forEach((socket_id) => {
            io.to(socket_id).emit("game_denyed");
        });
        login_sockets.getSockets(login2).forEach((socket_id) => {
            io.to(socket_id).emit("game_denyed");
        });
        return [true, "Игра отменена."];
    }

    findSecondLogin(login) {
        let find = null;
        this.consignmentsWaitForAccept.forEach((element) => {
            if (element.login1 === login) {
                find = element.login2;
                return;
            } else if (element.login2 === login) {
                find = element.login1;
                return;
            } else {
                return;
            }
        })
        return find;
    }

    // Использовать если вы имеете только один логин.
    denyGameOneLogin(login, io, login_sockets) {
        let find = this.findSecondLogin(login);
        let deny_status = [false, "Something went wrong."];
        if (find !== null) {
            deny_status = this.denyGameTwoLogins(login, find, io, login_sockets);
        }
        return deny_status;
    }

    acceptGame(login, consignment_plays, login_sockets, io) {
        login_sockets.getSockets(login).forEach((socket) => {
            io.to(socket).emit("game_accepted");
        })
        let find = this.findConsignmentIndexByLoginInWFA(login);
        if (find[0]) {
            let index = find[1];
            if (this.consignmentsWaitForAccept[index].login1 === login) {
                this.consignmentsWaitForAccept[index].accept_status[0] = true;
            } else if (this.consignmentsWaitForAccept[index].login2 === login) {
                this.consignmentsWaitForAccept[index].accept_status[1] = true;
            } else {
                console.log("STrAnGeee");
            }
    
            if (this.consignmentsWaitForAccept[index].accept_status[0] && this.consignmentsWaitForAccept[index].accept_status[1]) {
                console.log("START");

                //Убираем их из пайпа ожидающих подтверждения.
                let mode = this.consignmentsWaitForAccept[index].mode;
                let is_ranked = this.consignmentsWaitForAccept[index].is_ranked;
                let login1 = this.consignmentsWaitForAccept[index].login1
                let login2 = this.consignmentsWaitForAccept[index].login2
                this.consignmentsWaitForAccept.splice(index, 1);

                //Убираем их из их пайпов.
                this.deleteConsignmentSearch(login1);
                this.deleteConsignmentSearch(login2);
    
                //И начинаем игру для них.
                this.startGame(login1, login2, mode, is_ranked, consignment_plays, login_sockets, io);

                console.log("SEARCH: ", this.allConsignmentsInSearch);
                console.log("PIPES: ", this.consignmentSearchPipes);
                console.log("WAIT: ", this.consignmentsWaitForAccept);
                console.log("PLAYS: ", consignment_plays.consigments);

                return [true, "Игра начата"];
            } else {
                return [true, "Игра принята"];
            }
        }
    }

    startGame(login1, login2, mode, is_ranked, consignment_plays, login_sockets, io) {
        consignment_plays.addConsignment(login1, login2, mode, is_ranked);
        login_sockets.getSockets(login1).forEach((socket) => {
            io.to(socket).emit("game_start");
        })
        login_sockets.getSockets(login2).forEach((socket) => {
            io.to(socket).emit("game_start");
        })
    }
}

module.exports = consignmentSearch;