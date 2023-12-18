const fs = require("fs");
const path = require("path");

const chessLogic = require("../mekanism/chess_logic.js");

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
            chat_history: [], // syntax - 0-login 1-message 2-date
        })
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
        let find = this.findConsingmentIndexByLogin(index);
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

    getChessClientData() {
        return {
            chess_field: this.chess_logic_class.chess_field,

            beaten_pieces_white: this.chess_logic_class.beaten_pieces_white,
            beaten_pieces_black: this.chess_logic_class.beaten_pieces_black,

            move_history: this.chess_logic_class.move_history,
            residual: this.chess_logic_class.residual,

            user_rights: this.chess_logic_class.user_rights,

            count_moves: this.chess_logic_class.count_moves,

            moves: this.chess_logic_class.moves,

            possible_black_moves: this.chess_logic_class.possible_black_moves,

            possible_white_moves: this.chess_logic_class.possible_white_moves,

            white_king_was_moved: this.chess_logic_class.white_king_was_moved,
            black_king_was_moved: this.chess_logic_class.black_king_was_moved,
            white_king_cords: this.chess_logic_class.white_king_cords,
            black_king_cords: this.chess_logic_class.black_king_cords,
            white_king_can_castling: this.chess_logic_class.white_king_can_castling,
            black_king_can_castling: this.chess_logic_class.black_king_can_castling,

            last_pawn_step: this.chess_logic_class.last_pawn_step,

            turn: this.chess_logic_class.turn,
        }
    }
}

module.exports = consigmentPlays;