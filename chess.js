function arrangeFigures() {
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
            } else if (j[1] === "p") {
                if (j[0] === "w" && y === 0 || j[0] === "b" && y === 7) {
                    callFigureWheel(turn, y, x);
                }
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

    // if (turn === "white") {
    //     let b = window.document.getElementById('turnB');
    //     b.getElementsByTagName('h1')[0].style.display = 'none';
    //     let w = window.document.getElementById('turnW');
    //     w.getElementsByTagName('h1')[0].style.display = 'flex';
    // } else {
    //     let w = window.document.getElementById('turnW');
    //     w.getElementsByTagName('h1')[0].style.display = 'none';
    //     let b = window.document.getElementById('turnB');
    //     b.getElementsByTagName('h1')[0].style.display = 'flex';
    // }

    // if (turn === "white") {
    //     for (let i = 0; i < 8; i++) {
    //         for (let j = 0; j < 8; j++) {
    //             if (chessField[i][j][0] === "w") {
    //                 if (JSON.stringify(moves[String(i) + String(j)]) !== JSON.stringify([[0, 0, 0, 0, 0, 0, 0, 0],
    //                 [0, 0, 0, 0, 0, 0, 0, 0],
    //                 [0, 0, 0, 0, 0, 0, 0, 0], 
    //                 [0, 0, 0, 0, 0, 0, 0, 0], 
    //                 [0, 0, 0, 0, 0, 0, 0, 0], 
    //                 [0, 0, 0, 0, 0, 0, 0, 0], 
    //                 [0, 0, 0, 0, 0, 0, 0, 0], 
    //                 [0, 0, 0, 0, 0, 0, 0, 0]])) {
    //                     return 0;
    //                 }
    //             }
    //         }
    //     }
    // } else {
    //     for (let i = 0; i < 8; i++) {
    //         for (let j = 0; j < 8; j++) {
    //             if (chessField[i][j][0] === "b") {
    //                 if (JSON.stringify(moves[String(i) + String(j)]) !== JSON.stringify([[0, 0, 0, 0, 0, 0, 0, 0],
    //                 [0, 0, 0, 0, 0, 0, 0, 0],
    //                 [0, 0, 0, 0, 0, 0, 0, 0], 
    //                 [0, 0, 0, 0, 0, 0, 0, 0], 
    //                 [0, 0, 0, 0, 0, 0, 0, 0], 
    //                 [0, 0, 0, 0, 0, 0, 0, 0], 
    //                 [0, 0, 0, 0, 0, 0, 0, 0], 
    //                 [0, 0, 0, 0, 0, 0, 0, 0]])) {
    //                     return 0;
    //                 }
    //             }
    //         }
    //     }
    // }
    // callAttensionStandart((turn === "white" ? "Черные одержали победу!" : "Белые одержали победу!"))
}

arrangeFigures();
