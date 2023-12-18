const chess_field_places = [["place11", "place12", "place13", "place14", "place15", "place16", "place17", "place18"],
                ["place21", "place22", "place23", "place24", "place25", "place26", "place27", "place28"], 
                ["place31", "place32", "place33", "place34", "place35", "place36", "place37", "place38"], 
                ["place41", "place42", "place43", "place44", "place45", "place46", "place47", "place48"], 
                ["place51", "place52", "place53", "place54", "place55", "place56", "place57", "place58"], 
                ["place61", "place62", "place63", "place64", "place65", "place66", "place67", "place68"], 
                ["place71", "place72", "place73", "place74", "place75", "place76", "place77", "place78"], 
                ["place81", "place82", "place83", "place84", "place85", "place86", "place87", "place88"]];

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

        this.beaten_pieces_white = [];
        this.beaten_pieces_black = [];

        this.move_history = [];

        this.residual = {
            y_from: undefined,
            x_from: undefined,
            y_to: undefined,
            x_to: undefined,
            y_from2: undefined,
            x_from2: undefined,
            y_to2: undefined,
            x_to2: undefined,
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

        this.turn = "white";
    }

    arrangeFigures() {
        // clearPossibleMovesFull();
    
        // if (rasidual.y_from !== undefined) {
        //     window.document.getElementById(chessFieldPlaces[rasidual.y_from][rasidual.x_from]).style.backgroundColor = userOptionalRights.color_rasidual[0];
        //     window.document.getElementById(chessFieldPlaces[rasidual.y_to][rasidual.x_to]).style.backgroundColor = userOptionalRights.color_rasidual[0];
        // }
    
        // if (rasidual.y_from2 !== undefined) {
        //     window.document.getElementById(chessFieldPlaces[rasidual.y_from2][rasidual.x_from2]).style.backgroundColor = userOptionalRights.color_rasidual2[0];
        //     window.document.getElementById(chessFieldPlaces[rasidual.y_to2][rasidual.x_to2]).style.backgroundColor = userOptionalRights.color_rasidual2[0];
        // }
    
        this.chess_field.forEach((i, y) => {i.forEach((j, x) => {
                if (j !== 0) {
                    generateMovesWithoutMap(j,y,x);
                    
                    //client
                    // let place = window.document.getElementById(`place${y+1}${x+1}`);
                    // let figure = document.createElement("div");
                    // figure.classList.add("figure");
                    // figure.classList.add(j);
                    // place.appendChild(figure);
    
                    // figure.addEventListener("mouseover", eventShowPossibleMoves);
                    // figure.addEventListener("mouseout", eventClearPossibleMoves);
                    // place.addEventListener("click", eventSelectFigureSmart);
                }
                if (j === "wk") {
                    this.white_king_cords = [y,x];
                } else if (j === "bk") {
                    this.black_king_cords = [y,x];
                }
            })});
        
        //sus
        // if (userOptionalRights.visible_double_jump[0]) {
        //     showPawnStep();
        // }

        //sus
        // if (userOptionalRights.visible_turn[0]) {
        //     showTurn();
        // }

        //sus
        // dragStartEventAdd();
        checkWin();
    }
}

function generateMovesWithoutMap(j, y, x) {
    if (turn[0] === j[0]) {
        moves[String(y)+String(x)] = checkPossibleMoves(j, y, x);
    } else {
        moves[String(y)+String(x)] = [[0, 0, 0, 0, 0, 0, 0, 0],
                                    [0, 0, 0, 0, 0, 0, 0, 0],
                                    [0, 0, 0, 0, 0, 0, 0, 0], 
                                    [0, 0, 0, 0, 0, 0, 0, 0], 
                                    [0, 0, 0, 0, 0, 0, 0, 0], 
                                    [0, 0, 0, 0, 0, 0, 0, 0], 
                                    [0, 0, 0, 0, 0, 0, 0, 0], 
                                    [0, 0, 0, 0, 0, 0, 0, 0]];
        checkPossibleUnsafeMoves(j, y, x, moves[String(y)+String(x)]);
    }
}

function generateAllUnsafeMovesB() {
    possible_black_moves = [[0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0]];
    
    chess_field.map((i, y) => {i.map((j, x) => {
        if (j[0] === "b") {
            checkPossibleUnsafeMoves(j, y, x, possible_black_moves);
        }
    })});
}

function generateAllUnsafeMovesW() { 
    possible_white_moves = [[0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0]];
    
    chess_field.map((i, y) => {i.map((j, x) => {
        if (j[0] === "w") {
            checkPossibleUnsafeMoves(j, y, x, possible_white_moves);
        }
    })});
}

