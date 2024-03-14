const chess_field_places = [["place11", "place12", "place13", "place14", "place15", "place16", "place17", "place18"],
                ["place21", "place22", "place23", "place24", "place25", "place26", "place27", "place28"], 
                ["place31", "place32", "place33", "place34", "place35", "place36", "place37", "place38"], 
                ["place41", "place42", "place43", "place44", "place45", "place46", "place47", "place48"], 
                ["place51", "place52", "place53", "place54", "place55", "place56", "place57", "place58"], 
                ["place61", "place62", "place63", "place64", "place65", "place66", "place67", "place68"], 
                ["place71", "place72", "place73", "place74", "place75", "place76", "place77", "place78"], 
                ["place81", "place82", "place83", "place84", "place85", "place86", "place87", "place88"]];

const white_pieces_pick = ["wq", "wc", "wb", "wn"];
const black_pieces_pick = ["bq", "bc", "bb", "bn"];

class chessLogic {
    constructor() {
        this.chess_field = [["bc", "bn", "bb", "bq", "bk", "bb", "bn", "bc"],
        ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
        [0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0], 
        ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"], 
        ["wc", "wn", "wb", "wq", "wk", "wb", "wn", "wc"]];

        this.pieces_ids = [["bc1", "bn1", "bb1", "bq1", "bk1", "bb2", "bn2", "bc2"],
        ["bp1", "bp2", "bp3", "bp4", "bp5", "bp6", "bp7", "bp8"],
        [0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0], 
        ["wp1", "wp2", "wp3", "wp4", "wp5", "wp6", "wp7", "wp8"], 
        ["wc1", "wn1", "wb1", "wq1", "wk1", "wb2", "wn2", "wc2"]];

        this.beaten_pieces_white = [];
        this.beaten_pieces_black = [];

        this.move_history = [];

        this.residual = {
            from_y: null,
            from_x: null,
            to_y: null,
            to_x: null,
            from_y2: null,
            from_x2: null,
            to_y2: null,
            to_x2: null,
        }

        // Не знаю полезно это или нет.
        this.user_rights = {
            canMoveFigure: true, // castling is move too
            canShowPossiableMoves: true,
            canClearPossiableMoves: true,
            canSelectFigure: true,
            isSpetateMode: false,
            canPickPiece: false
        }

        this.count_moves = [[0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0]];

        this.moves = {};
        this.moves_all_unsafe = {};
        // this.white_moves = {};
        // this.black_moves = {};

        // темпы ))))
        this.possible_black_moves = [[0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0]];

        this.possible_white_moves = [[0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0], 
            [0, 0, 0, 0, 0, 0, 0, 0]];

        this.white_king_was_moved = false;
        this.black_king_was_moved = false;
        this.white_king_cords = [7, 4];
        this.black_king_cords = [0, 4];
        this.white_king_can_castling = false;
        this.black_king_can_castling = false;

        this.last_pawn_step = [];

        this.can_pick_piece = [];

        this.turn = "white";
    }

    preparation(logins, login_sockets, io) {
        this.chess_field.forEach((i, y) => {i.forEach((j, x) => {
            if (j !== 0) {
                console.log("Generate move for: " + y + " " + x + " " + j);
                this.generateMovesWithoutMap(j,y,x);
            }
            if (j === "wk") {
                this.white_king_cords = [y,x];
            } else if (j === "bk") {
                this.black_king_cords = [y,x];
            }
        })});
        return this.checkWin();
    }

    generateMovesWithoutMap(j, y, x) {
    if (this.turn[0] === j[0]) {
        this.moves[String(y)+String(x)] = this.checkPossibleMoves(j, y, x);
    } else {
        this.moves[String(y)+String(x)] = [[0, 0, 0, 0, 0, 0, 0, 0],
                                        [0, 0, 0, 0, 0, 0, 0, 0],
                                        [0, 0, 0, 0, 0, 0, 0, 0], 
                                        [0, 0, 0, 0, 0, 0, 0, 0], 
                                        [0, 0, 0, 0, 0, 0, 0, 0], 
                                        [0, 0, 0, 0, 0, 0, 0, 0], 
                                        [0, 0, 0, 0, 0, 0, 0, 0], 
                                        [0, 0, 0, 0, 0, 0, 0, 0]];
        this.checkPossibleUnsafeMoves(j, y, x, this.moves[String(y)+String(x)]);
    }

    this.moves_all_unsafe[String(y)+String(x)] = [[0, 0, 0, 0, 0, 0, 0, 0],
                                                [0, 0, 0, 0, 0, 0, 0, 0],
                                                [0, 0, 0, 0, 0, 0, 0, 0], 
                                                [0, 0, 0, 0, 0, 0, 0, 0], 
                                                [0, 0, 0, 0, 0, 0, 0, 0], 
                                                [0, 0, 0, 0, 0, 0, 0, 0], 
                                                [0, 0, 0, 0, 0, 0, 0, 0], 
                                                [0, 0, 0, 0, 0, 0, 0, 0]];
    this.checkPossibleUnsafeMoves(j, y, x, this.moves_all_unsafe[String(y)+String(x)]);
    }

    generateAllUnsafeMovesB() {
        this.possible_black_moves = [[0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0], 
                    [0, 0, 0, 0, 0, 0, 0, 0], 
                    [0, 0, 0, 0, 0, 0, 0, 0], 
                    [0, 0, 0, 0, 0, 0, 0, 0], 
                    [0, 0, 0, 0, 0, 0, 0, 0], 
                    [0, 0, 0, 0, 0, 0, 0, 0]];
        
        this.chess_field.map((i, y) => {i.map((j, x) => {
            if (j[0] === "b") {
                this.checkPossibleUnsafeMoves(j, y, x, this.possible_black_moves);
            }
        })});
    }
    
    generateAllUnsafeMovesW() { 
        this.possible_white_moves = [[0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0], 
                    [0, 0, 0, 0, 0, 0, 0, 0], 
                    [0, 0, 0, 0, 0, 0, 0, 0], 
                    [0, 0, 0, 0, 0, 0, 0, 0], 
                    [0, 0, 0, 0, 0, 0, 0, 0], 
                    [0, 0, 0, 0, 0, 0, 0, 0]];
        
        this.chess_field.map((i, y) => {i.map((j, x) => {
            if (j[0] === "w") {
                this.checkPossibleUnsafeMoves(j, y, x, this.possible_white_moves);
            }
        })});
    }
    
