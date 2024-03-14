const chessFieldCords = ["0%", "12.5%", "25%", "37.5%", "50%", "62.5%", "75%", "87.5%"];

let selectedFigure = [];

let moves = null;
let moves_all_unsafe = null;
let white_moves = null;
let black_moves = null;
let chess_field = null;
let residual = null;
let count_moves = null;
let last_pawn_step = null;

let userRights = {
    canShowPossiableMoves: true,
    canClearPossiableMoves: true,
    canSelectFigure: true,
    isSpetateMode: false,
    canPickPiece: false
}

//const hover_description = window.document.querySelector("#hover-description");

// hover_description.addEventListener("mouseover", modifyHoverDescription);

// function showHoverDescription(event) {
//     let place = event.target.parentNode;
//     let cords = find_pos(place);
//     console.log(cords);

//     hover_description.style.display = "block";
//     hover_description.style.left = String(cords[0]) + "px";
//     hover_description.style.top = String(cords[1] - 30) + "px";

//     // place.id[5] - 1, place.id[6] - 1
// }

// function modifyHoverDescription(event) {
//     let place = event.target.parentNode;
//     hover_description.classList.add("modify");
// }

// function find_pos(obj) {
// 	let curleft = 0;
//     let curtop = 0;
//     if (obj.offsetParent) {
//         do {
// 			curleft += obj.offsetLeft;
// 			curtop += obj.offsetTop;
//         } while (obj = obj.offsetParent);
//         return [curleft,curtop];
//     }
// }

// function hideHoverDescription(event) {
//     hover_description.style.display = "none";
//     hover_description.classList.remove("modify")
// }