function checkPossibleUnsafeMoves(name, y, x, to) {
    let field;
    if (userRights.isSpetateMode) {
        field = fakechess_field;
    } else {
        field = chess_field
    }

    let directionsDone = [0, 0, 0, 0, 0, 0, 0, 0];
    let directionsDoneFour = [0, 0, 0, 0];

    switch (name) {
        case "bk":
            if (y - 1 >= 0) {
                moveCheckPoint_unsafe(field, to, y-1, x, "bk");
                if (x - 1 >= 0) {
                    moveCheckPoint_unsafe(field, to, y-1, x-1, "bk");
                }
                if (x + 1 <= 7) {
                    moveCheckPoint_unsafe(field, to, y-1, x+1, "bk");
                }
            }
            if (y + 1 <= 7) {
                moveCheckPoint_unsafe(field, to, y+1, x, "bk");
                if (x - 1 >= 0) {
                    moveCheckPoint_unsafe(field, to, y+1, x-1, "bk");
                }
                if (x + 1 <= 7) {
                    moveCheckPoint_unsafe(field, to, y+1, x+1, "bk");
                }
            }
            if (x - 1 >= 0) {
                moveCheckPoint_unsafe(field, to, y, x-1, "bk");
            }
            if (x + 1 <= 7) {
                moveCheckPoint_unsafe(field, to, y, x+1, "bk");
            }
            if (!BKingWasMoved) {
                        if (field[0][0] === "bc" && countMoves[0][0] === 0) {
                            if (field[y][x - 1] === 0 && field[y][x - 2] === 0 && field[y][x - 3] === 0) {
                                    to[0][0] = 3;
                            }
                        }
                        if (field[0][7] === "bc" && countMoves[0][7] === 0) {
                            if (field[y][x + 1] === 0 && field[y][x + 2] === 0) {
                                    to[0][7] = 3;
                            }
                        }
            }
        break;
        case "bq":
            for (let i = 1; i < 8 && directionsDone != [1, 1, 1, 1, 1, 1, 1, 1]; i++) {
                if (y - i >= 0) {
                    moveCheckRay_unsafe(field, to, y-i, x, "bq", directionsDone, 0);
            
                    if (x - i >= 0 && directionsDone[7] == 0) {
                        moveCheckRay_unsafe(field, to, y-i, x-i, "bq", directionsDone, 7);
                    } else {
                        directionsDone[7] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDone[1] == 0) {
                        moveCheckRay_unsafe(field, to, y-i, x+i, "bq", directionsDone, 1);
                    } else {
                        directionsDone[1] = 1;
                    }
                } else {
                    directionsDone[0] = 1;
                }
                
                if (y + i <= 7) {
                    moveCheckRay_unsafe(field, to, y+i, x, "bq", directionsDone, 4);
            
                    if (x - i >= 0 && directionsDone[5] == 0) {
                        moveCheckRay_unsafe(field, to, y+i, x-i, "bq", directionsDone, 5);
                    } else {
                        directionsDone[5] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDone[3] == 0) {
                        moveCheckRay_unsafe(field, to, y+i, x+i, "bq", directionsDone, 3);
                    } else {
                        directionsDone[3] = 1;
                    }
                } else {
                    directionsDone[4] = 1;
                }
        
                if (x - i >= 0 && directionsDone[6] == 0) {
                    moveCheckRay_unsafe(field, to, y, x-i, "bq", directionsDone, 6);
                } else {
                    directionsDone[6] = 1;
                }
        
                if (x + i <= 7 && directionsDone[2] == 0) {
                    moveCheckRay_unsafe(field, to, y, x+i, "bq", directionsDone, 2);
                } else {
                    directionsDone[2] = 1;
                }
            }
        break;
        case "bb":
            for (let i = 1; i < 9 && directionsDoneFour != [1, 1, 1, 1]; i++) {
                if (y - i >= 0) {
                    if (x - i >= 0 && directionsDoneFour[0] == 0) {
                        moveCheckRay_unsafe(field, to, y-i, x-i, "bb", directionsDoneFour, 0);
                    } else {
                        directionsDoneFour[0] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDoneFour[1] == 0) {
                        moveCheckRay_unsafe(field, to, y-i, x+i, "bb", directionsDoneFour, 1);
                    } else {
                        directionsDoneFour[1] = 1;
                    }
                } else {
                    directionsDoneFour[0] = 1;
                    directionsDoneFour[1] = 1;
                }
                
                if (y + i <= 7) {
                    if (x - i >= 0 && directionsDoneFour[3] == 0) {
                        moveCheckRay_unsafe(field, to, y+i, x-i, "bb", directionsDoneFour, 3);
                    } else {
                        directionsDoneFour[3] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDoneFour[2] == 0) {
                        moveCheckRay_unsafe(field, to, y+i, x+i, "bb", directionsDoneFour, 2);
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
                moveCheckPoint_unsafe(field, to, y-1, x, "wk");
                if (x - 1 >= 0) {
                    moveCheckPoint_unsafe(field, to, y-1, x-1, "wk");
                }
                if (x + 1 <= 7) {
                    moveCheckPoint_unsafe(field, to, y-1, x+1, "wk");
                }
            }
            if (y + 1 <= 7) {
                moveCheckPoint_unsafe(field, to, y+1, x, "wk");
                if (x - 1 >= 0) {
                    moveCheckPoint_unsafe(field, to, y+1, x-1, "wk");
                }
                if (x + 1 <= 7) {
                    moveCheckPoint_unsafe(field, to, y+1, x+1, "wk");
                }
            }
            if (x - 1 >= 0) {
                moveCheckPoint_unsafe(field, to, y, x-1, "wk");
            }
            if (x + 1 <= 7) {
                moveCheckPoint_unsafe(field, to, y, x+1, "wk");
            }
            if (!WKingWasMoved) {
                        if (field[7][0] === "wc" && countMoves[7][0] === 0) {
                            if (field[y][x - 1] === 0 && field[y][x - 2] === 0 && field[y][x - 3] === 0) {
                                    to[7][0] = 3;
                            }
                        }
                        if (field[7][7] === "wc" && countMoves[7][7] === 0) {
                            if (field[y][x + 1] === 0 && field[y][x + 2] === 0) {
                                    to[7][7] = 3;
                            }
                        }
            }
            break;
        case "wq":
            for (let i = 1; i < 8 && directionsDone != [1, 1, 1, 1, 1, 1, 1, 1]; i++) {
                if (y - i >= 0) {
                    moveCheckRay_unsafe(field, to, y-i, x, "wq", directionsDone, 0);
            
                    if (x - i >= 0 && directionsDone[7] == 0) {
                        moveCheckRay_unsafe(field, to, y-i, x-i, "wq", directionsDone, 7);
                    } else {
                        directionsDone[7] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDone[1] == 0) {
                        moveCheckRay_unsafe(field, to, y-i, x+i, "wq", directionsDone, 1);
                    } else {
                        directionsDone[1] = 1;
                    }
                } else {
                    directionsDone[0] = 1;
                }
                
                if (y + i <= 7) {
                    moveCheckRay_unsafe(field, to, y+i, x, "wq", directionsDone, 4);
            
                    if (x - i >= 0 && directionsDone[5] == 0) {
                        moveCheckRay_unsafe(field, to, y+i, x-i, "wq", directionsDone, 5);
                    } else {
                        directionsDone[5] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDone[3] == 0) {
                        moveCheckRay_unsafe(field, to, y+i, x+i, "wq", directionsDone, 3);
                    } else {
                        directionsDone[3] = 1;
                    }
                } else {
                    directionsDone[4] = 1;
                }
        
                if (x - i >= 0 && directionsDone[6] == 0) {
                    moveCheckRay_unsafe(field, to, y, x-i, "wq", directionsDone, 6);
                } else {
                    directionsDone[6] = 1;
                }
        
                if (x + i <= 7 && directionsDone[2] == 0) {
                    moveCheckRay_unsafe(field, to, y, x+i, "wq", directionsDone, 2);
                } else {
                    directionsDone[2] = 1;
                }
            }
        break;
        case "wb":
            for (let i = 1; i < 9 && directionsDoneFour != [1, 1, 1, 1]; i++) {
                if (y - i >= 0) {
                    if (x - i >= 0 && directionsDoneFour[0] == 0) {
                        moveCheckRay_unsafe(field, to, y-i, x-i, "wb", directionsDoneFour, 0);
                    } else {
                        directionsDoneFour[0] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDoneFour[1] == 0) {
                        moveCheckRay_unsafe(field, to, y-i, x+i, "wb", directionsDoneFour, 1);
                    } else {
                        directionsDoneFour[1] = 1;
                    }
                } else {
                    directionsDoneFour[0] = 1;
                    directionsDoneFour[1] = 1;
                }
                
                if (y + i <= 7) {
                    if (x - i >= 0 && directionsDoneFour[3] == 0) {
                        moveCheckRay_unsafe(field, to, y+i, x-i, "wb", directionsDoneFour, 3);
                    } else {
                        directionsDoneFour[3] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDoneFour[2] == 0) {
                        moveCheckRay_unsafe(field, to, y+i, x+i, "wb", directionsDoneFour, 2);
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
                        moveCheckRay_unsafe(field, to, y-i, x, "bc", directionsDoneFour, 0);
                    } else {
                        directionsDoneFour[0] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDoneFour[1] == 0) {
                        moveCheckRay_unsafe(field, to, y, x+i, "bc", directionsDoneFour, 1);
                    } else {
                        directionsDoneFour[1] = 1;
                    }
            
                    if (y + i <= 7 && directionsDoneFour[2] == 0) {
                        moveCheckRay_unsafe(field, to, y+i, x, "bc", directionsDoneFour, 2);
                    } else {
                        directionsDoneFour[2] = 1;
                    }
                    
                    if (x - i >= 0 && directionsDoneFour[3] == 0) {
                        moveCheckRay_unsafe(field, to, y, x-i, "bc", directionsDoneFour, 3);
                    } else {
                        directionsDoneFour[3] = 1;
                    }
            }
            break;
        case "wc":
            for (let i = 1; i < 9 && directionsDoneFour != [1, 1, 1, 1]; i++) {
                
                if (y - i >= 0 && directionsDoneFour[0] == 0) {
                    moveCheckRay_unsafe(field, to, y-i, x, "wc", directionsDoneFour, 0);
                } else {
                    directionsDoneFour[0] = 1;
                }
                
                if (x + i <= 7 && directionsDoneFour[1] == 0) {
                    moveCheckRay_unsafe(field, to, y, x+i, "wc", directionsDoneFour, 1);
                } else {
                    directionsDoneFour[1] = 1;
                }
        
                if (y + i <= 7 && directionsDoneFour[2] == 0) {
                    moveCheckRay_unsafe(field, to, y+i, x, "wc", directionsDoneFour, 2);
                } else {
                    directionsDoneFour[2] = 1;
                }
                
                if (x - i >= 0 && directionsDoneFour[3] == 0) {
                    moveCheckRay_unsafe(field, to, y, x-i, "wc", directionsDoneFour, 3);
                } else {
                    directionsDoneFour[3] = 1;
                }
        }
        break;
        case "wp":
            if (y - 1 >= 0) {
                if (field[y - 1][x] === 0) {
                    to[y - 1][x] = 1;
                    if (countMoves[y][x] === 0 && field[y - 2][x] === 0) {
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
                if (x - 1 >= 0 && pawnStep.length !== 0) {
                    if (y-1 === pawnStep[0] && x-1 === pawnStep[1] && pawnStep[0] === 2) {
                        to[y - 1][x - 1] = 2;
                    }
                }
                if (x + 1 <= 7 && pawnStep.length !== 0) {
                    if (y-1 === pawnStep[0] && x+1 === pawnStep[1] && pawnStep[0] === 2) {
                        to[y - 1][x + 1] = 2;
                    }
                }
            }
        break;
        case "bp":
            if (y + 1 <= 7) {
                if (field[y + 1][x] === 0) {
                    to[y + 1][x] = 1;
                    if (countMoves[y][x] === 0 && field[y + 2][x] === 0) {
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
                if (x - 1 >= 0 && pawnStep.length !== 0) {
                    if (y+1 === pawnStep[0] && x-1 === pawnStep[1] && pawnStep[0] === 5) {
                        to[y + 1][x - 1] = 2;
                    }
                }
                if (x + 1 <= 7 && pawnStep.length !== 0) {
                    if (y+1 === pawnStep[0] && x+1 === pawnStep[1] && pawnStep[0] === 5) {
                        to[y + 1][x + 1] = 2;
                    }
                }
            }
        break;
        case "bn":
            if (y - 1 >= 0) {
                if (x - 2 >= 0) {
                    moveCheckPoint_unsafe(field, to, y-1, x-2, "bn");
                }
                if (x + 2 <= 7) {
                    moveCheckPoint_unsafe(field, to, y-1, x+2, "bn");
                }
            }
            if (y - 2 >= 0) {
                if (x - 1 >= 0) {
                    moveCheckPoint_unsafe(field, to, y-2, x-1, "bn");
                }
                if (x + 1 <= 7) {
                    moveCheckPoint_unsafe(field, to, y-2, x+1, "bn");
                }
            }
    
            if (y + 1 <= 7) {
                if (x - 2 >= 0) {
                    moveCheckPoint_unsafe(field, to, y+1, x-2, "bn");
                }
                if (x + 2 <= 7) {
                    moveCheckPoint_unsafe(field, to, y+1, x+2, "bn");
                }
            }
            if (y + 2 <= 7) {
                if (x - 1 >= 0) {
                    moveCheckPoint_unsafe(field, to, y+2, x-1, "bn");
                }
                if (x + 1 <= 7) {
                    moveCheckPoint_unsafe(field, to, y+2, x+1, "bn");
                }
            }
        break;
        case "wn":
            if (y - 1 >= 0) {
                if (x - 2 >= 0) {
                    moveCheckPoint_unsafe(field, to, y-1, x-2, "wn");
                }
                if (x + 2 <= 7) {
                    moveCheckPoint_unsafe(field, to, y-1, x+2, "wn");
                }
            }
            if (y - 2 >= 0) {
                if (x - 1 >= 0) {
                    moveCheckPoint_unsafe(field, to, y-2, x-1, "wn");
                }
                if (x + 1 <= 7) {
                    moveCheckPoint_unsafe(field, to, y-2, x+1, "wn");
                }
            }
    
            if (y + 1 <= 7) {
                if (x - 2 >= 0) {
                    moveCheckPoint_unsafe(field, to, y+1, x-2, "wn");
                }
                if (x + 2 <= 7) {
                    moveCheckPoint_unsafe(field, to, y+1, x+2, "wn");
                }
            }
            if (y + 2 <= 7) {
                if (x - 1 >= 0) {
                    moveCheckPoint_unsafe(field, to, y+2, x-1, "wn");
                }
                if (x + 1 <= 7) {
                    moveCheckPoint_unsafe(field, to, y+2, x+1, "wn");
                }
            }
        break;
    }
}

function checkPossibleMoves(name, y, x) {
    let field;
    if (userRights.isSpetateMode) {
        field = fakechess_field;
    } else {
        field = chess_field
    }

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
                ans[y-1][x] = checkKingDanger(y, x, y-1,x,[y-1,x],1,"wk");
            }
            if (field[y - 1][x][0] === "b") {
                ans[y-1][x] = checkKingDanger(y, x, y-1,x,[y-1,x],2,"wk");
            }
            if (x - 1 >= 0) {
                if (field[y - 1][x - 1] === 0) {
                    ans[y-1][x-1] = checkKingDanger(y, x, y-1,x-1,[y-1,x-1],1,"wk");
                }
                if (field[y - 1][x - 1][0] === "b") {
                    ans[y-1][x-1] = checkKingDanger(y, x, y-1,x-1,[y-1,x-1],2,"wk");
                }
            }
            if (x + 1 <= 7) {
                if (field[y - 1][x + 1] === 0) {
                    ans[y-1][x+1] = checkKingDanger(y, x, y-1,x+1,[y-1,x+1],1,"wk");
                }
                if (field[y - 1][x + 1][0] === "b") {
                    ans[y-1][x+1] = checkKingDanger(y, x, y-1,x+1,[y-1,x+1],2,"wk");
                }
            }
        }
        if (y + 1 <= 7) {
    
            if (field[y + 1][x] === 0) {
                ans[y+1][x] = checkKingDanger(y, x, y+1,x,[y+1,x],1,"wk");
            }
            if (field[y + 1][x][0] === "b") {
                ans[y+1][x] = checkKingDanger(y, x, y+1,x,[y+1,x],2,"wk");
            }
    
            if (x - 1 >= 0) {
                if (field[y + 1][x - 1] === 0) {
                    ans[y+1][x-1] = checkKingDanger(y, x, y+1,x-1,[y+1,x-1],1,"wk");
                }
                if (field[y + 1][x - 1][0] === "b") {
                    ans[y+1][x-1] = checkKingDanger(y, x, y+1,x-1,[y+1,x-1],2,"wk");
                }
            }
            if (x + 1 <= 7) {
                if (field[y + 1][x + 1] === 0) {
                    ans[y+1][x+1] = checkKingDanger(y, x, y+1,x+1,[y+1,x+1],1,"wk");
                }
                if (field[y + 1][x + 1][0] === "b") {
                    ans[y+1][x+1] = checkKingDanger(y, x, y+1,x+1,[y+1,x+1],2,"wk");
                }
            }
        }
        if (x - 1 >= 0) {
            if (field[y][x - 1] === 0) {
                ans[y][x-1] = checkKingDanger(y, x, y,x-1,[y,x-1],1,"wk");
            }
            if (field[y][x - 1][0] === "b") {
                ans[y][x-1] = checkKingDanger(y, x, y,x-1,[y,x-1],2,"wk");
            }
        }
        if (x + 1 <= 7) {
            if (field[y][x + 1] === 0) {
                ans[y][x+1] = checkKingDanger(y, x, y,x+1,[y,x+1],1,"wk");
            }
            if (field[y][x + 1][0] === "b") {
                ans[y][x+1] = checkKingDanger(y, x, y,x+1,[y,x+1],2,"wk");
            }
        }

        if (!WKingWasMoved) {
            generateAllUnsafeMovesB();
            if (field[7][0] === "wc" && countMoves[7][0] === 0) {                
                if (possible_black_moves[y][x - 1] === 0 && possible_black_moves[y][x - 2] === 0 && possible_black_moves[y][x] === 0) {
                    if (field[y][x - 1] === 0 && field[y][x - 2] === 0 && field[y][x - 3] === 0) {
                        ans[7][0] = 3;
                    }
                }
            }
            if (field[7][7] === "wc" && countMoves[7][7] === 0) {
                if (possible_black_moves[y][x + 1] === 0 && possible_black_moves[y][x + 2] === 0 && possible_black_moves[y][x] === 0) {
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
                ans[y-1][x] = checkKingDanger(y, x, y-1,x,[y-1,x],1,"bk");
            }
            if (field[y - 1][x][0] === "w") {
                ans[y-1][x] = checkKingDanger(y, x, y-1,x,[y-1,x],2,"bk");
            }
            if (x - 1 >= 0) {
                if (field[y - 1][x - 1] === 0) {
                    ans[y-1][x-1] = checkKingDanger(y, x, y-1,x-1,[y-1,x-1],1,"bk");
                }
                if (field[y - 1][x - 1][0] === "w") {
                    ans[y-1][x-1] = checkKingDanger(y, x, y-1,x-1,[y-1,x-1],2,"bk");
                }
            }
            if (x + 1 <= 7) {
                if (field[y - 1][x + 1] === 0) {
                    ans[y-1][x+1] = checkKingDanger(y, x, y-1,x+1,[y-1,x+1],1,"bk");
                }
                if (field[y - 1][x + 1][0] === "w") {
                    ans[y-1][x+1] = checkKingDanger(y, x, y-1,x+1,[y-1,x+1],2,"bk");
                }
            }
        }
        if (y + 1 <= 7) {
    
            if (field[y + 1][x] === 0) {
                ans[y+1][x] = checkKingDanger(y, x, y+1,x,[y+1,x],1,"bk");
            }
            if (field[y + 1][x][0] === "w") {
                ans[y+1][x] = checkKingDanger(y, x, y+1,x,[y+1,x],2,"bk");
            }
    
            if (x - 1 >= 0) {
                if (field[y + 1][x - 1] === 0) {
                    ans[y+1][x-1] = checkKingDanger(y, x, y+1,x-1,[y+1,x-1],1,"bk");
                }
                if (field[y + 1][x - 1][0] === "w") {
                    ans[y+1][x-1] = checkKingDanger(y, x, y+1,x-1,[y+1,x-1],2,"bk");
                }
            }
            if (x + 1 <= 7) {
                if (field[y + 1][x + 1] === 0) {
                    ans[y+1][x+1] = checkKingDanger(y, x, y+1,x+1,[y+1,x+1],1,"bk");
                }
                if (field[y + 1][x + 1][0] === "w") {
                    ans[y+1][x+1] = checkKingDanger(y, x, y+1,x+1,[y+1,x+1],2,"bk");
                }
            }
        }
        if (x - 1 >= 0) {
            if (field[y][x - 1] === 0) {
                ans[y][x-1] = checkKingDanger(y, x, y,x-1,[y,x-1],1,"bk");
            }
            if (field[y][x - 1][0] === "w") {
                ans[y][x-1] = checkKingDanger(y, x, y,x-1,[y,x-1],2,"bk");
            }
        }
        if (x + 1 <= 7) {
            if (field[y][x + 1] === 0) {
                ans[y][x+1] = checkKingDanger(y, x, y,x+1,[y,x+1],1,"bk");
            }
            if (field[y][x + 1][0] === "w") {
                ans[y][x+1] = checkKingDanger(y, x, y,x+1,[y,x+1],2,"bk");
            }
        }

        if (!BKingWasMoved) {
            generateAllUnsafeMovesW();
            if (field[0][0] === "bc" && countMoves[0][0] === 0) {                
                if (possible_white_moves[y][x - 1] === 0 && possible_white_moves[y][x - 2] === 0 && possible_white_moves[y][x] === 0) {
                    if (field[y][x - 1] === 0 && field[y][x - 2] === 0 && field[y][x - 3] === 0) {
                        ans[0][0] = 3;
                    }
                }
            }
            if (field[0][7] === "bc" && countMoves[0][7] === 0) {
                if (possible_white_moves[y][x + 1] === 0 && possible_white_moves[y][x + 2] === 0 && possible_white_moves[y][x] === 0) {
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
                    

                    ans[y-i][x] = checkKingDanger(y, x, y-i,x,BKingCords,1,"bq");
    
                } else if (field[y - i][x][0] === "w" && directionsDone[0] == 0) {
                    

                    ans[y-i][x] = checkKingDanger(y, x, y-i,x,BKingCords,2,"bq");
    
                    directionsDone[0] = 1;
                } else {
                    directionsDone[0] = 1;
                } 
        
                if (x - i >= 0 && directionsDone[7] == 0) {
                    if (field[y - i][x - i] === 0) {
                        
                        ans[y-i][x-i] = checkKingDanger(y, x, y-i,x-i,BKingCords,1,"bq");
    
                    } else if (field[y - i][x - i][0] === "w") {
                        
                        ans[y-i][x-i] = checkKingDanger(y, x, y-i,x-i,BKingCords,2,"bq");
    
                        directionsDone[7] = 1;
                    } else {
                        directionsDone[7] = 1;
                    }
                } else {
                    directionsDone[7] = 1;
                }
                
                if (x + i <= 7 && directionsDone[1] == 0) {
                    if (field[y - i][x + i] === 0) {
                        
                        ans[y-i][x+i] = checkKingDanger(y, x, y-i,x+i,BKingCords,1,"bq");
    
                    } else if (field[y - i][x + i][0] === "w") {
                        
                        ans[y-i][x+i] = checkKingDanger(y, x, y-i,x+i,BKingCords,2,"bq");
    
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
                    
                    ans[y+i][x] = checkKingDanger(y, x, y+i,x,BKingCords,1,"bq");
    
                } else if (field[y + i][x][0] === "w" && directionsDone[4] == 0) {
                    
                    ans[y+i][x] = checkKingDanger(y, x, y+i,x,BKingCords,2,"bq");
    
                    directionsDone[4] = 1;
                } else {
                    directionsDone[4] = 1;
                }
        
                if (x - i >= 0 && directionsDone[5] == 0) {
                    if (field[y + i][x - i] === 0) {
                        
                        ans[y+i][x-i] = checkKingDanger(y, x, y+i,x-i,BKingCords,1,"bq");
    
                    } else if (field[y + i][x - i][0] === "w") {
                        
                        ans[y+i][x-i] = checkKingDanger(y, x, y+i,x-i,BKingCords,2,"bq");
    
                        directionsDone[5] = 1;
                    } else {
                        directionsDone[5] = 1;
                    }
                } else {
                    directionsDone[5] = 1;
                }
                
                if (x + i <= 7 && directionsDone[3] == 0) {
                    if (field[y + i][x + i] === 0) {
                        ans[y+i][x+i] = checkKingDanger(y, x, y+i,x+i,BKingCords,1,"bq");
                    } else if (field[y + i][x + i][0] === "w") {
                        ans[y+i][x+i] = checkKingDanger(y, x, y+i,x+i,BKingCords,2,"bq");
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
                    ans[y][x-i] = checkKingDanger(y, x, y,x-i,BKingCords,1,"bq");
                } else if (field[y][x - i][0] === "w") {
                    ans[y][x-i] = checkKingDanger(y, x, y,x-i,BKingCords,2,"bq");
                    directionsDone[6] = 1;
                } else {
                    directionsDone[6] = 1;
                }
            } else {
                directionsDone[6] = 1;
            }
    
            if (x + i <= 7 && directionsDone[2] == 0) {
                if (field[y][x + i] === 0) {
                    ans[y][x+i] = checkKingDanger(y, x, y,x+i,BKingCords,1,"bq");
                } else if (field[y][x + i][0] === "w") {
                    ans[y][x+i] = checkKingDanger(y, x, y,x+i,BKingCords,2,"bq");
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
                    

                    ans[y-i][x] = checkKingDanger(y, x, y-i,x,WKingCords,1,"wq");
    
                } else if (field[y - i][x][0] === "b" && directionsDone[0] == 0) {
                    

                    ans[y-i][x] = checkKingDanger(y, x, y-i,x,WKingCords,2,"wq");
    
                    directionsDone[0] = 1;
                } else {
                    directionsDone[0] = 1;
                } 
        
                if (x - i >= 0 && directionsDone[7] == 0) {
                    if (field[y - i][x - i] === 0) {
                        
                        ans[y-i][x-i] = checkKingDanger(y, x, y-i,x-i,WKingCords,1,"wq");
    
                    } else if (field[y - i][x - i][0] === "b") {
                        
                        ans[y-i][x-i] = checkKingDanger(y, x, y-i,x-i,WKingCords,2,"wq");
    
                        directionsDone[7] = 1;
                    } else {
                        directionsDone[7] = 1;
                    }
                } else {
                    directionsDone[7] = 1;
                }
                
                if (x + i <= 7 && directionsDone[1] == 0) {
                    if (field[y - i][x + i] === 0) {
                        
                        ans[y-i][x+i] = checkKingDanger(y, x, y-i,x+i,WKingCords,1,"wq");
    
                    } else if (field[y - i][x + i][0] === "b") {
                        
                        ans[y-i][x+i] = checkKingDanger(y, x, y-i,x+i,WKingCords,2,"wq");
    
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
                    
                    ans[y+i][x] = checkKingDanger(y, x, y+i,x,WKingCords,1,"wq");
    
                } else if (field[y + i][x][0] === "b" && directionsDone[4] == 0) {
                    
                    ans[y+i][x] = checkKingDanger(y, x, y+i,x,WKingCords,2,"wq");
    
                    directionsDone[4] = 1;
                } else {
                    directionsDone[4] = 1;
                }
        
                if (x - i >= 0 && directionsDone[5] == 0) {
                    if (field[y + i][x - i] === 0) {
                        
                        ans[y+i][x-i] = checkKingDanger(y, x, y+i,x-i,WKingCords,1,"wq");
    
                    } else if (field[y + i][x - i][0] === "b") {
                        
                        ans[y+i][x-i] = checkKingDanger(y, x, y+i,x-i,WKingCords,2,"wq");
    
                        directionsDone[5] = 1;
                    } else {
                        directionsDone[5] = 1;
                    }
                } else {
                    directionsDone[5] = 1;
                }
                
                if (x + i <= 7 && directionsDone[3] == 0) {
                    if (field[y + i][x + i] === 0) {
                        ans[y+i][x+i] = checkKingDanger(y, x, y+i,x+i,WKingCords,1,"wq");
                    } else if (field[y + i][x + i][0] === "b") {
                        ans[y+i][x+i] = checkKingDanger(y, x, y+i,x+i,WKingCords,2,"wq");
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
                    ans[y][x-i] = checkKingDanger(y, x, y,x-i,WKingCords,1,"wq");
                } else if (field[y][x - i][0] === "b") {
                    ans[y][x-i] = checkKingDanger(y, x, y,x-i,WKingCords,2,"wq");
                    directionsDone[6] = 1;
                } else {
                    directionsDone[6] = 1;
                }
            } else {
                directionsDone[6] = 1;
            }
    
            if (x + i <= 7 && directionsDone[2] == 0) {
                if (field[y][x + i] === 0) {
                    ans[y][x+i] = checkKingDanger(y, x, y,x+i,WKingCords,1,"wq");
                } else if (field[y][x + i][0] === "b") {
                    ans[y][x+i] = checkKingDanger(y, x, y,x+i,WKingCords,2,"wq");
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
                        
                        ans[y-i][x-i] = checkKingDanger(y, x, y-i,x-i,BKingCords,1,"bb");
    
                    } else if (field[y - i][x - i][0] === "w") {
                        
                        ans[y-i][x-i] = checkKingDanger(y, x, y-i,x-i,BKingCords,2,"bb");
    
                        directionsDone[0] = 1;
                    } else {
                        directionsDone[0] = 1;
                    }
                } else {
                    directionsDone[0] = 1;
                }
                
                if (x + i <= 7 && directionsDone[1] == 0) {
                    if (field[y - i][x + i] === 0) {
                        
                        ans[y-i][x+i] = checkKingDanger(y, x, y-i,x+i,BKingCords,1,"bb");
    
                    } else if (field[y - i][x + i][0] === "w") {
                        
                        ans[y-i][x+i] = checkKingDanger(y, x, y-i,x+i,BKingCords,2,"bb");
    
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
                        
                        ans[y+i][x-i] = checkKingDanger(y, x, y+i,x-i,BKingCords,1,"bb");
    
                    } else if (field[y + i][x - i][0] === "w") {
                        
                        ans[y+i][x-i] = checkKingDanger(y, x, y+i,x-i,BKingCords,2,"bb");
    
                        directionsDone[3] = 1;
                    } else {
                        directionsDone[3] = 1;
                    }
                } else {
                    directionsDone[3] = 1;
                }
                
                if (x + i <= 7 && directionsDone[2] == 0) {
                    if (field[y + i][x + i] === 0) {
                        ans[y+i][x+i] = checkKingDanger(y, x, y+i,x+i,BKingCords,1,"bb");
                    } else if (field[y + i][x + i][0] === "w") {
                        ans[y+i][x+i] = checkKingDanger(y, x, y+i,x+i,BKingCords,2,"bb");
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
                        
                        ans[y-i][x-i] = checkKingDanger(y, x, y-i,x-i,WKingCords,1,"wb");
    
                    } else if (field[y - i][x - i][0] === "b") {
                        
                        ans[y-i][x-i] = checkKingDanger(y, x, y-i,x-i,WKingCords,2,"wb");
    
                        directionsDone[0] = 1;
                    } else {
                        directionsDone[0] = 1;
                    }
                } else {
                    directionsDone[0] = 1;
                }
                
                if (x + i <= 7 && directionsDone[1] == 0) {
                    if (field[y - i][x + i] === 0) {
                        
                        ans[y-i][x+i] = checkKingDanger(y, x, y-i,x+i,WKingCords,1,"wb");
    
                    } else if (field[y - i][x + i][0] === "b") {
                        
                        ans[y-i][x+i] = checkKingDanger(y, x, y-i,x+i,WKingCords,2,"wb");
    
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
                        
                        ans[y+i][x-i] = checkKingDanger(y, x, y+i,x-i,WKingCords,1,"wb");
    
                    } else if (field[y + i][x - i][0] === "b") {
                        
                        ans[y+i][x-i] = checkKingDanger(y, x, y+i,x-i,WKingCords,2,"wb");
    
                        directionsDone[3] = 1;
                    } else {
                        directionsDone[3] = 1;
                    }
                } else {
                    directionsDone[3] = 1;
                }
                
                if (x + i <= 7 && directionsDone[2] == 0) {
                    if (field[y + i][x + i] === 0) {
                        ans[y+i][x+i] = checkKingDanger(y, x, y+i,x+i,WKingCords,1,"wb");
                    } else if (field[y + i][x + i][0] === "b") {
                        ans[y+i][x+i] = checkKingDanger(y, x, y+i,x+i,WKingCords,2,"wb");
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
                    ans[y-i][x] = checkKingDanger(y, x, y-i,x,BKingCords,1,"bc");
                } else if (field[y - i][x][0] === "w") {
                    ans[y-i][x] = checkKingDanger(y, x, y-i,x,BKingCords,2,"bc");
                    directionsDoneFour[0] = 1;
                } else {
                    directionsDoneFour[0] = 1;
                }
            } else {
                directionsDoneFour[0] = 1;
            }
            
            if (x + i <= 7 && directionsDoneFour[1] == 0) {
                if (field[y][x + i] === 0) {
                    ans[y][x+i] = checkKingDanger(y, x, y,x+i,BKingCords,1,"bc");
                } else if (field[y][x + i][0] === "w") {
                    ans[y][x+i] = checkKingDanger(y, x, y,x+i,BKingCords,2,"bc");
                    directionsDoneFour[1] = 1;
                } else {
                    directionsDoneFour[1] = 1;
                }
            } else {
                directionsDoneFour[1] = 1;
            }
    
            if (y + i <= 7 && directionsDoneFour[2] == 0) {
                if (field[y + i][x] === 0) {
                    ans[y+i][x] = checkKingDanger(y, x, y+i,x,BKingCords,1,"bc");
                } else if (field[y + i][x][0] === "w") {
                    ans[y+i][x] = checkKingDanger(y, x, y+i,x,BKingCords,2,"bc");
                    directionsDoneFour[2] = 1;
                } else {
                    directionsDoneFour[2] = 1;
                }
            } else {
                directionsDoneFour[2] = 1;
            }
            
            if (x - i >= 0 && directionsDoneFour[3] == 0) {
                if (field[y][x - i] === 0) {
                    ans[y][x-i] = checkKingDanger(y, x, y,x-i,BKingCords,1,"bc");
                } else if (field[y][x - i][0] === "w") {
                    ans[y][x-i] = checkKingDanger(y, x, y,x-i,BKingCords,2,"bc");
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
                    ans[y-i][x] = checkKingDanger(y, x, y-i,x,WKingCords,1,"wc");
                } else if (field[y - i][x][0] === "b") {
                    ans[y-i][x] = checkKingDanger(y, x, y-i,x,WKingCords,2,"wc");
                    directionsDoneFour[0] = 1;
                } else {
                    directionsDoneFour[0] = 1;
                }
            } else {
                directionsDoneFour[0] = 1;
            }
                
            if (x + i <= 7 && directionsDoneFour[1] == 0) {
                if (field[y][x + i] === 0) {
                    ans[y][x+i] = checkKingDanger(y, x, y,x+i,WKingCords,1,"wc");
                } else if (field[y][x + i][0] === "b") {
                    ans[y][x+i] = checkKingDanger(y, x, y,x+i,WKingCords,2,"wc");
                    directionsDoneFour[1] = 1;
                } else {
                    directionsDoneFour[1] = 1;
                }
            } else {
                directionsDoneFour[1] = 1;
            }
        
            if (y + i <= 7 && directionsDoneFour[2] == 0) {
                if (field[y + i][x] === 0) {
                    ans[y+i][x] = checkKingDanger(y, x, y+i,x,WKingCords,1,"wc");
                } else if (field[y + i][x][0] === "b") {
                    ans[y+i][x] = checkKingDanger(y, x, y+i,x,WKingCords,2,"wc");
                    directionsDoneFour[2] = 1;
                } else {
                    directionsDoneFour[2] = 1;
                }
            } else {
                directionsDoneFour[2] = 1;
            }
                
            if (x - i >= 0 && directionsDoneFour[3] == 0) {
                if (field[y][x - i] === 0) {
                    ans[y][x-i] = checkKingDanger(y, x, y,x-i,WKingCords,1,"wc");
                } else if (field[y][x - i][0] === "b") {
                    ans[y][x-i] = checkKingDanger(y, x, y,x-i,WKingCords,2,"wc");
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
                ans[y + 1][x] = checkKingDanger(y, x, y+1,x,BKingCords,1,"bp");
                if (countMoves[y][x] === 0 && field[y + 2][x] === 0) {
                    ans[y + 2][x] = checkKingDanger(y, x, y+2,x,BKingCords,1,"bp");
                }
            }
            if (x - 1 >= 0) {
                if (field[y + 1][x - 1][0] === "w") {
                    ans[y + 1][x - 1] = checkKingDanger(y, x, y+1,x-1,BKingCords,2,"bp");
                }
            }
            if (x + 1 <= 7) {
                if (field[y + 1][x + 1][0] === "w") {
                    ans[y + 1][x + 1] = checkKingDanger(y, x, y+1,x+1,BKingCords,2,"bp");
                }
            }
            if (x - 1 >= 0 && pawnStep.length !== 0) {
                if (y+1 === pawnStep[0] && x-1 === pawnStep[1] && pawnStep[0] === 5) {
                    ans[y + 1][x - 1] = checkKingDanger(y, x, y+1,x-1,BKingCords,2,"bp");
                }
            }
            if (x + 1 <= 7 && pawnStep.length !== 0) {
                if (y+1 === pawnStep[0] && x+1 === pawnStep[1] && pawnStep[0] === 5) {
                    ans[y + 1][x + 1] = checkKingDanger(y, x, y+1,x+1,BKingCords,2,"bp");
                }
            }
        }
        return ans;
    case "wp":
        if (y - 1 >= 0) {
            if (field[y - 1][x] === 0) {
                ans[y - 1][x] = checkKingDanger(y, x, y-1,x,WKingCords,1,"wp");
                if (countMoves[y][x] === 0 && field[y - 2][x] === 0) {
                    ans[y - 2][x] = checkKingDanger(y, x, y-2,x,WKingCords,1,"wp");
                }
            }
            if (x - 1 >= 0) {
                if (field[y - 1][x - 1][0] === "b") {
                    ans[y - 1][x - 1] = checkKingDanger(y, x, y-1,x-1,WKingCords,2,"wp");
                }
            }
            if (x + 1 <= 7) {
                if (field[y - 1][x + 1][0] === "b") {
                    ans[y - 1][x + 1] = checkKingDanger(y, x, y-1,x+1,WKingCords,2,"wp");
                }
            }
            if (x - 1 >= 0 && pawnStep.length !== 0) {
                if (y-1 === pawnStep[0] && x-1 === pawnStep[1] && pawnStep[0] === 2) {
                    ans[y - 1][x - 1] = checkKingDanger(y, x, y-1,x-1,WKingCords,2,"wp");
                }
            }
            if (x + 1 <= 7 && pawnStep.length !== 0) {
                if (y-1 === pawnStep[0] && x+1 === pawnStep[1] && pawnStep[0] === 2) {
                    ans[y - 1][x + 1] = checkKingDanger(y, x, y-1,x+1,WKingCords,2,"wp");
                }
            }
        }
        return ans;
    case "bn":
        if (y - 1 >= 0) {
            if (x - 2 >= 0) {
                if (field[y - 1][x - 2] === 0) {
                    ans[y - 1][x - 2] = checkKingDanger(y, x, y-1,x-2,BKingCords,1,"bn");
                } else if (field[y - 1][x - 2][0] === "w") {
                    ans[y - 1][x - 2] = checkKingDanger(y, x, y-1,x-2,BKingCords,2,"bn");
                }
            }
            if (x + 2 <= 7) {
                if (field[y - 1][x + 2] === 0) {
                    ans[y - 1][x + 2] = checkKingDanger(y, x, y-1,x+2,BKingCords,1,"bn");
                } else if (field[y - 1][x + 2][0] === "w") {
                    ans[y - 1][x + 2] = checkKingDanger(y, x, y-1,x+2,BKingCords,2,"bn");
                }
            }
        }
        if (y - 2 >= 0) {
            if (x - 1 >= 0) {
                if (field[y - 2][x - 1] === 0) {
                    ans[y - 2][x - 1] = checkKingDanger(y, x, y-2,x-1,BKingCords,1,"bn");
                } else if (field[y - 2][x - 1][0] === "w") {
                    ans[y - 2][x - 1] = checkKingDanger(y, x, y-2,x-1,BKingCords,2,"bn");
                }
            }
            if (x + 1 <= 7) {
                if (field[y - 2][x + 1] === 0) {
                    ans[y - 2][x + 1] = checkKingDanger(y, x, y-2,x+1,BKingCords,1,"bn");
                } else if (field[y - 2][x + 1][0] === "w") {
                    ans[y - 2][x + 1] = checkKingDanger(y, x, y-2,x+1,BKingCords,2,"bn");
                }
            }
        }

        if (y + 1 <= 7) {
            if (x - 2 >= 0) {
                if (field[y + 1][x - 2] === 0) {
                    ans[y + 1][x - 2] = checkKingDanger(y, x, y+1,x-2,BKingCords,1,"bn");
                } else if (field[y + 1][x - 2][0] === "w") {
                    ans[y + 1][x - 2] = checkKingDanger(y, x, y+1,x-2,BKingCords,2,"bn");
                }
            }
            if (x + 2 <= 7) {
                if (field[y + 1][x + 2] === 0) {
                    ans[y + 1][x + 2] = checkKingDanger(y, x, y+1,x+2,BKingCords,1,"bn");
                } else if (field[y + 1][x + 2][0] === "w") {
                    ans[y + 1][x + 2] = checkKingDanger(y, x, y+1,x+2,BKingCords,2,"bn");
                }
            }
        }
        if (y + 2 <= 7) {
            if (x - 1 >= 0) {
                if (field[y + 2][x - 1] === 0) {
                    ans[y + 2][x - 1] = checkKingDanger(y, x, y+2,x-1,BKingCords,1,"bn");
                } else if (field[y + 2][x - 1][0] === "w") {
                    ans[y + 2][x - 1] = checkKingDanger(y, x, y+2,x-1,BKingCords,2,"bn");
                }
            }
            if (x + 1 <= 7) {
                if (field[y + 2][x + 1] === 0) {
                    ans[y + 2][x + 1] = checkKingDanger(y, x, y+2,x+1,BKingCords,1,"bn");
                } else if (field[y + 2][x + 1][0] === "w") {
                    ans[y + 2][x + 1] = checkKingDanger(y, x, y+2,x+1,BKingCords,2,"bn");
                }
            }
        }
        return ans;
    case "wn":
    if (y - 1 >= 0) {
        if (x - 2 >= 0) {
            if (field[y - 1][x - 2] === 0) {
                ans[y - 1][x - 2] = checkKingDanger(y, x, y-1,x-2,WKingCords,1,"wn");
            } else if (field[y - 1][x - 2][0] === "b") {
                ans[y - 1][x - 2] = checkKingDanger(y, x, y-1,x-2,WKingCords,2,"wn");
            }
        }
        if (x + 2 <= 7) {
            if (field[y - 1][x + 2] === 0) {
                ans[y - 1][x + 2] = checkKingDanger(y, x, y-1,x+2,WKingCords,1,"wn");
            } else if (field[y - 1][x + 2][0] === "b") {
                ans[y - 1][x + 2] = checkKingDanger(y, x, y-1,x+2,WKingCords,2,"wn");
            }
        }
    }
    if (y - 2 >= 0) {
        if (x - 1 >= 0) {
            if (field[y - 2][x - 1] === 0) {
                ans[y - 2][x - 1] = checkKingDanger(y, x, y-2,x-1,WKingCords,1,"wn");
            } else if (field[y - 2][x - 1][0] === "b") {
                ans[y - 2][x - 1] = checkKingDanger(y, x, y-2,x-1,WKingCords,2,"wn");
            }
        }
        if (x + 1 <= 7) {
            if (field[y - 2][x + 1] === 0) {
                ans[y - 2][x + 1] = checkKingDanger(y, x, y-2,x+1,WKingCords,1,"wn");
            } else if (field[y - 2][x + 1][0] === "b") {
                ans[y - 2][x + 1] = checkKingDanger(y, x, y-2,x+1,WKingCords,2,"wn");
            }
        }
    }

    if (y + 1 <= 7) {
        if (x - 2 >= 0) {
            if (field[y + 1][x - 2] === 0) {
                ans[y + 1][x - 2] = checkKingDanger(y, x, y+1,x-2,WKingCords,1,"wn");
            } else if (field[y + 1][x - 2][0] === "b") {
                ans[y + 1][x - 2] = checkKingDanger(y, x, y+1,x-2,WKingCords,2,"wn");
            }
        }
        if (x + 2 <= 7) {
            if (field[y + 1][x + 2] === 0) {
                ans[y + 1][x + 2] = checkKingDanger(y, x, y+1,x+2,WKingCords,1,"wn");
            } else if (field[y + 1][x + 2][0] === "b") {
                ans[y + 1][x + 2] = checkKingDanger(y, x, y+1,x+2,WKingCords,2,"wn");
            }
        }
    }
    if (y + 2 <= 7) {
        if (x - 1 >= 0) {
            if (field[y + 2][x - 1] === 0) {
                ans[y + 2][x - 1] = checkKingDanger(y, x, y+2,x-1,WKingCords,1,"wn");
            } else if (field[y + 2][x - 1][0] === "b") {
                ans[y + 2][x - 1] = checkKingDanger(y, x, y+2,x-1,WKingCords,2,"wn");
            }
        }
        if (x + 1 <= 7) {
            if (field[y + 2][x + 1] === 0) {
                ans[y + 2][x + 1] = checkKingDanger(y, x, y+2,x+1,WKingCords,1,"wn");
            } else if (field[y + 2][x + 1][0] === "b") {
                ans[y + 2][x + 1] = checkKingDanger(y, x, y+2,x+1,WKingCords,2,"wn");
            }
        }
    }
    return ans;
}
}

function checkKingDanger(y, x, y_to, x_to, KingCords, placeType, figureName) {
    let temp = chess_field[y_to][x_to];
    chess_field[y][x] = 0;
    chess_field[y_to][x_to] = figureName;
    (turn === "white" ? generateAllUnsafeMovesB() : generateAllUnsafeMovesW());
    chess_field[y][x] = figureName;
    chess_field[y_to][x_to] = temp;
    if ((figureName[0] === "w" ? possible_black_moves : possible_white_moves)[KingCords[0]][KingCords[1]] === 0) {
        return placeType;
    } else {
        return 0;
    }
}

function moveCheckPoint_unsafe(currentField, possiableMovesArrey, y_to, x_to, name) {
    if (currentField[y_to][x_to] === 0) {
        possiableMovesArrey[y_to][x_to] = 1
    }
    if (currentField[y_to][x_to][0] === (name[0] === "w" ? "b" : "w")) {
        possiableMovesArrey[y_to][x_to] = 2
    }
}

function moveCheckRay_unsafe(currentField, possiableMovesArrey, y_to, x_to, name, directionsDone, currentRay) {
    if (currentField[y_to][x_to] === 0 && directionsDone[currentRay] == 0) {
        possiableMovesArrey[y_to][x_to] = 1;
    } else if (currentField[y_to][x_to][0] === (name[0] === "w" ? "b" : "w") && directionsDone[currentRay] == 0) {
        possiableMovesArrey[y_to][x_to] = 2;
        directionsDone[currentRay] = 1;
    } else {
        directionsDone[currentRay] = 1;
    }
}

function moveCheckPoint(currentField, possiableMovesArrey, y_from, x_from, y_to, x_to, name) {
    if (currentField[y_to][x_to] === 0) {
        possiableMovesArrey[y_to][x_to] = checkKingDanger(y_from, x_from, y_to, x_to, (name[0] === "w" ? WKingCords : BKingCords), 1, name);
    }
    if (currentField[y_to][x_to][0] === (name[0] === "w" ? "b" : "w")) {
        possiableMovesArrey[y_to][x_to] = checkKingDanger(y_from, x_from, y_to, x_to, (name[0] === "w" ? WKingCords : BKingCords), 2, name);
    }
}

function moveCheckRay(currentField, possiableMovesArrey, y_from, x_from, y_to, x_to, name, directionsDone, currentRay) {
    if (currentField[y_to][x_to] === 0 && directionsDone[currentRay] == 0) {
        possiableMovesArrey[y_to][x_to] = checkKingDanger(y_from, x_from, y_to, x_to, (name[0] === "w" ? WKingCords : BKingCords), 1, name);
    } else if (currentField[y_to][x_to][0] === (name[0] === "w" ? "b" : "w") && directionsDone[currentRay] == 0) {
        possiableMovesArrey[y_to][x_to] = checkKingDanger(y_from, x_from, y_to, x_to, (name[0] === "w" ? WKingCords : BKingCords), 2, name);
        directionsDone[currentRay] = 1;
    } else {
        directionsDone[currentRay] = 1;
    }
}

module.exports = chessLogic;