    checkPossibleUnsafeMoves(name, y, x, to) {
        let field = this.chess_field;
        let directionsDone = [0, 0, 0, 0, 0, 0, 0, 0];
        let directionsDoneFour = [0, 0, 0, 0];
    
        switch (name) {
            case "bk":
                if (y - 1 >= 0) {
                    this.moveCheckPoint_unsafe(field, to, y-1, x, "bk");
                    if (x - 1 >= 0) {
                        this.moveCheckPoint_unsafe(field, to, y-1, x-1, "bk");
                    }
                    if (x + 1 <= 7) {
                        this.moveCheckPoint_unsafe(field, to, y-1, x+1, "bk");
                    }
                }
                if (y + 1 <= 7) {
                    this.moveCheckPoint_unsafe(field, to, y+1, x, "bk");
                    if (x - 1 >= 0) {
                        this.moveCheckPoint_unsafe(field, to, y+1, x-1, "bk");
                    }
                    if (x + 1 <= 7) {
                        this.moveCheckPoint_unsafe(field, to, y+1, x+1, "bk");
                    }
                }
                if (x - 1 >= 0) {
                    this.moveCheckPoint_unsafe(field, to, y, x-1, "bk");
                }
                if (x + 1 <= 7) {
                    this.moveCheckPoint_unsafe(field, to, y, x+1, "bk");
                }
                if (!this.black_king_was_moved) {
                            if (field[0][0] === "bc" && this.count_moves[0][0] === 0) {
                                if (field[y][x - 1] === 0 && field[y][x - 2] === 0 && field[y][x - 3] === 0) {
                                        to[0][0] = 3;
                                }
                            }
                            if (field[0][7] === "bc" && this.count_moves[0][7] === 0) {
                                if (field[y][x + 1] === 0 && field[y][x + 2] === 0) {
                                        to[0][7] = 3;
                                }
                            }
                }
            break;
            case "bq":
                for (let i = 1; i < 8 && directionsDone != [1, 1, 1, 1, 1, 1, 1, 1]; i++) {
                    if (y - i >= 0) {
                        this.moveCheckRay_unsafe(field, to, y-i, x, "bq", directionsDone, 0);
                
                        if (x - i >= 0 && directionsDone[7] == 0) {
                            this.moveCheckRay_unsafe(field, to, y-i, x-i, "bq", directionsDone, 7);
                        } else {
                            directionsDone[7] = 1;
                        }
                        
                        if (x + i <= 7 && directionsDone[1] == 0) {
                            this.moveCheckRay_unsafe(field, to, y-i, x+i, "bq", directionsDone, 1);
                        } else {
                            directionsDone[1] = 1;
                        }
                    } else {
                        directionsDone[0] = 1;
                    }
                    
                    if (y + i <= 7) {
                        this.moveCheckRay_unsafe(field, to, y+i, x, "bq", directionsDone, 4);
                
                        if (x - i >= 0 && directionsDone[5] == 0) {
                            this.moveCheckRay_unsafe(field, to, y+i, x-i, "bq", directionsDone, 5);
                        } else {
                            directionsDone[5] = 1;
                        }
                        
                        if (x + i <= 7 && directionsDone[3] == 0) {
                            this.moveCheckRay_unsafe(field, to, y+i, x+i, "bq", directionsDone, 3);
                        } else {
                            directionsDone[3] = 1;
                        }
                    } else {
                        directionsDone[4] = 1;
                    }
            
                    if (x - i >= 0 && directionsDone[6] == 0) {
                        this.moveCheckRay_unsafe(field, to, y, x-i, "bq", directionsDone, 6);
                    } else {
                        directionsDone[6] = 1;
                    }
            
                    if (x + i <= 7 && directionsDone[2] == 0) {
                        this.moveCheckRay_unsafe(field, to, y, x+i, "bq", directionsDone, 2);
                    } else {
                        directionsDone[2] = 1;
                    }
                }
            break;
            case "bb":
                for (let i = 1; i < 9 && directionsDoneFour != [1, 1, 1, 1]; i++) {
                    if (y - i >= 0) {
                        if (x - i >= 0 && directionsDoneFour[0] == 0) {
                            this.moveCheckRay_unsafe(field, to, y-i, x-i, "bb", directionsDoneFour, 0);
                        } else {
                            directionsDoneFour[0] = 1;
                        }
                        
                        if (x + i <= 7 && directionsDoneFour[1] == 0) {
                            this.moveCheckRay_unsafe(field, to, y-i, x+i, "bb", directionsDoneFour, 1);
                        } else {
                            directionsDoneFour[1] = 1;
                        }
                    } else {
                        directionsDoneFour[0] = 1;
                        directionsDoneFour[1] = 1;
                    }
                    
                    if (y + i <= 7) {
                        if (x - i >= 0 && directionsDoneFour[3] == 0) {
                            this.moveCheckRay_unsafe(field, to, y+i, x-i, "bb", directionsDoneFour, 3);
                        } else {
                            directionsDoneFour[3] = 1;
                        }
                        
                        if (x + i <= 7 && directionsDoneFour[2] == 0) {
                            this.moveCheckRay_unsafe(field, to, y+i, x+i, "bb", directionsDoneFour, 2);
                        } else {
                            directionsDoneFour[2] = 1;
                        }
                    } else {
                        directionsDoneFour[2] = 1;
                        directionsDoneFour[3] = 1;
                    }
                }
            break;
            case "wk":
                if (y - 1 >= 0) {
                    this.moveCheckPoint_unsafe(field, to, y-1, x, "wk");
                    if (x - 1 >= 0) {
                        this.moveCheckPoint_unsafe(field, to, y-1, x-1, "wk");
                    }
                    if (x + 1 <= 7) {
                        this.moveCheckPoint_unsafe(field, to, y-1, x+1, "wk");
                    }
                }
                if (y + 1 <= 7) {
                    this.moveCheckPoint_unsafe(field, to, y+1, x, "wk");
                    if (x - 1 >= 0) {
                        this.moveCheckPoint_unsafe(field, to, y+1, x-1, "wk");
                    }
                    if (x + 1 <= 7) {
                        this.moveCheckPoint_unsafe(field, to, y+1, x+1, "wk");
                    }
                }
                if (x - 1 >= 0) {
                    this.moveCheckPoint_unsafe(field, to, y, x-1, "wk");
                }
                if (x + 1 <= 7) {
                    this.moveCheckPoint_unsafe(field, to, y, x+1, "wk");
                }
                if (!this.white_king_was_moved) {
                            if (field[7][0] === "wc" && this.count_moves[7][0] === 0) {
                                if (field[y][x - 1] === 0 && field[y][x - 2] === 0 && field[y][x - 3] === 0) {
                                        to[7][0] = 3;
                                }
                            }
                            if (field[7][7] === "wc" && this.count_moves[7][7] === 0) {
                                if (field[y][x + 1] === 0 && field[y][x + 2] === 0) {
                                        to[7][7] = 3;
                                }
                            }
                }
                break;
            case "wq":
                for (let i = 1; i < 8 && directionsDone != [1, 1, 1, 1, 1, 1, 1, 1]; i++) {
                    if (y - i >= 0) {
                        this.moveCheckRay_unsafe(field, to, y-i, x, "wq", directionsDone, 0);
                
                        if (x - i >= 0 && directionsDone[7] == 0) {
                            this.moveCheckRay_unsafe(field, to, y-i, x-i, "wq", directionsDone, 7);
                        } else {
                            directionsDone[7] = 1;
                        }
                        
                        if (x + i <= 7 && directionsDone[1] == 0) {
                            this.moveCheckRay_unsafe(field, to, y-i, x+i, "wq", directionsDone, 1);
                        } else {
                            directionsDone[1] = 1;
                        }
                    } else {
                        directionsDone[0] = 1;
                    }
                    
                    if (y + i <= 7) {
                        this.moveCheckRay_unsafe(field, to, y+i, x, "wq", directionsDone, 4);
                
                        if (x - i >= 0 && directionsDone[5] == 0) {
                            this.moveCheckRay_unsafe(field, to, y+i, x-i, "wq", directionsDone, 5);
                        } else {
                            directionsDone[5] = 1;
                        }
                        
                        if (x + i <= 7 && directionsDone[3] == 0) {
                            this.moveCheckRay_unsafe(field, to, y+i, x+i, "wq", directionsDone, 3);
                        } else {
                            directionsDone[3] = 1;
                        }
                    } else {
                        directionsDone[4] = 1;
                    }
            
                    if (x - i >= 0 && directionsDone[6] == 0) {
                        this.moveCheckRay_unsafe(field, to, y, x-i, "wq", directionsDone, 6);
                    } else {
                        directionsDone[6] = 1;
                    }
            
                    if (x + i <= 7 && directionsDone[2] == 0) {
                        this.moveCheckRay_unsafe(field, to, y, x+i, "wq", directionsDone, 2);
                    } else {
                        directionsDone[2] = 1;
                    }
                }
            break;
            case "wb":
                for (let i = 1; i < 9 && directionsDoneFour != [1, 1, 1, 1]; i++) {
                    if (y - i >= 0) {
                        if (x - i >= 0 && directionsDoneFour[0] == 0) {
                            this.moveCheckRay_unsafe(field, to, y-i, x-i, "wb", directionsDoneFour, 0);
                        } else {
                            directionsDoneFour[0] = 1;
                        }
                        
                        if (x + i <= 7 && directionsDoneFour[1] == 0) {
                            this.moveCheckRay_unsafe(field, to, y-i, x+i, "wb", directionsDoneFour, 1);
                        } else {
                            directionsDoneFour[1] = 1;
                        }
                    } else {
                        directionsDoneFour[0] = 1;
                        directionsDoneFour[1] = 1;
                    }
                    
                    if (y + i <= 7) {
                        if (x - i >= 0 && directionsDoneFour[3] == 0) {
                            this.moveCheckRay_unsafe(field, to, y+i, x-i, "wb", directionsDoneFour, 3);
                        } else {
                            directionsDoneFour[3] = 1;
                        }
                        
                        if (x + i <= 7 && directionsDoneFour[2] == 0) {
                            this.moveCheckRay_unsafe(field, to, y+i, x+i, "wb", directionsDoneFour, 2);
                        } else {
                            directionsDoneFour[2] = 1;
                        }
                    } else {
                        directionsDoneFour[2] = 1;
                        directionsDoneFour[3] = 1;
                    }
                }
            break;
            case "bc":
                for (let i = 1; i < 9 && directionsDoneFour != [1, 1, 1, 1]; i++) {
                    
                        if (y - i >= 0 && directionsDoneFour[0] == 0) {
                            this.moveCheckRay_unsafe(field, to, y-i, x, "bc", directionsDoneFour, 0);
                        } else {
                            directionsDoneFour[0] = 1;
                        }
                        
                        if (x + i <= 7 && directionsDoneFour[1] == 0) {
                            this.moveCheckRay_unsafe(field, to, y, x+i, "bc", directionsDoneFour, 1);
                        } else {
                            directionsDoneFour[1] = 1;
                        }
                
                        if (y + i <= 7 && directionsDoneFour[2] == 0) {
                            this.moveCheckRay_unsafe(field, to, y+i, x, "bc", directionsDoneFour, 2);
                        } else {
                            directionsDoneFour[2] = 1;
                        }
                        
                        if (x - i >= 0 && directionsDoneFour[3] == 0) {
                            this.moveCheckRay_unsafe(field, to, y, x-i, "bc", directionsDoneFour, 3);
                        } else {
                            directionsDoneFour[3] = 1;
                        }
                }
                break;
            case "wc":
                for (let i = 1; i < 9 && directionsDoneFour != [1, 1, 1, 1]; i++) {
                    
                    if (y - i >= 0 && directionsDoneFour[0] == 0) {
                        this.moveCheckRay_unsafe(field, to, y-i, x, "wc", directionsDoneFour, 0);
                    } else {
                        directionsDoneFour[0] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDoneFour[1] == 0) {
                        this.moveCheckRay_unsafe(field, to, y, x+i, "wc", directionsDoneFour, 1);
                    } else {
                        directionsDoneFour[1] = 1;
                    }
            
                    if (y + i <= 7 && directionsDoneFour[2] == 0) {
                        this.moveCheckRay_unsafe(field, to, y+i, x, "wc", directionsDoneFour, 2);
                    } else {
                        directionsDoneFour[2] = 1;
                    }
                    
                    if (x - i >= 0 && directionsDoneFour[3] == 0) {
                        this.moveCheckRay_unsafe(field, to, y, x-i, "wc", directionsDoneFour, 3);
                    } else {
                        directionsDoneFour[3] = 1;
                    }
            }
            break;
            case "wp":
                if (y - 1 >= 0) {
                    if (field[y - 1][x] === 0) {
                        to[y - 1][x] = 1;
                        if (this.count_moves[y][x] === 0 && field[y - 2][x] === 0) {
                            to[y - 2][x] = 1;
                        }
                    }
                    if (x - 1 >= 0) {
                        if (field[y - 1][x - 1][0] === "b") {
                            to[y - 1][x - 1] = 2;
                        }
                    }
                    if (x + 1 <= 7) {
                        if (field[y - 1][x + 1][0] === "b") {
                            to[y - 1][x + 1] = 2;
                        }
                    }
                    if (x - 1 >= 0 && this.last_pawn_step.length !== 0) {
                        if (y-1 === this.last_pawn_step[0] && x-1 === this.last_pawn_step[1] && this.last_pawn_step[0] === 2) {
                            to[y - 1][x - 1] = 2;
                        }
                    }
                    if (x + 1 <= 7 && this.last_pawn_step.length !== 0) {
                        if (y-1 === this.last_pawn_step[0] && x+1 === this.last_pawn_step[1] && this.last_pawn_step[0] === 2) {
                            to[y - 1][x + 1] = 2;
                        }
                    }
                }
            break;
            case "bp":
                if (y + 1 <= 7) {
                    if (field[y + 1][x] === 0) {
                        to[y + 1][x] = 1;
                        if (this.count_moves[y][x] === 0 && field[y + 2][x] === 0) {
                            to[y + 2][x] = 1;
                        }
                    }
                    if (x - 1 >= 0) {
                        if (field[y + 1][x - 1][0] === "w") {
                            to[y + 1][x - 1] = 2;
                        }
                    }
                    if (x + 1 <= 7) {
                        if (field[y + 1][x + 1][0] === "w") {
                            to[y + 1][x + 1] = 2;
                        }
                    }
                    if (x - 1 >= 0 && this.last_pawn_step.length !== 0) {
                        if (y+1 === this.last_pawn_step[0] && x-1 === this.last_pawn_step[1] && this.last_pawn_step[0] === 5) {
                            to[y + 1][x - 1] = 2;
                        }
                    }
                    if (x + 1 <= 7 && this.last_pawn_step.length !== 0) {
                        if (y+1 === this.last_pawn_step[0] && x+1 === this.last_pawn_step[1] && this.last_pawn_step[0] === 5) {
                            to[y + 1][x + 1] = 2;
                        }
                    }
                }
            break;
            case "bn":
                if (y - 1 >= 0) {
                    if (x - 2 >= 0) {
                        this.moveCheckPoint_unsafe(field, to, y-1, x-2, "bn");
                    }
                    if (x + 2 <= 7) {
                        this.moveCheckPoint_unsafe(field, to, y-1, x+2, "bn");
                    }
                }
                if (y - 2 >= 0) {
                    if (x - 1 >= 0) {
                        this.moveCheckPoint_unsafe(field, to, y-2, x-1, "bn");
                    }
                    if (x + 1 <= 7) {
                        this.moveCheckPoint_unsafe(field, to, y-2, x+1, "bn");
                    }
                }
        
                if (y + 1 <= 7) {
                    if (x - 2 >= 0) {
                        this.moveCheckPoint_unsafe(field, to, y+1, x-2, "bn");
                    }
                    if (x + 2 <= 7) {
                        this.moveCheckPoint_unsafe(field, to, y+1, x+2, "bn");
                    }
                }
                if (y + 2 <= 7) {
                    if (x - 1 >= 0) {
                        this.moveCheckPoint_unsafe(field, to, y+2, x-1, "bn");
                    }
                    if (x + 1 <= 7) {
                        this.moveCheckPoint_unsafe(field, to, y+2, x+1, "bn");
                    }
                }
            break;
            case "wn":
                if (y - 1 >= 0) {
                    if (x - 2 >= 0) {
                        this.moveCheckPoint_unsafe(field, to, y-1, x-2, "wn");
                    }
                    if (x + 2 <= 7) {
                        this.moveCheckPoint_unsafe(field, to, y-1, x+2, "wn");
                    }
                }
                if (y - 2 >= 0) {
                    if (x - 1 >= 0) {
                        this.moveCheckPoint_unsafe(field, to, y-2, x-1, "wn");
                    }
                    if (x + 1 <= 7) {
                        this.moveCheckPoint_unsafe(field, to, y-2, x+1, "wn");
                    }
                }
        
                if (y + 1 <= 7) {
                    if (x - 2 >= 0) {
                        this.moveCheckPoint_unsafe(field, to, y+1, x-2, "wn");
                    }
                    if (x + 2 <= 7) {
                        this.moveCheckPoint_unsafe(field, to, y+1, x+2, "wn");
                    }
                }
                if (y + 2 <= 7) {
                    if (x - 1 >= 0) {
                        this.moveCheckPoint_unsafe(field, to, y+2, x-1, "wn");
                    }
                    if (x + 1 <= 7) {
                        this.moveCheckPoint_unsafe(field, to, y+2, x+1, "wn");
                    }
                }
            break;
        }
    }
    
