let history = [[["bc", "bn", "bb", "bq", "bk", "bb", "bn", "bc"],
["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
[0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0], 
["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"], 
["wc", "wn", "wb", "wq", "wk", "wb", "wn", "wc"]]];
sessionStorage.setItem("sessionHistory", JSON.stringify([]));

let selectedFigure = [];
let rasidualTrace = "rgba(74, 185, 74, 0.51)";
let rasidualTraceSec = "rgba(74, 185, 170, 0.51)";
let selectColor = "rgba(0, 162, 255, 0.582)";
//let hoverPlaceColor = "rgba(0, 162, 255, 0.2)";
let pawnStep = [];

// let h = window.document.getElementById('turnW');
// let f = h.getElementsByTagName('h1');
// // f[0].style.display = 'none';

let chessField = [["bc", "bn", "bb", "bq", "bk", "bb", "bn", "bc"],
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

let turn = "white";

function fieldRefresh() {
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

function arrangeFigures() {
    chessField.map((i, y) => {i.map((j, x) => {
            if (j !== 0) {
                let Place = window.document.getElementById(`place${y+1}${x+1}`);
                // Place.classList.add(j);
                Place.setAttribute('onmouseout', 'clearPossibleMoves()');
                Place.setAttribute('onmouseover', `showPossibleMoves("${j}", ${y}, ${x})`);
                Place.setAttribute('onclick', (turn[0] === j[0] ? `selectFigure('${j}', ${y}, ${x})` : ""));
                let figure = document.createElement("div");
                figure.classList.add("figure");
                figure.classList.add(j);
                Place.appendChild(figure);
                if (turn[0] === j[0]) {
                    moves[String(y)+String(x)] = checkPossibleMoves(j, y, x);
                    Place.style.cursor = "pointer";
                    // let havePossibleMoves = false;
                    // moves[String(y)+String(x)].map((i) => {
                    //     i.map((j) => {
                    //         if(j !== 0) {
                    //             havePossibleMoves = true
                    //         }
                    //     })
                    // })
                    // if (havePossibleMoves) {
                    //     Place.style.cursor = "pointer";
                    // }
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
        })});

    if (pawnStep.length !== 0) {
        let element = window.document.getElementById('step_pawn');
        element.style.display = "block";
        element.style.top = chessFieldCords[pawnStep[0]];
        element.style.left = chessFieldCords[pawnStep[1]];
    }

    if (turn === "white") {
        window.document.getElementById('turnBGB').style.display = "none";
        let b = window.document.getElementById('turnB');
        b.getElementsByTagName('h1')[0].style.display = 'none';
        b.getElementsByTagName('h4')[0].style.display = 'none';
        window.document.getElementById('turnBGW').style.display = "block";
        let w = window.document.getElementById('turnW');
        w.getElementsByTagName('h1')[0].style.display = 'flex';
        w.getElementsByTagName('h4')[0].style.display = 'flex';
    } else {
        window.document.getElementById('turnBGW').style.display = "none";
        let w = window.document.getElementById('turnW');
        w.getElementsByTagName('h1')[0].style.display = 'none';
        w.getElementsByTagName('h4')[0].style.display = 'none';
        window.document.getElementById('turnBGB').style.display = "block";
        let b = window.document.getElementById('turnB');
        b.getElementsByTagName('h1')[0].style.display = 'flex';
        b.getElementsByTagName('h4')[0].style.display = 'flex';
    }
    let sessionHistory = JSON.parse(sessionStorage.getItem("sessionHistory"));
    sessionHistory.push(chessField);
    sessionStorage.setItem("sessionHistory", JSON.stringify(sessionHistory));

    if (turn === "white") {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (chessField[i][j][0] === "w") {
                    if (JSON.stringify(moves[String(i) + String(j)]) !== JSON.stringify([[0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0], 
                    [0, 0, 0, 0, 0, 0, 0, 0], 
                    [0, 0, 0, 0, 0, 0, 0, 0], 
                    [0, 0, 0, 0, 0, 0, 0, 0], 
                    [0, 0, 0, 0, 0, 0, 0, 0], 
                    [0, 0, 0, 0, 0, 0, 0, 0]])) {
                        return 0;
                    }
                }
            }
        }
    } else {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (chessField[i][j][0] === "b") {
                    if (JSON.stringify(moves[String(i) + String(j)]) !== JSON.stringify([[0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0], 
                    [0, 0, 0, 0, 0, 0, 0, 0], 
                    [0, 0, 0, 0, 0, 0, 0, 0], 
                    [0, 0, 0, 0, 0, 0, 0, 0], 
                    [0, 0, 0, 0, 0, 0, 0, 0], 
                    [0, 0, 0, 0, 0, 0, 0, 0]])) {
                        return 0;
                    }
                }
            }
        }
    }
    callAttensionStandart((turn === "white" ? "Черные одержали победу!" : "Белые одержали победу!"))
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

function FindFigure(name) {
    let res = [];

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (chessField[i][j] === name) {
                res = [i, j];
                break;
            }
        }
    }

    return res === [] ? -1 : res;
}

