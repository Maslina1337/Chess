function arrangeFigures() {
    clearPossibleMovesFull();

    if (rasidual.y_from !== undefined) {
        window.document.getElementById(chessFieldPlaces[rasidual.y_from][rasidual.x_from]).style.backgroundColor = userOptionalRights.color_rasidual[0];
        window.document.getElementById(chessFieldPlaces[rasidual.y_to][rasidual.x_to]).style.backgroundColor = userOptionalRights.color_rasidual[0];
    }

    if (rasidual.y_from2 !== undefined) {
        window.document.getElementById(chessFieldPlaces[rasidual.y_from2][rasidual.x_from2]).style.backgroundColor = userOptionalRights.color_rasidual2[0];
        window.document.getElementById(chessFieldPlaces[rasidual.y_to2][rasidual.x_to2]).style.backgroundColor = userOptionalRights.color_rasidual2[0];
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
    if (userOptionalRights.visible_double_jump[0]) {
        showPawnStep();
    }
    if (userOptionalRights.visible_turn[0]) {
        showTurn();
    }
    dragStartEventAdd();
    checkWin();
}

//client only
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

//client => back
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

//client => back
function replaceFigureAndCloseWheel(y, x, name) {
    chessField[y][x] = name;
    closeFigureWheel();
    clearPossibleMovesFull();
    arrangeFigures();
}

//client => back
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