    checkPossibleMoves(name, y, x) {
        let field = this.chess_field;
    
        let ans = [[0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0]];
    
                let directionsDone = [0, 0, 0, 0, 0, 0, 0, 0];
                let directionsDoneFour = [0, 0, 0, 0];
    
        switch (name) {
        case "wk":
            
            if (y - 1 >= 0) {
                if (field[y - 1][x] === 0) {
                    ans[y-1][x] = this.checkKingDanger(y, x, y-1,x,[y-1,x],1,"wk");
                }
                if (field[y - 1][x][0] === "b") {
                    ans[y-1][x] = this.checkKingDanger(y, x, y-1,x,[y-1,x],2,"wk");
                }
                if (x - 1 >= 0) {
                    if (field[y - 1][x - 1] === 0) {
                        ans[y-1][x-1] = this.checkKingDanger(y, x, y-1,x-1,[y-1,x-1],1,"wk");
                    }
                    if (field[y - 1][x - 1][0] === "b") {
                        ans[y-1][x-1] = this.checkKingDanger(y, x, y-1,x-1,[y-1,x-1],2,"wk");
                    }
                }
                if (x + 1 <= 7) {
                    if (field[y - 1][x + 1] === 0) {
                        ans[y-1][x+1] = this.checkKingDanger(y, x, y-1,x+1,[y-1,x+1],1,"wk");
                    }
                    if (field[y - 1][x + 1][0] === "b") {
                        ans[y-1][x+1] = this.checkKingDanger(y, x, y-1,x+1,[y-1,x+1],2,"wk");
                    }
                }
            }
            if (y + 1 <= 7) {
        
                if (field[y + 1][x] === 0) {
                    ans[y+1][x] = this.checkKingDanger(y, x, y+1,x,[y+1,x],1,"wk");
                }
                if (field[y + 1][x][0] === "b") {
                    ans[y+1][x] = this.checkKingDanger(y, x, y+1,x,[y+1,x],2,"wk");
                }
        
                if (x - 1 >= 0) {
                    if (field[y + 1][x - 1] === 0) {
                        ans[y+1][x-1] = this.checkKingDanger(y, x, y+1,x-1,[y+1,x-1],1,"wk");
                    }
                    if (field[y + 1][x - 1][0] === "b") {
                        ans[y+1][x-1] = this.checkKingDanger(y, x, y+1,x-1,[y+1,x-1],2,"wk");
                    }
                }
                if (x + 1 <= 7) {
                    if (field[y + 1][x + 1] === 0) {
                        ans[y+1][x+1] = this.checkKingDanger(y, x, y+1,x+1,[y+1,x+1],1,"wk");
                    }
                    if (field[y + 1][x + 1][0] === "b") {
                        ans[y+1][x+1] = this.checkKingDanger(y, x, y+1,x+1,[y+1,x+1],2,"wk");
                    }
                }
            }
            if (x - 1 >= 0) {
                if (field[y][x - 1] === 0) {
                    ans[y][x-1] = this.checkKingDanger(y, x, y,x-1,[y,x-1],1,"wk");
                }
                if (field[y][x - 1][0] === "b") {
                    ans[y][x-1] = this.checkKingDanger(y, x, y,x-1,[y,x-1],2,"wk");
                }
            }
            if (x + 1 <= 7) {
                if (field[y][x + 1] === 0) {
                    ans[y][x+1] = this.checkKingDanger(y, x, y,x+1,[y,x+1],1,"wk");
                }
                if (field[y][x + 1][0] === "b") {
                    ans[y][x+1] = this.checkKingDanger(y, x, y,x+1,[y,x+1],2,"wk");
                }
            }
    
            if (!this.white_king_was_moved) {
                this.generateAllUnsafeMovesB();
                if (field[7][0] === "wc" && this.count_moves[7][0] === 0) {                
                    if (this.possible_black_moves[y][x - 1] === 0 && this.possible_black_moves[y][x - 2] === 0 && this.possible_black_moves[y][x] === 0) {
                        if (field[y][x - 1] === 0 && field[y][x - 2] === 0 && field[y][x - 3] === 0) {
                            ans[7][0] = 3;
                        }
                    }
                }
                if (field[7][7] === "wc" && this.count_moves[7][7] === 0) {
                    if (this.possible_black_moves[y][x + 1] === 0 && this.possible_black_moves[y][x + 2] === 0 && this.possible_black_moves[y][x] === 0) {
                        if (field[y][x + 1] === 0 && field[y][x + 2] === 0) {
                            ans[7][7] = 3;
                        }
                    }
                }
            }
    
            return ans;
        case "bk":
            if (y - 1 >= 0) {
                if (field[y - 1][x] === 0) {
                    ans[y-1][x] = this.checkKingDanger(y, x, y-1,x,[y-1,x],1,"bk");
                }
                if (field[y - 1][x][0] === "w") {
                    ans[y-1][x] = this.checkKingDanger(y, x, y-1,x,[y-1,x],2,"bk");
                }
                if (x - 1 >= 0) {
                    if (field[y - 1][x - 1] === 0) {
                        ans[y-1][x-1] = this.checkKingDanger(y, x, y-1,x-1,[y-1,x-1],1,"bk");
                    }
                    if (field[y - 1][x - 1][0] === "w") {
                        ans[y-1][x-1] = this.checkKingDanger(y, x, y-1,x-1,[y-1,x-1],2,"bk");
                    }
                }
                if (x + 1 <= 7) {
                    if (field[y - 1][x + 1] === 0) {
                        ans[y-1][x+1] = this.checkKingDanger(y, x, y-1,x+1,[y-1,x+1],1,"bk");
                    }
                    if (field[y - 1][x + 1][0] === "w") {
                        ans[y-1][x+1] = this.checkKingDanger(y, x, y-1,x+1,[y-1,x+1],2,"bk");
                    }
                }
            }
            if (y + 1 <= 7) {
        
                if (field[y + 1][x] === 0) {
                    ans[y+1][x] = this.checkKingDanger(y, x, y+1,x,[y+1,x],1,"bk");
                }
                if (field[y + 1][x][0] === "w") {
                    ans[y+1][x] = this.checkKingDanger(y, x, y+1,x,[y+1,x],2,"bk");
                }
        
                if (x - 1 >= 0) {
                    if (field[y + 1][x - 1] === 0) {
                        ans[y+1][x-1] = this.checkKingDanger(y, x, y+1,x-1,[y+1,x-1],1,"bk");
                    }
                    if (field[y + 1][x - 1][0] === "w") {
                        ans[y+1][x-1] = this.checkKingDanger(y, x, y+1,x-1,[y+1,x-1],2,"bk");
                    }
                }
                if (x + 1 <= 7) {
                    if (field[y + 1][x + 1] === 0) {
                        ans[y+1][x+1] = this.checkKingDanger(y, x, y+1,x+1,[y+1,x+1],1,"bk");
                    }
                    if (field[y + 1][x + 1][0] === "w") {
                        ans[y+1][x+1] = this.checkKingDanger(y, x, y+1,x+1,[y+1,x+1],2,"bk");
                    }
                }
            }
            if (x - 1 >= 0) {
                if (field[y][x - 1] === 0) {
                    ans[y][x-1] = this.checkKingDanger(y, x, y,x-1,[y,x-1],1,"bk");
                }
                if (field[y][x - 1][0] === "w") {
                    ans[y][x-1] = this.checkKingDanger(y, x, y,x-1,[y,x-1],2,"bk");
                }
            }
            if (x + 1 <= 7) {
                if (field[y][x + 1] === 0) {
                    ans[y][x+1] = this.checkKingDanger(y, x, y,x+1,[y,x+1],1,"bk");
                }
                if (field[y][x + 1][0] === "w") {
                    ans[y][x+1] = this.checkKingDanger(y, x, y,x+1,[y,x+1],2,"bk");
                }
            }
    
            if (!this.black_king_was_moved) {
                this.generateAllUnsafeMovesW();
                if (field[0][0] === "bc" && this.count_moves[0][0] === 0) {                
                    if (this.possible_white_moves[y][x - 1] === 0 && this.possible_white_moves[y][x - 2] === 0 && this.possible_white_moves[y][x] === 0) {
                        if (field[y][x - 1] === 0 && field[y][x - 2] === 0 && field[y][x - 3] === 0) {
                            ans[0][0] = 3;
                        }
                    }
                }
                if (field[0][7] === "bc" && this.count_moves[0][7] === 0) {
                    if (this.possible_white_moves[y][x + 1] === 0 && this.possible_white_moves[y][x + 2] === 0 && this.possible_white_moves[y][x] === 0) {
                        if (field[y][x + 1] === 0 && field[y][x + 2] === 0) {
                            ans[0][7] = 3;
                        }
                    }
                }
            }
    
            return ans;
        case "bq":
            for (let i = 1; i < 8 && directionsDone != [1, 1, 1, 1, 1, 1, 1, 1]; i++) {
                if (y - i >= 0) {
                    if (field[y - i][x] === 0 && directionsDone[0] == 0) {
                        
    
                        ans[y-i][x] = this.checkKingDanger(y, x, y-i,x,this.black_king_cords,1,"bq");
        
                    } else if (field[y - i][x][0] === "w" && directionsDone[0] == 0) {
                        
    
                        ans[y-i][x] = this.checkKingDanger(y, x, y-i,x,this.black_king_cords,2,"bq");
        
                        directionsDone[0] = 1;
                    } else {
                        directionsDone[0] = 1;
                    } 
            
                    if (x - i >= 0 && directionsDone[7] == 0) {
                        if (field[y - i][x - i] === 0) {
                            
                            ans[y-i][x-i] = this.checkKingDanger(y, x, y-i,x-i,this.black_king_cords,1,"bq");
        
                        } else if (field[y - i][x - i][0] === "w") {
                            
                            ans[y-i][x-i] = this.checkKingDanger(y, x, y-i,x-i,this.black_king_cords,2,"bq");
        
                            directionsDone[7] = 1;
                        } else {
                            directionsDone[7] = 1;
                        }
                    } else {
                        directionsDone[7] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDone[1] == 0) {
                        if (field[y - i][x + i] === 0) {
                            
                            ans[y-i][x+i] = this.checkKingDanger(y, x, y-i,x+i,this.black_king_cords,1,"bq");
        
                        } else if (field[y - i][x + i][0] === "w") {
                            
                            ans[y-i][x+i] = this.checkKingDanger(y, x, y-i,x+i,this.black_king_cords,2,"bq");
        
                            directionsDone[1] = 1;
                        } else {
                            directionsDone[1] = 1;
                        }
                    } else {
                        directionsDone[1] = 1;
                    }
                } else {
                    directionsDone[0] = 1;
                }
                
                if (y + i <= 7) {
                    if (field[y + i][x] === 0  && directionsDone[4] == 0) {
                        
                        ans[y+i][x] = this.checkKingDanger(y, x, y+i,x,this.black_king_cords,1,"bq");
        
                    } else if (field[y + i][x][0] === "w" && directionsDone[4] == 0) {
                        
                        ans[y+i][x] = this.checkKingDanger(y, x, y+i,x,this.black_king_cords,2,"bq");
        
                        directionsDone[4] = 1;
                    } else {
                        directionsDone[4] = 1;
                    }
            
                    if (x - i >= 0 && directionsDone[5] == 0) {
                        if (field[y + i][x - i] === 0) {
                            
                            ans[y+i][x-i] = this.checkKingDanger(y, x, y+i,x-i,this.black_king_cords,1,"bq");
        
                        } else if (field[y + i][x - i][0] === "w") {
                            
                            ans[y+i][x-i] = this.checkKingDanger(y, x, y+i,x-i,this.black_king_cords,2,"bq");
        
                            directionsDone[5] = 1;
                        } else {
                            directionsDone[5] = 1;
                        }
                    } else {
                        directionsDone[5] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDone[3] == 0) {
                        if (field[y + i][x + i] === 0) {
                            ans[y+i][x+i] = this.checkKingDanger(y, x, y+i,x+i,this.black_king_cords,1,"bq");
                        } else if (field[y + i][x + i][0] === "w") {
                            ans[y+i][x+i] = this.checkKingDanger(y, x, y+i,x+i,this.black_king_cords,2,"bq");
                            directionsDone[3] = 1;
                        } else {
                            directionsDone[3] = 1;
                        }
                    } else {
                        directionsDone[3] = 1;
                    }
                } else {
                    directionsDone[4] = 1;
                }
        
                if (x - i >= 0 && directionsDone[6] == 0) {
                    if (field[y][x - i] === 0) {
                        ans[y][x-i] = this.checkKingDanger(y, x, y,x-i,this.black_king_cords,1,"bq");
                    } else if (field[y][x - i][0] === "w") {
                        ans[y][x-i] = this.checkKingDanger(y, x, y,x-i,this.black_king_cords,2,"bq");
                        directionsDone[6] = 1;
                    } else {
                        directionsDone[6] = 1;
                    }
                } else {
                    directionsDone[6] = 1;
                }
        
                if (x + i <= 7 && directionsDone[2] == 0) {
                    if (field[y][x + i] === 0) {
                        ans[y][x+i] = this.checkKingDanger(y, x, y,x+i,this.black_king_cords,1,"bq");
                    } else if (field[y][x + i][0] === "w") {
                        ans[y][x+i] = this.checkKingDanger(y, x, y,x+i,this.black_king_cords,2,"bq");
                        directionsDone[2] = 1;
                    } else {
                        directionsDone[2] = 1;
                    }
                } else {
                    directionsDone[2] = 1;
                }
            }
    
            return ans;
        case "wq":
            for (let i = 1; i < 8 && directionsDone != [1, 1, 1, 1, 1, 1, 1, 1]; i++) {
                
                if (y - i >= 0) {
                    if (field[y - i][x] === 0 && directionsDone[0] == 0) {
                        
    
                        ans[y-i][x] = this.checkKingDanger(y, x, y-i,x,this.white_king_cords,1,"wq");
        
                    } else if (field[y - i][x][0] === "b" && directionsDone[0] == 0) {
                        
    
                        ans[y-i][x] = this.checkKingDanger(y, x, y-i,x,this.white_king_cords,2,"wq");
        
                        directionsDone[0] = 1;
                    } else {
                        directionsDone[0] = 1;
                    } 
            
                    if (x - i >= 0 && directionsDone[7] == 0) {
                        if (field[y - i][x - i] === 0) {
                            
                            ans[y-i][x-i] = this.checkKingDanger(y, x, y-i,x-i,this.white_king_cords,1,"wq");
        
                        } else if (field[y - i][x - i][0] === "b") {
                            
                            ans[y-i][x-i] = this.checkKingDanger(y, x, y-i,x-i,this.white_king_cords,2,"wq");
        
                            directionsDone[7] = 1;
                        } else {
                            directionsDone[7] = 1;
                        }
                    } else {
                        directionsDone[7] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDone[1] == 0) {
                        if (field[y - i][x + i] === 0) {
                            
                            ans[y-i][x+i] = this.checkKingDanger(y, x, y-i,x+i,this.white_king_cords,1,"wq");
        
                        } else if (field[y - i][x + i][0] === "b") {
                            
                            ans[y-i][x+i] = this.checkKingDanger(y, x, y-i,x+i,this.white_king_cords,2,"wq");
        
                            directionsDone[1] = 1;
                        } else {
                            directionsDone[1] = 1;
                        }
                    } else {
                        directionsDone[1] = 1;
                    }
                } else {
                    directionsDone[0] = 1;
                }
                
                if (y + i <= 7) {
                    if (field[y + i][x] === 0  && directionsDone[4] == 0) {
                        
                        ans[y+i][x] = this.checkKingDanger(y, x, y+i,x,this.white_king_cords,1,"wq");
        
                    } else if (field[y + i][x][0] === "b" && directionsDone[4] == 0) {
                        
                        ans[y+i][x] = this.checkKingDanger(y, x, y+i,x,this.white_king_cords,2,"wq");
        
                        directionsDone[4] = 1;
                    } else {
                        directionsDone[4] = 1;
                    }
            
                    if (x - i >= 0 && directionsDone[5] == 0) {
                        if (field[y + i][x - i] === 0) {
                            
                            ans[y+i][x-i] = this.checkKingDanger(y, x, y+i,x-i,this.white_king_cords,1,"wq");
        
                        } else if (field[y + i][x - i][0] === "b") {
                            
                            ans[y+i][x-i] = this.checkKingDanger(y, x, y+i,x-i,this.white_king_cords,2,"wq");
        
                            directionsDone[5] = 1;
                        } else {
                            directionsDone[5] = 1;
                        }
                    } else {
                        directionsDone[5] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDone[3] == 0) {
                        if (field[y + i][x + i] === 0) {
                            ans[y+i][x+i] = this.checkKingDanger(y, x, y+i,x+i,this.white_king_cords,1,"wq");
                        } else if (field[y + i][x + i][0] === "b") {
                            ans[y+i][x+i] = this.checkKingDanger(y, x, y+i,x+i,this.white_king_cords,2,"wq");
                            directionsDone[3] = 1;
                        } else {
                            directionsDone[3] = 1;
                        }
                    } else {
                        directionsDone[3] = 1;
                    }
                } else {
                    directionsDone[4] = 1;
                }
        
                if (x - i >= 0 && directionsDone[6] == 0) {
                    if (field[y][x - i] === 0) {
                        ans[y][x-i] = this.checkKingDanger(y, x, y,x-i,this.white_king_cords,1,"wq");
                    } else if (field[y][x - i][0] === "b") {
                        ans[y][x-i] = this.checkKingDanger(y, x, y,x-i,this.white_king_cords,2,"wq");
                        directionsDone[6] = 1;
                    } else {
                        directionsDone[6] = 1;
                    }
                } else {
                    directionsDone[6] = 1;
                }
        
                if (x + i <= 7 && directionsDone[2] == 0) {
                    if (field[y][x + i] === 0) {
                        ans[y][x+i] = this.checkKingDanger(y, x, y,x+i,this.white_king_cords,1,"wq");
                    } else if (field[y][x + i][0] === "b") {
                        ans[y][x+i] = this.checkKingDanger(y, x, y,x+i,this.white_king_cords,2,"wq");
                        directionsDone[2] = 1;
                    } else {
                        directionsDone[2] = 1;
                    }
                } else {
                    directionsDone[2] = 1;
                }
            }
    
            return ans;
        case "bb":
            for (let i = 1; i < 8 && directionsDoneFour != [1, 1, 1, 1]; i++) {
                if (y - i >= 0) {
            
                    if (x - i >= 0 && directionsDone[0] == 0) {
                        if (field[y - i][x - i] === 0) {
                            
                            ans[y-i][x-i] = this.checkKingDanger(y, x, y-i,x-i,this.black_king_cords,1,"bb");
        
                        } else if (field[y - i][x - i][0] === "w") {
                            
                            ans[y-i][x-i] = this.checkKingDanger(y, x, y-i,x-i,this.black_king_cords,2,"bb");
        
                            directionsDone[0] = 1;
                        } else {
                            directionsDone[0] = 1;
                        }
                    } else {
                        directionsDone[0] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDone[1] == 0) {
                        if (field[y - i][x + i] === 0) {
                            
                            ans[y-i][x+i] = this.checkKingDanger(y, x, y-i,x+i,this.black_king_cords,1,"bb");
        
                        } else if (field[y - i][x + i][0] === "w") {
                            
                            ans[y-i][x+i] = this.checkKingDanger(y, x, y-i,x+i,this.black_king_cords,2,"bb");
        
                            directionsDone[1] = 1;
                        } else {
                            directionsDone[1] = 1;
                        }
                    } else {
                        directionsDone[1] = 1;
                    }
                } else {
                    directionsDone[0] = 1;
                    directionsDone[1] = 1;
                }
                
                if (y + i <= 7) {
            
                    if (x - i >= 0 && directionsDone[3] == 0) {
                        if (field[y + i][x - i] === 0) {
                            
                            ans[y+i][x-i] = this.checkKingDanger(y, x, y+i,x-i,this.black_king_cords,1,"bb");
        
                        } else if (field[y + i][x - i][0] === "w") {
                            
                            ans[y+i][x-i] = this.checkKingDanger(y, x, y+i,x-i,this.black_king_cords,2,"bb");
        
                            directionsDone[3] = 1;
                        } else {
                            directionsDone[3] = 1;
                        }
                    } else {
                        directionsDone[3] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDone[2] == 0) {
                        if (field[y + i][x + i] === 0) {
                            ans[y+i][x+i] = this.checkKingDanger(y, x, y+i,x+i,this.black_king_cords,1,"bb");
                        } else if (field[y + i][x + i][0] === "w") {
                            ans[y+i][x+i] = this.checkKingDanger(y, x, y+i,x+i,this.black_king_cords,2,"bb");
                            directionsDone[2] = 1;
                        } else {
                            directionsDone[2] = 1;
                        }
                    } else {
                        directionsDone[2] = 1;
                    }
                } else {
                    directionsDone[2] = 1;
                    directionsDone[3] = 1;
                }
            }
    
            return ans;
        case "wb":
            for (let i = 1; i < 8 && directionsDoneFour != [1, 1, 1, 1]; i++) {
                if (y - i >= 0) {
            
                    if (x - i >= 0 && directionsDone[0] == 0) {
                        if (field[y - i][x - i] === 0) {
                            
                            ans[y-i][x-i] = this.checkKingDanger(y, x, y-i,x-i,this.white_king_cords,1,"wb");
        
                        } else if (field[y - i][x - i][0] === "b") {
                            
                            ans[y-i][x-i] = this.checkKingDanger(y, x, y-i,x-i,this.white_king_cords,2,"wb");
        
                            directionsDone[0] = 1;
                        } else {
                            directionsDone[0] = 1;
                        }
                    } else {
                        directionsDone[0] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDone[1] == 0) {
                        if (field[y - i][x + i] === 0) {
                            
                            ans[y-i][x+i] = this.checkKingDanger(y, x, y-i,x+i,this.white_king_cords,1,"wb");
        
                        } else if (field[y - i][x + i][0] === "b") {
                            
                            ans[y-i][x+i] = this.checkKingDanger(y, x, y-i,x+i,this.white_king_cords,2,"wb");
        
                            directionsDone[1] = 1;
                        } else {
                            directionsDone[1] = 1;
                        }
                    } else {
                        directionsDone[1] = 1;
                    }
                } else {
                    directionsDone[0] = 1;
                    directionsDone[1] = 1;
                }
                
                if (y + i <= 7) {
            
                    if (x - i >= 0 && directionsDone[3] == 0) {
                        if (field[y + i][x - i] === 0) {
                            
                            ans[y+i][x-i] = this.checkKingDanger(y, x, y+i,x-i,this.white_king_cords,1,"wb");
        
                        } else if (field[y + i][x - i][0] === "b") {
                            
                            ans[y+i][x-i] = this.checkKingDanger(y, x, y+i,x-i,this.white_king_cords,2,"wb");
        
                            directionsDone[3] = 1;
                        } else {
                            directionsDone[3] = 1;
                        }
                    } else {
                        directionsDone[3] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDone[2] == 0) {
                        if (field[y + i][x + i] === 0) {
                            ans[y+i][x+i] = this.checkKingDanger(y, x, y+i,x+i,this.white_king_cords,1,"wb");
                        } else if (field[y + i][x + i][0] === "b") {
                            ans[y+i][x+i] = this.checkKingDanger(y, x, y+i,x+i,this.white_king_cords,2,"wb");
                            directionsDone[2] = 1;
                        } else {
                            directionsDone[2] = 1;
                        }
                    } else {
                        directionsDone[2] = 1;
                    }
                } else {
                    directionsDone[2] = 1;
                    directionsDone[3] = 1;
                }
            }
    
            return ans;
        case "bc":
            for (let i = 1; i < 9 && directionsDoneFour != [1, 1, 1, 1]; i++) {
                
                if (y - i >= 0 && directionsDoneFour[0] == 0) {
                    if (field[y - i][x] === 0) {
                        ans[y-i][x] = this.checkKingDanger(y, x, y-i,x,this.black_king_cords,1,"bc");
                    } else if (field[y - i][x][0] === "w") {
                        ans[y-i][x] = this.checkKingDanger(y, x, y-i,x,this.black_king_cords,2,"bc");
                        directionsDoneFour[0] = 1;
                    } else {
                        directionsDoneFour[0] = 1;
                    }
                } else {
                    directionsDoneFour[0] = 1;
                }
                
                if (x + i <= 7 && directionsDoneFour[1] == 0) {
                    if (field[y][x + i] === 0) {
                        ans[y][x+i] = this.checkKingDanger(y, x, y,x+i,this.black_king_cords,1,"bc");
                    } else if (field[y][x + i][0] === "w") {
                        ans[y][x+i] = this.checkKingDanger(y, x, y,x+i,this.black_king_cords,2,"bc");
                        directionsDoneFour[1] = 1;
                    } else {
                        directionsDoneFour[1] = 1;
                    }
                } else {
                    directionsDoneFour[1] = 1;
                }
        
                if (y + i <= 7 && directionsDoneFour[2] == 0) {
                    if (field[y + i][x] === 0) {
                        ans[y+i][x] = this.checkKingDanger(y, x, y+i,x,this.black_king_cords,1,"bc");
                    } else if (field[y + i][x][0] === "w") {
                        ans[y+i][x] = this.checkKingDanger(y, x, y+i,x,this.black_king_cords,2,"bc");
                        directionsDoneFour[2] = 1;
                    } else {
                        directionsDoneFour[2] = 1;
                    }
                } else {
                    directionsDoneFour[2] = 1;
                }
                
                if (x - i >= 0 && directionsDoneFour[3] == 0) {
                    if (field[y][x - i] === 0) {
                        ans[y][x-i] = this.checkKingDanger(y, x, y,x-i,this.black_king_cords,1,"bc");
                    } else if (field[y][x - i][0] === "w") {
                        ans[y][x-i] = this.checkKingDanger(y, x, y,x-i,this.black_king_cords,2,"bc");
                        directionsDoneFour[3] = 1;
                    } else {
                        directionsDoneFour[3] = 1;
                    }
                } else {
                    directionsDoneFour[3] = 1;
                }
            }
            return ans;
        case "wc":
            for (let i = 1; i < 9 && directionsDoneFour != [1, 1, 1, 1]; i++) {
                    
                if (y - i >= 0 && directionsDoneFour[0] == 0) {
                    if (field[y - i][x] === 0) {
                        ans[y-i][x] = this.checkKingDanger(y, x, y-i,x,this.white_king_cords,1,"wc");
                    } else if (field[y - i][x][0] === "b") {
                        ans[y-i][x] = this.checkKingDanger(y, x, y-i,x,this.white_king_cords,2,"wc");
                        directionsDoneFour[0] = 1;
                    } else {
                        directionsDoneFour[0] = 1;
                    }
                } else {
                    directionsDoneFour[0] = 1;
                }
                    
                if (x + i <= 7 && directionsDoneFour[1] == 0) {
                    if (field[y][x + i] === 0) {
                        ans[y][x+i] = this.checkKingDanger(y, x, y,x+i,this.white_king_cords,1,"wc");
                    } else if (field[y][x + i][0] === "b") {
                        ans[y][x+i] = this.checkKingDanger(y, x, y,x+i,this.white_king_cords,2,"wc");
                        directionsDoneFour[1] = 1;
                    } else {
                        directionsDoneFour[1] = 1;
                    }
                } else {
                    directionsDoneFour[1] = 1;
                }
            
                if (y + i <= 7 && directionsDoneFour[2] == 0) {
                    if (field[y + i][x] === 0) {
                        ans[y+i][x] = this.checkKingDanger(y, x, y+i,x,this.white_king_cords,1,"wc");
                    } else if (field[y + i][x][0] === "b") {
                        ans[y+i][x] = this.checkKingDanger(y, x, y+i,x,this.white_king_cords,2,"wc");
                        directionsDoneFour[2] = 1;
                    } else {
                        directionsDoneFour[2] = 1;
                    }
                } else {
                    directionsDoneFour[2] = 1;
                }
                    
                if (x - i >= 0 && directionsDoneFour[3] == 0) {
                    if (field[y][x - i] === 0) {
                        ans[y][x-i] = this.checkKingDanger(y, x, y,x-i,this.white_king_cords,1,"wc");
                    } else if (field[y][x - i][0] === "b") {
                        ans[y][x-i] = this.checkKingDanger(y, x, y,x-i,this.white_king_cords,2,"wc");
                        directionsDoneFour[3] = 1;
                    } else {
                        directionsDoneFour[3] = 1;
                    }
                } else {
                    directionsDoneFour[3] = 1;
                }
            }
            return ans;
        case "bp":
            if (y + 1 <= 7) {
                if (field[y + 1][x] === 0) {
                    ans[y + 1][x] = this.checkKingDanger(y, x, y+1,x,this.black_king_cords,1,"bp");
                    if (this.count_moves[y][x] === 0 && field[y + 2][x] === 0) {
                        ans[y + 2][x] = this.checkKingDanger(y, x, y+2,x,this.black_king_cords,1,"bp");
                    }
                }
                if (x - 1 >= 0) {
                    if (field[y + 1][x - 1][0] === "w") {
                        ans[y + 1][x - 1] = this.checkKingDanger(y, x, y+1,x-1,this.black_king_cords,2,"bp");
                    }
                }
                if (x + 1 <= 7) {
                    if (field[y + 1][x + 1][0] === "w") {
                        ans[y + 1][x + 1] = this.checkKingDanger(y, x, y+1,x+1,this.black_king_cords,2,"bp");
                    }
                }
                if (x - 1 >= 0 && this.last_pawn_step.length !== 0) {
                    if (y+1 === this.last_pawn_step[0] && x-1 === this.last_pawn_step[1] && this.last_pawn_step[0] === 5) {
                        ans[y + 1][x - 1] = this.checkKingDanger(y, x, y+1,x-1,this.black_king_cords,2,"bp");
                    }
                }
                if (x + 1 <= 7 && this.last_pawn_step.length !== 0) {
                    if (y+1 === this.last_pawn_step[0] && x+1 === this.last_pawn_step[1] && this.last_pawn_step[0] === 5) {
                        ans[y + 1][x + 1] = this.checkKingDanger(y, x, y+1,x+1,this.black_king_cords,2,"bp");
                    }
                }
            }
            return ans;
        case "wp":
            if (y - 1 >= 0) {
                if (field[y - 1][x] === 0) {
                    ans[y - 1][x] = this.checkKingDanger(y, x, y-1,x,this.white_king_cords,1,"wp");
                    if (this.count_moves[y][x] === 0 && field[y - 2][x] === 0) {
                        ans[y - 2][x] = this.checkKingDanger(y, x, y-2,x,this.white_king_cords,1,"wp");
                    }
                }
                if (x - 1 >= 0) {
                    if (field[y - 1][x - 1][0] === "b") {
                        ans[y - 1][x - 1] = this.checkKingDanger(y, x, y-1,x-1,this.white_king_cords,2,"wp");
                    }
                }
                if (x + 1 <= 7) {
                    if (field[y - 1][x + 1][0] === "b") {
                        ans[y - 1][x + 1] = this.checkKingDanger(y, x, y-1,x+1,this.white_king_cords,2,"wp");
                    }
                }
                if (x - 1 >= 0 && this.last_pawn_step.length !== 0) {
                    if (y-1 === this.last_pawn_step[0] && x-1 === this.last_pawn_step[1] && this.last_pawn_step[0] === 2) {
                        ans[y - 1][x - 1] = this.checkKingDanger(y, x, y-1,x-1,this.white_king_cords,2,"wp");
                    }
                }
                if (x + 1 <= 7 && this.last_pawn_step.length !== 0) {
                    if (y-1 === this.last_pawn_step[0] && x+1 === this.last_pawn_step[1] && this.last_pawn_step[0] === 2) {
                        ans[y - 1][x + 1] = this.checkKingDanger(y, x, y-1,x+1,this.white_king_cords,2,"wp");
                    }
                }
            }
            return ans;
        case "bn":
            if (y - 1 >= 0) {
                if (x - 2 >= 0) {
                    if (field[y - 1][x - 2] === 0) {
                        ans[y - 1][x - 2] = this.checkKingDanger(y, x, y-1,x-2,this.black_king_cords,1,"bn");
                    } else if (field[y - 1][x - 2][0] === "w") {
                        ans[y - 1][x - 2] = this.checkKingDanger(y, x, y-1,x-2,this.black_king_cords,2,"bn");
                    }
                }
                if (x + 2 <= 7) {
                    if (field[y - 1][x + 2] === 0) {
                        ans[y - 1][x + 2] = this.checkKingDanger(y, x, y-1,x+2,this.black_king_cords,1,"bn");
                    } else if (field[y - 1][x + 2][0] === "w") {
                        ans[y - 1][x + 2] = this.checkKingDanger(y, x, y-1,x+2,this.black_king_cords,2,"bn");
                    }
                }
            }
            if (y - 2 >= 0) {
                if (x - 1 >= 0) {
                    if (field[y - 2][x - 1] === 0) {
                        ans[y - 2][x - 1] = this.checkKingDanger(y, x, y-2,x-1,this.black_king_cords,1,"bn");
                    } else if (field[y - 2][x - 1][0] === "w") {
                        ans[y - 2][x - 1] = this.checkKingDanger(y, x, y-2,x-1,this.black_king_cords,2,"bn");
                    }
                }
                if (x + 1 <= 7) {
                    if (field[y - 2][x + 1] === 0) {
                        ans[y - 2][x + 1] = this.checkKingDanger(y, x, y-2,x+1,this.black_king_cords,1,"bn");
                    } else if (field[y - 2][x + 1][0] === "w") {
                        ans[y - 2][x + 1] = this.checkKingDanger(y, x, y-2,x+1,this.black_king_cords,2,"bn");
                    }
                }
            }
    
            if (y + 1 <= 7) {
                if (x - 2 >= 0) {
                    if (field[y + 1][x - 2] === 0) {
                        ans[y + 1][x - 2] = this.checkKingDanger(y, x, y+1,x-2,this.black_king_cords,1,"bn");
                    } else if (field[y + 1][x - 2][0] === "w") {
                        ans[y + 1][x - 2] = this.checkKingDanger(y, x, y+1,x-2,this.black_king_cords,2,"bn");
                    }
                }
                if (x + 2 <= 7) {
                    if (field[y + 1][x + 2] === 0) {
                        ans[y + 1][x + 2] = this.checkKingDanger(y, x, y+1,x+2,this.black_king_cords,1,"bn");
                    } else if (field[y + 1][x + 2][0] === "w") {
                        ans[y + 1][x + 2] = this.checkKingDanger(y, x, y+1,x+2,this.black_king_cords,2,"bn");
                    }
                }
            }
            if (y + 2 <= 7) {
                if (x - 1 >= 0) {
                    if (field[y + 2][x - 1] === 0) {
                        ans[y + 2][x - 1] = this.checkKingDanger(y, x, y+2,x-1,this.black_king_cords,1,"bn");
                    } else if (field[y + 2][x - 1][0] === "w") {
                        ans[y + 2][x - 1] = this.checkKingDanger(y, x, y+2,x-1,this.black_king_cords,2,"bn");
                    }
                }
                if (x + 1 <= 7) {
                    if (field[y + 2][x + 1] === 0) {
                        ans[y + 2][x + 1] = this.checkKingDanger(y, x, y+2,x+1,this.black_king_cords,1,"bn");
                    } else if (field[y + 2][x + 1][0] === "w") {
                        ans[y + 2][x + 1] = this.checkKingDanger(y, x, y+2,x+1,this.black_king_cords,2,"bn");
                    }
                }
            }
            return ans;
        case "wn":
        if (y - 1 >= 0) {
            if (x - 2 >= 0) {
                if (field[y - 1][x - 2] === 0) {
                    ans[y - 1][x - 2] = this.checkKingDanger(y, x, y-1,x-2,this.white_king_cords,1,"wn");
                } else if (field[y - 1][x - 2][0] === "b") {
                    ans[y - 1][x - 2] = this.checkKingDanger(y, x, y-1,x-2,this.white_king_cords,2,"wn");
                }
            }
            if (x + 2 <= 7) {
                if (field[y - 1][x + 2] === 0) {
                    ans[y - 1][x + 2] = this.checkKingDanger(y, x, y-1,x+2,this.white_king_cords,1,"wn");
                } else if (field[y - 1][x + 2][0] === "b") {
                    ans[y - 1][x + 2] = this.checkKingDanger(y, x, y-1,x+2,this.white_king_cords,2,"wn");
                }
            }
        }
        if (y - 2 >= 0) {
            if (x - 1 >= 0) {
                if (field[y - 2][x - 1] === 0) {
                    ans[y - 2][x - 1] = this.checkKingDanger(y, x, y-2,x-1,this.white_king_cords,1,"wn");
                } else if (field[y - 2][x - 1][0] === "b") {
                    ans[y - 2][x - 1] = this.checkKingDanger(y, x, y-2,x-1,this.white_king_cords,2,"wn");
                }
            }
            if (x + 1 <= 7) {
                if (field[y - 2][x + 1] === 0) {
                    ans[y - 2][x + 1] = this.checkKingDanger(y, x, y-2,x+1,this.white_king_cords,1,"wn");
                } else if (field[y - 2][x + 1][0] === "b") {
                    ans[y - 2][x + 1] = this.checkKingDanger(y, x, y-2,x+1,this.white_king_cords,2,"wn");
                }
            }
        }
    
        if (y + 1 <= 7) {
            if (x - 2 >= 0) {
                if (field[y + 1][x - 2] === 0) {
                    ans[y + 1][x - 2] = this.checkKingDanger(y, x, y+1,x-2,this.white_king_cords,1,"wn");
                } else if (field[y + 1][x - 2][0] === "b") {
                    ans[y + 1][x - 2] = this.checkKingDanger(y, x, y+1,x-2,this.white_king_cords,2,"wn");
                }
            }
            if (x + 2 <= 7) {
                if (field[y + 1][x + 2] === 0) {
                    ans[y + 1][x + 2] = this.checkKingDanger(y, x, y+1,x+2,this.white_king_cords,1,"wn");
                } else if (field[y + 1][x + 2][0] === "b") {
                    ans[y + 1][x + 2] = this.checkKingDanger(y, x, y+1,x+2,this.white_king_cords,2,"wn");
                }
            }
        }
        if (y + 2 <= 7) {
            if (x - 1 >= 0) {
                if (field[y + 2][x - 1] === 0) {
                    ans[y + 2][x - 1] = this.checkKingDanger(y, x, y+2,x-1,this.white_king_cords,1,"wn");
                } else if (field[y + 2][x - 1][0] === "b") {
                    ans[y + 2][x - 1] = this.checkKingDanger(y, x, y+2,x-1,this.white_king_cords,2,"wn");
                }
            }
            if (x + 1 <= 7) {
                if (field[y + 2][x + 1] === 0) {
                    ans[y + 2][x + 1] = this.checkKingDanger(y, x, y+2,x+1,this.white_king_cords,1,"wn");
                } else if (field[y + 2][x + 1][0] === "b") {
                    ans[y + 2][x + 1] = this.checkKingDanger(y, x, y+2,x+1,this.white_king_cords,2,"wn");
                }
            }
        }
        return ans;
    }
    }
    