function checkPossibleUnsafeMoves(name, y, x, to) {

    let directionsDone = [0, 0, 0, 0, 0, 0, 0, 0];
    let directionsDoneFour = [0, 0, 0, 0];

    switch (name) {
        case "bk":
    if (y - 1 >= 0) {
        if (chessField[y - 1][x] === 0) {
            to[y - 1][x] = 1
        }
        if (chessField[y - 1][x][0] === "w") {
            to[y - 1][x] = 2
        }
        if (x - 1 >= 0) {
            if (chessField[y - 1][x - 1] === 0) {
                to[y - 1][x - 1] = 1
            }
            if (chessField[y - 1][x - 1][0] === "w") {
                to[y - 1][x - 1] = 2
            }
        }
        if (x + 1 <= 7) {
            if (chessField[y - 1][x + 1] === 0) {
                to[y - 1][x + 1] = 1
            }
            if (chessField[y - 1][x + 1][0] === "w") {
                to[y - 1][x + 1] = 2
            }
        }
    }
    if (y + 1 <= 7) {
        if (chessField[y + 1][x] === 0) {
            to[y + 1][x] = 1
        }
        if (chessField[y + 1][x][0] === "w") {
            to[y + 1][x] = 2
        }
        if (x - 1 >= 0) {
            if (chessField[y + 1][x - 1] === 0) {
                to[y + 1][x - 1] = 1
            }
            if (chessField[y + 1][x - 1][0] === "w") {
                to[y + 1][x - 1] = 2
            }
        }
        if (x + 1 <= 7) {
            if (chessField[y + 1][x + 1] === 0) {
                to[y + 1][x + 1] = 1
            }
            if (chessField[y + 1][x + 1][0] === "w") {
                to[y + 1][x + 1] = 2
            }
        }
    }
    if (x - 1 >= 0) {
        if (chessField[y][x - 1] === 0) {
            to[y][x - 1] = 1
        }
        if (chessField[y][x - 1][0] === "w") {
            to[y][x - 1] = 2
        }
    }
    if (x + 1 <= 7) {
        if (chessField[y][x + 1] === 0) {
            to[y][x + 1] = 1
        }
        if (chessField[y][x + 1][0] === "w") {
            to[y][x + 1] = 2
        }
    }
    if (!BKingWasMoved) {
                if (chessField[0][0] === "bc" && countMoves[0][0] === 0) {
                    if (chessField[y][x - 1] === 0 && chessField[y][x - 2] === 0 && chessField[y][x - 3] === 0) {
                            to[0][0] = 3;
                    }
                }
                if (chessField[0][7] === "bc" && countMoves[0][7] === 0) {
                    if (chessField[y][x + 1] === 0 && chessField[y][x + 2] === 0) {
                            to[0][7] = 3;
                    }
                }
    }
            break;
        case "bq":
            for (let i = 1; i < 8 && directionsDone != [1, 1, 1, 1, 1, 1, 1, 1]; i++) {
                if (y - i >= 0) {
                    if (chessField[y - i][x] === 0 && directionsDone[0] == 0) {
                        to[y - i][x] = 1;
                    } else if (chessField[y - i][x][0] === "w" && directionsDone[0] == 0) {
                        to[y - i][x] = 2;
                        directionsDone[0] = 1;
                    } else {
                        directionsDone[0] = 1;
                    } 
            
                    if (x - i >= 0 && directionsDone[7] == 0) {
                        if (chessField[y - i][x - i] === 0) {
                            to[y - i][x - i] = 1;
                        } else if (chessField[y - i][x - i][0] === "w") {
                            to[y - i][x - i] = 2;
                            directionsDone[7] = 1;
                        } else {
                            directionsDone[7] = 1;
                        }
                    } else {
                        directionsDone[7] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDone[1] == 0) {
                        if (chessField[y - i][x + i] === 0) {
                            to[y - i][x + i] = 1;
                        } else if (chessField[y - i][x + i][0] === "w") {
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
                    if (chessField[y + i][x] === 0  && directionsDone[4] == 0) {
                        to[y + i][x] = 1;
                    } else if (chessField[y + i][x][0] === "w" && directionsDone[4] == 0) {
                        to[y + i][x] = 2
                        directionsDone[4] = 1;
                    } else {
                        directionsDone[4] = 1;
                    }
            
                    if (x - i >= 0 && directionsDone[5] == 0) {
                        if (chessField[y + i][x - i] === 0) {
                            to[y + i][x - i] = 1;
                        } else if (chessField[y + i][x - i][0] === "w") {
                            to[y + i][x - i] = 2;
                            directionsDone[5] = 1;
                        } else {
                            directionsDone[5] = 1;
                        }
                    } else {
                        directionsDone[5] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDone[3] == 0) {
                        if (chessField[y + i][x + i] === 0) {
                            to[y + i][x + i] = 1;
                        } else if (chessField[y + i][x + i][0] === "w") {
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
                    if (chessField[y][x - i] === 0) {
                        to[y][x - i] = 1;
                    } else if (chessField[y][x - i][0] === "w") {
                        to[y][x - i] = 2;
                        directionsDone[6] = 1;
                    } else {
                        directionsDone[6] = 1;
                    }
                } else {
                    directionsDone[6] = 1;
                }
        
                if (x + i <= 7 && directionsDone[2] == 0) {
                    if (chessField[y][x + i] === 0) {
                        to[y][x + i] = 1;
                    } else if (chessField[y][x + i][0] === "w") {
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
                        if (chessField[y - i][x - i] === 0) {
                            to[y - i][x - i] = 1;
                        } else if (chessField[y - i][x - i][0] === "w") {
                            to[y - i][x - i] = 2;
                            directionsDoneFour[0] = 1;
                        } else {
                            directionsDoneFour[0] = 1;
                        }
                    } else {
                        directionsDoneFour[0] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDoneFour[1] == 0) {
                        if (chessField[y - i][x + i] === 0) {
                            to[y - i][x + i] = 1;
                        } else if (chessField[y - i][x + i][0] === "w") {
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
                        if (chessField[y + i][x - i] === 0) {
                            to[y + i][x - i] = 1;
                        } else if (chessField[y + i][x - i][0] === "w") {
                            to[y + i][x - i] = 2;
                            directionsDoneFour[3] = 1;
                        } else {
                            directionsDoneFour[3] = 1;
                        }
                    } else {
                        directionsDoneFour[3] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDoneFour[2] == 0) {
                        if (chessField[y + i][x + i] === 0) {
                            to[y + i][x + i] = 1;
                        } else if (chessField[y + i][x + i][0] === "w") {
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
                if (chessField[y - 1][x] === 0) {
                    to[y - 1][x] = 1
                }
                if (chessField[y - 1][x][0] === "b") {
                    to[y - 1][x] = 2
                }
                if (x - 1 >= 0) {
                    if (chessField[y - 1][x - 1] === 0) {
                        to[y - 1][x - 1] = 1
                    }
                    if (chessField[y - 1][x - 1][0] === "b") {
                        to[y - 1][x - 1] = 2
                    }
                }
                if (x + 1 <= 7) {
                    if (chessField[y - 1][x + 1] === 0) {
                        to[y - 1][x + 1] = 1
                    }
                    if (chessField[y - 1][x + 1][0] === "b") {
                        to[y - 1][x + 1] = 2
                    }
                }
            }
            if (y + 1 <= 7) {
                if (chessField[y + 1][x] === 0) {
                    to[y + 1][x] = 1
                }
                if (chessField[y + 1][x][0] === "b") {
                    to[y + 1][x] = 2
                }
                if (x - 1 >= 0) {
                    if (chessField[y + 1][x - 1] === 0) {
                        to[y + 1][x - 1] = 1
                    }
                    if (chessField[y + 1][x - 1][0] === "b") {
                        to[y + 1][x - 1] = 2
                    }
                }
                if (x + 1 <= 7) {
                    if (chessField[y + 1][x + 1] === 0) {
                        to[y + 1][x + 1] = 1
                    }
                    if (chessField[y + 1][x + 1][0] === "b") {
                        to[y + 1][x + 1] = 2
                    }
                }
            }
            if (x - 1 >= 0) {
                if (chessField[y][x - 1] === 0) {
                    to[y][x - 1] = 1
                }
                if (chessField[y][x - 1][0] === "b") {
                    to[y][x - 1] = 2
                }
            }
            if (x + 1 <= 7) {
                if (chessField[y][x + 1] === 0) {
                    to[y][x + 1] = 1
                }
                if (chessField[y][x + 1][0] === "b") {
                    to[y][x + 1] = 2
                }
            }

            if (!WKingWasMoved) {
                        if (chessField[7][0] === "wc" && countMoves[7][0] === 0) {
                            if (chessField[y][x - 1] === 0 && chessField[y][x - 2] === 0 && chessField[y][x - 3] === 0) {
                                    to[7][0] = 3;
                            }
                        }
                        if (chessField[7][7] === "wc" && countMoves[7][7] === 0) {
                            if (chessField[y][x + 1] === 0 && chessField[y][x + 2] === 0) {
                                    to[7][7] = 3;
                            }
                        }
            }
            break;
        case "wq":
            for (let i = 1; i < 8 && directionsDone != [1, 1, 1, 1, 1, 1, 1, 1]; i++) {
                if (y - i >= 0) {
                    if (chessField[y - i][x] === 0 && directionsDone[0] == 0) {
                        to[y - i][x] = 1;
                    } else if (chessField[y - i][x][0] === "b" && directionsDone[0] == 0) {
                        to[y - i][x] = 2;
                        directionsDone[0] = 1;
                    } else {
                        directionsDone[0] = 1;
                    } 
            
                    if (x - i >= 0 && directionsDone[7] == 0) {
                        if (chessField[y - i][x - i] === 0) {
                            to[y - i][x - i] = 1;
                        } else if (chessField[y - i][x - i][0] === "b") {
                            to[y - i][x - i] = 2;
                            directionsDone[7] = 1;
                        } else {
                            directionsDone[7] = 1;
                        }
                    } else {
                        directionsDone[7] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDone[1] == 0) {
                        if (chessField[y - i][x + i] === 0) {
                            to[y - i][x + i] = 1;
                        } else if (chessField[y - i][x + i][0] === "b") {
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
                    if (chessField[y + i][x] === 0  && directionsDone[4] == 0) {
                        to[y + i][x] = 1;
                    } else if (chessField[y + i][x][0] === "b" && directionsDone[4] == 0) {
                        to[y + i][x] = 2
                        directionsDone[4] = 1;
                    } else {
                        directionsDone[4] = 1;
                    }
            
                    if (x - i >= 0 && directionsDone[5] == 0) {
                        if (chessField[y + i][x - i] === 0) {
                            to[y + i][x - i] = 1;
                        } else if (chessField[y + i][x - i][0] === "b") {
                            to[y + i][x - i] = 2;
                            directionsDone[5] = 1;
                        } else {
                            directionsDone[5] = 1;
                        }
                    } else {
                        directionsDone[5] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDone[3] == 0) {
                        if (chessField[y + i][x + i] === 0) {
                            to[y + i][x + i] = 1;
                        } else if (chessField[y + i][x + i][0] === "b") {
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
                    if (chessField[y][x - i] === 0) {
                        to[y][x - i] = 1;
                    } else if (chessField[y][x - i][0] === "b") {
                        to[y][x - i] = 2;
                        directionsDone[6] = 1;
                    } else {
                        directionsDone[6] = 1;
                    }
                } else {
                    directionsDone[6] = 1;
                }
        
                if (x + i <= 7 && directionsDone[2] == 0) {
                    if (chessField[y][x + i] === 0) {
                        to[y][x + i] = 1;
                    } else if (chessField[y][x + i][0] === "b") {
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
                        if (chessField[y - i][x - i] === 0) {
                            to[y - i][x - i] = 1;
                        } else if (chessField[y - i][x - i][0] === "b") {
                            to[y - i][x - i] = 2;
                            directionsDoneFour[0] = 1;
                        } else {
                            directionsDoneFour[0] = 1;
                        }
                    } else {
                        directionsDoneFour[0] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDoneFour[1] == 0) {
                        if (chessField[y - i][x + i] === 0) {
                            to[y - i][x + i] = 1;
                        } else if (chessField[y - i][x + i][0] === "b") {
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
                        if (chessField[y + i][x - i] === 0) {
                            to[y + i][x - i] = 1;
                        } else if (chessField[y + i][x - i][0] === "b") {
                            to[y + i][x - i] = 2;
                            directionsDoneFour[3] = 1;
                        } else {
                            directionsDoneFour[3] = 1;
                        }
                    } else {
                        directionsDoneFour[3] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDoneFour[2] == 0) {
                        if (chessField[y + i][x + i] === 0) {
                            to[y + i][x + i] = 1;
                        } else if (chessField[y + i][x + i][0] === "b") {
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
                        if (chessField[y - i][x] === 0) {
                            to[y - i][x] = 1;
                        } else if (chessField[y - i][x][0] === "w") {
                            to[y - i][x] = 2;
                            directionsDoneFour[0] = 1;
                        } else {
                            directionsDoneFour[0] = 1;
                        }
                    } else {
                        directionsDoneFour[0] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDoneFour[1] == 0) {
                        if (chessField[y][x + i] === 0) {
                            to[y][x + i] = 1;
                        } else if (chessField[y][x + i][0] === "w") {
                            to[y][x + i] = 2;
                            directionsDoneFour[1] = 1;
                        } else {
                            directionsDoneFour[1] = 1;
                        }
                    } else {
                        directionsDoneFour[1] = 1;
                    }
            
                    if (y + i <= 7 && directionsDoneFour[2] == 0) {
                        if (chessField[y + i][x] === 0) {
                            to[y + i][x] = 1;
                        } else if (chessField[y + i][x][0] === "w") {
                            to[y + i][x] = 2;
                            directionsDoneFour[2] = 1;
                        } else {
                            directionsDoneFour[2] = 1;
                        }
                    } else {
                        directionsDoneFour[2] = 1;
                    }
                    
                    if (x - i >= 0 && directionsDoneFour[3] == 0) {
                        if (chessField[y][x - i] === 0) {
                            to[y][x - i] = 1;
                        } else if (chessField[y][x - i][0] === "w") {
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
                        if (chessField[y - i][x] === 0) {
                            to[y - i][x] = 1;
                        } else if (chessField[y - i][x][0] === "b") {
                            to[y - i][x] = 2;
                            directionsDoneFour[0] = 1;
                        } else {
                            directionsDoneFour[0] = 1;
                        }
                    } else {
                        directionsDoneFour[0] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDoneFour[1] == 0) {
                        if (chessField[y][x + i] === 0) {
                            to[y][x + i] = 1;
                        } else if (chessField[y][x + i][0] === "b") {
                            to[y][x + i] = 2;
                            directionsDoneFour[1] = 1;
                        } else {
                            directionsDoneFour[1] = 1;
                        }
                    } else {
                        directionsDoneFour[1] = 1;
                    }
            
                    if (y + i <= 7 && directionsDoneFour[2] == 0) {
                        if (chessField[y + i][x] === 0) {
                            to[y + i][x] = 1;
                        } else if (chessField[y + i][x][0] === "b") {
                            to[y + i][x] = 2;
                            directionsDoneFour[2] = 1;
                        } else {
                            directionsDoneFour[2] = 1;
                        }
                    } else {
                        directionsDoneFour[2] = 1;
                    }
                    
                    if (x - i >= 0 && directionsDoneFour[3] == 0) {
                        if (chessField[y][x - i] === 0) {
                            to[y][x - i] = 1;
                        } else if (chessField[y][x - i][0] === "b") {
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
                if (chessField[y - 1][x] === 0) {
                    to[y - 1][x] = 1;
                    if (countMoves[y][x] === 0 && chessField[y - 2][x] === 0) {
                        to[y - 2][x] = 1;
                    }
                }
                if (x - 1 >= 0) {
                    if (chessField[y - 1][x - 1][0] === "b") {
                        to[y - 1][x - 1] = 2;
                    }
                }
                if (x + 1 <= 7) {
                    if (chessField[y - 1][x + 1][0] === "b") {
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
                if (chessField[y + 1][x] === 0) {
                    to[y + 1][x] = 1;
                    if (countMoves[y][x] === 0 && chessField[y + 2][x] === 0) {
                        to[y + 2][x] = 1;
                    }
                }
                if (x - 1 >= 0) {
                    if (chessField[y + 1][x - 1][0] === "w") {
                        to[y + 1][x - 1] = 2;
                    }
                }
                if (x + 1 <= 7) {
                    if (chessField[y + 1][x + 1][0] === "w") {
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
                    if (chessField[y - 1][x - 2] === 0) {
                        to[y - 1][x - 2] = 1;
                    } else if (chessField[y - 1][x - 2][0] === "w") {
                        to[y - 1][x - 2] = 2;
                    }
                }
                if (x + 2 <= 7) {
                    if (chessField[y - 1][x + 2] === 0) {
                        to[y - 1][x + 2] = 1;
                    } else if (chessField[y - 1][x + 2][0] === "w") {
                        to[y - 1][x + 2] = 2;
                    }
                }
            }
            if (y - 2 >= 0) {
                if (x - 1 >= 0) {
                    if (chessField[y - 2][x - 1] === 0) {
                        to[y - 2][x - 1] = 1;
                    } else if (chessField[y - 2][x - 1][0] === "w") {
                        to[y - 2][x - 1] = 2;
                    }
                }
                if (x + 1 <= 7) {
                    if (chessField[y - 2][x + 1] === 0) {
                        to[y - 2][x + 1] = 1;
                    } else if (chessField[y - 2][x + 1][0] === "w") {
                        to[y - 2][x + 1] = 2;
                    }
                }
            }

            if (y + 1 <= 7) {
                if (x - 2 >= 0) {
                    if (chessField[y + 1][x - 2] === 0) {
                        to[y + 1][x - 2] = 1;
                    } else if (chessField[y + 1][x - 2][0] === "w") {
                        to[y + 1][x - 2] = 2;
                    }
                }
                if (x + 2 <= 7) {
                    if (chessField[y + 1][x + 2] === 0) {
                        to[y + 1][x + 2] = 1;
                    } else if (chessField[y + 1][x + 2][0] === "w") {
                        to[y + 1][x + 2] = 2;
                    }
                }
            }
            if (y + 2 <= 7) {
                if (x - 1 >= 0) {
                    if (chessField[y + 2][x - 1] === 0) {
                        to[y + 2][x - 1] = 1;
                    } else if (chessField[y + 2][x - 1][0] === "w") {
                        to[y + 2][x - 1] = 2;
                    }
                }
                if (x + 1 <= 7) {
                    if (chessField[y + 2][x + 1] === 0) {
                        to[y + 2][x + 1] = 1;
                    } else if (chessField[y + 2][x + 1][0] === "w") {
                        to[y + 2][x + 1] = 2;
                    }
                }
            }
        break;
        case "wn":
            if (y - 1 >= 0) {
                if (x - 2 >= 0) {
                    if (chessField[y - 1][x - 2] === 0) {
                        to[y - 1][x - 2] = 1;
                    } else if (chessField[y - 1][x - 2][0] === "b") {
                        to[y - 1][x - 2] = 2;
                    }
                }
                if (x + 2 <= 7) {
                    if (chessField[y - 1][x + 2] === 0) {
                        to[y - 1][x + 2] = 1;
                    } else if (chessField[y - 1][x + 2][0] === "b") {
                        to[y - 1][x + 2] = 2;
                    }
                }
            }
            if (y - 2 >= 0) {
                if (x - 1 >= 0) {
                    if (chessField[y - 2][x - 1] === 0) {
                        to[y - 2][x - 1] = 1;
                    } else if (chessField[y - 2][x - 1][0] === "b") {
                        to[y - 2][x - 1] = 2;
                    }
                }
                if (x + 1 <= 7) {
                    if (chessField[y - 2][x + 1] === 0) {
                        to[y - 2][x + 1] = 1;
                    } else if (chessField[y - 2][x + 1][0] === "b") {
                        to[y - 2][x + 1] = 2;
                    }
                }
            }

            if (y + 1 <= 7) {
                if (x - 2 >= 0) {
                    if (chessField[y + 1][x - 2] === 0) {
                        to[y + 1][x - 2] = 1;
                    } else if (chessField[y + 1][x - 2][0] === "b") {
                        to[y + 1][x - 2] = 2;
                    }
                }
                if (x + 2 <= 7) {
                    if (chessField[y + 1][x + 2] === 0) {
                        to[y + 1][x + 2] = 1;
                    } else if (chessField[y + 1][x + 2][0] === "b") {
                        to[y + 1][x + 2] = 2;
                    }
                }
            }
            if (y + 2 <= 7) {
                if (x - 1 >= 0) {
                    if (chessField[y + 2][x - 1] === 0) {
                        to[y + 2][x - 1] = 1;
                    } else if (chessField[y + 2][x - 1][0] === "b") {
                        to[y + 2][x - 1] = 2;
                    }
                }
                if (x + 1 <= 7) {
                    if (chessField[y + 2][x + 1] === 0) {
                        to[y + 2][x + 1] = 1;
                    } else if (chessField[y + 2][x + 1][0] === "b") {
                        to[y + 2][x + 1] = 2;
                    }
                }
            }
        break;
    }
}

function checkPossibleMoves(name, y, x) {

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
                if (chessField[y - 1][x] === 0) {
                    ans[y-1][x] = supKingDunger(y, x, y-1,x,[y-1,x],1,"wk");
                }
                if (chessField[y - 1][x][0] === "b") {
                    ans[y-1][x] = supKingDunger(y, x, y-1,x,[y-1,x],2,"wk");
                }
                if (x - 1 >= 0) {
                    if (chessField[y - 1][x - 1] === 0) {
                        ans[y-1][x-1] = supKingDunger(y, x, y-1,x-1,[y-1,x-1],1,"wk");
                    }
                    if (chessField[y - 1][x - 1][0] === "b") {
                        ans[y-1][x-1] = supKingDunger(y, x, y-1,x-1,[y-1,x-1],2,"wk");
                    }
                }
                if (x + 1 <= 7) {
                    if (chessField[y - 1][x + 1] === 0) {
                        ans[y-1][x+1] = supKingDunger(y, x, y-1,x+1,[y-1,x+1],1,"wk");
                    }
                    if (chessField[y - 1][x + 1][0] === "b") {
                        ans[y-1][x+1] = supKingDunger(y, x, y-1,x+1,[y-1,x+1],2,"wk");
                    }
                }
            }
            if (y + 1 <= 7) {
        
                if (chessField[y + 1][x] === 0) {
                    ans[y+1][x] = supKingDunger(y, x, y+1,x,[y+1,x],1,"wk");
                }
                if (chessField[y + 1][x][0] === "b") {
                    ans[y+1][x] = supKingDunger(y, x, y+1,x,[y+1,x],2,"wk");
                }
        
                if (x - 1 >= 0) {
                    if (chessField[y + 1][x - 1] === 0) {
                        ans[y+1][x-1] = supKingDunger(y, x, y+1,x-1,[y+1,x-1],1,"wk");
                    }
                    if (chessField[y + 1][x - 1][0] === "b") {
                        ans[y+1][x-1] = supKingDunger(y, x, y+1,x-1,[y+1,x-1],2,"wk");
                    }
                }
                if (x + 1 <= 7) {
                    if (chessField[y + 1][x + 1] === 0) {
                        ans[y+1][x+1] = supKingDunger(y, x, y+1,x+1,[y+1,x+1],1,"wk");
                    }
                    if (chessField[y + 1][x + 1][0] === "b") {
                        ans[y+1][x+1] = supKingDunger(y, x, y+1,x+1,[y+1,x+1],2,"wk");
                    }
                }
            }
            if (x - 1 >= 0) {
                if (chessField[y][x - 1] === 0) {
                    ans[y][x-1] = supKingDunger(y, x, y,x-1,[y,x-1],1,"wk");
                }
                if (chessField[y][x - 1][0] === "b") {
                    ans[y][x-1] = supKingDunger(y, x, y,x-1,[y,x-1],2,"wk");
                }
            }
            if (x + 1 <= 7) {
                if (chessField[y][x + 1] === 0) {
                    ans[y][x+1] = supKingDunger(y, x, y,x+1,[y,x+1],1,"wk");
                }
                if (chessField[y][x + 1][0] === "b") {
                    ans[y][x+1] = supKingDunger(y, x, y,x+1,[y,x+1],2,"wk");
                }
            }

            if (!WKingWasMoved) {
                generateAllUnsafeMovesB();
                if (chessField[7][0] === "wc" && countMoves[7][0] === 0) {                
                    if (possibleBMoves[y][x - 1] === 0 && possibleBMoves[y][x - 2] === 0 && possibleBMoves[y][x] === 0) {
                        if (chessField[y][x - 1] === 0 && chessField[y][x - 2] === 0 && chessField[y][x - 3] === 0) {
                            ans[7][0] = 3;
                        }
                    }
                }
                if (chessField[7][7] === "wc" && countMoves[7][7] === 0) {
                    if (possibleBMoves[y][x + 1] === 0 && possibleBMoves[y][x + 2] === 0 && possibleBMoves[y][x] === 0) {
                        if (chessField[y][x + 1] === 0 && chessField[y][x + 2] === 0) {
                            ans[7][7] = 3;
                        }
                    }
                }
            }

            return ans;
        case "bk":
            if (y - 1 >= 0) {
                if (chessField[y - 1][x] === 0) {
                    ans[y-1][x] = supKingDunger(y, x, y-1,x,[y-1,x],1,"bk");
                }
                if (chessField[y - 1][x][0] === "w") {
                    ans[y-1][x] = supKingDunger(y, x, y-1,x,[y-1,x],2,"bk");
                }
                if (x - 1 >= 0) {
                    if (chessField[y - 1][x - 1] === 0) {
                        ans[y-1][x-1] = supKingDunger(y, x, y-1,x-1,[y-1,x-1],1,"bk");
                    }
                    if (chessField[y - 1][x - 1][0] === "w") {
                        ans[y-1][x-1] = supKingDunger(y, x, y-1,x-1,[y-1,x-1],2,"bk");
                    }
                }
                if (x + 1 <= 7) {
                    if (chessField[y - 1][x + 1] === 0) {
                        ans[y-1][x+1] = supKingDunger(y, x, y-1,x+1,[y-1,x+1],1,"bk");
                    }
                    if (chessField[y - 1][x + 1][0] === "w") {
                        ans[y-1][x+1] = supKingDunger(y, x, y-1,x+1,[y-1,x+1],2,"bk");
                    }
                }
            }
            if (y + 1 <= 7) {
        
                if (chessField[y + 1][x] === 0) {
                    ans[y+1][x] = supKingDunger(y, x, y+1,x,[y+1,x],1,"bk");
                }
                if (chessField[y + 1][x][0] === "w") {
                    ans[y+1][x] = supKingDunger(y, x, y+1,x,[y+1,x],2,"bk");
                }
        
                if (x - 1 >= 0) {
                    if (chessField[y + 1][x - 1] === 0) {
                        ans[y+1][x-1] = supKingDunger(y, x, y+1,x-1,[y+1,x-1],1,"bk");
                    }
                    if (chessField[y + 1][x - 1][0] === "w") {
                        ans[y+1][x-1] = supKingDunger(y, x, y+1,x-1,[y+1,x-1],2,"bk");
                    }
                }
                if (x + 1 <= 7) {
                    if (chessField[y + 1][x + 1] === 0) {
                        ans[y+1][x+1] = supKingDunger(y, x, y+1,x+1,[y+1,x+1],1,"bk");
                    }
                    if (chessField[y + 1][x + 1][0] === "w") {
                        ans[y+1][x+1] = supKingDunger(y, x, y+1,x+1,[y+1,x+1],2,"bk");
                    }
                }
            }
            if (x - 1 >= 0) {
                if (chessField[y][x - 1] === 0) {
                    ans[y][x-1] = supKingDunger(y, x, y,x-1,[y,x-1],1,"bk");
                }
                if (chessField[y][x - 1][0] === "w") {
                    ans[y][x-1] = supKingDunger(y, x, y,x-1,[y,x-1],2,"bk");
                }
            }
            if (x + 1 <= 7) {
                if (chessField[y][x + 1] === 0) {
                    ans[y][x+1] = supKingDunger(y, x, y,x+1,[y,x+1],1,"bk");
                }
                if (chessField[y][x + 1][0] === "w") {
                    ans[y][x+1] = supKingDunger(y, x, y,x+1,[y,x+1],2,"bk");
                }
            }

            if (!BKingWasMoved) {
                generateAllUnsafeMovesW();
                if (chessField[0][0] === "bc" && countMoves[0][0] === 0) {                
                    if (possibleWMoves[y][x - 1] === 0 && possibleWMoves[y][x - 2] === 0 && possibleWMoves[y][x] === 0) {
                        if (chessField[y][x - 1] === 0 && chessField[y][x - 2] === 0 && chessField[y][x - 3] === 0) {
                            ans[0][0] = 3;
                        }
                    }
                }
                if (chessField[0][7] === "bc" && countMoves[0][7] === 0) {
                    if (possibleWMoves[y][x + 1] === 0 && possibleWMoves[y][x + 2] === 0 && possibleWMoves[y][x] === 0) {
                        if (chessField[y][x + 1] === 0 && chessField[y][x + 2] === 0) {
                            ans[0][7] = 3;
                        }
                    }
                }
            }

            return ans;
        case "bq":
            for (let i = 1; i < 8 && directionsDone != [1, 1, 1, 1, 1, 1, 1, 1]; i++) {
                if (y - i >= 0) {
                    if (chessField[y - i][x] === 0 && directionsDone[0] == 0) {
                        

                        ans[y-i][x] = supKingDunger(y, x, y-i,x,BKingCords,1,"bq");
        
                    } else if (chessField[y - i][x][0] === "w" && directionsDone[0] == 0) {
                        

                        ans[y-i][x] = supKingDunger(y, x, y-i,x,BKingCords,2,"bq");
        
                        directionsDone[0] = 1;
                    } else {
                        directionsDone[0] = 1;
                    } 
            
                    if (x - i >= 0 && directionsDone[7] == 0) {
                        if (chessField[y - i][x - i] === 0) {
                            
                            ans[y-i][x-i] = supKingDunger(y, x, y-i,x-i,BKingCords,1,"bq");
        
                        } else if (chessField[y - i][x - i][0] === "w") {
                            
                            ans[y-i][x-i] = supKingDunger(y, x, y-i,x-i,BKingCords,2,"bq");
        
                            directionsDone[7] = 1;
                        } else {
                            directionsDone[7] = 1;
                        }
                    } else {
                        directionsDone[7] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDone[1] == 0) {
                        if (chessField[y - i][x + i] === 0) {
                            
                            ans[y-i][x+i] = supKingDunger(y, x, y-i,x+i,BKingCords,1,"bq");
        
                        } else if (chessField[y - i][x + i][0] === "w") {
                            
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
                    if (chessField[y + i][x] === 0  && directionsDone[4] == 0) {
                        
                        ans[y+i][x] = supKingDunger(y, x, y+i,x,BKingCords,1,"bq");
        
                    } else if (chessField[y + i][x][0] === "w" && directionsDone[4] == 0) {
                        
                        ans[y+i][x] = supKingDunger(y, x, y+i,x,BKingCords,2,"bq");
        
                        directionsDone[4] = 1;
                    } else {
                        directionsDone[4] = 1;
                    }
            
                    if (x - i >= 0 && directionsDone[5] == 0) {
                        if (chessField[y + i][x - i] === 0) {
                            
                            ans[y+i][x-i] = supKingDunger(y, x, y+i,x-i,BKingCords,1,"bq");
        
                        } else if (chessField[y + i][x - i][0] === "w") {
                            
                            ans[y+i][x-i] = supKingDunger(y, x, y+i,x-i,BKingCords,2,"bq");
        
                            directionsDone[5] = 1;
                        } else {
                            directionsDone[5] = 1;
                        }
                    } else {
                        directionsDone[5] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDone[3] == 0) {
                        if (chessField[y + i][x + i] === 0) {
                            ans[y+i][x+i] = supKingDunger(y, x, y+i,x+i,BKingCords,1,"bq");
                        } else if (chessField[y + i][x + i][0] === "w") {
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
                    if (chessField[y][x - i] === 0) {
                        ans[y][x-i] = supKingDunger(y, x, y,x-i,BKingCords,1,"bq");
                    } else if (chessField[y][x - i][0] === "w") {
                        ans[y][x-i] = supKingDunger(y, x, y,x-i,BKingCords,2,"bq");
                        directionsDone[6] = 1;
                    } else {
                        directionsDone[6] = 1;
                    }
                } else {
                    directionsDone[6] = 1;
                }
        
                if (x + i <= 7 && directionsDone[2] == 0) {
                    if (chessField[y][x + i] === 0) {
                        ans[y][x+i] = supKingDunger(y, x, y,x+i,BKingCords,1,"bq");
                    } else if (chessField[y][x + i][0] === "w") {
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
                    if (chessField[y - i][x] === 0 && directionsDone[0] == 0) {
                        

                        ans[y-i][x] = supKingDunger(y, x, y-i,x,WKingCords,1,"wq");
        
                    } else if (chessField[y - i][x][0] === "b" && directionsDone[0] == 0) {
                        

                        ans[y-i][x] = supKingDunger(y, x, y-i,x,WKingCords,2,"wq");
        
                        directionsDone[0] = 1;
                    } else {
                        directionsDone[0] = 1;
                    } 
            
                    if (x - i >= 0 && directionsDone[7] == 0) {
                        if (chessField[y - i][x - i] === 0) {
                            
                            ans[y-i][x-i] = supKingDunger(y, x, y-i,x-i,WKingCords,1,"wq");
        
                        } else if (chessField[y - i][x - i][0] === "b") {
                            
                            ans[y-i][x-i] = supKingDunger(y, x, y-i,x-i,WKingCords,2,"wq");
        
                            directionsDone[7] = 1;
                        } else {
                            directionsDone[7] = 1;
                        }
                    } else {
                        directionsDone[7] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDone[1] == 0) {
                        if (chessField[y - i][x + i] === 0) {
                            
                            ans[y-i][x+i] = supKingDunger(y, x, y-i,x+i,WKingCords,1,"wq");
        
                        } else if (chessField[y - i][x + i][0] === "b") {
                            
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
                    if (chessField[y + i][x] === 0  && directionsDone[4] == 0) {
                        
                        ans[y+i][x] = supKingDunger(y, x, y+i,x,WKingCords,1,"wq");
        
                    } else if (chessField[y + i][x][0] === "b" && directionsDone[4] == 0) {
                        
                        ans[y+i][x] = supKingDunger(y, x, y+i,x,WKingCords,2,"wq");
        
                        directionsDone[4] = 1;
                    } else {
                        directionsDone[4] = 1;
                    }
            
                    if (x - i >= 0 && directionsDone[5] == 0) {
                        if (chessField[y + i][x - i] === 0) {
                            
                            ans[y+i][x-i] = supKingDunger(y, x, y+i,x-i,WKingCords,1,"wq");
        
                        } else if (chessField[y + i][x - i][0] === "b") {
                            
                            ans[y+i][x-i] = supKingDunger(y, x, y+i,x-i,WKingCords,2,"wq");
        
                            directionsDone[5] = 1;
                        } else {
                            directionsDone[5] = 1;
                        }
                    } else {
                        directionsDone[5] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDone[3] == 0) {
                        if (chessField[y + i][x + i] === 0) {
                            ans[y+i][x+i] = supKingDunger(y, x, y+i,x+i,WKingCords,1,"wq");
                        } else if (chessField[y + i][x + i][0] === "b") {
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
                    if (chessField[y][x - i] === 0) {
                        ans[y][x-i] = supKingDunger(y, x, y,x-i,WKingCords,1,"wq");
                    } else if (chessField[y][x - i][0] === "b") {
                        ans[y][x-i] = supKingDunger(y, x, y,x-i,WKingCords,2,"wq");
                        directionsDone[6] = 1;
                    } else {
                        directionsDone[6] = 1;
                    }
                } else {
                    directionsDone[6] = 1;
                }
        
                if (x + i <= 7 && directionsDone[2] == 0) {
                    if (chessField[y][x + i] === 0) {
                        ans[y][x+i] = supKingDunger(y, x, y,x+i,WKingCords,1,"wq");
                    } else if (chessField[y][x + i][0] === "b") {
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
                        if (chessField[y - i][x - i] === 0) {
                            
                            ans[y-i][x-i] = supKingDunger(y, x, y-i,x-i,BKingCords,1,"bb");
        
                        } else if (chessField[y - i][x - i][0] === "w") {
                            
                            ans[y-i][x-i] = supKingDunger(y, x, y-i,x-i,BKingCords,2,"bb");
        
                            directionsDone[0] = 1;
                        } else {
                            directionsDone[0] = 1;
                        }
                    } else {
                        directionsDone[0] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDone[1] == 0) {
                        if (chessField[y - i][x + i] === 0) {
                            
                            ans[y-i][x+i] = supKingDunger(y, x, y-i,x+i,BKingCords,1,"bb");
        
                        } else if (chessField[y - i][x + i][0] === "w") {
                            
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
                        if (chessField[y + i][x - i] === 0) {
                            
                            ans[y+i][x-i] = supKingDunger(y, x, y+i,x-i,BKingCords,1,"bb");
        
                        } else if (chessField[y + i][x - i][0] === "w") {
                            
                            ans[y+i][x-i] = supKingDunger(y, x, y+i,x-i,BKingCords,2,"bb");
        
                            directionsDone[3] = 1;
                        } else {
                            directionsDone[3] = 1;
                        }
                    } else {
                        directionsDone[3] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDone[2] == 0) {
                        if (chessField[y + i][x + i] === 0) {
                            ans[y+i][x+i] = supKingDunger(y, x, y+i,x+i,BKingCords,1,"bb");
                        } else if (chessField[y + i][x + i][0] === "w") {
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
                        if (chessField[y - i][x - i] === 0) {
                            
                            ans[y-i][x-i] = supKingDunger(y, x, y-i,x-i,WKingCords,1,"wb");
        
                        } else if (chessField[y - i][x - i][0] === "b") {
                            
                            ans[y-i][x-i] = supKingDunger(y, x, y-i,x-i,WKingCords,2,"wb");
        
                            directionsDone[0] = 1;
                        } else {
                            directionsDone[0] = 1;
                        }
                    } else {
                        directionsDone[0] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDone[1] == 0) {
                        if (chessField[y - i][x + i] === 0) {
                            
                            ans[y-i][x+i] = supKingDunger(y, x, y-i,x+i,WKingCords,1,"wb");
        
                        } else if (chessField[y - i][x + i][0] === "b") {
                            
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
                        if (chessField[y + i][x - i] === 0) {
                            
                            ans[y+i][x-i] = supKingDunger(y, x, y+i,x-i,WKingCords,1,"wb");
        
                        } else if (chessField[y + i][x - i][0] === "b") {
                            
                            ans[y+i][x-i] = supKingDunger(y, x, y+i,x-i,WKingCords,2,"wb");
        
                            directionsDone[3] = 1;
                        } else {
                            directionsDone[3] = 1;
                        }
                    } else {
                        directionsDone[3] = 1;
                    }
                    
                    if (x + i <= 7 && directionsDone[2] == 0) {
                        if (chessField[y + i][x + i] === 0) {
                            ans[y+i][x+i] = supKingDunger(y, x, y+i,x+i,WKingCords,1,"wb");
                        } else if (chessField[y + i][x + i][0] === "b") {
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
                    if (chessField[y - i][x] === 0) {
                        ans[y-i][x] = supKingDunger(y, x, y-i,x,BKingCords,1,"bc");
                    } else if (chessField[y - i][x][0] === "w") {
                        ans[y-i][x] = supKingDunger(y, x, y-i,x,BKingCords,2,"bc");
                        directionsDoneFour[0] = 1;
                    } else {
                        directionsDoneFour[0] = 1;
                    }
                } else {
                    directionsDoneFour[0] = 1;
                }
                
                if (x + i <= 7 && directionsDoneFour[1] == 0) {
                    if (chessField[y][x + i] === 0) {
                        ans[y][x+i] = supKingDunger(y, x, y,x+i,BKingCords,1,"bc");
                    } else if (chessField[y][x + i][0] === "w") {
                        ans[y][x+i] = supKingDunger(y, x, y,x+i,BKingCords,2,"bc");
                        directionsDoneFour[1] = 1;
                    } else {
                        directionsDoneFour[1] = 1;
                    }
                } else {
                    directionsDoneFour[1] = 1;
                }
        
                if (y + i <= 7 && directionsDoneFour[2] == 0) {
                    if (chessField[y + i][x] === 0) {
                        ans[y+i][x] = supKingDunger(y, x, y+i,x,BKingCords,1,"bc");
                    } else if (chessField[y + i][x][0] === "w") {
                        ans[y+i][x] = supKingDunger(y, x, y+i,x,BKingCords,2,"bc");
                        directionsDoneFour[2] = 1;
                    } else {
                        directionsDoneFour[2] = 1;
                    }
                } else {
                    directionsDoneFour[2] = 1;
                }
                
                if (x - i >= 0 && directionsDoneFour[3] == 0) {
                    if (chessField[y][x - i] === 0) {
                        ans[y][x-i] = supKingDunger(y, x, y,x-i,BKingCords,1,"bc");
                    } else if (chessField[y][x - i][0] === "w") {
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
                    if (chessField[y - i][x] === 0) {
                        ans[y-i][x] = supKingDunger(y, x, y-i,x,WKingCords,1,"wc");
                    } else if (chessField[y - i][x][0] === "b") {
                        ans[y-i][x] = supKingDunger(y, x, y-i,x,WKingCords,2,"wc");
                        directionsDoneFour[0] = 1;
                    } else {
                        directionsDoneFour[0] = 1;
                    }
                } else {
                    directionsDoneFour[0] = 1;
                }
                    
                if (x + i <= 7 && directionsDoneFour[1] == 0) {
                    if (chessField[y][x + i] === 0) {
                        ans[y][x+i] = supKingDunger(y, x, y,x+i,WKingCords,1,"wc");
                    } else if (chessField[y][x + i][0] === "b") {
                        ans[y][x+i] = supKingDunger(y, x, y,x+i,WKingCords,2,"wc");
                        directionsDoneFour[1] = 1;
                    } else {
                        directionsDoneFour[1] = 1;
                    }
                } else {
                    directionsDoneFour[1] = 1;
                }
            
                if (y + i <= 7 && directionsDoneFour[2] == 0) {
                    if (chessField[y + i][x] === 0) {
                        ans[y+i][x] = supKingDunger(y, x, y+i,x,WKingCords,1,"wc");
                    } else if (chessField[y + i][x][0] === "b") {
                        ans[y+i][x] = supKingDunger(y, x, y+i,x,WKingCords,2,"wc");
                        directionsDoneFour[2] = 1;
                    } else {
                        directionsDoneFour[2] = 1;
                    }
                } else {
                    directionsDoneFour[2] = 1;
                }
                    
                if (x - i >= 0 && directionsDoneFour[3] == 0) {
                    if (chessField[y][x - i] === 0) {
                        ans[y][x-i] = supKingDunger(y, x, y,x-i,WKingCords,1,"wc");
                    } else if (chessField[y][x - i][0] === "b") {
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
                if (chessField[y + 1][x] === 0) {
                    ans[y + 1][x] = supKingDunger(y, x, y+1,x,BKingCords,1,"bp");
                    if (countMoves[y][x] === 0 && chessField[y + 2][x] === 0) {
                        ans[y + 2][x] = supKingDunger(y, x, y+2,x,BKingCords,1,"bp");
                    }
                }
                if (x - 1 >= 0) {
                    if (chessField[y + 1][x - 1][0] === "w") {
                        ans[y + 1][x - 1] = supKingDunger(y, x, y+1,x-1,BKingCords,2,"bp");
                    }
                }
                if (x + 1 <= 7) {
                    if (chessField[y + 1][x + 1][0] === "w") {
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
                if (chessField[y - 1][x] === 0) {
                    ans[y - 1][x] = supKingDunger(y, x, y-1,x,WKingCords,1,"wp");
                    if (countMoves[y][x] === 0 && chessField[y - 2][x] === 0) {
                        ans[y - 2][x] = supKingDunger(y, x, y-2,x,WKingCords,1,"wp");
                    }
                }
                if (x - 1 >= 0) {
                    if (chessField[y - 1][x - 1][0] === "b") {
                        ans[y - 1][x - 1] = supKingDunger(y, x, y-1,x-1,WKingCords,2,"wp");
                    }
                }
                if (x + 1 <= 7) {
                    if (chessField[y - 1][x + 1][0] === "b") {
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
                    if (chessField[y - 1][x - 2] === 0) {
                        ans[y - 1][x - 2] = supKingDunger(y, x, y-1,x-2,BKingCords,1,"bn");
                    } else if (chessField[y - 1][x - 2][0] === "w") {
                        ans[y - 1][x - 2] = supKingDunger(y, x, y-1,x-2,BKingCords,2,"bn");
                    }
                }
                if (x + 2 <= 7) {
                    if (chessField[y - 1][x + 2] === 0) {
                        ans[y - 1][x + 2] = supKingDunger(y, x, y-1,x+2,BKingCords,1,"bn");
                    } else if (chessField[y - 1][x + 2][0] === "w") {
                        ans[y - 1][x + 2] = supKingDunger(y, x, y-1,x+2,BKingCords,2,"bn");
                    }
                }
            }
            if (y - 2 >= 0) {
                if (x - 1 >= 0) {
                    if (chessField[y - 2][x - 1] === 0) {
                        ans[y - 2][x - 1] = supKingDunger(y, x, y-2,x-1,BKingCords,1,"bn");
                    } else if (chessField[y - 2][x - 1][0] === "w") {
                        ans[y - 2][x - 1] = supKingDunger(y, x, y-2,x-1,BKingCords,2,"bn");
                    }
                }
                if (x + 1 <= 7) {
                    if (chessField[y - 2][x + 1] === 0) {
                        ans[y - 2][x + 1] = supKingDunger(y, x, y-2,x+1,BKingCords,1,"bn");
                    } else if (chessField[y - 2][x + 1][0] === "w") {
                        ans[y - 2][x + 1] = supKingDunger(y, x, y-2,x+1,BKingCords,2,"bn");
                    }
                }
            }
    
            if (y + 1 <= 7) {
                if (x - 2 >= 0) {
                    if (chessField[y + 1][x - 2] === 0) {
                        ans[y + 1][x - 2] = supKingDunger(y, x, y+1,x-2,BKingCords,1,"bn");
                    } else if (chessField[y + 1][x - 2][0] === "w") {
                        ans[y + 1][x - 2] = supKingDunger(y, x, y+1,x-2,BKingCords,2,"bn");
                    }
                }
                if (x + 2 <= 7) {
                    if (chessField[y + 1][x + 2] === 0) {
                        ans[y + 1][x + 2] = supKingDunger(y, x, y+1,x+2,BKingCords,1,"bn");
                    } else if (chessField[y + 1][x + 2][0] === "w") {
                        ans[y + 1][x + 2] = supKingDunger(y, x, y+1,x+2,BKingCords,2,"bn");
                    }
                }
            }
            if (y + 2 <= 7) {
                if (x - 1 >= 0) {
                    if (chessField[y + 2][x - 1] === 0) {
                        ans[y + 2][x - 1] = supKingDunger(y, x, y+2,x-1,BKingCords,1,"bn");
                    } else if (chessField[y + 2][x - 1][0] === "w") {
                        ans[y + 2][x - 1] = supKingDunger(y, x, y+2,x-1,BKingCords,2,"bn");
                    }
                }
                if (x + 1 <= 7) {
                    if (chessField[y + 2][x + 1] === 0) {
                        ans[y + 2][x + 1] = supKingDunger(y, x, y+2,x+1,BKingCords,1,"bn");
                    } else if (chessField[y + 2][x + 1][0] === "w") {
                        ans[y + 2][x + 1] = supKingDunger(y, x, y+2,x+1,BKingCords,2,"bn");
                    }
                }
            }
            return ans;
        case "wn":
        if (y - 1 >= 0) {
            if (x - 2 >= 0) {
                if (chessField[y - 1][x - 2] === 0) {
                    ans[y - 1][x - 2] = supKingDunger(y, x, y-1,x-2,WKingCords,1,"wn");
                } else if (chessField[y - 1][x - 2][0] === "b") {
                    ans[y - 1][x - 2] = supKingDunger(y, x, y-1,x-2,WKingCords,2,"wn");
                }
            }
            if (x + 2 <= 7) {
                if (chessField[y - 1][x + 2] === 0) {
                    ans[y - 1][x + 2] = supKingDunger(y, x, y-1,x+2,WKingCords,1,"wn");
                } else if (chessField[y - 1][x + 2][0] === "b") {
                    ans[y - 1][x + 2] = supKingDunger(y, x, y-1,x+2,WKingCords,2,"wn");
                }
            }
        }
        if (y - 2 >= 0) {
            if (x - 1 >= 0) {
                if (chessField[y - 2][x - 1] === 0) {
                    ans[y - 2][x - 1] = supKingDunger(y, x, y-2,x-1,WKingCords,1,"wn");
                } else if (chessField[y - 2][x - 1][0] === "b") {
                    ans[y - 2][x - 1] = supKingDunger(y, x, y-2,x-1,WKingCords,2,"wn");
                }
            }
            if (x + 1 <= 7) {
                if (chessField[y - 2][x + 1] === 0) {
                    ans[y - 2][x + 1] = supKingDunger(y, x, y-2,x+1,WKingCords,1,"wn");
                } else if (chessField[y - 2][x + 1][0] === "b") {
                    ans[y - 2][x + 1] = supKingDunger(y, x, y-2,x+1,WKingCords,2,"wn");
                }
            }
        }
    
        if (y + 1 <= 7) {
            if (x - 2 >= 0) {
                if (chessField[y + 1][x - 2] === 0) {
                    ans[y + 1][x - 2] = supKingDunger(y, x, y+1,x-2,WKingCords,1,"wn");
                } else if (chessField[y + 1][x - 2][0] === "b") {
                    ans[y + 1][x - 2] = supKingDunger(y, x, y+1,x-2,WKingCords,2,"wn");
                }
            }
            if (x + 2 <= 7) {
                if (chessField[y + 1][x + 2] === 0) {
                    ans[y + 1][x + 2] = supKingDunger(y, x, y+1,x+2,WKingCords,1,"wn");
                } else if (chessField[y + 1][x + 2][0] === "b") {
                    ans[y + 1][x + 2] = supKingDunger(y, x, y+1,x+2,WKingCords,2,"wn");
                }
            }
        }
        if (y + 2 <= 7) {
            if (x - 1 >= 0) {
                if (chessField[y + 2][x - 1] === 0) {
                    ans[y + 2][x - 1] = supKingDunger(y, x, y+2,x-1,WKingCords,1,"wn");
                } else if (chessField[y + 2][x - 1][0] === "b") {
                    ans[y + 2][x - 1] = supKingDunger(y, x, y+2,x-1,WKingCords,2,"wn");
                }
            }
            if (x + 1 <= 7) {
                if (chessField[y + 2][x + 1] === 0) {
                    ans[y + 2][x + 1] = supKingDunger(y, x, y+2,x+1,WKingCords,1,"wn");
                } else if (chessField[y + 2][x + 1][0] === "b") {
                    ans[y + 2][x + 1] = supKingDunger(y, x, y+2,x+1,WKingCords,2,"wn");
                }
            }
        }
        return ans;
    }
}

function supKingDunger(y, x, yi, xi, KingCords, placeType, figureName) {
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

function showPossibleMoves(name, y, x) {
    moves[(String(y)+String(x))].map((i, yi) => {
        i.map((j, xj) => {
            if (j === 1) {
                let place = window.document.getElementById(chessFieldPlaces[yi][xj]);
                place.style.cursor = "pointer";
                place.getElementsByClassName("blaze")[0].style.backgroundImage = (name[0] === turn[0] ? "url(img/circle.png)" : "url(img/circleempty.png)");
                place.setAttribute("onclick", (name[0] === turn[0] ? `MoveFigure('${name}', ${y}, ${x}, ${yi}, ${xj})` : ""));
            } else if (j === 2) {
                // let bg = window.document.getElementById(chessFieldPlaces[yi][xj]);
                // let bgStyle = window.getComputedStyle(bg).backgroundImage;
                // bg.style.backgroundImage = 'url("img/cross.png"), ' + bgStyle;
                let place = window.document.getElementById(chessFieldPlaces[yi][xj]);
                place.style.cursor = "pointer";
                place.getElementsByClassName("blaze")[0].style.backgroundImage = "url(img/cross.png)";
                place.setAttribute("onclick", (name[0] === turn[0] ? `MoveFigure('${name}', ${y}, ${x}, ${yi}, ${xj})` : ""));
            } else if (j === 3) {
                let place = window.document.getElementById(chessFieldPlaces[yi][xj]);
                place.style.cursor = "pointer";
                place.getElementsByClassName("blaze")[0].style.backgroundImage = "url(img/switch.png)";
                place.setAttribute("onclick", (name[0] === turn[0] ? `castlingFigure(${y}, ${x}, ${yi}, ${xj})` : "b"));
            }
        })
    });
}

function clearPossibleMoves() {
    chessFieldPlaces.map((i, yi) => {
        i.map((j, xj) => {
            let element = window.document.getElementById(j)
            element.getElementsByClassName("blaze")[0].style.backgroundImage = "";
            element.setAttribute("onclick", "");
            element.setAttribute("onmouseover", "");
            element.setAttribute("onmouseout", "");
            element.style.cursor = "";

            if (chessField[yi][xj][0] === turn[0]) {
                element.setAttribute("onclick", `selectFigure("${chessField[yi][xj]}",${yi},${xj})`);
                element.setAttribute("onmouseover", `showPossibleMoves("${chessField[yi][xj]}",${yi},${xj})`);
                element.setAttribute("onmouseout", "clearPossibleMoves()");
                element.style.cursor = "pointer";
            } else if (chessField[yi][xj] != 0 && chessField[yi][xj][0] != turn[0]) {
                element.setAttribute("onmouseover", `showPossibleMoves("${chessField[yi][xj]}",${yi},${xj})`);
                element.setAttribute("onmouseout", "clearPossibleMoves()");
            }
            });
        });
}

function clearPossibleMovesFull() {
    chessFieldPlaces.map((i) => {
        i.map((j) => {
            let element = window.document.getElementById(j);
            element.style.cursor = "";
            element.setAttribute("onclick", "");
            element.setAttribute("onmouseover", "");
            element.setAttribute("onmouseout", "");
            let place = window.document.getElementById(j);
            let figure = place.getElementsByClassName("figure")[0];
            if (figure) {
                figure.remove();
            }
            Array.from(window.document.getElementsByClassName("blaze")).forEach(element => {
                element.style.backgroundImage = "";
            })

            let style = window.document.getElementById(j).getAttribute("style");
            if (style != null) {
                window.document.getElementById(j).setAttribute("style", "");
            }
        })
    })
    window.document.getElementById('step_pawn').style.display = "none"
}
    
function selectFigure(name, y, x) {
    selectedFigure = [name, y, x];
    clearPossibleMoves();
    //let cords = FindFigure(name);
        
    Array.from(window.document.getElementsByClassName('place')).forEach(arrElement => {
        arrElement.setAttribute("onmouseout", "");
        arrElement.setAttribute("onmouseover", "");
    });
    chessField.map((i, y) => {
        i.map((j, x) => {
            if (j[0] === turn[0]) {
                window.document.getElementById(chessFieldPlaces[y][x]).setAttribute("onclick", `unselectAndSelectFigure("${j}",${y},${x})`);
            }
        })
    })
    showPossibleMoves(name, y, x);
    let place = window.document.getElementById(chessFieldPlaces[y][x]);
    place.setAttribute('onmouseout', '');
    place.setAttribute('onmouseover', '');
    place.setAttribute('onclick', 'unselectFigure()');

    place.getElementsByClassName("blaze")[0].style.border = `11px solid ${selectColor}`;
    place.getElementsByClassName("blaze")[0].style.borderRadius = "0px";

    // place.getElementsByClassName("blaze")[0].style.outline = "11px solid rgba(0, 162, 255, 0.582)";

    // let select = window.document.getElementById('select');
    // select.style.display = 'block';
    // select.style.top = chessFieldCords[y];
    // select.style.left = chessFieldCords[x];
}

function unselectAndSelectFigure(name, y, x) {
    unselectFigure();
    selectFigure(name, y, x);
}

function unselectFigure() {
    chessField.map((i, y) => {i.map((j, x) => {
            if (j != 0) {
                let place = window.document.getElementById(chessFieldPlaces[y][x]);
                place.setAttribute("onclick", (chessField[y][x][0] === turn[0] ? `selectFigure('${chessField[y][x]}', ${y}, ${x})` : ""));
                place.setAttribute("onmouseover", `showPossibleMoves("${chessField[y][x]}", ${y}, ${x})`);
                place.setAttribute("onmouseout", "clearPossibleMoves()");
                place.style.cursor = (j[0] === turn[0] ? "pointer" : "");
            }
        })
    })
    // window.document.getElementById(chessFieldPlaces[selectedFigure[1]][selectedFigure[2]]).classList.remove("selectedPlace");
    // window.document.getElementById(chessFieldPlaces[selectedFigure[1]][selectedFigure[2]]).classList.add("place");
    let selected_place = window.document.getElementById(chessFieldPlaces[selectedFigure[1]][selectedFigure[2]]);
    selected_place.getElementsByClassName("blaze")[0].style.border = "0px solid #00000000";
    window.document.getElementById('select').style.display = 'none';

    selectedFigure = [];
}

function MoveFigure(name, y, x, toy, tox) {
    if (pawnStep.length !== 0) {
        if (toy === pawnStep[0] && tox === pawnStep[1]) {
            if (name === "wp") {
                chessField[toy + 1][tox] = 0;
            } else if (name === "bp") {
                chessField[toy - 1][tox] = 0;
            }
        }
    }
    // window.document.getElementById(chessFieldPlaces[y][x]).classList.remove(name);
    // window.document.getElementById(chessFieldPlaces[y][x]).classList.remove('selectedPlace');
    // window.document.getElementById(chessFieldPlaces[y][x]).classList.add('place');
    // window.document.getElementById(chessFieldPlaces[y][x]).setAttribute('onclick', "");
    // window.document.getElementById(chessFieldPlaces[toy][tox]).classList.remove('placeToMove');
    // window.document.getElementById(chessFieldPlaces[toy][tox]).classList.remove('placeToBeat');
    // window.document.getElementById(chessFieldPlaces[toy][tox]).classList.add('place');
    
    chessField[y][x] = 0;
    countMoves[toy][tox] = countMoves[y][x] + 1;
    countMoves[y][x] = 0;
    chessField[toy][tox] = name;

    unselectFigure();

    moves = {};
    turn = (turn === "white" ? "black" : "white");
    pawnStep = [];

    if (name === "wk") {
        WKingCords = [toy, tox];
        WKingWasMoved = true;
        pawnStep = [];
    } else if (name === "bk") {
        BKingCords = [toy, tox];
        BKingWasMoved = true;
        pawnStep = [];
    } else if (name === "wp") {
        if (countMoves[toy][tox] === 1 && toy === 4) {
            pawnStep = [toy + 1, tox];
        }
        if (toy === 0) {
            callFigureWheel("white", toy, tox);
            return 0;
        }
    } else if (name === "bp") {
        if (countMoves[toy][tox] === 1 && toy === 3) {
            pawnStep = [toy - 1, tox];
        }
        if (toy === 7) {
            callFigureWheel("black", toy, tox);
            return 0;
        } 
    }
    clearPossibleMovesFull();
    window.document.getElementById(chessFieldPlaces[y][x]).style.backgroundColor = rasidualTrace;
    window.document.getElementById(chessFieldPlaces[toy][tox]).style.backgroundColor = rasidualTrace;
    arrangeFigures();
}

function castlingFigure(y, x, cy, cx) {
    if (chessField[y][x][0] === "b" && chessField[cy][cx][0] === "b") {
        if (cy === 0 && cx === 0) {
            window.document.getElementById(chessFieldPlaces[y][x]).classList.remove("bk");
            window.document.getElementById(chessFieldPlaces[y][x]).classList.remove('selectedPlace');
            window.document.getElementById(chessFieldPlaces[y][x]).classList.add('place');
            window.document.getElementById(chessFieldPlaces[y][x]).setAttribute('onclick', "");
            window.document.getElementById(chessFieldPlaces[0][2]).classList.remove('placeToMove');
            window.document.getElementById(chessFieldPlaces[0][2]).classList.remove('placeToBeat');

            countMoves[0][2] = countMoves[y][x] + 1;
            countMoves[y][x] = 0;

            chessField[0][2] = chessField[y][x];
            chessField[y][x] = 0;
            chessField[0][3] = chessField[cy][cx];
            chessField[cy][cx] = 0;

            BKingCords = [0,2];
            BKingWasMoved = true;

            unselectFigure();
            clearPossibleMovesFull();
            window.document.getElementById(chessFieldPlaces[y][x]).style.backgroundColor = rasidualTrace;
            window.document.getElementById(chessFieldPlaces[0][2]).style.backgroundColor = rasidualTrace;
            window.document.getElementById(chessFieldPlaces[cy][cx]).style.backgroundColor = rasidualTraceSec;
            window.document.getElementById(chessFieldPlaces[0][3]).style.backgroundColor = rasidualTraceSec;
            moves = {};
            turn = (turn === "white" ? "black" : "white");
            arrangeFigures();
            return 1;
        } else if (cy === 0 && cx === 7) {
            window.document.getElementById(chessFieldPlaces[y][x]).classList.remove("bk");
            window.document.getElementById(chessFieldPlaces[y][x]).classList.remove('selectedPlace');
            window.document.getElementById(chessFieldPlaces[y][x]).classList.add('place');
            window.document.getElementById(chessFieldPlaces[y][x]).setAttribute('onclick', "");
            window.document.getElementById(chessFieldPlaces[0][2]).classList.remove('placeToMove');
            window.document.getElementById(chessFieldPlaces[0][2]).classList.remove('placeToBeat');

            countMoves[0][6] = countMoves[y][x] + 1;
            countMoves[y][x] = 0;

            chessField[0][6] = chessField[y][x];
            chessField[y][x] = 0;

            chessField[0][5] = chessField[cy][cx];
            chessField[cy][cx] = 0;

            BKingCords = [0,6];
            BKingWasMoved = true;

            unselectFigure();
            clearPossibleMovesFull();
            window.document.getElementById(chessFieldPlaces[y][x]).style.backgroundColor = rasidualTrace;
            window.document.getElementById(chessFieldPlaces[0][6]).style.backgroundColor = rasidualTrace;
            window.document.getElementById(chessFieldPlaces[cy][cx]).style.backgroundColor = rasidualTraceSec;
            window.document.getElementById(chessFieldPlaces[0][5]).style.backgroundColor = rasidualTraceSec;
            moves = {};
            turn = (turn === "white" ? "black" : "white");
            arrangeFigures();
            return 1;
        }
    } else if (chessField[y][x][0] === "w" && chessField[cy][cx][0] === "w") {
        if (cy === 7 && cx === 0) {
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

            chessField[7][3] = chessField[cy][cx];
            chessField[cy][cx] = 0;

            WKingCords = [7,2];
            WKingWasMoved = true;

            unselectFigure();
            clearPossibleMovesFull();
            window.document.getElementById(chessFieldPlaces[y][x]).style.backgroundColor = rasidualTrace;
            window.document.getElementById(chessFieldPlaces[7][2]).style.backgroundColor = rasidualTrace;
            window.document.getElementById(chessFieldPlaces[cy][cx]).style.backgroundColor = rasidualTraceSec;
            window.document.getElementById(chessFieldPlaces[7][3]).style.backgroundColor = rasidualTraceSec;
            moves = {};
            turn = (turn === "white" ? "black" : "white");
            arrangeFigures();
            return 1;
        } else if (cy === 7 && cx === 7) {
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

            chessField[7][5] = chessField[cy][cx];
            chessField[cy][cx] = 0;

            WKingCords = [7,6];
            WKingWasMoved = true;

            unselectFigure();
            clearPossibleMovesFull();
            window.document.getElementById(chessFieldPlaces[y][x]).style.backgroundColor = rasidualTrace;
            window.document.getElementById(chessFieldPlaces[7][6]).style.backgroundColor = rasidualTrace;
            window.document.getElementById(chessFieldPlaces[cy][cx]).style.backgroundColor = rasidualTraceSec;
            window.document.getElementById(chessFieldPlaces[7][5]).style.backgroundColor = rasidualTraceSec;
            moves = {};
            turn = (turn === "white" ? "black" : "white");
            arrangeFigures();
            return 1;
        }
    }
}

function callFigureWheel(turn, y, x) {
    chessFieldPlaces.map((i) => {
        i.map((j) => {
            let Place = window.document.getElementById(j);
            Place.setAttribute("onclick", "");
            Place.setAttribute("onmouseover", "");
            Place.setAttribute("onmouseout", "");
        })
    })
    if (turn === "white") {
        let bg = window.document.getElementById("darkBG")
        bg.style.display = "flex";
        let wheel = window.document.getElementById("wheel_white");
        wheel.style.display = "flex";
        wheel.getElementsByTagName("button")[0].setAttribute("onclick", `replaceFigureAndCloseWheel(${y},${x},"wq")`);
        wheel.getElementsByTagName("button")[1].setAttribute("onclick", `replaceFigureAndCloseWheel(${y},${x},"wc")`);
        wheel.getElementsByTagName("button")[2].setAttribute("onclick", `replaceFigureAndCloseWheel(${y},${x},"wb")`);
        wheel.getElementsByTagName("button")[3].setAttribute("onclick", `replaceFigureAndCloseWheel(${y},${x},"wn")`);
        //wheel.getElementsByTagName("button")[0].setAttribute("onclick", `replaceFigure(${y},${x},${(turn === "white" ? "wq" : "bq")})`);
        //wheel.getElementsByTagName("button")[0].setAttribute("onclick", `replaceFigure(${y},${x},${(turn === "white" ? "wq" : "bq")})`);
    } else {
        let bg = window.document.getElementById("darkBG")
        bg.style.display = "flex";
        let wheel = window.document.getElementById("wheel_black");
        wheel.style.display = "flex";
        wheel.getElementsByTagName("button")[0].setAttribute("onclick", `replaceFigureAndCloseWheel(${y},${x},"bq")`);
        wheel.getElementsByTagName("button")[1].setAttribute("onclick", `replaceFigureAndCloseWheel(${y},${x},"bc")`);
        wheel.getElementsByTagName("button")[2].setAttribute("onclick", `replaceFigureAndCloseWheel(${y},${x},"bb")`);
        wheel.getElementsByTagName("button")[3].setAttribute("onclick", `replaceFigureAndCloseWheel(${y},${x},"bn")`);
    }
}

function closeFigureWheel() {
    let bg = window.document.getElementById("darkBG")
    bg.style.display = "none";
    let wheelWhite = window.document.getElementById("wheel_white");
    let wheelBlack = window.document.getElementById("wheel_black");
    wheelWhite.style.display = "none";
    wheelBlack.style.display = "none";
    wheelWhite.getElementsByTagName("button")[0].setAttribute("onclick", "");
    wheelWhite.getElementsByTagName("button")[1].setAttribute("onclick", "");
    wheelWhite.getElementsByTagName("button")[2].setAttribute("onclick", "");
    wheelWhite.getElementsByTagName("button")[3].setAttribute("onclick", "");
    wheelBlack.getElementsByTagName("button")[0].setAttribute("onclick", "");
    wheelBlack.getElementsByTagName("button")[1].setAttribute("onclick", "");
    wheelBlack.getElementsByTagName("button")[2].setAttribute("onclick", "");
    wheelBlack.getElementsByTagName("button")[3].setAttribute("onclick", "");
}

function replaceFigureAndCloseWheel(y, x, name) {
    chessField[y][x] = name;
    closeFigureWheel();
    clearPossibleMovesFull();
    arrangeFigures();
}

arrangeFigures();