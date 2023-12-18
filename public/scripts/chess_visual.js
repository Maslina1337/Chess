const chessFieldCords = ["0%", "12.5%", "25%", "37.5%", "50%", "62.5%", "75%", "87.5%"];

let selectedFigure = [];

let userRights = {
    canMoveFigure: true, // castling is move too
    canShowPossiableMoves: true,
    canClearPossiableMoves: true,
    canSelectFigure: true,
    isSpetateMode: false,
    canPickPiece: false
}

function clearPossibleMovesFull() {
    chess_field_places.map((i) => {
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

function showPawnStep() {
    if (chess_client_info.last_pawn_step.length !== 0) {
        let element = window.document.getElementById('step_pawn');
        element.style.display = "block";
        element.style.top = chessFieldCords[pawnStep[0]];
        element.style.left = chessFieldCords[pawnStep[1]];
    }
}

function unshowPawnStep() {
    let element = window.document.getElementById('step_pawn');
    element.style.display = "none";
}

function showTurn() {
    if (chess_client_info.turn === "white") {
        let b = window.document.getElementById('turnB');
        b.getElementsByTagName('img')[0].style.display = 'none';
        let w = window.document.getElementById('turnW');
        w.getElementsByTagName('img')[0].style.display = 'flex';
    } else {
        let w = window.document.getElementById('turnW');
        w.getElementsByTagName('img')[0].style.display = 'none';
        let b = window.document.getElementById('turnB');
        b.getElementsByTagName('img')[0].style.display = 'flex';
    }
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

        if (chess_client_info.chess_field[y][x] === 0) {
            return 0;
        }

        let name = chess_client_info.chess_field[y][x];
        chess_client_info.moves[(String(y)+String(x))].forEach((i, yi) => {
            i.forEach((j, xj) => {
                if (j === 1) {
                    let place = window.document.getElementById(chessFieldPlaces[yi][xj]);
                    place.style.cursor = "pointer";
                    place.getElementsByClassName("blaze")[0].style.backgroundImage = (name[0] === turn[0] ? "url(img/circle.png)" : "url(img/circleempty.png)");
                    place.addEventListener("click", eventMoveFigure);
                    if (name[0] === turn[0]) {
                    }
                } else if (j === 2) {
                    let place = window.document.getElementById(chessFieldPlaces[yi][xj]);
                    place.style.cursor = "pointer";
                    place.getElementsByClassName("blaze")[0].style.backgroundImage = "url(img/cross.png)";
                    place.addEventListener("click", eventMoveFigure);
                } else if (j === 3) {
                    let place = window.document.getElementById(chessFieldPlaces[yi][xj]);
                    place.style.cursor = "pointer";
                    place.getElementsByClassName("blaze")[0].style.backgroundImage = "url(img/switch.png)";
                    place.addEventListener("click", eventMoveFigure);
                }
            })
        });
    }
}

function clearPossibleMoves() {
    if (userRights.canClearPossiableMoves) {
        chessFieldPlaces.forEach((i, yi) => {
            i.forEach((j, xj) => {
                let element = window.document.getElementById(j)
                element.style.cursor = "auto";
                element.getElementsByClassName("blaze")[0].style.backgroundImage = "";
                element.removeEventListener("click", eventMoveFigure);
            });
        });
    }
}

function selectFigureSmart(y, x) {
    //valid test
    if (chess_client_info.chess_field[y][x][0] !== turn[0]) {
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

        let name = chess_client_info.chess_field[y][x];

        selectedFigure = [name, y, x, "smartselection"];
        smartSelectInfo.isSmartSelect = true;
        smartSelectInfo.y = y;
        smartSelectInfo.x = x;

        let place = window.document.getElementById(chessFieldPlaces[y][x]);
        place.getElementsByClassName("blaze")[0].style.border = `11px solid red`;
        place.getElementsByClassName("blaze")[0].style.borderRadius = "0px";
    }
}

function selectFigureDrag(y, x) {
    //valid test
    if (chess_client_info.chess_field[y][x][0] !== turn[0]) {
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

        let name = chess_client_info.chess_field[y][x]

        selectedFigure = [name, y, x, "dragselection"];
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
    // window.document.getElementById('select').style.display = 'none';
    selected_place.removeEventListener("click", eventUnselectFigure);

    selectedFigure = [];
}