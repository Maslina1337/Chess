function arrangeFigures() {
    clearPossibleMovesFull();

    if (rasidual.y_from !== undefined) {
        window.document.getElementById(chessFieldPlaces[rasidual.y_from][rasidual.x_from]).style.backgroundColor = rasidualTrace;
        window.document.getElementById(chessFieldPlaces[rasidual.y_to][rasidual.x_to]).style.backgroundColor = rasidualTrace;
    }

    if (rasidual.y_from2 !== undefined) {
        window.document.getElementById(chessFieldPlaces[rasidual.y_from2][rasidual.x_from2]).style.backgroundColor = rasidualTraceSec;
        window.document.getElementById(chessFieldPlaces[rasidual.y_to2][rasidual.x_to2]).style.backgroundColor = rasidualTraceSec;
    }

    chessField.map((i, y) => {i.map((j, x) => {
            if (j !== 0) {
                generateMovesWithoutMap(j,y,x);
                
                let place = window.document.getElementById(`place${y+1}${x+1}`);
                let figure = document.createElement("div");
                figure.classList.add("figure");
                figure.classList.add(j);
                // figure.setAttribute("draggable", true);
                place.appendChild(figure);

                figure.addEventListener("mouseover", eventShowPossibleMoves);
                figure.addEventListener("mouseout", eventClearPossibleMoves);
                place.addEventListener("click", eventSelectFigureSmart);
            }
            if (j === "wk") {
                WKingCords = [y,x];
            } else if (j === "bk") {
                BKingCords = [y,x];
            }
        })});
    showPawnStep();
    showTurn();
    dragStartEventAdd();
    checkWin();
}

function clearPossibleMovesSpectate() {
    chessFieldPlaces.map((i, yi) => {
        i.map((j, xj) => {
            let element = window.document.getElementById(j)
            element.getElementsByClassName("blaze")[0].style.backgroundImage = "";
            // element.setAttribute("onclick", "");
            // element.setAttribute("onmouseover", "");
            // element.setAttribute("onmouseout", "");
            element.style.cursor = "";

            if (fakeChessField[yi][xj][0] === turn[0]) {
                // element.setAttribute("onmouseover", `showPossibleMoves("${fakeChessField[yi][xj]}",${yi},${xj})`);
                // element.setAttribute("onmouseout", "clearPossibleMovesSpectate()");
                element.style.cursor = "pointer";
            } else if (fakeChessField[yi][xj] != 0 && fakeChessField[yi][xj][0] != turn[0]) {
                // element.setAttribute("onmouseover", `showPossibleMoves("${fakeChessField[yi][xj]}",${yi},${xj})`);
                // element.setAttribute("onmouseout", "clearPossibleMovesSpectate()");
            }
        });
    });
}

