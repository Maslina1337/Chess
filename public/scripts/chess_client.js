const chess_field_places = [["place11", "place12", "place13", "place14", "place15", "place16", "place17", "place18"],
                ["place21", "place22", "place23", "place24", "place25", "place26", "place27", "place28"], 
                ["place31", "place32", "place33", "place34", "place35", "place36", "place37", "place38"], 
                ["place41", "place42", "place43", "place44", "place45", "place46", "place47", "place48"], 
                ["place51", "place52", "place53", "place54", "place55", "place56", "place57", "place58"], 
                ["place61", "place62", "place63", "place64", "place65", "place66", "place67", "place68"], 
                ["place71", "place72", "place73", "place74", "place75", "place76", "place77", "place78"], 
                ["place81", "place82", "place83", "place84", "place85", "place86", "place87", "place88"]];

let chess_client_info;

async function get_chess_client_info() {
    let response = await fetch("/mekanism/get_chess_client_info", {
        method: "GET",
    });
    let info = await response.json();
    if (info[0]) {
        chess_client_info = info[1];
    }
    console.log(info);
}

function arrangeFigures() {
    clearPossibleMovesFull();

    if (chess_client_info.rasidual.y_from !== undefined) {
        window.document.getElementById(chess_field_places[rasidual.y_from][rasidual.x_from]).style.backgroundColor = "green";
        window.document.getElementById(chess_field_places[rasidual.y_to][rasidual.x_to]).style.backgroundColor = "green";
    }

    if (chess_client_info.rasidual.y_from2 !== undefined) {
        window.document.getElementById(chess_field_places[rasidual.y_from2][rasidual.x_from2]).style.backgroundColor = "green";
        window.document.getElementById(chess_field_places[rasidual.y_to2][rasidual.x_to2]).style.backgroundColor = "green";
    }

    chess_client_info.chess_field.forEach((i, y) => {i.forEach((j, x) => {
            if (j !== 0) {
                let place = window.document.getElementById(`place${y+1}${x+1}`);
                let figure = document.createElement("div");
                figure.classList.add("figure");
                figure.classList.add(j);
                place.appendChild(figure);

                figure.addEventListener("mouseover", eventShowPossibleMoves);
                figure.addEventListener("mouseout", eventClearPossibleMoves);
                place.addEventListener("click", eventSelectFigureSmart);
            }
        })});

    showPawnStep();
    showTurn();
    dragStartEventAdd();
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