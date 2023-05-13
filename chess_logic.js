// let history = [[["bc", "bn", "bb", "bq", "bk", "bb", "bn", "bc"],
// ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
// [0, 0, 0, 0, 0, 0, 0, 0], 
// [0, 0, 0, 0, 0, 0, 0, 0], 
// [0, 0, 0, 0, 0, 0, 0, 0], 
// [0, 0, 0, 0, 0, 0, 0, 0], 
// ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"], 
// ["wc", "wn", "wb", "wq", "wk", "wb", "wn", "wc"]]];
let history;
sessionStorage.setItem("sessionHistory", JSON.stringify([]));

let historyStep = 0;

let userRights = {
    canMoveFigure: true, // castling is move too
    canShowPossiableMoves: true,
    canClearPossiableMoves: true,
    canSelectFigure: true,
    isSpetateMode: false
}

let beatenFiguresWhite = [];
let beatenFiguresBlack = [];

let selectedFigure = [];
let rasidualTrace = "rgba(74, 185, 74, 0.51)";
let rasidualTraceSec = "rgba(74, 185, 170, 0.51)";
let selectColor = "rgba(0, 162, 255, 0.582)";
let pawnStep = [];

let chessField = [["bc", "bn", "bb", "bq", "bk", "bb", "bn", "bc"],
                ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"], 
                ["wc", "wn", "wb", "wq", "wk", "wb", "wn", "wc"]];
// let chessField = [[0, 0, 0, "bk", 0, 0, 0, 0],     fast draw
//                 [0, 0, 0, 0, 0, 0, 0, 0],
//                 [0, 0, 0, 0, 0, "wk", 0, 0], 
//                 [0, 0, "wq", 0, 0, 0, 0, 0], 
//                 [0, 0, 0, 0, 0, 0, 0, 0], 
//                 [0, 0, 0, 0, 0, 0, 0, 0], 
//                 [0, 0, 0, 0, 0, 0, 0, 0], 
//                 [0, 0, 0, 0, 0, 0, 0, 0]];

let fakeChessField = [["bc", "bn", "bb", "bq", "bk", "bb", "bn", "bc"],
                ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"], 
                ["wc", "wn", "wb", "wq", "wk", "wb", "wn", "wc"]];

let countMoves = [[0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0]];

let possibleBMoves = [[0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0]];

let possibleWMoves = [[0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0]];

                // 0 - nothing
                // 1 - can move
                // 2 - can beat

const chessFieldPlaces = [["place11", "place12", "place13", "place14", "place15", "place16", "place17", "place18"],
                ["place21", "place22", "place23", "place24", "place25", "place26", "place27", "place28"], 
                ["place31", "place32", "place33", "place34", "place35", "place36", "place37", "place38"], 
                ["place41", "place42", "place43", "place44", "place45", "place46", "place47", "place48"], 
                ["place51", "place52", "place53", "place54", "place55", "place56", "place57", "place58"], 
                ["place61", "place62", "place63", "place64", "place65", "place66", "place67", "place68"], 
                ["place71", "place72", "place73", "place74", "place75", "place76", "place77", "place78"], 
                ["place81", "place82", "place83", "place84", "place85", "place86", "place87", "place88"]];

const chessFieldCords = ["0%", "12.5%", "25%", "37.5%", "50%", "62.5%", "75%", "87.5%"];

let moves = {};

let WKingWasMoved = false;
let BKingWasMoved = false;
let WKingCords = [7, 4];
let BKingCords = [0, 4];
let WKingCanCastling = false;
let BKingCanCastling = false;

let turn = "white";

function RestartGame() {
    chessField = [["bc", "bn", "bb", "bq", "bk", "bb", "bn", "bc"],
                ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"], 
                ["wc", "wn", "wb", "wq", "wk", "wb", "wn", "wc"]];

    countMoves = [[0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0]];

    WKingWasMoved = false;
    BKingWasMoved = false;
    WKingCords = [7, 4];
    BKingCords = [0, 4];
    if (selectedFigure != 0) {
        unselectFigure();
    }
    turn = "white"
    moves = {};
    pawnStep = [];
    clearPossibleMovesFull();
    arrangeFigures();
}

function generateMovesWithMap() {
    chessField.map((i, y) => {i.map((j, x) => {
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
    })});
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
    possibleBMoves = [[0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0]];
    
    chessField.map((i, y) => {i.map((j, x) => {
        if (j[0] === "b") {
            checkPossibleUnsafeMoves(j, y, x, possibleBMoves);
        }
    })});
}

function generateAllUnsafeMovesW() { 
    possibleWMoves = [[0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0], 
                [0, 0, 0, 0, 0, 0, 0, 0]];
    
    chessField.map((i, y) => {i.map((j, x) => {
        if (j[0] === "w") {
            checkPossibleUnsafeMoves(j, y, x, possibleWMoves);
        }
    })});
}