    checkKingDanger(y, x, y_to, x_to, KingCords, placeType, figureName) {
        let temp = this.chess_field[y_to][x_to];
        this.chess_field[y][x] = 0;
        this.chess_field[y_to][x_to] = figureName;
        (this.turn === "white" ? this.generateAllUnsafeMovesB() : this.generateAllUnsafeMovesW());
        this.chess_field[y][x] = figureName;
        this.chess_field[y_to][x_to] = temp;
        if ((figureName[0] === "w" ? this.possible_black_moves : this.possible_white_moves)[KingCords[0]][KingCords[1]] === 0) {
            return placeType;
        } else {
            return 0;
        }
    }
    
    moveCheckPoint_unsafe(currentField, possiableMovesArrey, y_to, x_to, name) {
        if (currentField[y_to][x_to] === 0) {
            possiableMovesArrey[y_to][x_to] = 1
        }
        if (currentField[y_to][x_to][0] === (name[0] === "w" ? "b" : "w")) {
            possiableMovesArrey[y_to][x_to] = 2
        }
    }
    
    moveCheckRay_unsafe(currentField, possiableMovesArrey, y_to, x_to, name, directionsDone, currentRay) {
        if (currentField[y_to][x_to] === 0 && directionsDone[currentRay] == 0) {
            possiableMovesArrey[y_to][x_to] = 1;
        } else if (currentField[y_to][x_to][0] === (name[0] === "w" ? "b" : "w") && directionsDone[currentRay] == 0) {
            possiableMovesArrey[y_to][x_to] = 2;
            directionsDone[currentRay] = 1;
        } else {
            directionsDone[currentRay] = 1;
        }
    }

