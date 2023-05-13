function showPawnStep() {
    if (pawnStep.length !== 0) {
        let element = window.document.getElementById('step_pawn');
        element.style.display = "block";
        element.style.top = chessFieldCords[pawnStep[0]];
        element.style.left = chessFieldCords[pawnStep[1]];
    }
}

function showTurn() {
    if (turn === "white") {
        let b = window.document.getElementById('turnB');
        b.getElementsByTagName('h1')[0].style.display = 'none';
        let w = window.document.getElementById('turnW');
        w.getElementsByTagName('h1')[0].style.display = 'flex';
    } else {
        let w = window.document.getElementById('turnW');
        w.getElementsByTagName('h1')[0].style.display = 'none';
        let b = window.document.getElementById('turnB');
        b.getElementsByTagName('h1')[0].style.display = 'flex';
    }
}

function checkWin() {
    
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
    
    if (turn === "white") {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (chessField[i][j][0] === "b") {
                    if (moves[String(i) + String(j)][WKingCords[0]][WKingCords[1]] !== 0) {
                        
                        callAttensionStandart((turn === "white" ? "Черные одержали победу!" : "Белые одержали победу!"));
                        return 0;
                    }
                }
            }
        }
    } else {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (chessField[i][j][0] === "w") {
                    if (moves[String(i) + String(j)][BKingCords[0]][BKingCords[1]] !== 0) {
                        
                        callAttensionStandart((turn === "white" ? "Черные одержали победу!" : "Белые одержали победу!"));
                        return 0;
                    }
                }
            }
        }
    }

    callAttensionStandart("Ничья");
    
}

let eventShowPossibleMoves = (event) => {
    if (Object.values(event.target.classList).indexOf("place") !== -1) {
        let place = event.target.parentNode;
        showPossibleMoves(place.id[5] - 1, place.id[6] - 1);
    } else {
        let place = event.target.parentNode;
        showPossibleMoves(place.id[5] - 1, place.id[6] - 1);
    }
}

let eventClearPossibleMoves = (event) => {
    // let y = event.target.id[5];
    // let x = event.target.id[6];
    clearPossibleMoves();
}

let eventSelectFigureSmart = (event) => {
    
    if (Object.values(event.target.classList).find(element => element === "figure") !== undefined) {
        let place = event.target.parentNode;
        console.log(place.id);
        selectFigureSmart(place.id[5] - 1, place.id[6] - 1);
        window.removeEventListener("mousemove", connectPieceWithPointer);
    }
}

let eventUnselectFigure = (event) => {
    unselectFigure();
}

let eventMoveFigure = (event) => {
    if (Object.values(event.target.classList).find(element => element === "figure") !== undefined) {
        let place = event.target.parentNode;
        console.log(place.id);
        MoveFigure(selectedFigure[1], selectedFigure[2], place.id[5] - 1, place.id[6] - 1);
    } else {
        let place = event.target;
        console.log(place.id);
        MoveFigure(selectedFigure[1], selectedFigure[2], place.id[5] - 1, place.id[6] - 1);
    }
}


function showPossibleMoves(y, x) {
    if (userRights.canShowPossiableMoves) {

        //valid test need

        let name = chessField[y][x];
        moves[(String(y)+String(x))].map((i, yi) => {
            i.map((j, xj) => {
                if (j === 1) {
                    let place = window.document.getElementById(chessFieldPlaces[yi][xj]);
                    place.style.cursor = "pointer";
                    place.getElementsByClassName("blaze")[0].style.backgroundImage = (name[0] === turn[0] ? "url(img/circle.png)" : "url(img/circleempty.png)");
                    place.addEventListener("click", eventMoveFigure);
                    // place.setAttribute("onclick", (name[0] === turn[0] ? `MoveFigure('${name}', ${y}, ${x}, ${yi}, ${xj})` : ""));
                    if (name[0] === turn[0]) {
                        // place.addEventListener("click", (event) => {
                        //     MoveFigure(name, y, x, yi, xj);
                        // })
                        // place.addEventListener("click", MoveFigure(name, y, x, yi, xj));
                    }
                } else if (j === 2) {
                    // let bg = window.document.getElementById(chessFieldPlaces[yi][xj]);
                    // let bgStyle = window.getComputedStyle(bg).backgroundImage;
                    // bg.style.backgroundImage = 'url("img/cross.png"), ' + bgStyle;
                    let place = window.document.getElementById(chessFieldPlaces[yi][xj]);
                    place.style.cursor = "pointer";
                    place.getElementsByClassName("blaze")[0].style.backgroundImage = "url(img/cross.png)";
                    place.addEventListener("click", eventMoveFigure);
                    if (name[0] === turn[0]) {
                        // place.addEventListener("click", (event) => {
                        //     MoveFigure(name, y, x, yi, xj);
                        // })
                        // place.addEventListener("click", MoveFigure(name, y, x, yi, xj));
                    }
                } else if (j === 3) {
                    let place = window.document.getElementById(chessFieldPlaces[yi][xj]);
                    place.style.cursor = "pointer";
                    place.getElementsByClassName("blaze")[0].style.backgroundImage = "url(img/switch.png)";
                    place.addEventListener("click", eventMoveFigure);
                    // place.setAttribute("onclick", (name[0] === turn[0] ? `castlingFigure(${y}, ${x}, ${yi}, ${xj})` : "b"));
                    if (name[0] === turn[0]) {
                        // place.addEventListener("click", (event) => {
                        //     castlingFigure(y, x, yi, xj);
                        // })
                    }
                }
            })
        });
    }
}

