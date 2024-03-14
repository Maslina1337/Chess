const fs = require("fs");
const path = require("path");
const getData = require(path.join(__dirname, "../main_data.js"));

const chessLogic = require("../mekanism/chess_logic.js");

//Константа отвечающая за то сколько ело получат игроки при игре в определенный режим
const eloTableByMods = {
    c: {winner: 30, loser: -30}, // классика
    b: {winner: 15, loser: -15}, // блиц
    f: {winner: 10, loser: -10}, // судьба
}

class consigmentPlays {
    constructor() {
        this.consigments = [];
    }

    addConsignment(player_white, player_black, mode, is_ranked) {
        this.consigments.push({
            player_white: player_white,
            player_black: player_black,
            mode: mode,
            is_ranked: is_ranked,
            chess_logic_class: new chessLogic(),
            move_history: [], // syntax - 0-from-y 1-from-x 2-to-y 3-to-x 4-moved-piece 5-beaten-piece 6-picked-piece 7-castling-piece
            chat_history: [], // syntax - 0-login 1-message 2-date
            start_date: new Date(),
            end_date: null,
        })
        //Генерирует все ходы и всякие другие штуки.
        let win_check_status = this.consigments[this.consigments.length - 1].chess_logic_class.preparation();
        // Впринципе return бесполезен ведь на кой вообще чекать победу на начальной расстоновке.
        return win_check_status;
    }

    findConsignmentIndexByLogin(login) {
        let find = [false, null];
        this.consigments.forEach((element, index) => {
            if (element.player_white === login || element.player_black === login) {
                find = [true, index];
                return;
            }
        });
        return find;
    }

    deleteConsingmentByLogin(login) {
        let find = this.findConsignmentIndexByLogin(login);
        if (find[0]) {
            this.consigments.splice(find[1], 1);
            return [true, "deleted."];
        } else {
            return [false, "cant find."];
        }
    }

    isLoginPlayRightNow(login) {
        let find = false;
        this.consigments.forEach(element => {
            if (element.player_white === login || element.player_black === login) {
                find = true;
                return;
            }
        });
        return find;
    }

    getEloTable(mode) {
        return eloTableByMods[mode];
    }

    getChessClientData(index) {
        return {
            chess_field: this.consigments[index].chess_logic_class.chess_field,

            beaten_pieces_white: this.consigments[index].chess_logic_class.beaten_pieces_white,
            beaten_pieces_black: this.consigments[index].chess_logic_class.beaten_pieces_black,

            move_history: this.consigments[index].chess_logic_class.move_history,
            residual: this.consigments[index].chess_logic_class.residual,

            user_rights: this.consigments[index].chess_logic_class.user_rights,

            count_moves: this.consigments[index].chess_logic_class.count_moves,

            pieces_ids: this.consigments[index].chess_logic_class.pieces_ids,

            moves: this.consigments[index].chess_logic_class.moves,
            moves_all_unsafe: this.consigments[index].chess_logic_class.moves_all_unsafe,

            // white_moves: this.consigments[index].chess_logic_class.white_moves,
            // black_moves: this.consigments[index].chess_logic_class.black_moves,

            //темпы (нет смысла отдавать)
            // possible_black_moves: this.consigments[index].chess_logic_class.possible_black_moves,
            // possible_white_moves: this.consigments[index].chess_logic_class.possible_white_moves,

            white_king_was_moved: this.consigments[index].chess_logic_class.white_king_was_moved,
            black_king_was_moved: this.consigments[index].chess_logic_class.black_king_was_moved,
            white_king_cords: this.consigments[index].chess_logic_class.white_king_cords,
            black_king_cords: this.consigments[index].chess_logic_class.black_king_cords,
            white_king_can_castling: this.consigments[index].chess_logic_class.white_king_can_castling,
            black_king_can_castling: this.consigments[index].chess_logic_class.black_king_can_castling,

            last_pawn_step: this.consigments[index].chess_logic_class.last_pawn_step,

            turn: this.consigments[index].chess_logic_class.turn,
        }
    }

    put_move_to_history(consignment_index, from_y, from_x, to_y, to_x, moved_piece, beaten_piece, picked_piece, castling_piece) {
        this.consigments[consignment_index].move_history.push([from_y, from_x, to_y, to_x, moved_piece, beaten_piece, picked_piece, castling_piece]);
    }

