const game_search_field = window.document.querySelector("#game-search-field");

let current_timer_intervals = [null, null]
let current_timer_interval_id1 = null;
let current_timer_interval_id2 = null;

let public_server_values;
async function initLaunchServerData() {
    let response = await fetch("/mekanism/get_public_server_values", {
        method: "GET",
    });
    public_server_values = await response.json();
    public_server_values = JSON.parse(public_server_values);
}

let private_accaunt_data = "dsds";

async function initPrivateAccauntData() {
    let response = await fetch("/mekanism/get_private_accaunt_data", {
        method: "GET",
    });
    private_accaunt_data = await response.json();
    private_accaunt_data = private_accaunt_data[1];
}

let game_search_field_info;

async function initGameSearchFieldInfo() {
    console.log("game search field c1");
    let response = await fetch("/mekanism/get_game_search_field_info", {
        method: "GET",
    });
    console.log("game search field c2");
    game_search_field_info = await response.json();
    console.log("game search field c3", game_search_field_info, page_allow_to_show_game_search_field);
    if (page_allow_to_show_game_search_field) {
        if (game_search_field_info[0] && game_search_field_info[1] !== null) {
            if (game_search_field_info[1].type === "return") {
                console.log("Меня попросили отобразить вам окошко возвращения.");
                callReturnField();
            } else if (game_search_field_info[1].type === "search") {
                console.log("Меня попросили отобразить вам окошко поиска.");
                callGameSearchField();
            }
        }
    }
}

async function exit_accaunt() {
    let response = await fetch("/mekanism/exit_accaunt", {
        method: "GET",
    });
    response = await response.json();
    if (response[0]) {
        window.location.reload();
    }
    console.log(response);
}

function callGameSearchField() {
    game_search_field.style.display = "block";
    game_search_field.querySelector(".game-search-wait").style.display = "flex";
    game_search_field.querySelector(".game-search-found").style.display = "none";
    game_search_field.querySelector(".game-search-found-wait").style.display = "none";
    game_search_field.querySelector(".game-return").style.display = "none";
}

function modifyGameSearchField(nickname, elo, avatar) {
    game_search_field.style.display = "block";
    game_search_field.querySelector(".game-search-wait").style.display = "none";
    game_search_field.querySelector(".game-search-found-wait").style.display = "none";
    game_search_field.querySelector(".game-return").style.display = "none";
    let game_search_found = game_search_field.querySelector(".game-search-found");
    game_search_found.style.display = "flex";
    game_search_field.style.width = "auto";
    game_search_field.style.height = "auto";

    game_search_found.querySelector(".nickname").innerHTML = nickname;
    game_search_found.querySelector(".elo").innerHTML = elo;
    game_search_found.querySelector(".avatar").setAttribute("src", "../img/avatars/" + avatar);

    claerIntervalTimers();

    setDOMTimer(game_search_field.querySelector(".game-search-found").querySelector(".timer"), public_server_values.game_accept_time, 0);
    setDOMTimer(game_search_field.querySelector(".game-search-found-wait").querySelector(".timer"), public_server_values.game_accept_time, 1);
}

function modifyWaitGameSearchField() {
    game_search_field.style.display = "block";
    game_search_field.querySelector(".game-search-wait").style.display = "none";
    game_search_field.querySelector(".game-search-found").style.display = "none";
    game_search_field.querySelector(".game-return").style.display = "none";
    let game_search_found_wait = game_search_field.querySelector(".game-search-found-wait");
    game_search_found_wait.style.display = "flex";
    game_search_field.style.width = "auto";
    game_search_field.style.height = "auto";

    game_search_found.querySelector(".nickname").innerHTML = nickname;
    game_search_found.querySelector(".elo").innerHTML = elo;
    // Ещё нужно аватар добавить.

    setDOMTimer(game_search_field.querySelector(".game-search-found").querySelector(".timer"), public_server_values.game_accept_time);
}

function callReturnField() {
    uncallGameSearchField();
    game_search_field.style.display = "block";
    game_search_field.querySelector(".game-return").style.display = "flex";
}

function uncallGameSearchField() {
    game_search_field.style.display = "none";
    game_search_field.querySelector(".game-search-wait").style.display = "none";
    game_search_field.querySelector(".game-search-found").style.display = "none";
    game_search_field.querySelector(".game-search-found-wait").style.display = "none";
    game_search_field.querySelector(".game-return").style.display = "none";
}

function claerIntervalTimers() {
    debugger;
    clearInterval(current_timer_intervals[0]);
    clearInterval(current_timer_intervals[1]);
    current_timer_intervals[0] = null;
    current_timer_intervals[1] = null;
}

async function uncallGameSearchFieldAndExitSearch() {
    let response = await fetch("/mekanism/multiplayer_search_exit", {
        method: "GET",
    });

    response = await response.json();

    game_search_field.style.display = "none";
    game_search_field.querySelector(".game-search-wait").style.display = "none";
    game_search_field.querySelector(".game-search-found").style.display = "none";
    game_search_field.querySelector(".game-search-found-wait").style.display = "none";
    game_search_field.querySelector(".game-return").style.display = "none";
}

if (window.document.querySelectorAll(".exit-search-button")) {
    window.document.querySelectorAll(".exit-search-button").forEach((element) => {
        element.addEventListener("click", uncallGameSearchFieldAndExitSearch);
    });
}

if (window.document.querySelectorAll(".deny-search-button")) {
    window.document.querySelectorAll(".deny-search-button").forEach((element) => {
        element.addEventListener("click", async () => {
            let response = await fetch("/mekanism/multiplayer_search_deny", {
                method: "GET",
            });

            response = await response.json();
        });
    });
}

if (window.document.querySelectorAll(".accept-search-button")) {
    window.document.querySelectorAll(".accept-search-button").forEach((element) => {
        element.addEventListener("click", async () => {
            let response = await fetch("/mekanism/multiplayer_search_accept", {
                method: "GET",
            });

            response = await response.json();
        });
    });
}

async function titikaka() {
    let response = await fetch("/titikaka", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            lol: "lol",
        }),
    });
    response = await response.json();
}

function setDOMTimer(DOM_element, seconds, index) {
    if (current_timer_intervals[index] !== null) {
        clearInterval(current_timer_intervals[index]);
    }
    const sec = DOM_element.querySelector(".sec");
    const min = DOM_element.querySelector(".min");
    sec.innerHTML = String(seconds - (Math.floor(seconds / 60) * 60));
    min.innerHTML = String(Math.floor(seconds / 60));
    // DOM_element.innerHTML = String(Math.floor(seconds / 60)) + ":" + String(seconds - (Math.floor(seconds / 60) * 60));
    current_timer_intervals[index] = setInterval(() => {
        debugger;
        sec.innerHTML = parseInt(sec.innerHTML) - 1;
        if(sec.innerHTML.length < 2) {
            let temp = sec.innerHTML;
            sec.innerHTML = "0" + temp;
        }
        if (parseInt(sec.innerHTML) < 0) {
            if (parseInt(min.innerHTML) > 0) {
                sec.innerHTML = "59";
                min.innerHTML = parseInt(min.innerHTML) - 1;
            } else {
                sec.innerHTML = "00";
                min.innerHTML = "00";
                clearInterval(current_timer_intervals[index]);
                current_timer_intervals[index] = null;
            }
        }
    }, 1000);
}

initLaunchServerData();
initPrivateAccauntData();
initGameSearchFieldInfo();