function clearPossibleMoves() {
    if (userRights.canClearPossiableMoves) {
        chessFieldPlaces.map((i, yi) => {
            i.map((j, xj) => {
                let element = window.document.getElementById(j)
                element.style.cursor = "auto";
                element.getElementsByClassName("blaze")[0].style.backgroundImage = "";
                element.removeEventListener("click", eventMoveFigure);
                // // element.removeEventListener("mouseover", (event) => {
                // // })
                // // element.removeEventListener("mouseout", (event) => {
                // // })
                // // element.removeEventListener("click", (event) => {
                // // })
                // // element.removeEventListener("mouseover", eventShowPossibleMoves);
                // // element.removeEventListener("mouseout", eventClearPossibleMoves);
                // // element.removeEventListener("click", eventSelectFigure);
                // // element.style.cursor = "";
    
                // if (chessField[yi][xj][0] === turn[0]) {
                //     // element.setAttribute("onclick", `selectFigure("${chessField[yi][xj]}",${yi},${xj})`);
                //     // element.setAttribute("onmouseover", `showPossibleMoves("${chessField[yi][xj]}",${yi},${xj})`);
                //     // element.setAttribute("onmouseout", "clearPossibleMoves()");
    
                //     // element.addEventListener("mouseover", (event) => {
                //     //     showPossibleMoves(chessField[yi][xj],yi,xj)
                //     // })
                //     // element.addEventListener("mouseout", (event) => {
                //     //     clearPossibleMoves();
                //     // })
                //     // element.addEventListener("click", (event) => {
                //     //     selectFigure(chessField[yi][xj],yi,xj);
                //     // })
    
                //     // element.addEventListener("mouseover", eventShowPossibleMoves);
                //     // element.addEventListener("mouseout", eventClearPossibleMoves);
                //     // element.addEventListener("click", eventSelectFigure);
    
                //     // element.style.cursor = "pointer";
                // } else if (chessField[yi][xj] != 0 && chessField[yi][xj][0] != turn[0]) {
                //     // element.setAttribute("onmouseover", `showPossibleMoves("${chessField[yi][xj]}",${yi},${xj})`);
                //     // element.setAttribute("onmouseout", "clearPossibleMoves()");
                //     // element.addEventListener("mouseover", eventShowPossibleMoves);
                //     // element.addEventListener("mouseout", eventClearPossibleMoves);
                // }
            });
        });
    }
}

function selectFigureSmart(y, x) {
    debugger;
    //valid test
    if (chessField[y][x][0] !== turn[0]) {
        return 0;
    }
    //valid test

    if (y === selectedFigure[1] && x === selectedFigure[2]) {
        unselectFigure();
        return 0;
    } else if (selectedFigure.length !== 0) {
        unselectFigure();
    } else if (smartSelectInfo !== 0) {
        if (smartSelectInfo.isSmartSelect && smartSelectInfo.y === y && smartSelectInfo.x === x) {
            smartSelectInfo = {};
            unselectFigure();
            return 0;
        }
    }
    if (userRights.canSelectFigure) {
        clearPossibleMoves();
        showPossibleMoves(y, x);
        userRights.canShowPossiableMoves = false;
        userRights.canClearPossiableMoves = false;
        //valid test need

        let name = chessField[y][x]

        selectedFigure = [name, y, x, "smartselection"];
        smartSelectInfo.isSmartSelect = true;
        smartSelectInfo.y = y;
        smartSelectInfo.x = x;

        let place = window.document.getElementById(chessFieldPlaces[y][x]);
        place.getElementsByClassName("blaze")[0].style.border = `11px solid ${selectColor}`;
        place.getElementsByClassName("blaze")[0].style.borderRadius = "0px";
    }
}

function selectFigureDrag(y, x) {
    

    //valid test
    if (chessField[y][x][0] !== turn[0]) {
        unselectFigure();
        return 0;
    }
    //valid test

    if (y === selectedFigure[1] && x === selectedFigure[2]) {
        unselectFigure();
    } else if (selectedFigure.length !== 0) {
        unselectFigure();
    }
    if (userRights.canSelectFigure) {
        clearPossibleMoves();
        showPossibleMoves(y, x);
        userRights.canShowPossiableMoves = false;
        userRights.canClearPossiableMoves = false;
        //valid test need

        let name = chessField[y][x]

        selectedFigure = [name, y, x, "dragselection"];

        let place = window.document.getElementById(chessFieldPlaces[y][x]);
    }
}

function unselectFigure() {
    if (selectedFigure.length === 0) {
        return 0;
    }
    
    userRights.canShowPossiableMoves = true;
    userRights.canClearPossiableMoves = true;
    // clearPossibleMoves();
    let selected_place = window.document.getElementById(chessFieldPlaces[selectedFigure[1]][selectedFigure[2]]);
    selected_place.getElementsByClassName("blaze")[0].style.border = "0px solid #00000000";
    window.document.getElementById('select').style.display = 'none';
    selected_place.removeEventListener("click", eventUnselectFigure);

    selectedFigure = [];
}