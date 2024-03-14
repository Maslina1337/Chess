let settings_current_opend_color_picker = undefined;

let page_allow_to_show_game_search_field = false;

function setSizeChat() {
    let messages = window.document.querySelector("#messages");
    let acheaveSize = "calc(100vmin - 121px - " + String(parseInt(getHeaderHeight())) + "px)";
    // messages.style.height = getComputedStyle(messages).height;
    messages.style.maxHeight = acheaveSize;
}

function setSizeChessSection() {
    let chess_field = window.document.querySelector("#chess_field");
    let acheaveSize = "calc(100vmin - 92px - " + String(parseInt(getHeaderHeight())) + "px)";
    chess_field.style.height = acheaveSize;
    chess_field.style.width = acheaveSize;
}

function getHeaderHeight() {
    return getComputedStyle(window.document.querySelector("header")).height;
}

function compliteBeatenFigures(turn) {
    let beatenFigureField = (turn === "white" ? beatenFiguresBlack_value : beatenFiguresWhite_value);
    if (beatenFigureField !== null) {
        if ((turn === "white" ? beatenFiguresBlack.length : beatenFiguresWhite.length) === 1) {
            beatenFigureField.style.display = "flex";
            let slot = window.document.createElement("div");
            slot.classList.add("slot")
            slot.style.backgroundImage = "url(img/" + (turn === "white" ? beatenFiguresBlack[0] : beatenFiguresWhite[0]) + ".png)"; 
            beatenFigureField.appendChild(slot);
        } else {
            beatenFigureField.style.display = "flex";
            let slot = window.document.createElement("div");
            slot.classList.add("slot")
            slot.style.backgroundImage = "url(img/" + (turn === "white" ? beatenFiguresBlack[beatenFiguresBlack.length - 1] : beatenFiguresWhite[beatenFiguresWhite.length - 1]) + ".png)"; 
            beatenFigureField.appendChild(slot);
        }
    }
}

function callSpectateWarning() {
    let spectateModeWarning = window.document.getElementById("spectateModeWarning");
    spectateModeWarning.style.display = "flex";
    if (spectateModeWarning.getElementsByTagName("input")[0].checked) {
        spectateModeWarning.getElementsByTagName("p")[0].style.display = "none";
    } else {
        spectateModeWarning.getElementsByTagName("p")[0].style.display = "block";
    }
}

function uncallSpectateWarning() {
    window.document.getElementById("spectateModeWarning").style.display = "none";
}

let beatenFiguresBlack_value = window.document.getElementById("beatenFiguresBlack");
let beatenFiguresWhite_value = window.document.getElementById("beatenFiguresWhite");

// beatenFiguresBlack_value.style.display = "none";

// beatenFiguresWhite_value.style.display = "none";

window.addEventListener("resize", setSizeChessSection);
setSizeChessSection();

window.addEventListener("resize", setSizeChat);
setSizeChat();