    checkWin() {
        let onlyKings = true;

        for (let i = 0; i < 8; i++) {
            if (!onlyKings) {
                break;
            }
            for (let j = 0; j < 8; j++) {
                if (this.chess_field[i][j] !== 0 && this.chess_field[i][j] !== "wk" && this.chess_field[i][j] !== "bk") {
                    onlyKings = false;
                    break;
                }
            }
        }

        if (onlyKings) {
            return [true, "Ничья!", "Остались только короли.", ""] // 0-is-end? 1-title 2-description 3-winner-color
        }
    
        if (this.turn === "white") {
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    if (this.chess_field[i][j][0] === "w") {
                        if (JSON.stringify(this.moves[String(i) + String(j)]) !== JSON.stringify([[0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0], 
                        [0, 0, 0, 0, 0, 0, 0, 0], 
                        [0, 0, 0, 0, 0, 0, 0, 0], 
                        [0, 0, 0, 0, 0, 0, 0, 0], 
                        [0, 0, 0, 0, 0, 0, 0, 0], 
                        [0, 0, 0, 0, 0, 0, 0, 0]])) {
                            return [false, "", "", ""] // 0-is-end? 1-title 2-description 3-winner-color
                        }
                    }
                }
            }
        } else {
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    if (this.chess_field[i][j][0] === "b") {
                        if (JSON.stringify(this.moves[String(i) + String(j)]) !== JSON.stringify([[0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0], 
                        [0, 0, 0, 0, 0, 0, 0, 0], 
                        [0, 0, 0, 0, 0, 0, 0, 0], 
                        [0, 0, 0, 0, 0, 0, 0, 0], 
                        [0, 0, 0, 0, 0, 0, 0, 0], 
                        [0, 0, 0, 0, 0, 0, 0, 0]])) {
                            return [false, "", "", ""] // 0-is-end? 1-title 2-description 3-winner-color
                        }
                    }
                }
            }
        }
        
        if (this.turn === "white") {
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    if (this.chess_field[i][j][0] === "b") {
                        if (this.moves[String(i) + String(j)][this.white_king_cords[0]][this.white_king_cords[1]] !== 0) {
                            return [true, (this.turn === "white" ? "Черные одержали победу!" : "Белые одержали победу!"), "Может в следующий раз...", (this.turn === "white" ? "b" : "w")] // 0-is-end? 1-title 2-description 3-winner-color
                        }
                    }
                }
            }
        } else {
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    if (this.chess_field[i][j][0] === "w") {
                        if (this.moves[String(i) + String(j)][this.black_king_cords[0]][this.black_king_cords[1]] !== 0) {
                            return [true, (this.turn === "white" ? "Черные одержали победу!" : "Белые одержали победу!"), "Может в следующий раз...", (this.turn === "white" ? "b" : "w")] // 0-is-end? 1-title 2-description 3-winner-color
                        }
                    }
                }
            }
        }
    
        return [true, "Ничья!", 'Вроде это называется "Пат".', ""] // 0-is-end? 1-title 2-description 3-winner-color
    }

    get_allowed_pieces_pick(turn) {
        if (turn === "white") {
            return white_pieces_pick;
        } else if (turn === "black") {
            return black_pieces_pick;
        } else {
            return null;
        }
    }
}

module.exports = chessLogic;