    move_piece(login, y, x, toy, tox, pick_piece_name) {
        let find = this.findConsignmentIndexByLogin(login);
        if (find[0]) {
            let consignment_index = find[1];
            let chess_logic = this.consigments[consignment_index].chess_logic_class; // Ради сокращения

            //Фигуру может сдвинуть только тот, кто ею владеет.
            if (chess_logic.turn === "white") {
                if (this.consigments[consignment_index].player_white !== login) {
                    console.log("HYP: ", login, this.consigments[consignment_index].player_white);
                    return [false, "hypocrith"];
                }
            } else {
                if (this.consigments[consignment_index].player_black !== login) {
                    console.log("HYP: ", login, this.consigments[consignment_index].player_black);
                    return [false, "hypocrith"];
                }
            }

            let name = chess_logic.chess_field[y][x];

            // Имя фигуры до каких либо её изменений
            let original_piece_name = name;

            // Если кастлинг, то для занесения в историю какой нибудь необычной фигуры.
            let castling_piece_name = 0;

            if (chess_logic.moves[String(y) + String(x)][toy][tox] === 0) {
                console.log("Someone try to hmmm");
                return [false, "your piece now can walk freely?"];
            }

            if (name === "wp") {
                if (chess_logic.count_moves[toy][tox] === 1 && toy === 4) {
                    pawnStep = [toy + 1, tox];
                    fromTo.moveType = "pawnJump"
                }
                // WHEEL (redo)
                if (toy === 0) {
                    console.log("PICK PIECE NAME: ", pick_piece_name);
                    if (pick_piece_name && chess_logic.get_allowed_pieces_pick(chess_logic.turn) !== null) {
                        if (chess_logic.get_allowed_pieces_pick(chess_logic.turn).includes(pick_piece_name)) {
                            console.log("SUCCESS FIND PIECE");
                            
                            // here change piece...
                            name = pick_piece_name;
                        } else {
                            console.log("NOT SUCCESS FIND PIECE");
                        }
                    } else {
                        return [true, "wait_for_pick"];
                    }
                } else {
                    chess_logic.can_pick_piece = [];
                }
            } else if (name === "bp") {
                if (chess_logic.count_moves[toy][tox] === 1 && toy === 3) {
                    pawnStep = [toy - 1, tox];
                    fromTo.moveType = "pawnJump"
                }
                // WHEEL
                if (toy === 7) {
                    console.log("PICK PIECE NAME: ", pick_piece_name);
                    if (pick_piece_name && chess_logic.get_allowed_pieces_pick(chess_logic.turn) !== null) {
                        if (chess_logic.get_allowed_pieces_pick(chess_logic.turn).includes(pick_piece_name)) {
                            console.log("SUCCESS FIND PIECE");
                            
                            // here change piece...
                            name = pick_piece_name;
                        } else {
                            console.log("NOT SUCCESS FIND PIECE");
                        }
                    } else {
                        return [true, "wait_for_pick"];
                    }
                } else {
                    chess_logic.can_pick_piece = [];
                }
            } else {
                chess_logic.can_pick_piece = [];
            }

            if (chess_logic.last_pawn_step.length !== 0) {                                //beat pawn step check
                if (toy === chess_logic.last_pawn_step[0] && tox === chess_logic.last_pawn_step[1]) {
                    if (name === "wp") {
                        chess_logic.chess_field[toy + 1][tox] = 0;
                    } else if (name === "bp") {
                        chess_logic.chess_field[toy - 1][tox] = 0;
                    }
                }
            }

            // castlings
            if (chess_logic.chess_field[y][x][1] === "k" && chess_logic.moves[String(y) + String(x)][0][0] === 3 || chess_logic.moves[String(y) + String(x)][0][7] === 3 || chess_logic.moves[String(y) + String(x)][7][0] === 3 || chess_logic.moves[String(y) + String(x)][7][7] === 3) {
                if (chess_logic.chess_field[y][x][0] === "w" && !chess_logic.white_king_was_moved) {

                    if (toy === 7 && tox === 0) {
                        castling_piece_name = chess_logic.chess_field[toy][tox];
                    
                        chess_logic.count_moves[7][2] = chess_logic.count_moves[y][x] + 1;
                        chess_logic.count_moves[y][x] = 0;

                        chess_logic.pieces_ids[7][2] = chess_logic.pieces_ids[y][x];
                        chess_logic.pieces_ids[y][x] = 0;
                    
                        chess_logic.chess_field[7][2] = chess_logic.chess_field[y][x];
                        chess_logic.chess_field[y][x] = 0;

                        chess_logic.count_moves[7][3] = chess_logic.count_moves[7][0] + 1;
                        chess_logic.count_moves[7][0] = 0;

                        chess_logic.pieces_ids[7][3] = chess_logic.pieces_ids[7][0];
                        chess_logic.pieces_ids[7][0] = 0;
                    
                        chess_logic.chess_field[7][3] = castling_piece_name;
                        chess_logic.chess_field[toy][tox] = 0;
                    
                        chess_logic.white_king_cords = [7,2];
                        chess_logic.white_king_was_moved = true;

                        chess_logic.residual.from_y = y;
                        chess_logic.residual.from_x = x;
                        chess_logic.residual.to_y = 7;
                        chess_logic.residual.to_x = 2;
                        chess_logic.residual.from_y2 = toy;
                        chess_logic.residual.from_x2 = tox;
                        chess_logic.residual.to_y2 = 7;
                        chess_logic.residual.to_x2 = 3;

                        chess_logic.moves = {};
                        chess_logic.turn = (chess_logic.turn === "white" ? "black" : "white");
                    
                        let win_check_status = chess_logic.preparation();
                        console.log("PIECE MOVED");
                        this.put_move_to_history(consignment_index, y, x, toy, tox, original_piece_name, 0, 0, castling_piece_name);
                        return [true, "Piece moved.", win_check_status];

                    } else if (toy === 7 && tox === 7) {
                        console.log("dsddsdsdsdsdsdasddddddsdsdsd");
                        castling_piece_name = chess_logic.chess_field[toy][tox];
                        
                        chess_logic.count_moves[7][6] = chess_logic.count_moves[y][x] + 1;
                        chess_logic.count_moves[y][x] = 0;

                        chess_logic.pieces_ids[7][6] = chess_logic.pieces_ids[y][x];
                        chess_logic.pieces_ids[y][x] = 0;
                        
                        chess_logic.chess_field[7][6] = chess_logic.chess_field[y][x];
                        chess_logic.chess_field[y][x] = 0;

                        chess_logic.count_moves[7][5] = chess_logic.count_moves[7][7] + 1;
                        chess_logic.count_moves[7][7] = 0;

                        chess_logic.pieces_ids[7][5] = chess_logic.pieces_ids[7][7];
                        chess_logic.pieces_ids[7][7] = 0;
                        
                        chess_logic.chess_field[7][5] = castling_piece_name;
                        chess_logic.chess_field[toy][tox] = 0;
                        
                        chess_logic.white_king_cords = [7,6];
                        chess_logic.white_king_was_moved = true;

                        chess_logic.residual.from_y = y;
                        chess_logic.residual.from_x = x;
                        chess_logic.residual.to_y = 7;
                        chess_logic.residual.to_x = 6;
                        chess_logic.residual.from_y2 = toy;
                        chess_logic.residual.from_x2 = tox;
                        chess_logic.residual.to_y2 = 7;
                        chess_logic.residual.to_x2 = 5;

                        chess_logic.moves = {};
                        chess_logic.turn = (chess_logic.turn === "white" ? "black" : "white");
                        
                        let win_check_status = chess_logic.preparation();
                        console.log("PIECE MOVED");
                        this.put_move_to_history(consignment_index, y, x, toy, tox, original_piece_name, 0, 0, castling_piece_name);
                        return [true, "Piece moved.", win_check_status];

                    }
                } else if (chess_logic.chess_field[y][x][0] === "b" && !chess_logic.black_king_was_moved) {
                    if (chess_logic.chess_field[y][x][0] === "b" && chess_logic.chess_field[toy][tox][0] === "b") {
                        if (toy === 0 && tox === 0) {
                            castling_piece_name = chess_logic.chess_field[toy][tox];
                        
                            chess_logic.count_moves[0][2] = chess_logic.count_moves[y][x] + 1;
                            chess_logic.count_moves[y][x] = 0;

                            chess_logic.pieces_ids[0][2] = chess_logic.pieces_ids[y][x];
                            chess_logic.pieces_ids[y][x] = 0;
                        
                            chess_logic.chess_field[0][2] = chess_logic.chess_field[y][x];
                            chess_logic.chess_field[y][x] = 0;

                            chess_logic.count_moves[0][3] = chess_logic.count_moves[0][0] + 1;
                            chess_logic.count_moves[0][0] = 0;

                            chess_logic.pieces_ids[0][3] = chess_logic.pieces_ids[0][0];
                            chess_logic.pieces_ids[0][0] = 0;

                            chess_logic.chess_field[0][3] = castling_piece_name;
                            chess_logic.chess_field[toy][tox] = 0;
                        
                            chess_logic.black_king_cords = [0,2];
                            chess_logic.black_king_was_moved = true;

                            chess_logic.residual.from_y = y;
                            chess_logic.residual.from_x = x;
                            chess_logic.residual.to_y = 0;
                            chess_logic.residual.to_x = 2;
                            chess_logic.residual.from_y2 = toy;
                            chess_logic.residual.from_x2 = tox;
                            chess_logic.residual.to_y2 = 0;
                            chess_logic.residual.to_x2 = 3;

                            chess_logic.moves = {};
                            chess_logic.turn = (chess_logic.turn === "white" ? "black" : "white");

                            let win_check_status = chess_logic.preparation();
                            console.log("PIECE MOVED");
                            this.put_move_to_history(consignment_index, y, x, toy, tox, original_piece_name, 0, 0, castling_piece_name);
                            return [true, "Piece moved.", win_check_status];
                        } else if (toy === 0 && tox === 7) {
                            castling_piece_name = chess_logic.chess_field[toy][tox];

                            chess_logic.count_moves[0][6] = chess_logic.count_moves[y][x] + 1;
                            chess_logic.count_moves[y][x] = 0;

                            chess_logic.pieces_ids[0][6] = chess_logic.pieces_ids[y][x];
                            chess_logic.pieces_ids[y][x] = 0;

                            chess_logic.chess_field[0][6] = chess_logic.chess_field[y][x];
                            chess_logic.chess_field[y][x] = 0;

                            chess_logic.count_moves[0][5] = chess_logic.count_moves[0][7] + 1;
                            chess_logic.count_moves[0][7] = 0;

                            chess_logic.pieces_ids[0][5] = chess_logic.pieces_ids[0][7];
                            chess_logic.pieces_ids[0][7] = 0;

                            chess_logic.chess_field[0][5] = castling_piece_name;
                            chess_logic.chess_field[toy][tox] = 0;

                            chess_logic.black_king_cords = [0,6];
                            chess_logic.black_king_was_moved = true;

                            chess_logic.residual.from_y = y;
                            chess_logic.residual.from_x = x;
                            chess_logic.residual.to_y = 0;
                            chess_logic.residual.to_x = 6;
                            chess_logic.residual.from_y2 = toy;
                            chess_logic.residual.from_x2 = tox;
                            chess_logic.residual.to_y2 = 0;
                            chess_logic.residual.to_x2 = 5;

                            chess_logic.moves = {};
                            chess_logic.turn = (chess_logic.turn === "white" ? "black" : "white");

                            let win_check_status = chess_logic.preparation();
                            console.log("PIECE MOVED");
                            this.put_move_to_history(consignment_index, y, x, toy, tox, original_piece_name, 0, 0, castling_piece_name);
                            return [true, "Piece moved.", win_check_status];
                        }
                    }
                }
            }

            if (name === "wk") {
                chess_logic.white_king_cords = [toy, tox];
                chess_logic.white_king_was_moved = true;
                chess_logic.can_pick_piece = [];
            } else if (name === "bk") {
                chess_logic.black_king_cords = [toy, tox];
                chess_logic.black_king_was_moved = true;
                chess_logic.can_pick_piece = [];
            }

            if (chess_logic.chess_field[toy][tox] !== 0) {
                if (chess_logic.turn === "white") {
                    chess_logic.beaten_pieces_black.push(chess_logic.chess_field[toy][tox]);
                } else {
                    chess_logic.beaten_pieces_white.push(chess_logic.chess_field[toy][tox]);
                }
            }

            let beaten_piece_name = chess_logic.chess_field[toy][tox];

            chess_logic.count_moves[toy][tox] = chess_logic.count_moves[y][x] + 1;
            chess_logic.count_moves[y][x] = 0;

            chess_logic.pieces_ids[toy][tox] = chess_logic.pieces_ids[y][x];
            chess_logic.pieces_ids[y][x] = 0;

            chess_logic.chess_field[y][x] = 0;
            chess_logic.chess_field[toy][tox] = name;
            
            chess_logic.turn = (chess_logic.turn === "white" ? "black" : "white");
            chess_logic.moves = {};
            chess_logic.pawnStep = [];

            chess_logic.residual.from_y = y;
            chess_logic.residual.from_x = x;
            chess_logic.residual.to_y = toy;
            chess_logic.residual.to_x = tox;
            chess_logic.residual.from_y2 = null;
            chess_logic.residual.from_x2 = null;
            chess_logic.residual.to_y2 = null;
            chess_logic.residual.to_x2 = null;

            let win_check_status = chess_logic.preparation();

            console.log("PIECE MOVED");
            this.put_move_to_history(consignment_index, y, x, toy, tox, original_piece_name, beaten_piece_name, (pick_piece_name ? pick_piece_name : 0), 0);
            return [true, "Piece moved.", win_check_status];
        } else {
            return [false, "Wrong data."];
        }
    }

    saveConsignmentJSON(consignment_index) {
        let readen_data = JSON.parse(fs.readFileSync(path.join(__dirname, "consignments.json")));
        let consignment_pushed = this.consigments[consignment_index]
        delete consignment_pushed.chess_logic_class;
        readen_data.push(consignment_pushed);
        fs.writeFileSync(path.join(__dirname, "consignments.json"), JSON.stringify(readen_data));
    }

    givePresents(winner, loser, mode, is_ranked, data_manager) {
        if (is_ranked) {
            data_manager.addElo(winner, eloTableByMods[mode].winner);
            data_manager.addElo(loser, eloTableByMods[mode].loser);
        }
    }
}

module.exports = consigmentPlays;