function checkPossibleUnsafeMoves(name, y, x, to) { //gigant function
    let field;
    if (userRights.isSpetateMode) {
        field = fakeChessField;
    } else {
        field = chessField
    }

    let directionsDone = [0, 0, 0, 0, 0, 0, 0, 0];
    let directionsDoneFour = [0, 0, 0, 0];

    switch (name) {
        case "bk":
    if (y - 1 >= 0) {
        if (field[y - 1][x] === 0) {
            to[y - 1][x] = 1
        }
        if (field[y - 1][x][0] === "w") {
            to[y - 1][x] = 2
        }
        if (x - 1 >= 0) {
            if (field[y - 1][x - 1] === 0) {
                to[y - 1][x - 1] = 1
            }
            if (field[y - 1][x - 1][0] === "w") {
                to[y - 1][x - 1] = 2
            }
        }
        if (x + 1 <= 7) {
            if (field[y - 1][x + 1] === 0) {
                to[y - 1][x + 1] = 1
            }
            if (field[y - 1][x + 1][0] === "w") {
                to[y - 1][x + 1] = 2
            }
        }
    }
    if (y + 1 <= 7) {
        if (field[y + 1][x] === 0) {
            to[y + 1][x] = 1
        }
        if (field[y + 1][x][0] === "w") {
            to[y + 1][x] = 2
        }
        if (x - 1 >= 0) {
            if (field[y + 1][x - 1] === 0) {
                to[y + 1][x - 1] = 1
            }
            if (field[y + 1][x - 1][0] === "w") {
                to[y + 1][x - 1] = 2
            }
        }
        if (x + 1 <= 7) {
            if (field[y + 1][x + 1] === 0) {
                to[y + 1][x + 1] = 1
            }
            if (field[y + 1][x + 1][0] === "w") {
                to[y + 1][x + 1] = 2
            }
        }
    }
    if (x - 1 >= 0) {
        if (field[y][x - 1] === 0) {
            to[y][x - 1] = 1
        }
        if (field[y][x - 1][0] === "w") {
            to[y][x - 1] = 2
        }
    }
    if (x + 1 <= 7) {
        if (field[y][x + 1] === 0) {
            to[y][x + 1] = 1
        }
        if (field[y][x + 1][0] === "w") {
            to[y][x + 1] = 2
        }
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
                    if (field[y - i][x] === 0 && directionsDone[0] == 0) {
                        to[y - i][x] = 1;
                    } else if (field[y - i][x][0] === "w" && directionsDone[0] == 0) {
                        to[y - i][x] = 2;
                        directionsDone[0] = 1;
                    } else {
                        directionsDone[0] = 1;
                    } 
            
                    if (x - i >= 0 && directionsDone[7] == 0) {
                        if (field[y - i][x - i] === 0) {
                            to[y - i][x - i] = 1;
                        } else if (field[y - i][x - i][0] === "w") {
                            to[y - i][x - i] = 2;
                            directionsDone[7] = 1;
                        } else {
                            directionsDone[7] = 1;
                        }
                    } else {
                        directionsDone[7] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDone[1] == 0) {
                        if (field[y - i][x + i] === 0) {
                            to[y - i][x + i] = 1;
                        } else if (field[y - i][x + i][0] === "w") {
                            to[y - i][x + i] = 2;
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
                        to[y + i][x] = 1;
                    } else if (field[y + i][x][0] === "w" && directionsDone[4] == 0) {
                        to[y + i][x] = 2
                        directionsDone[4] = 1;
                    } else {
                        directionsDone[4] = 1;
                    }
            
                    if (x - i >= 0 && directionsDone[5] == 0) {
                        if (field[y + i][x - i] === 0) {
                            to[y + i][x - i] = 1;
                        } else if (field[y + i][x - i][0] === "w") {
                            to[y + i][x - i] = 2;
                            directionsDone[5] = 1;
                        } else {
                            directionsDone[5] = 1;
                        }
                    } else {
                        directionsDone[5] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDone[3] == 0) {
                        if (field[y + i][x + i] === 0) {
                            to[y + i][x + i] = 1;
                        } else if (field[y + i][x + i][0] === "w") {
                            to[y + i][x + i] = 2;
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
                        to[y][x - i] = 1;
                    } else if (field[y][x - i][0] === "w") {
                        to[y][x - i] = 2;
                        directionsDone[6] = 1;
                    } else {
                        directionsDone[6] = 1;
                    }
                } else {
                    directionsDone[6] = 1;
                }
        
                if (x + i <= 7 && directionsDone[2] == 0) {
                    if (field[y][x + i] === 0) {
                        to[y][x + i] = 1;
                    } else if (field[y][x + i][0] === "w") {
                        to[y][x + i] = 2;
                        directionsDone[2] = 1;
                    } else {
                        directionsDone[2] = 1;
                    }
                } else {
                    directionsDone[2] = 1;
                }
            }
            break;
        case "bb":
            for (let i = 1; i < 9 && directionsDoneFour != [1, 1, 1, 1]; i++) {
                if (y - i >= 0) {
                    if (x - i >= 0 && directionsDoneFour[0] == 0) {
                        if (field[y - i][x - i] === 0) {
                            to[y - i][x - i] = 1;
                        } else if (field[y - i][x - i][0] === "w") {
                            to[y - i][x - i] = 2;
                            directionsDoneFour[0] = 1;
                        } else {
                            directionsDoneFour[0] = 1;
                        }
                    } else {
                        directionsDoneFour[0] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDoneFour[1] == 0) {
                        if (field[y - i][x + i] === 0) {
                            to[y - i][x + i] = 1;
                        } else if (field[y - i][x + i][0] === "w") {
                            to[y - i][x + i] = 2;
                            directionsDoneFour[1] = 1;
                        } else {
                            directionsDoneFour[1] = 1;
                        }
                    } else {
                        directionsDoneFour[1] = 1;
                    }
                } else {
                    directionsDoneFour[0] = 1;
                    directionsDoneFour[1] = 1;
                }
                
                if (y + i <= 7) {
            
                    if (x - i >= 0 && directionsDoneFour[3] == 0) {
                        if (field[y + i][x - i] === 0) {
                            to[y + i][x - i] = 1;
                        } else if (field[y + i][x - i][0] === "w") {
                            to[y + i][x - i] = 2;
                            directionsDoneFour[3] = 1;
                        } else {
                            directionsDoneFour[3] = 1;
                        }
                    } else {
                        directionsDoneFour[3] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDoneFour[2] == 0) {
                        if (field[y + i][x + i] === 0) {
                            to[y + i][x + i] = 1;
                        } else if (field[y + i][x + i][0] === "w") {
                            to[y + i][x + i] = 2;
                            directionsDoneFour[2] = 1;
                        } else {
                            directionsDoneFour[2] = 1;
                        }
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
                if (field[y - 1][x] === 0) {
                    to[y - 1][x] = 1
                }
                if (field[y - 1][x][0] === "b") {
                    to[y - 1][x] = 2
                }
                if (x - 1 >= 0) {
                    if (field[y - 1][x - 1] === 0) {
                        to[y - 1][x - 1] = 1
                    }
                    if (field[y - 1][x - 1][0] === "b") {
                        to[y - 1][x - 1] = 2
                    }
                }
                if (x + 1 <= 7) {
                    if (field[y - 1][x + 1] === 0) {
                        to[y - 1][x + 1] = 1
                    }
                    if (field[y - 1][x + 1][0] === "b") {
                        to[y - 1][x + 1] = 2
                    }
                }
            }
            if (y + 1 <= 7) {
                if (field[y + 1][x] === 0) {
                    to[y + 1][x] = 1
                }
                if (field[y + 1][x][0] === "b") {
                    to[y + 1][x] = 2
                }
                if (x - 1 >= 0) {
                    if (field[y + 1][x - 1] === 0) {
                        to[y + 1][x - 1] = 1
                    }
                    if (field[y + 1][x - 1][0] === "b") {
                        to[y + 1][x - 1] = 2
                    }
                }
                if (x + 1 <= 7) {
                    if (field[y + 1][x + 1] === 0) {
                        to[y + 1][x + 1] = 1
                    }
                    if (field[y + 1][x + 1][0] === "b") {
                        to[y + 1][x + 1] = 2
                    }
                }
            }
            if (x - 1 >= 0) {
                if (field[y][x - 1] === 0) {
                    to[y][x - 1] = 1
                }
                if (field[y][x - 1][0] === "b") {
                    to[y][x - 1] = 2
                }
            }
            if (x + 1 <= 7) {
                if (field[y][x + 1] === 0) {
                    to[y][x + 1] = 1
                }
                if (field[y][x + 1][0] === "b") {
                    to[y][x + 1] = 2
                }
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
                    if (field[y - i][x] === 0 && directionsDone[0] == 0) {
                        to[y - i][x] = 1;
                    } else if (field[y - i][x][0] === "b" && directionsDone[0] == 0) {
                        to[y - i][x] = 2;
                        directionsDone[0] = 1;
                    } else {
                        directionsDone[0] = 1;
                    } 
            
                    if (x - i >= 0 && directionsDone[7] == 0) {
                        if (field[y - i][x - i] === 0) {
                            to[y - i][x - i] = 1;
                        } else if (field[y - i][x - i][0] === "b") {
                            to[y - i][x - i] = 2;
                            directionsDone[7] = 1;
                        } else {
                            directionsDone[7] = 1;
                        }
                    } else {
                        directionsDone[7] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDone[1] == 0) {
                        if (field[y - i][x + i] === 0) {
                            to[y - i][x + i] = 1;
                        } else if (field[y - i][x + i][0] === "b") {
                            to[y - i][x + i] = 2;
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
                        to[y + i][x] = 1;
                    } else if (field[y + i][x][0] === "b" && directionsDone[4] == 0) {
                        to[y + i][x] = 2
                        directionsDone[4] = 1;
                    } else {
                        directionsDone[4] = 1;
                    }
            
                    if (x - i >= 0 && directionsDone[5] == 0) {
                        if (field[y + i][x - i] === 0) {
                            to[y + i][x - i] = 1;
                        } else if (field[y + i][x - i][0] === "b") {
                            to[y + i][x - i] = 2;
                            directionsDone[5] = 1;
                        } else {
                            directionsDone[5] = 1;
                        }
                    } else {
                        directionsDone[5] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDone[3] == 0) {
                        if (field[y + i][x + i] === 0) {
                            to[y + i][x + i] = 1;
                        } else if (field[y + i][x + i][0] === "b") {
                            to[y + i][x + i] = 2;
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
                        to[y][x - i] = 1;
                    } else if (field[y][x - i][0] === "b") {
                        to[y][x - i] = 2;
                        directionsDone[6] = 1;
                    } else {
                        directionsDone[6] = 1;
                    }
                } else {
                    directionsDone[6] = 1;
                }
        
                if (x + i <= 7 && directionsDone[2] == 0) {
                    if (field[y][x + i] === 0) {
                        to[y][x + i] = 1;
                    } else if (field[y][x + i][0] === "b") {
                        to[y][x + i] = 2;
                        directionsDone[2] = 1;
                    } else {
                        directionsDone[2] = 1;
                    }
                } else {
                    directionsDone[2] = 1;
                }
            }
            break;
        case "wb":
            for (let i = 1; i < 9 && directionsDoneFour != [1, 1, 1, 1]; i++) {
                if (y - i >= 0) {
                    if (x - i >= 0 && directionsDoneFour[0] == 0) {
                        if (field[y - i][x - i] === 0) {
                            to[y - i][x - i] = 1;
                        } else if (field[y - i][x - i][0] === "b") {
                            to[y - i][x - i] = 2;
                            directionsDoneFour[0] = 1;
                        } else {
                            directionsDoneFour[0] = 1;
                        }
                    } else {
                        directionsDoneFour[0] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDoneFour[1] == 0) {
                        if (field[y - i][x + i] === 0) {
                            to[y - i][x + i] = 1;
                        } else if (field[y - i][x + i][0] === "b") {
                            to[y - i][x + i] = 2;
                            directionsDoneFour[1] = 1;
                        } else {
                            directionsDoneFour[1] = 1;
                        }
                    } else {
                        directionsDoneFour[1] = 1;
                    }
                } else {
                    directionsDoneFour[0] = 1;
                    directionsDoneFour[1] = 1;
                }
                
                if (y + i <= 7) {
            
                    if (x - i >= 0 && directionsDoneFour[3] == 0) {
                        if (field[y + i][x - i] === 0) {
                            to[y + i][x - i] = 1;
                        } else if (field[y + i][x - i][0] === "b") {
                            to[y + i][x - i] = 2;
                            directionsDoneFour[3] = 1;
                        } else {
                            directionsDoneFour[3] = 1;
                        }
                    } else {
                        directionsDoneFour[3] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDoneFour[2] == 0) {
                        if (field[y + i][x + i] === 0) {
                            to[y + i][x + i] = 1;
                        } else if (field[y + i][x + i][0] === "b") {
                            to[y + i][x + i] = 2;
                            directionsDoneFour[2] = 1;
                        } else {
                            directionsDoneFour[2] = 1;
                        }
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
                        if (field[y - i][x] === 0) {
                            to[y - i][x] = 1;
                        } else if (field[y - i][x][0] === "w") {
                            to[y - i][x] = 2;
                            directionsDoneFour[0] = 1;
                        } else {
                            directionsDoneFour[0] = 1;
                        }
                    } else {
                        directionsDoneFour[0] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDoneFour[1] == 0) {
                        if (field[y][x + i] === 0) {
                            to[y][x + i] = 1;
                        } else if (field[y][x + i][0] === "w") {
                            to[y][x + i] = 2;
                            directionsDoneFour[1] = 1;
                        } else {
                            directionsDoneFour[1] = 1;
                        }
                    } else {
                        directionsDoneFour[1] = 1;
                    }
            
                    if (y + i <= 7 && directionsDoneFour[2] == 0) {
                        if (field[y + i][x] === 0) {
                            to[y + i][x] = 1;
                        } else if (field[y + i][x][0] === "w") {
                            to[y + i][x] = 2;
                            directionsDoneFour[2] = 1;
                        } else {
                            directionsDoneFour[2] = 1;
                        }
                    } else {
                        directionsDoneFour[2] = 1;
                    }
                    
                    if (x - i >= 0 && directionsDoneFour[3] == 0) {
                        if (field[y][x - i] === 0) {
                            to[y][x - i] = 1;
                        } else if (field[y][x - i][0] === "w") {
                            to[y][x - i] = 2;
                            directionsDoneFour[3] = 1;
                        } else {
                            directionsDoneFour[3] = 1;
                        }
                    } else {
                        directionsDoneFour[3] = 1;
                    }
            }
            break;
        case "wc":
            for (let i = 1; i < 9 && directionsDoneFour != [1, 1, 1, 1]; i++) {
                
                    if (y - i >= 0 && directionsDoneFour[0] == 0) {
                        if (field[y - i][x] === 0) {
                            to[y - i][x] = 1;
                        } else if (field[y - i][x][0] === "b") {
                            to[y - i][x] = 2;
                            directionsDoneFour[0] = 1;
                        } else {
                            directionsDoneFour[0] = 1;
                        }
                    } else {
                        directionsDoneFour[0] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDoneFour[1] == 0) {
                        if (field[y][x + i] === 0) {
                            to[y][x + i] = 1;
                        } else if (field[y][x + i][0] === "b") {
                            to[y][x + i] = 2;
                            directionsDoneFour[1] = 1;
                        } else {
                            directionsDoneFour[1] = 1;
                        }
                    } else {
                        directionsDoneFour[1] = 1;
                    }
            
                    if (y + i <= 7 && directionsDoneFour[2] == 0) {
                        if (field[y + i][x] === 0) {
                            to[y + i][x] = 1;
                        } else if (field[y + i][x][0] === "b") {
                            to[y + i][x] = 2;
                            directionsDoneFour[2] = 1;
                        } else {
                            directionsDoneFour[2] = 1;
                        }
                    } else {
                        directionsDoneFour[2] = 1;
                    }
                    
                    if (x - i >= 0 && directionsDoneFour[3] == 0) {
                        if (field[y][x - i] === 0) {
                            to[y][x - i] = 1;
                        } else if (field[y][x - i][0] === "b") {
                            to[y][x - i] = 2;
                            directionsDoneFour[3] = 1;
                        } else {
                            directionsDoneFour[3] = 1;
                        }
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
                    if (field[y - 1][x - 2] === 0) {
                        to[y - 1][x - 2] = 1;
                    } else if (field[y - 1][x - 2][0] === "w") {
                        to[y - 1][x - 2] = 2;
                    }
                }
                if (x + 2 <= 7) {
                    if (field[y - 1][x + 2] === 0) {
                        to[y - 1][x + 2] = 1;
                    } else if (field[y - 1][x + 2][0] === "w") {
                        to[y - 1][x + 2] = 2;
                    }
                }
            }
            if (y - 2 >= 0) {
                if (x - 1 >= 0) {
                    if (field[y - 2][x - 1] === 0) {
                        to[y - 2][x - 1] = 1;
                    } else if (field[y - 2][x - 1][0] === "w") {
                        to[y - 2][x - 1] = 2;
                    }
                }
                if (x + 1 <= 7) {
                    if (field[y - 2][x + 1] === 0) {
                        to[y - 2][x + 1] = 1;
                    } else if (field[y - 2][x + 1][0] === "w") {
                        to[y - 2][x + 1] = 2;
                    }
                }
            }
    
            if (y + 1 <= 7) {
                if (x - 2 >= 0) {
                    if (field[y + 1][x - 2] === 0) {
                        to[y + 1][x - 2] = 1;
                    } else if (field[y + 1][x - 2][0] === "w") {
                        to[y + 1][x - 2] = 2;
                    }
                }
                if (x + 2 <= 7) {
                    if (field[y + 1][x + 2] === 0) {
                        to[y + 1][x + 2] = 1;
                    } else if (field[y + 1][x + 2][0] === "w") {
                        to[y + 1][x + 2] = 2;
                    }
                }
            }
            if (y + 2 <= 7) {
                if (x - 1 >= 0) {
                    if (field[y + 2][x - 1] === 0) {
                        to[y + 2][x - 1] = 1;
                    } else if (field[y + 2][x - 1][0] === "w") {
                        to[y + 2][x - 1] = 2;
                    }
                }
                if (x + 1 <= 7) {
                    if (field[y + 2][x + 1] === 0) {
                        to[y + 2][x + 1] = 1;
                    } else if (field[y + 2][x + 1][0] === "w") {
                        to[y + 2][x + 1] = 2;
                    }
                }
            }
        break;
        case "wn":
            if (y - 1 >= 0) {
                if (x - 2 >= 0) {
                    if (field[y - 1][x - 2] === 0) {
                        to[y - 1][x - 2] = 1;
                    } else if (field[y - 1][x - 2][0] === "b") {
                        to[y - 1][x - 2] = 2;
                    }
                }
                if (x + 2 <= 7) {
                    if (field[y - 1][x + 2] === 0) {
                        to[y - 1][x + 2] = 1;
                    } else if (field[y - 1][x + 2][0] === "b") {
                        to[y - 1][x + 2] = 2;
                    }
                }
            }
            if (y - 2 >= 0) {
                if (x - 1 >= 0) {
                    if (field[y - 2][x - 1] === 0) {
                        to[y - 2][x - 1] = 1;
                    } else if (field[y - 2][x - 1][0] === "b") {
                        to[y - 2][x - 1] = 2;
                    }
                }
                if (x + 1 <= 7) {
                    if (field[y - 2][x + 1] === 0) {
                        to[y - 2][x + 1] = 1;
                    } else if (field[y - 2][x + 1][0] === "b") {
                        to[y - 2][x + 1] = 2;
                    }
                }
            }
    
            if (y + 1 <= 7) {
                if (x - 2 >= 0) {
                    if (field[y + 1][x - 2] === 0) {
                        to[y + 1][x - 2] = 1;
                    } else if (field[y + 1][x - 2][0] === "b") {
                        to[y + 1][x - 2] = 2;
                    }
                }
                if (x + 2 <= 7) {
                    if (field[y + 1][x + 2] === 0) {
                        to[y + 1][x + 2] = 1;
                    } else if (field[y + 1][x + 2][0] === "b") {
                        to[y + 1][x + 2] = 2;
                    }
                }
            }
            if (y + 2 <= 7) {
                if (x - 1 >= 0) {
                    if (field[y + 2][x - 1] === 0) {
                        to[y + 2][x - 1] = 1;
                    } else if (field[y + 2][x - 1][0] === "b") {
                        to[y + 2][x - 1] = 2;
                    }
                }
                if (x + 1 <= 7) {
                    if (field[y + 2][x + 1] === 0) {
                        to[y + 2][x + 1] = 1;
                    } else if (field[y + 2][x + 1][0] === "b") {
                        to[y + 2][x + 1] = 2;
                    }
                }
            }
        break;
    }
}

function checkPossibleMoves(name, y, x) {  //gigant function
    let field;
    if (userRights.isSpetateMode) {
        field = fakeChessField;
    } else {
        field = chessField
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
                ans[y-1][x] = supKingDunger(y, x, y-1,x,[y-1,x],1,"wk");
            }
            if (field[y - 1][x][0] === "b") {
                ans[y-1][x] = supKingDunger(y, x, y-1,x,[y-1,x],2,"wk");
            }
            if (x - 1 >= 0) {
                if (field[y - 1][x - 1] === 0) {
                    ans[y-1][x-1] = supKingDunger(y, x, y-1,x-1,[y-1,x-1],1,"wk");
                }
                if (field[y - 1][x - 1][0] === "b") {
                    ans[y-1][x-1] = supKingDunger(y, x, y-1,x-1,[y-1,x-1],2,"wk");
                }
            }
            if (x + 1 <= 7) {
                if (field[y - 1][x + 1] === 0) {
                    ans[y-1][x+1] = supKingDunger(y, x, y-1,x+1,[y-1,x+1],1,"wk");
                }
                if (field[y - 1][x + 1][0] === "b") {
                    ans[y-1][x+1] = supKingDunger(y, x, y-1,x+1,[y-1,x+1],2,"wk");
                }
            }
        }
        if (y + 1 <= 7) {
    
            if (field[y + 1][x] === 0) {
                ans[y+1][x] = supKingDunger(y, x, y+1,x,[y+1,x],1,"wk");
            }
            if (field[y + 1][x][0] === "b") {
                ans[y+1][x] = supKingDunger(y, x, y+1,x,[y+1,x],2,"wk");
            }
    
            if (x - 1 >= 0) {
                if (field[y + 1][x - 1] === 0) {
                    ans[y+1][x-1] = supKingDunger(y, x, y+1,x-1,[y+1,x-1],1,"wk");
                }
                if (field[y + 1][x - 1][0] === "b") {
                    ans[y+1][x-1] = supKingDunger(y, x, y+1,x-1,[y+1,x-1],2,"wk");
                }
            }
            if (x + 1 <= 7) {
                if (field[y + 1][x + 1] === 0) {
                    ans[y+1][x+1] = supKingDunger(y, x, y+1,x+1,[y+1,x+1],1,"wk");
                }
                if (field[y + 1][x + 1][0] === "b") {
                    ans[y+1][x+1] = supKingDunger(y, x, y+1,x+1,[y+1,x+1],2,"wk");
                }
            }
        }
        if (x - 1 >= 0) {
            if (field[y][x - 1] === 0) {
                ans[y][x-1] = supKingDunger(y, x, y,x-1,[y,x-1],1,"wk");
            }
            if (field[y][x - 1][0] === "b") {
                ans[y][x-1] = supKingDunger(y, x, y,x-1,[y,x-1],2,"wk");
            }
        }
        if (x + 1 <= 7) {
            if (field[y][x + 1] === 0) {
                ans[y][x+1] = supKingDunger(y, x, y,x+1,[y,x+1],1,"wk");
            }
            if (field[y][x + 1][0] === "b") {
                ans[y][x+1] = supKingDunger(y, x, y,x+1,[y,x+1],2,"wk");
            }
        }

        if (!WKingWasMoved) {
            generateAllUnsafeMovesB();
            if (field[7][0] === "wc" && countMoves[7][0] === 0) {                
                if (possibleBMoves[y][x - 1] === 0 && possibleBMoves[y][x - 2] === 0 && possibleBMoves[y][x] === 0) {
                    if (field[y][x - 1] === 0 && field[y][x - 2] === 0 && field[y][x - 3] === 0) {
                        ans[7][0] = 3;
                    }
                }
            }
            if (field[7][7] === "wc" && countMoves[7][7] === 0) {
                if (possibleBMoves[y][x + 1] === 0 && possibleBMoves[y][x + 2] === 0 && possibleBMoves[y][x] === 0) {
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
                ans[y-1][x] = supKingDunger(y, x, y-1,x,[y-1,x],1,"bk");
            }
            if (field[y - 1][x][0] === "w") {
                ans[y-1][x] = supKingDunger(y, x, y-1,x,[y-1,x],2,"bk");
            }
            if (x - 1 >= 0) {
                if (field[y - 1][x - 1] === 0) {
                    ans[y-1][x-1] = supKingDunger(y, x, y-1,x-1,[y-1,x-1],1,"bk");
                }
                if (field[y - 1][x - 1][0] === "w") {
                    ans[y-1][x-1] = supKingDunger(y, x, y-1,x-1,[y-1,x-1],2,"bk");
                }
            }
            if (x + 1 <= 7) {
                if (field[y - 1][x + 1] === 0) {
                    ans[y-1][x+1] = supKingDunger(y, x, y-1,x+1,[y-1,x+1],1,"bk");
                }
                if (field[y - 1][x + 1][0] === "w") {
                    ans[y-1][x+1] = supKingDunger(y, x, y-1,x+1,[y-1,x+1],2,"bk");
                }
            }
        }
        if (y + 1 <= 7) {
    
            if (field[y + 1][x] === 0) {
                ans[y+1][x] = supKingDunger(y, x, y+1,x,[y+1,x],1,"bk");
            }
            if (field[y + 1][x][0] === "w") {
                ans[y+1][x] = supKingDunger(y, x, y+1,x,[y+1,x],2,"bk");
            }
    
            if (x - 1 >= 0) {
                if (field[y + 1][x - 1] === 0) {
                    ans[y+1][x-1] = supKingDunger(y, x, y+1,x-1,[y+1,x-1],1,"bk");
                }
                if (field[y + 1][x - 1][0] === "w") {
                    ans[y+1][x-1] = supKingDunger(y, x, y+1,x-1,[y+1,x-1],2,"bk");
                }
            }
            if (x + 1 <= 7) {
                if (field[y + 1][x + 1] === 0) {
                    ans[y+1][x+1] = supKingDunger(y, x, y+1,x+1,[y+1,x+1],1,"bk");
                }
                if (field[y + 1][x + 1][0] === "w") {
                    ans[y+1][x+1] = supKingDunger(y, x, y+1,x+1,[y+1,x+1],2,"bk");
                }
            }
        }
        if (x - 1 >= 0) {
            if (field[y][x - 1] === 0) {
                ans[y][x-1] = supKingDunger(y, x, y,x-1,[y,x-1],1,"bk");
            }
            if (field[y][x - 1][0] === "w") {
                ans[y][x-1] = supKingDunger(y, x, y,x-1,[y,x-1],2,"bk");
            }
        }
        if (x + 1 <= 7) {
            if (field[y][x + 1] === 0) {
                ans[y][x+1] = supKingDunger(y, x, y,x+1,[y,x+1],1,"bk");
            }
            if (field[y][x + 1][0] === "w") {
                ans[y][x+1] = supKingDunger(y, x, y,x+1,[y,x+1],2,"bk");
            }
        }

        if (!BKingWasMoved) {
            generateAllUnsafeMovesW();
            if (field[0][0] === "bc" && countMoves[0][0] === 0) {                
                if (possibleWMoves[y][x - 1] === 0 && possibleWMoves[y][x - 2] === 0 && possibleWMoves[y][x] === 0) {
                    if (field[y][x - 1] === 0 && field[y][x - 2] === 0 && field[y][x - 3] === 0) {
                        ans[0][0] = 3;
                    }
                }
            }
            if (field[0][7] === "bc" && countMoves[0][7] === 0) {
                if (possibleWMoves[y][x + 1] === 0 && possibleWMoves[y][x + 2] === 0 && possibleWMoves[y][x] === 0) {
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
                    

                    ans[y-i][x] = supKingDunger(y, x, y-i,x,BKingCords,1,"bq");
    
                } else if (field[y - i][x][0] === "w" && directionsDone[0] == 0) {
                    

                    ans[y-i][x] = supKingDunger(y, x, y-i,x,BKingCords,2,"bq");
    
                    directionsDone[0] = 1;
                } else {
                    directionsDone[0] = 1;
                } 
        
                if (x - i >= 0 && directionsDone[7] == 0) {
                    if (field[y - i][x - i] === 0) {
                        
                        ans[y-i][x-i] = supKingDunger(y, x, y-i,x-i,BKingCords,1,"bq");
    
                    } else if (field[y - i][x - i][0] === "w") {
                        
                        ans[y-i][x-i] = supKingDunger(y, x, y-i,x-i,BKingCords,2,"bq");
    
                        directionsDone[7] = 1;
                    } else {
                        directionsDone[7] = 1;
                    }
                } else {
                    directionsDone[7] = 1;
                }
                
                if (x + i <= 7 && directionsDone[1] == 0) {
                    if (field[y - i][x + i] === 0) {
                        
                        ans[y-i][x+i] = supKingDunger(y, x, y-i,x+i,BKingCords,1,"bq");
    
                    } else if (field[y - i][x + i][0] === "w") {
                        
                        ans[y-i][x+i] = supKingDunger(y, x, y-i,x+i,BKingCords,2,"bq");
    
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
                    
                    ans[y+i][x] = supKingDunger(y, x, y+i,x,BKingCords,1,"bq");
    
                } else if (field[y + i][x][0] === "w" && directionsDone[4] == 0) {
                    
                    ans[y+i][x] = supKingDunger(y, x, y+i,x,BKingCords,2,"bq");
    
                    directionsDone[4] = 1;
                } else {
                    directionsDone[4] = 1;
                }
        
                if (x - i >= 0 && directionsDone[5] == 0) {
                    if (field[y + i][x - i] === 0) {
                        
                        ans[y+i][x-i] = supKingDunger(y, x, y+i,x-i,BKingCords,1,"bq");
    
                    } else if (field[y + i][x - i][0] === "w") {
                        
                        ans[y+i][x-i] = supKingDunger(y, x, y+i,x-i,BKingCords,2,"bq");
    
                        directionsDone[5] = 1;
                    } else {
                        directionsDone[5] = 1;
                    }
                } else {
                    directionsDone[5] = 1;
                }
                
                if (x + i <= 7 && directionsDone[3] == 0) {
                    if (field[y + i][x + i] === 0) {
                        ans[y+i][x+i] = supKingDunger(y, x, y+i,x+i,BKingCords,1,"bq");
                    } else if (field[y + i][x + i][0] === "w") {
                        ans[y+i][x+i] = supKingDunger(y, x, y+i,x+i,BKingCords,2,"bq");
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
                    ans[y][x-i] = supKingDunger(y, x, y,x-i,BKingCords,1,"bq");
                } else if (field[y][x - i][0] === "w") {
                    ans[y][x-i] = supKingDunger(y, x, y,x-i,BKingCords,2,"bq");
                    directionsDone[6] = 1;
                } else {
                    directionsDone[6] = 1;
                }
            } else {
                directionsDone[6] = 1;
            }
    
            if (x + i <= 7 && directionsDone[2] == 0) {
                if (field[y][x + i] === 0) {
                    ans[y][x+i] = supKingDunger(y, x, y,x+i,BKingCords,1,"bq");
                } else if (field[y][x + i][0] === "w") {
                    ans[y][x+i] = supKingDunger(y, x, y,x+i,BKingCords,2,"bq");
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
                    

                    ans[y-i][x] = supKingDunger(y, x, y-i,x,WKingCords,1,"wq");
    
                } else if (field[y - i][x][0] === "b" && directionsDone[0] == 0) {
                    

                    ans[y-i][x] = supKingDunger(y, x, y-i,x,WKingCords,2,"wq");
    
                    directionsDone[0] = 1;
                } else {
                    directionsDone[0] = 1;
                } 
        
                if (x - i >= 0 && directionsDone[7] == 0) {
                    if (field[y - i][x - i] === 0) {
                        
                        ans[y-i][x-i] = supKingDunger(y, x, y-i,x-i,WKingCords,1,"wq");
    
                    } else if (field[y - i][x - i][0] === "b") {
                        
                        ans[y-i][x-i] = supKingDunger(y, x, y-i,x-i,WKingCords,2,"wq");
    
                        directionsDone[7] = 1;
                    } else {
                        directionsDone[7] = 1;
                    }
                } else {
                    directionsDone[7] = 1;
                }
                
                if (x + i <= 7 && directionsDone[1] == 0) {
                    if (field[y - i][x + i] === 0) {
                        
                        ans[y-i][x+i] = supKingDunger(y, x, y-i,x+i,WKingCords,1,"wq");
    
                    } else if (field[y - i][x + i][0] === "b") {
                        
                        ans[y-i][x+i] = supKingDunger(y, x, y-i,x+i,WKingCords,2,"wq");
    
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
                    
                    ans[y+i][x] = supKingDunger(y, x, y+i,x,WKingCords,1,"wq");
    
                } else if (field[y + i][x][0] === "b" && directionsDone[4] == 0) {
                    
                    ans[y+i][x] = supKingDunger(y, x, y+i,x,WKingCords,2,"wq");
    
                    directionsDone[4] = 1;
                } else {
                    directionsDone[4] = 1;
                }
        
                if (x - i >= 0 && directionsDone[5] == 0) {
                    if (field[y + i][x - i] === 0) {
                        
                        ans[y+i][x-i] = supKingDunger(y, x, y+i,x-i,WKingCords,1,"wq");
    
                    } else if (field[y + i][x - i][0] === "b") {
                        
                        ans[y+i][x-i] = supKingDunger(y, x, y+i,x-i,WKingCords,2,"wq");
    
                        directionsDone[5] = 1;
                    } else {
                        directionsDone[5] = 1;
                    }
                } else {
                    directionsDone[5] = 1;
                }
                
                if (x + i <= 7 && directionsDone[3] == 0) {
                    if (field[y + i][x + i] === 0) {
                        ans[y+i][x+i] = supKingDunger(y, x, y+i,x+i,WKingCords,1,"wq");
                    } else if (field[y + i][x + i][0] === "b") {
                        ans[y+i][x+i] = supKingDunger(y, x, y+i,x+i,WKingCords,2,"wq");
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
                    ans[y][x-i] = supKingDunger(y, x, y,x-i,WKingCords,1,"wq");
                } else if (field[y][x - i][0] === "b") {
                    ans[y][x-i] = supKingDunger(y, x, y,x-i,WKingCords,2,"wq");
                    directionsDone[6] = 1;
                } else {
                    directionsDone[6] = 1;
                }
            } else {
                directionsDone[6] = 1;
            }
    
            if (x + i <= 7 && directionsDone[2] == 0) {
                if (field[y][x + i] === 0) {
                    ans[y][x+i] = supKingDunger(y, x, y,x+i,WKingCords,1,"wq");
                } else if (field[y][x + i][0] === "b") {
                    ans[y][x+i] = supKingDunger(y, x, y,x+i,WKingCords,2,"wq");
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
                        
                        ans[y-i][x-i] = supKingDunger(y, x, y-i,x-i,BKingCords,1,"bb");
    
                    } else if (field[y - i][x - i][0] === "w") {
                        
                        ans[y-i][x-i] = supKingDunger(y, x, y-i,x-i,BKingCords,2,"bb");
    
                        directionsDone[0] = 1;
                    } else {
                        directionsDone[0] = 1;
                    }
                } else {
                    directionsDone[0] = 1;
                }
                
                if (x + i <= 7 && directionsDone[1] == 0) {
                    if (field[y - i][x + i] === 0) {
                        
                        ans[y-i][x+i] = supKingDunger(y, x, y-i,x+i,BKingCords,1,"bb");
    
                    } else if (field[y - i][x + i][0] === "w") {
                        
                        ans[y-i][x+i] = supKingDunger(y, x, y-i,x+i,BKingCords,2,"bb");
    
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
                        
                        ans[y+i][x-i] = supKingDunger(y, x, y+i,x-i,BKingCords,1,"bb");
    
                    } else if (field[y + i][x - i][0] === "w") {
                        
                        ans[y+i][x-i] = supKingDunger(y, x, y+i,x-i,BKingCords,2,"bb");
    
                        directionsDone[3] = 1;
                    } else {
                        directionsDone[3] = 1;
                    }
                } else {
                    directionsDone[3] = 1;
                }
                
                if (x + i <= 7 && directionsDone[2] == 0) {
                    if (field[y + i][x + i] === 0) {
                        ans[y+i][x+i] = supKingDunger(y, x, y+i,x+i,BKingCords,1,"bb");
                    } else if (field[y + i][x + i][0] === "w") {
                        ans[y+i][x+i] = supKingDunger(y, x, y+i,x+i,BKingCords,2,"bb");
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
                        
                        ans[y-i][x-i] = supKingDunger(y, x, y-i,x-i,WKingCords,1,"wb");
    
                    } else if (field[y - i][x - i][0] === "b") {
                        
                        ans[y-i][x-i] = supKingDunger(y, x, y-i,x-i,WKingCords,2,"wb");
    
                        directionsDone[0] = 1;
                    } else {
                        directionsDone[0] = 1;
                    }
                } else {
                    directionsDone[0] = 1;
                }
                
                if (x + i <= 7 && directionsDone[1] == 0) {
                    if (field[y - i][x + i] === 0) {
                        
                        ans[y-i][x+i] = supKingDunger(y, x, y-i,x+i,WKingCords,1,"wb");
    
                    } else if (field[y - i][x + i][0] === "b") {
                        
                        ans[y-i][x+i] = supKingDunger(y, x, y-i,x+i,WKingCords,2,"wb");
    
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
                        
                        ans[y+i][x-i] = supKingDunger(y, x, y+i,x-i,WKingCords,1,"wb");
    
                    } else if (field[y + i][x - i][0] === "b") {
                        
                        ans[y+i][x-i] = supKingDunger(y, x, y+i,x-i,WKingCords,2,"wb");
    
                        directionsDone[3] = 1;
                    } else {
                        directionsDone[3] = 1;
                    }
                } else {
                    directionsDone[3] = 1;
                }
                
                if (x + i <= 7 && directionsDone[2] == 0) {
                    if (field[y + i][x + i] === 0) {
                        ans[y+i][x+i] = supKingDunger(y, x, y+i,x+i,WKingCords,1,"wb");
                    } else if (field[y + i][x + i][0] === "b") {
                        ans[y+i][x+i] = supKingDunger(y, x, y+i,x+i,WKingCords,2,"wb");
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
                    ans[y-i][x] = supKingDunger(y, x, y-i,x,BKingCords,1,"bc");
                } else if (field[y - i][x][0] === "w") {
                    ans[y-i][x] = supKingDunger(y, x, y-i,x,BKingCords,2,"bc");
                    directionsDoneFour[0] = 1;
                } else {
                    directionsDoneFour[0] = 1;
                }
            } else {
                directionsDoneFour[0] = 1;
            }
            
            if (x + i <= 7 && directionsDoneFour[1] == 0) {
                if (field[y][x + i] === 0) {
                    ans[y][x+i] = supKingDunger(y, x, y,x+i,BKingCords,1,"bc");
                } else if (field[y][x + i][0] === "w") {
                    ans[y][x+i] = supKingDunger(y, x, y,x+i,BKingCords,2,"bc");
                    directionsDoneFour[1] = 1;
                } else {
                    directionsDoneFour[1] = 1;
                }
            } else {
                directionsDoneFour[1] = 1;
            }
    
            if (y + i <= 7 && directionsDoneFour[2] == 0) {
                if (field[y + i][x] === 0) {
                    ans[y+i][x] = supKingDunger(y, x, y+i,x,BKingCords,1,"bc");
                } else if (field[y + i][x][0] === "w") {
                    ans[y+i][x] = supKingDunger(y, x, y+i,x,BKingCords,2,"bc");
                    directionsDoneFour[2] = 1;
                } else {
                    directionsDoneFour[2] = 1;
                }
            } else {
                directionsDoneFour[2] = 1;
            }
            
            if (x - i >= 0 && directionsDoneFour[3] == 0) {
                if (field[y][x - i] === 0) {
                    ans[y][x-i] = supKingDunger(y, x, y,x-i,BKingCords,1,"bc");
                } else if (field[y][x - i][0] === "w") {
                    ans[y][x-i] = supKingDunger(y, x, y,x-i,BKingCords,2,"bc");
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
                    ans[y-i][x] = supKingDunger(y, x, y-i,x,WKingCords,1,"wc");
                } else if (field[y - i][x][0] === "b") {
                    ans[y-i][x] = supKingDunger(y, x, y-i,x,WKingCords,2,"wc");
                    directionsDoneFour[0] = 1;
                } else {
                    directionsDoneFour[0] = 1;
                }
            } else {
                directionsDoneFour[0] = 1;
            }
                
            if (x + i <= 7 && directionsDoneFour[1] == 0) {
                if (field[y][x + i] === 0) {
                    ans[y][x+i] = supKingDunger(y, x, y,x+i,WKingCords,1,"wc");
                } else if (field[y][x + i][0] === "b") {
                    ans[y][x+i] = supKingDunger(y, x, y,x+i,WKingCords,2,"wc");
                    directionsDoneFour[1] = 1;
                } else {
                    directionsDoneFour[1] = 1;
                }
            } else {
                directionsDoneFour[1] = 1;
            }
        
            if (y + i <= 7 && directionsDoneFour[2] == 0) {
                if (field[y + i][x] === 0) {
                    ans[y+i][x] = supKingDunger(y, x, y+i,x,WKingCords,1,"wc");
                } else if (field[y + i][x][0] === "b") {
                    ans[y+i][x] = supKingDunger(y, x, y+i,x,WKingCords,2,"wc");
                    directionsDoneFour[2] = 1;
                } else {
                    directionsDoneFour[2] = 1;
                }
            } else {
                directionsDoneFour[2] = 1;
            }
                
            if (x - i >= 0 && directionsDoneFour[3] == 0) {
                if (field[y][x - i] === 0) {
                    ans[y][x-i] = supKingDunger(y, x, y,x-i,WKingCords,1,"wc");
                } else if (field[y][x - i][0] === "b") {
                    ans[y][x-i] = supKingDunger(y, x, y,x-i,WKingCords,2,"wc");
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
                ans[y + 1][x] = supKingDunger(y, x, y+1,x,BKingCords,1,"bp");
                if (countMoves[y][x] === 0 && field[y + 2][x] === 0) {
                    ans[y + 2][x] = supKingDunger(y, x, y+2,x,BKingCords,1,"bp");
                }
            }
            if (x - 1 >= 0) {
                if (field[y + 1][x - 1][0] === "w") {
                    ans[y + 1][x - 1] = supKingDunger(y, x, y+1,x-1,BKingCords,2,"bp");
                }
            }
            if (x + 1 <= 7) {
                if (field[y + 1][x + 1][0] === "w") {
                    ans[y + 1][x + 1] = supKingDunger(y, x, y+1,x+1,BKingCords,2,"bp");
                }
            }
            if (x - 1 >= 0 && pawnStep.length !== 0) {
                if (y+1 === pawnStep[0] && x-1 === pawnStep[1] && pawnStep[0] === 5) {
                    ans[y + 1][x - 1] = supKingDunger(y, x, y+1,x-1,BKingCords,2,"bp");
                }
            }
            if (x + 1 <= 7 && pawnStep.length !== 0) {
                if (y+1 === pawnStep[0] && x+1 === pawnStep[1] && pawnStep[0] === 5) {
                    ans[y + 1][x + 1] = supKingDunger(y, x, y+1,x+1,BKingCords,2,"bp");
                }
            }
        }
        return ans;
    case "wp":
        if (y - 1 >= 0) {
            if (field[y - 1][x] === 0) {
                ans[y - 1][x] = supKingDunger(y, x, y-1,x,WKingCords,1,"wp");
                if (countMoves[y][x] === 0 && field[y - 2][x] === 0) {
                    ans[y - 2][x] = supKingDunger(y, x, y-2,x,WKingCords,1,"wp");
                }
            }
            if (x - 1 >= 0) {
                if (field[y - 1][x - 1][0] === "b") {
                    ans[y - 1][x - 1] = supKingDunger(y, x, y-1,x-1,WKingCords,2,"wp");
                }
            }
            if (x + 1 <= 7) {
                if (field[y - 1][x + 1][0] === "b") {
                    ans[y - 1][x + 1] = supKingDunger(y, x, y-1,x+1,WKingCords,2,"wp");
                }
            }
            if (x - 1 >= 0 && pawnStep.length !== 0) {
                if (y-1 === pawnStep[0] && x-1 === pawnStep[1] && pawnStep[0] === 2) {
                    ans[y - 1][x - 1] = supKingDunger(y, x, y-1,x-1,WKingCords,2,"wp");
                }
            }
            if (x + 1 <= 7 && pawnStep.length !== 0) {
                if (y-1 === pawnStep[0] && x+1 === pawnStep[1] && pawnStep[0] === 2) {
                    ans[y - 1][x + 1] = supKingDunger(y, x, y-1,x+1,WKingCords,2,"wp");
                }
            }
        }
        return ans;
    case "bn":
        if (y - 1 >= 0) {
            if (x - 2 >= 0) {
                if (field[y - 1][x - 2] === 0) {
                    ans[y - 1][x - 2] = supKingDunger(y, x, y-1,x-2,BKingCords,1,"bn");
                } else if (field[y - 1][x - 2][0] === "w") {
                    ans[y - 1][x - 2] = supKingDunger(y, x, y-1,x-2,BKingCords,2,"bn");
                }
            }
            if (x + 2 <= 7) {
                if (field[y - 1][x + 2] === 0) {
                    ans[y - 1][x + 2] = supKingDunger(y, x, y-1,x+2,BKingCords,1,"bn");
                } else if (field[y - 1][x + 2][0] === "w") {
                    ans[y - 1][x + 2] = supKingDunger(y, x, y-1,x+2,BKingCords,2,"bn");
                }
            }
        }
        if (y - 2 >= 0) {
            if (x - 1 >= 0) {
                if (field[y - 2][x - 1] === 0) {
                    ans[y - 2][x - 1] = supKingDunger(y, x, y-2,x-1,BKingCords,1,"bn");
                } else if (field[y - 2][x - 1][0] === "w") {
                    ans[y - 2][x - 1] = supKingDunger(y, x, y-2,x-1,BKingCords,2,"bn");
                }
            }
            if (x + 1 <= 7) {
                if (field[y - 2][x + 1] === 0) {
                    ans[y - 2][x + 1] = supKingDunger(y, x, y-2,x+1,BKingCords,1,"bn");
                } else if (field[y - 2][x + 1][0] === "w") {
                    ans[y - 2][x + 1] = supKingDunger(y, x, y-2,x+1,BKingCords,2,"bn");
                }
            }
        }

        if (y + 1 <= 7) {
            if (x - 2 >= 0) {
                if (field[y + 1][x - 2] === 0) {
                    ans[y + 1][x - 2] = supKingDunger(y, x, y+1,x-2,BKingCords,1,"bn");
                } else if (field[y + 1][x - 2][0] === "w") {
                    ans[y + 1][x - 2] = supKingDunger(y, x, y+1,x-2,BKingCords,2,"bn");
                }
            }
            if (x + 2 <= 7) {
                if (field[y + 1][x + 2] === 0) {
                    ans[y + 1][x + 2] = supKingDunger(y, x, y+1,x+2,BKingCords,1,"bn");
                } else if (field[y + 1][x + 2][0] === "w") {
                    ans[y + 1][x + 2] = supKingDunger(y, x, y+1,x+2,BKingCords,2,"bn");
                }
            }
        }
        if (y + 2 <= 7) {
            if (x - 1 >= 0) {
                if (field[y + 2][x - 1] === 0) {
                    ans[y + 2][x - 1] = supKingDunger(y, x, y+2,x-1,BKingCords,1,"bn");
                } else if (field[y + 2][x - 1][0] === "w") {
                    ans[y + 2][x - 1] = supKingDunger(y, x, y+2,x-1,BKingCords,2,"bn");
                }
            }
            if (x + 1 <= 7) {
                if (field[y + 2][x + 1] === 0) {
                    ans[y + 2][x + 1] = supKingDunger(y, x, y+2,x+1,BKingCords,1,"bn");
                } else if (field[y + 2][x + 1][0] === "w") {
                    ans[y + 2][x + 1] = supKingDunger(y, x, y+2,x+1,BKingCords,2,"bn");
                }
            }
        }
        return ans;
    case "wn":
    if (y - 1 >= 0) {
        if (x - 2 >= 0) {
            if (field[y - 1][x - 2] === 0) {
                ans[y - 1][x - 2] = supKingDunger(y, x, y-1,x-2,WKingCords,1,"wn");
            } else if (field[y - 1][x - 2][0] === "b") {
                ans[y - 1][x - 2] = supKingDunger(y, x, y-1,x-2,WKingCords,2,"wn");
            }
        }
        if (x + 2 <= 7) {
            if (field[y - 1][x + 2] === 0) {
                ans[y - 1][x + 2] = supKingDunger(y, x, y-1,x+2,WKingCords,1,"wn");
            } else if (field[y - 1][x + 2][0] === "b") {
                ans[y - 1][x + 2] = supKingDunger(y, x, y-1,x+2,WKingCords,2,"wn");
            }
        }
    }
    if (y - 2 >= 0) {
        if (x - 1 >= 0) {
            if (field[y - 2][x - 1] === 0) {
                ans[y - 2][x - 1] = supKingDunger(y, x, y-2,x-1,WKingCords,1,"wn");
            } else if (field[y - 2][x - 1][0] === "b") {
                ans[y - 2][x - 1] = supKingDunger(y, x, y-2,x-1,WKingCords,2,"wn");
            }
        }
        if (x + 1 <= 7) {
            if (field[y - 2][x + 1] === 0) {
                ans[y - 2][x + 1] = supKingDunger(y, x, y-2,x+1,WKingCords,1,"wn");
            } else if (field[y - 2][x + 1][0] === "b") {
                ans[y - 2][x + 1] = supKingDunger(y, x, y-2,x+1,WKingCords,2,"wn");
            }
        }
    }

    if (y + 1 <= 7) {
        if (x - 2 >= 0) {
            if (field[y + 1][x - 2] === 0) {
                ans[y + 1][x - 2] = supKingDunger(y, x, y+1,x-2,WKingCords,1,"wn");
            } else if (field[y + 1][x - 2][0] === "b") {
                ans[y + 1][x - 2] = supKingDunger(y, x, y+1,x-2,WKingCords,2,"wn");
            }
        }
        if (x + 2 <= 7) {
            if (field[y + 1][x + 2] === 0) {
                ans[y + 1][x + 2] = supKingDunger(y, x, y+1,x+2,WKingCords,1,"wn");
            } else if (field[y + 1][x + 2][0] === "b") {
                ans[y + 1][x + 2] = supKingDunger(y, x, y+1,x+2,WKingCords,2,"wn");
            }
        }
    }
    if (y + 2 <= 7) {
        if (x - 1 >= 0) {
            if (field[y + 2][x - 1] === 0) {
                ans[y + 2][x - 1] = supKingDunger(y, x, y+2,x-1,WKingCords,1,"wn");
            } else if (field[y + 2][x - 1][0] === "b") {
                ans[y + 2][x - 1] = supKingDunger(y, x, y+2,x-1,WKingCords,2,"wn");
            }
        }
        if (x + 1 <= 7) {
            if (field[y + 2][x + 1] === 0) {
                ans[y + 2][x + 1] = supKingDunger(y, x, y+2,x+1,WKingCords,1,"wn");
            } else if (field[y + 2][x + 1][0] === "b") {
                ans[y + 2][x + 1] = supKingDunger(y, x, y+2,x+1,WKingCords,2,"wn");
            }
        }
    }
    return ans;
}
}

function supKingDunger(y, x, yi, xi, KingCords, placeType, figureName) { //mini function for gigant function
    let temp = chessField[yi][xi];
    chessField[y][x] = 0;
    chessField[yi][xi] = figureName;
    (turn === "white" ? generateAllUnsafeMovesB() : generateAllUnsafeMovesW());
    chessField[y][x] = figureName;
    chessField[yi][xi] = temp;
    if ((figureName[0] === "w" ? possibleBMoves : possibleWMoves)[KingCords[0]][KingCords[1]] === 0) {
        return placeType;
    } else {
        return 0;
    }
} 

function MoveFigure(y, x, toy, tox) {
    if (userRights.canMoveFigure) {
        if (chessField[y][x][0] !== turn[0] || moves[String(y) + String(x)][toy][tox] === 0) {
            return 0;
        }

        let name = chessField[y][x]

        if (pawnStep.length !== 0) {                                //beat pawn step check
            if (toy === pawnStep[0] && tox === pawnStep[1]) {
                if (name === "wp") {
                    chessField[toy + 1][tox] = 0;
                } else if (name === "bp") {
                    chessField[toy - 1][tox] = 0;
                }
            }
        }

        if (chessField[y][x][1] === "k" && moves[String(y) + String(x)][0][0] === 3 || moves[String(y) + String(x)][0][7] === 3 || moves[String(y) + String(x)][7][0] === 3 || moves[String(y) + String(x)][7][7] === 3) {
            if (chessField[y][x][0] === "w" && !WKingWasMoved) {
                let sessionHistory = JSON.parse(sessionStorage.getItem("sessionHistory"));
        let fromTo = {
            from: [y, x],
            to: [toy, tox],
            beatenFigure: chessField[toy][tox],
            moveType: "castling"
        }

                if (toy === 7 && tox === 0) {
                    window.document.getElementById(chessFieldPlaces[y][x]).classList.remove("wk");
                    window.document.getElementById(chessFieldPlaces[y][x]).classList.remove('selectedPlace');
                    window.document.getElementById(chessFieldPlaces[y][x]).classList.add('place');
                    window.document.getElementById(chessFieldPlaces[y][x]).setAttribute('onclick', "");
                    window.document.getElementById(chessFieldPlaces[0][2]).classList.remove('placeToMove');
                    window.document.getElementById(chessFieldPlaces[0][2]).classList.remove('placeToBeat');
        
                    countMoves[7][2] = countMoves[y][x] + 1;
                    countMoves[y][x] = 0;
        
                    chessField[7][2] = chessField[y][x];
                    chessField[y][x] = 0;
        
                    chessField[7][3] = chessField[toy][tox];
                    chessField[toy][tox] = 0;
        
                    WKingCords = [7,2];
                    WKingWasMoved = true;
        
                    unselectFigure();
                    clearPossibleMovesFull();
                    window.document.getElementById(chessFieldPlaces[y][x]).style.backgroundColor = rasidualTrace;
                    window.document.getElementById(chessFieldPlaces[7][2]).style.backgroundColor = rasidualTrace;
                    window.document.getElementById(chessFieldPlaces[toy][tox]).style.backgroundColor = rasidualTraceSec;
                    window.document.getElementById(chessFieldPlaces[7][3]).style.backgroundColor = rasidualTraceSec;
                    moves = {};
                    turn = (turn === "white" ? "black" : "white");
    
                    sessionHistory.push(fromTo);
                    sessionStorage.setItem("sessionHistory", JSON.stringify(sessionHistory));
    
                    arrangeFigures();
                    return 1;
                } else if (toy === 7 && tox === 7) {
                    window.document.getElementById(chessFieldPlaces[y][x]).classList.remove("wk");
                    window.document.getElementById(chessFieldPlaces[y][x]).classList.remove('selectedPlace');
                    window.document.getElementById(chessFieldPlaces[y][x]).classList.add('place');
                    window.document.getElementById(chessFieldPlaces[y][x]).setAttribute('onclick', "");
                    window.document.getElementById(chessFieldPlaces[0][2]).classList.remove('placeToMove');
                    window.document.getElementById(chessFieldPlaces[0][2]).classList.remove('placeToBeat');
        
                    countMoves[7][6] = countMoves[y][x] + 1;
                    countMoves[y][x] = 0;
        
                    chessField[7][6] = chessField[y][x];
                    chessField[y][x] = 0;
        
                    chessField[7][5] = chessField[toy][tox];
                    chessField[toy][tox] = 0;
        
                    WKingCords = [7,6];
                    WKingWasMoved = true;
        
                    unselectFigure();
                    clearPossibleMovesFull();
                    window.document.getElementById(chessFieldPlaces[y][x]).style.backgroundColor = rasidualTrace;
                    window.document.getElementById(chessFieldPlaces[7][6]).style.backgroundColor = rasidualTrace;
                    window.document.getElementById(chessFieldPlaces[toy][tox]).style.backgroundColor = rasidualTraceSec;
                    window.document.getElementById(chessFieldPlaces[7][5]).style.backgroundColor = rasidualTraceSec;
                    moves = {};
                    turn = (turn === "white" ? "black" : "white");
    
                    sessionHistory.push(fromTo);
                    sessionStorage.setItem("sessionHistory", JSON.stringify(sessionHistory));
    
                    arrangeFigures();
                    return 1;
                }
            } else if (chessField[y][x][0] === "b" && !BKingWasMoved) {
                let sessionHistory = JSON.parse(sessionStorage.getItem("sessionHistory"));
        let fromTo = {
            from: [y, x],
            to: [toy, tox],
            beatenFigure: chessField[toy][tox],
            moveType: "castling"
        }

        if (chessField[y][x][0] === "b" && chessField[toy][tox][0] === "b") {
            if (toy === 0 && tox === 0) {
                window.document.getElementById(chessFieldPlaces[y][x]).classList.remove("bk");
                window.document.getElementById(chessFieldPlaces[y][x]).classList.remove('selectedPlace');
                window.document.getElementById(chessFieldPlaces[y][x]).classList.add('place');
                // window.document.getElementById(chessFieldPlaces[y][x]).setAttribute('onclick', "");
                window.document.getElementById(chessFieldPlaces[0][2]).classList.remove('placeToMove');
                window.document.getElementById(chessFieldPlaces[0][2]).classList.remove('placeToBeat');
    
                countMoves[0][2] = countMoves[y][x] + 1;
                countMoves[y][x] = 0;
    
                chessField[0][2] = chessField[y][x];
                chessField[y][x] = 0;
                chessField[0][3] = chessField[toy][tox];
                chessField[toy][tox] = 0;
    
                BKingCords = [0,2];
                BKingWasMoved = true;
    
                unselectFigure();
                clearPossibleMovesFull();
                window.document.getElementById(chessFieldPlaces[y][x]).style.backgroundColor = rasidualTrace;
                window.document.getElementById(chessFieldPlaces[0][2]).style.backgroundColor = rasidualTrace;
                window.document.getElementById(chessFieldPlaces[toy][tox]).style.backgroundColor = rasidualTraceSec;
                window.document.getElementById(chessFieldPlaces[0][3]).style.backgroundColor = rasidualTraceSec;
                moves = {};
                turn = (turn === "white" ? "black" : "white");

                sessionHistory.push(fromTo);
                sessionStorage.setItem("sessionHistory", JSON.stringify(sessionHistory));

                arrangeFigures();
                return 1;
            } else if (toy === 0 && tox === 7) {
                window.document.getElementById(chessFieldPlaces[y][x]).classList.remove("bk");
                window.document.getElementById(chessFieldPlaces[y][x]).classList.remove('selectedPlace');
                window.document.getElementById(chessFieldPlaces[y][x]).classList.add('place');
                // window.document.getElementById(chessFieldPlaces[y][x]).setAttribute('onclick', "");
                window.document.getElementById(chessFieldPlaces[0][2]).classList.remove('placeToMove');
                window.document.getElementById(chessFieldPlaces[0][2]).classList.remove('placeToBeat');
    
                countMoves[0][6] = countMoves[y][x] + 1;
                countMoves[y][x] = 0;
    
                chessField[0][6] = chessField[y][x];
                chessField[y][x] = 0;
    
                chessField[0][5] = chessField[toy][tox];
                chessField[toy][tox] = 0;
    
                BKingCords = [0,6];
                BKingWasMoved = true;
    
                unselectFigure();
                clearPossibleMovesFull();
                window.document.getElementById(chessFieldPlaces[y][x]).style.backgroundColor = rasidualTrace;
                window.document.getElementById(chessFieldPlaces[0][6]).style.backgroundColor = rasidualTrace;
                window.document.getElementById(chessFieldPlaces[toy][tox]).style.backgroundColor = rasidualTraceSec;
                window.document.getElementById(chessFieldPlaces[0][5]).style.backgroundColor = rasidualTraceSec;
                moves = {};
                turn = (turn === "white" ? "black" : "white");

                sessionHistory.push(fromTo);
                sessionStorage.setItem("sessionHistory", JSON.stringify(sessionHistory));

                arrangeFigures();
                return 1;
            }
        }
            }
        }

        if (chessField[toy][tox] != 0) {
            if (turn === "white") {
                beatenFiguresBlack.push(chessField[toy][tox]);
                compliteBeatenFigures(turn);
            } else {
                beatenFiguresWhite.push(chessField[toy][tox]);
                compliteBeatenFigures(turn);
            }
        }
    
        let sessionHistory = JSON.parse(sessionStorage.getItem("sessionHistory"));
        let fromTo = {
            from: [y, x],
            to: [toy, tox],
            beatenFigure: chessField[toy][tox],
            moveType: "standart"
        }
        
        chessField[y][x] = 0;
        countMoves[toy][tox] = countMoves[y][x] + 1;
        countMoves[y][x] = 0;
        chessField[toy][tox] = name;
    
        unselectFigure();
    
        moves = {};
        turn = (turn === "white" ? "black" : "white");
        pawnStep = [];
        let place = window.document.getElementById(chessFieldPlaces[y][x]);
        place.removeEventListener("click", eventSelectFigureSmart);
        place.removeEventListener("mouseover", eventShowPossibleMoves);
        place.removeEventListener("mouseout", eventClearPossibleMoves);
    
        if (name === "wk") {
            WKingCords = [toy, tox];
            WKingWasMoved = true;
            // pawnStep = [];
        } else if (name === "bk") {
            BKingCords = [toy, tox];
            BKingWasMoved = true;
            // pawnStep = [];
        } else if (name === "wp") {
            if (countMoves[toy][tox] === 1 && toy === 4) {
                pawnStep = [toy + 1, tox];
                fromTo.moveType = "pawnJump"
            }
            if (toy === 0) {
                // callFigureWheel("white", toy, tox);                 //figure wheel call
                return 0;
            }
        } else if (name === "bp") {
            if (countMoves[toy][tox] === 1 && toy === 3) {
                pawnStep = [toy - 1, tox];
                fromTo.moveType = "pawnJump"
            }
            if (toy === 7) {
                // callFigureWheel("black", toy, tox);
                return 0;
            } 
        }

        sessionHistory.push(fromTo);
        sessionStorage.setItem("sessionHistory", JSON.stringify(sessionHistory));
    
        historyStep++;
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                fakeChessField[y][x] = chessField[y][x]
            }
        }
    
        clearPossibleMovesFull();
        window.document.getElementById(chessFieldPlaces[y][x]).style.backgroundColor = rasidualTrace;
        window.document.getElementById(chessFieldPlaces[toy][tox]).style.backgroundColor = rasidualTrace;
        arrangeFigures();
    }
}