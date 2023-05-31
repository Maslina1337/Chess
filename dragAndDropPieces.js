let mouseOverPlace = [];
let smartSelectInfo = {};

function dragStartEventAdd() {
    let figure = window.document.querySelectorAll(".figure");       //drag&drop
    figure = Array.from(figure);
    figure.map((f) => {
        f.addEventListener('mousedown', dragstartEvent);
    });
}

function dragstartEvent(event) {
    dragged_figure = event.target;
    if (selectedFigure[3] === "smartselection") {
        // smartSelectInfo.isSmartSelect = true;
        // smartSelectInfo.y = parseInt(dragged_figure.parentElement.id[5]) - 1;
        // smartSelectInfo.x = parseInt(dragged_figure.parentElement.id[6]) - 1;
    }
    window.addEventListener("mouseup", dropFigure);
    window.addEventListener("mousemove", movemouseWithFigureFirstMove);
}




function movemouseWithFigureFirstMove(event) {
    window.removeEventListener("mousemove", movemouseWithFigureFirstMove);
    window.addEventListener("mousemove", connectPieceWithPointer);
    dragged_figure.style.visibility = "hidden";
    let dragged_element = window.document.getElementById("dragged_element");
    dragged_element.style.backgroundImage = getComputedStyle(dragged_figure).backgroundImage;
    dragged_element.style.top = String(parseInt(mouse_pos.y) - parseInt(getComputedStyle(dragged_element).height) / 2) + "px";
    dragged_element.style.left = String(parseInt(mouse_pos.x) - parseInt(getComputedStyle(dragged_element).width) / 2) + "px";

    userRights.canShowPossiableMoves = false;
    userRights.canClearPossiableMoves = false;

    let acheaveSize = "calc((100vmin - 92px - " + String(parseInt(getHeaderHeight())) + "px) / 8)";
    dragged_element.style.height = acheaveSize;
    dragged_element.style.width = acheaveSize;

    dragged_element.style.visibility = "visible";
    selectFigureDrag(dragged_figure.parentElement.id[5] - 1, dragged_figure.parentElement.id[6] - 1);
}

function connectPieceWithPointer(event) {
    let dragged_element = window.document.getElementById("dragged_element");
    dragged_element.style.top = String(parseInt(mouse_pos.y) - parseInt(getComputedStyle(dragged_element).height) / 2) + "px";
    dragged_element.style.left = String(parseInt(mouse_pos.x) - parseInt(getComputedStyle(dragged_element).width) / 2) + "px";
}

function dropFigure(event) {
    if (dragged_figure !== undefined) {
        window.removeEventListener("mousemove", movemouseWithFigureFirstMove);
        window.removeEventListener("mousemove", connectPieceWithPointer);
        let dragged_element = window.document.getElementById("dragged_element");
        dragged_element.style.visibility = "hidden";
        

        userRights.canShowPossiableMoves = true;
        userRights.canClearPossiableMoves = true;

        dragged_figure.style.visibility = "visible";
        if (mouseOverPlace !== 0) {
            if (selectedFigure.length !== 0) {
                MoveFigure(selectedFigure[1], selectedFigure[2], mouseOverPlace[0], mouseOverPlace[1]);
            }
        }
        unselectFigure();
        if (chessField[mouseOverPlace[0]][mouseOverPlace[1]] === 0) {
            clearPossibleMoves();
        } else {
            clearPossibleMoves();
            if (!userRights.canPickPiece) {
                showPossibleMoves(mouseOverPlace[0], mouseOverPlace[1]);
            }
        }
        dragged_figure = undefined;
    }
}

let dragged_figure;

let place_drop = window.document.querySelectorAll(".place");
place_drop = Array.from(place_drop);
place_drop.map((pd) => {
    pd.addEventListener('mouseover', (event) => {
        if (Object.values(event.target.classList).indexOf("place") !== -1) {
            mouseOverPlace = [parseInt(event.target.id[5]) - 1, parseInt(event.target.id[6]) - 1];
        } else {
            mouseOverPlace = [parseInt(event.target.parentElement.id[5]) - 1, parseInt(event.target.parentElement.id[6]) - 1];
        }
    });
});