function clearPossibleMovesFull() {
    //Вернуть если данных ещё нет.
    if (chess_client_info === null) {
        return;
    }

    chess_field_places.forEach((i) => {
        i.forEach((j) => {
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
    //Вернуть если данных ещё нет.
    if (chess_client_info === null) {
        return;
    }
    if (last_pawn_step.length !== 0) {
        let element = window.document.getElementById('step_pawn');
        element.style.display = "block";
        element.style.top = chessFieldCords[pawnStep[0]];
        element.style.left = chessFieldCords[pawnStep[1]];
    }
}

function unshowPawnStep() {
    //Вернуть если данных ещё нет.
    if (chess_client_info === null) {
        return;
    }
    let element = window.document.getElementById('step_pawn');
    element.style.display = "none";
}

function showTurn() {
    //Вернуть если данных ещё нет.
    if (chess_client_info === null) {
        return;
    }
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
    //Вернуть если данных ещё нет.
    if (chess_client_info === null) {
        return;
    }
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
    //Вернуть если данных ещё нет.
    if (chess_client_info === null) {
        return;
    }

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
    //Вернуть если данных ещё нет.
    if (chess_client_info === null) {
        return;
    }
    if (Object.values(event.target.classList).find(element => element === "figure") !== undefined) {
        let place = event.target.parentNode;
        console.log(place.id);
        moveFigure(selectedFigure[1], selectedFigure[2], place.id[5] - 1, place.id[6] - 1);
    } else {
        let place = event.target;
        console.log(place.id);
        moveFigure(selectedFigure[1], selectedFigure[2], place.id[5] - 1, place.id[6] - 1);
    }
}


function showPossibleMoves(y, x) {
    //Вернуть если данных ещё нет.
    if (chess_client_info === null) {
        return;
    }
    if (userRights.canShowPossiableMoves) {

        if (chess_field[y][x] === 0) {
            return;
        }

        let name = chess_field[y][x];

        if (player_color === chess_client_info.turn) {
            moves[(String(y)+String(x))].forEach((i, yi) => {
                i.forEach((j, xj) => {
                    if (j === 1) {
                        let place = window.document.getElementById(chess_field_places[yi][xj]);
                        place.style.cursor = "pointer";
                        place.getElementsByClassName("blaze")[0].style.backgroundImage = (name[0] === chess_client_info.turn[0] ? "url(img/circle.png)" : "url(img/circleempty.png)");
                        place.addEventListener("click", eventMoveFigure);
                    } else if (j === 2) {
                        let place = window.document.getElementById(chess_field_places[yi][xj]);
                        place.style.cursor = "pointer";
                        place.getElementsByClassName("blaze")[0].style.backgroundImage = "url(img/cross.png)";
                        place.addEventListener("click", eventMoveFigure);
                    } else if (j === 3) {
                        let place = window.document.getElementById(chess_field_places[yi][xj]);
                        place.style.cursor = "pointer";
                        place.getElementsByClassName("blaze")[0].style.backgroundImage = "url(img/switch.png)";
                        place.addEventListener("click", eventMoveFigure);
                    }
                })
            });
        } else {
            moves_all_unsafe[(String(y)+String(x))].forEach((i, yi) => {
                i.forEach((j, xj) => {
                    if (j === 1) {
                        let place = window.document.getElementById(chess_field_places[yi][xj]);
                        // place.style.cursor = "pointer";
                        place.getElementsByClassName("blaze")[0].style.backgroundImage = "url(img/circleempty.png)";
                        // place.addEventListener("click", eventMoveFigure);
                    } else if (j === 2) {
                        let place = window.document.getElementById(chess_field_places[yi][xj]);
                        // place.style.cursor = "pointer";
                        place.getElementsByClassName("blaze")[0].style.backgroundImage = "url(img/cross.png)";
                        // place.addEventListener("click", eventMoveFigure);
                    } else if (j === 3) {
                        let place = window.document.getElementById(chess_field_places[yi][xj]);
                        // place.style.cursor = "pointer";
                        place.getElementsByClassName("blaze")[0].style.backgroundImage = "url(img/switch.png)";
                        // place.addEventListener("click", eventMoveFigure);
                    }
                })
            });
        }
    }
}

function clearPossibleMoves() {
    //Вернуть если данных ещё нет.
    if (chess_client_info === null) {
        return;
    }
    if (userRights.canClearPossiableMoves) {
        chess_field_places.forEach((i, yi) => {
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
    //Вернуть если данных ещё нет.
    if (chess_client_info === null) {
        return;
    }

    //valid test
    if (chess_field[y][x][0] !== chess_client_info.turn[0]) {
        return 0;
    }

    //Если не ход этого игрока, то и фигуры он выделять не может.
    if (player_color !== chess_client_info.turn) {
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

        let name = chess_field[y][x];

        selectedFigure = [name, y, x, "smartselection"];
        smartSelectInfo.isSmartSelect = true;
        smartSelectInfo.y = y;
        smartSelectInfo.x = x;

        let place = window.document.getElementById(chess_field_places[y][x]);
        place.getElementsByClassName("blaze")[0].style.border = `11px solid red`;
        place.getElementsByClassName("blaze")[0].style.borderRadius = "0px";
    }
}

function selectFigureDrag(y, x) {
    //Вернуть если данных ещё нет.
    if (chess_client_info === null) {
        return;
    }

    //valid test
    if (chess_field[y][x][0] !== chess_client_info.turn[0]) {
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
    //Вернуть если данных ещё нет.
    if (chess_client_info === null) {
        return;
    }

    if (selectedFigure.length === 0) {
        return 0;
    }
    
    userRights.canShowPossiableMoves = true;
    userRights.canClearPossiableMoves = true;
    // clearPossibleMoves();
    let selected_place = window.document.getElementById(chess_field_places[selectedFigure[1]][selectedFigure[2]]);
    selected_place.getElementsByClassName("blaze")[0].style.border = "0px solid #00000000";
    // window.document.getElementById('select').style.display = 'none';
    selected_place.removeEventListener("click", eventUnselectFigure);

    selectedFigure = [];
}

function mirror_field(field) {
    let temp = [[0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0]];

    field.forEach((row, y) => {
        row.forEach((element, x) => {
            temp[7 - y][7 - x] = element;
        })
    })

    return temp;
}

function arrangeFigures() {
    //Вернуть если данных ещё нет.
    if (chess_client_info === null) {
        return;
    }

    console.log("DEVOUT: ", player_color, chess_client_info);
    
    // Отражение данных, если игра идёт за чёрных.
    if (player_color === "white") {
        moves = chess_client_info.moves;
        moves_all_unsafe = chess_client_info.moves_all_unsafe;
        chess_field = chess_client_info.chess_field;
        residual = chess_client_info.residual;
        count_moves = chess_client_info.count_moves;
        last_pawn_step = chess_client_info.last_pawn_step;
    } else if (player_color === "black") {
        let temp;

        moves = chess_client_info.moves;
        temp = {};
        Object.keys(moves).forEach((element) => {
            temp[String(7 - parseInt(element[0])) + String(7 - parseInt(element[1]))] = mirror_field(moves[element]);
        })
        moves = temp;

        moves_all_unsafe = chess_client_info.moves_all_unsafe;
        temp = {};
        Object.keys(moves_all_unsafe).forEach((element) => {
            temp[String(7 - parseInt(element[0])) + String(7 - parseInt(element[1]))] = mirror_field(moves_all_unsafe[element]);
        })
        moves_all_unsafe = temp;

        chess_field = chess_client_info.chess_field;
        chess_field = mirror_field(chess_field);

        residual = chess_client_info.residual;

        if (residual.from_y !== null) {
            residual.from_y = 7 - residual.from_y;
            residual.from_x = 7 - residual.from_x;
            residual.to_y = 7 - residual.to_y;
            residual.to_x = 7 - residual.to_x;
        }

        // Если есть данные и по второму смещению, то отражаем и их.
        if (residual.from_y2 !== null) {
            residual.from_y2 = 7 - residual.from_y2;
            residual.from_x2 = 7 - residual.from_x2;
            residual.to_y2 = 7 - residual.to_y2;
            residual.to_x2 = 7 - residual.to_x2;
        }

        count_moves = chess_client_info.count_moves;
        count_moves = mirror_field(count_moves);

        last_pawn_step = chess_client_info.last_pawn_step;
        if (last_pawn_step.length !== 0) {
            last_pawn_step[0] = 7 - last_pawn_step[0];
            last_pawn_step[1] = 7 - last_pawn_step[1];
        }
    }

    unselectFigure();
    clearPossibleMovesFull();
    
    if (residual) {
        if (residual.from_y !== null && residual.from_x !== null) {
            window.document.getElementById(chess_field_places[residual.from_y][residual.from_x]).style.backgroundColor = "#4ab94a80";
        }

        if (residual.to_y !== null && residual.to_x !== null) {
            window.document.getElementById(chess_field_places[residual.to_y][residual.to_x]).style.backgroundColor = "#4ab94a80";
        }
    
        if (residual.from_y2 !== null && residual.from_x2 !== null) {
            window.document.getElementById(chess_field_places[residual.from_y2][residual.from_x2]).style.backgroundColor = "#4ab94a80";
        }

        if (residual.to_y2 !== null && residual.to_x2 !== null) {
            window.document.getElementById(chess_field_places[residual.to_y2][residual.to_x2]).style.backgroundColor = "#4ab94a80";
        }
    }

    chess_field.forEach((i, y) => {i.forEach((j, x) => {
        if (j !== 0) {
            let place = window.document.getElementById(`place${y+1}${x+1}`);
            let figure = document.createElement("div");
            figure.classList.add("figure");
            figure.classList.add(j);
            place.appendChild(figure);

            debugger;
            figure.addEventListener("mouseover", eventShowPossibleMoves);
            figure.addEventListener("mouseout", eventClearPossibleMoves);

            // figure.addEventListener("mouseover", showHoverDescription);
            // figure.addEventListener("mouseout", hideHoverDescription);

            place.addEventListener("click", eventSelectFigureSmart);
        }
    })});

    showPawnStep();
    showTurn();
    dragStartEventAdd();
}