function clearPossibleMovesFull() {
    chessFieldPlaces.map((i) => {
        i.map((j) => {
            let element = window.document.getElementById(j);
            element.style.cursor = "";

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

// function unselectAndSelectFigure(name, y, x) {
//     unselectFigure();
//     selectFigure(name, y, x);
// }

// function unselectFigure() {
//     chessField.map((i, y) => {i.map((j, x) => {
//             if (j != 0) {
//                 let place = window.document.getElementById(chessFieldPlaces[y][x]);
//                 place.setAttribute("onclick", (chessField[y][x][0] === turn[0] ? `selectFigure('${chessField[y][x]}', ${y}, ${x})` : ""));
//                 place.setAttribute("onmouseover", `showPossibleMoves("${chessField[y][x]}", ${y}, ${x})`);
//                 place.setAttribute("onmouseout", "clearPossibleMoves()");
//                 place.style.cursor = (j[0] === turn[0] ? "pointer" : "");
//             }
//         })
//     })
//     // window.document.getElementById(chessFieldPlaces[selectedFigure[1]][selectedFigure[2]]).classList.remove("selectedPlace");
//     // window.document.getElementById(chessFieldPlaces[selectedFigure[1]][selectedFigure[2]]).classList.add("place");
//     let selected_place = window.document.getElementById(chessFieldPlaces[selectedFigure[1]][selectedFigure[2]]);
//     selected_place.getElementsByClassName("blaze")[0].style.border = "0px solid #00000000";
//     window.document.getElementById('select').style.display = 'none';

//     selectedFigure = [];
// }

function castlingFigure(y, x, cy, cx) {
    if (userRights.canMoveFigure) {

        let sessionHistory = JSON.parse(sessionStorage.getItem("sessionHistory"));
        let fromTo = {
            from: [y, x],
            to: [cy, cx],
            beatenFigure: chessField[cy][cx],
            moveType: "castling"
        }

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

                sessionHistory.push(fromTo);
                sessionStorage.setItem("sessionHistory", JSON.stringify(sessionHistory));

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

                sessionHistory.push(fromTo);
                sessionStorage.setItem("sessionHistory", JSON.stringify(sessionHistory));

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

                sessionHistory.push(fromTo);
                sessionStorage.setItem("sessionHistory", JSON.stringify(sessionHistory));

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

                sessionHistory.push(fromTo);
                sessionStorage.setItem("sessionHistory", JSON.stringify(sessionHistory));

                arrangeFigures();
                return 1;
            }
        }
    }
}

// function callFigureWheel(turn, y, x) {
//     chessFieldPlaces.map((i) => {
//         i.map((j) => {
//             let Place = window.document.getElementById(j);
//             Place.setAttribute("onclick", "");
//             Place.setAttribute("onmouseover", "");
//             Place.setAttribute("onmouseout", "");
//         })
//     })
//     if (turn === "white") {
//         let bg = window.document.getElementById("darkBG")
//         bg.style.display = "flex";
//         let wheel = window.document.getElementById("wheel_white");
//         wheel.style.display = "flex";
//         wheel.getElementsByTagName("button")[0].setAttribute("onclick", `replaceFigureAndCloseWheel(${y},${x},"wq")`);
//         wheel.getElementsByTagName("button")[1].setAttribute("onclick", `replaceFigureAndCloseWheel(${y},${x},"wc")`);
//         wheel.getElementsByTagName("button")[2].setAttribute("onclick", `replaceFigureAndCloseWheel(${y},${x},"wb")`);
//         wheel.getElementsByTagName("button")[3].setAttribute("onclick", `replaceFigureAndCloseWheel(${y},${x},"wn")`);
//         //wheel.getElementsByTagName("button")[0].setAttribute("onclick", `replaceFigure(${y},${x},${(turn === "white" ? "wq" : "bq")})`);
//         //wheel.getElementsByTagName("button")[0].setAttribute("onclick", `replaceFigure(${y},${x},${(turn === "white" ? "wq" : "bq")})`);
//     } else {
//         let bg = window.document.getElementById("darkBG")
//         bg.style.display = "flex";
//         let wheel = window.document.getElementById("wheel_black");
//         wheel.style.display = "flex";
//         wheel.getElementsByTagName("button")[0].setAttribute("onclick", `replaceFigureAndCloseWheel(${y},${x},"bq")`);
//         wheel.getElementsByTagName("button")[1].setAttribute("onclick", `replaceFigureAndCloseWheel(${y},${x},"bc")`);
//         wheel.getElementsByTagName("button")[2].setAttribute("onclick", `replaceFigureAndCloseWheel(${y},${x},"bb")`);
//         wheel.getElementsByTagName("button")[3].setAttribute("onclick", `replaceFigureAndCloseWheel(${y},${x},"bn")`);
//     }
// }

// function closeFigureWheel() {
//     let bg = window.document.getElementById("darkBG")
//     bg.style.display = "none";
//     let wheelWhite = window.document.getElementById("wheel_white");
//     let wheelBlack = window.document.getElementById("wheel_black");
//     wheelWhite.style.display = "none";
//     wheelBlack.style.display = "none";
//     wheelWhite.getElementsByTagName("button")[0].setAttribute("onclick", "");
//     wheelWhite.getElementsByTagName("button")[1].setAttribute("onclick", "");
//     wheelWhite.getElementsByTagName("button")[2].setAttribute("onclick", "");
//     wheelWhite.getElementsByTagName("button")[3].setAttribute("onclick", "");
//     wheelBlack.getElementsByTagName("button")[0].setAttribute("onclick", "");
//     wheelBlack.getElementsByTagName("button")[1].setAttribute("onclick", "");
//     wheelBlack.getElementsByTagName("button")[2].setAttribute("onclick", "");
//     wheelBlack.getElementsByTagName("button")[3].setAttribute("onclick", "");
// }

function replaceFigureAndCloseWheel(y, x, name) {
    chessField[y][x] = name;
    closeFigureWheel();
    clearPossibleMovesFull();
    arrangeFigures();
}

function showStepBack() {
    if (historyStep == 0) {
        return 0;
    }
    debugger;
    activateSpectateMode();
    historyStep--;
    let stepHistory = JSON.parse(sessionStorage.sessionHistory)[historyStep];

    debugger;
    fakeChessField[stepHistory.from[0]][stepHistory.from[1]] = fakeChessField[stepHistory.to[0]][stepHistory.to[1]];
    fakeChessField[stepHistory.to[0]][stepHistory.to[1]] = stepHistory.beatenFigure;
    clearPossibleMovesFull();
    if (historyStep > 0) {
        let stepHistoryPast = JSON.parse(sessionStorage.sessionHistory)[historyStep - 1];
        window.document.getElementById(chessFieldPlaces[stepHistoryPast.from[0]][stepHistoryPast.from[1]]).style.backgroundColor = rasidualTrace;
        window.document.getElementById(chessFieldPlaces[stepHistoryPast.to[0]][stepHistoryPast.to[1]]).style.backgroundColor = rasidualTrace;
        if (stepHistoryPast.moveType === "pawnJump") {
            debugger;
            if (fakeChessField[stepHistoryPast.to[0]][stepHistoryPast.to[1]][0] === "w") {
                pawnStep = [stepHistoryPast.to[0] + 1, stepHistoryPast.to[1]];
            } else {
                pawnStep = [stepHistoryPast.to[0] - 1, stepHistoryPast.to[1]]; // Срабатывает только это
            }
        } else {
            pawnStep = [];
        }
    } else {
        pawnStep = [];
    }
    fakeArrageFigures(fakeChessField);
}

function activateSpectateMode() {
    userRights.canMoveFigure = false;
    userRights.canSelectFigure = false;
    userRights.canShowPossiableMoves = true;
    userRights.isSpetateMode = true;
    callSpectateWarning();
}

function deactivateSpectateMode() {
    userRights.canMoveFigure = true;
    userRights.canSelectFigure = true;
    userRights.canShowPossiableMoves = true;
    userRights.isSpetateMode = false;
    uncallSpectateWarning();
}

function fakeArrageFigures(fakeChessField) {
    fakeChessField.map((i, y) => {i.map((j, x) => {
        debugger;
            if (j !== 0) {
                let Place = window.document.getElementById(`place${y+1}${x+1}`);
                Place.setAttribute('onmouseout', 'clearPossibleMovesSpectate()');
                Place.setAttribute('onmouseover', `showPossibleMoves("${j}", ${y}, ${x})`);
                // Place.setAttribute('onclick', (turn[0] === j[0] ? `selectFigure('${j}', ${y}, ${x})` : ""));
                let figure = document.createElement("div");
                figure.classList.add("figure");
                figure.classList.add(j);
                figure.setAttribute("graggable", true);
                Place.appendChild(figure);
                if (turn[0] === j[0]) {
                    moves[String(y)+String(x)] = checkPossibleMoves(j, y, x);
                    // Place.style.cursor = "pointer";
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

                    rasidual.y_from = y;
                    rasidual.x_from = x;
                    rasidual.y_to = 7;
                    rasidual.x_to = 2;
                    rasidual.y_from2 = toy;
                    rasidual.x_from2 = tox;
                    rasidual.y_to2 = 7;
                    rasidual.x_to2 = 3;

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

                    rasidual.y_from = y;
                    rasidual.x_from = x;
                    rasidual.y_to = 7;
                    rasidual.x_to = 6;
                    rasidual.y_from2 = toy;
                    rasidual.x_from2 = tox;
                    rasidual.y_to2 = 7;
                    rasidual.x_to2 = 5;

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

                rasidual.y_from = y;
                rasidual.x_from = x;
                rasidual.y_to = 0;
                rasidual.x_to = 2;
                rasidual.y_from2 = toy;
                rasidual.x_from2 = tox;
                rasidual.y_to2 = 0;
                rasidual.x_to2 = 3;

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

                rasidual.y_from = y;
                rasidual.x_from = x;
                rasidual.y_to = 0;
                rasidual.x_to = 6;
                rasidual.y_from2 = toy;
                rasidual.x_from2 = tox;
                rasidual.y_to2 = 0;
                rasidual.x_to2 = 5;

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
        turn = (turn === "white" ? "black" : "white");
        moves = {};
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
                userRights.canPickPiece = [toy, tox];
                callPieceWheel();
                return 0;
            }
        } else if (name === "bp") {
            if (countMoves[toy][tox] === 1 && toy === 3) {
                pawnStep = [toy - 1, tox];
                fromTo.moveType = "pawnJump"
            }
            if (toy === 7) {
                userRights.canPickPiece = [toy, tox];
                callPieceWheel();
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

        rasidual.y_from = y;
        rasidual.x_from = x;
        rasidual.y_to = toy;
        rasidual.x_to = tox;
        rasidual.y_from2 = undefined;
        rasidual.x_from2 = undefined;
        rasidual.y_to2 = undefined;
        rasidual.x_to2 = undefined;

        arrangeFigures();
    }
}

arrangeFigures();
