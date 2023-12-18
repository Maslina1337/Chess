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
initLaunchServerData();

let private_accaunt_data;
async function initPrivateAccauntData() {
    let response = await fetch("/mekanism/get_private_accaunt_data", {
        method: "GET",
    });
    private_accaunt_data = await response.json();
}
initPrivateAccauntData();

let game_search_field_info;
async function initGameSearchFieldInfo() {
    let response = await fetch("/mekanism/get_game_search_field_info", {
        method: "GET",
    });
    game_search_field_info = await response.json();
    if (page_allow_to_show_game_search_field) {
        if (game_search_field_info[0]) {
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
initGameSearchFieldInfo();

function counterLogin(event) {
    clampInputValue(event.target, public_server_values.max_user_login_length);
    let counter = event.target.parentNode;
    counter.setAttribute("string", String(event.target.value.length) + "/" + String(public_server_values.max_user_login_length));
}

function counterPassword(event) {
    clampInputValue(event.target, public_server_values.max_user_password_length);
    let counter = event.target.parentNode;
    counter.setAttribute("string", String(event.target.value.length) + "/" + String(public_server_values.max_user_password_length));
}

function counterNickname(event) {
    clampInputValue(event.target, public_server_values.max_user_nickname_length);
    let counter = event.target.parentNode;
    counter.setAttribute("string", String(event.target.value.length) + "/" + String(public_server_values.max_user_nickname_length));
}

function counterAbout(event) {
    clampInputValue(event.target, public_server_values.max_user_about_length);
    let counter = event.target.parentNode;
    counter.setAttribute("string", String(event.target.value.length) + "/" + String(public_server_values.max_user_about_length));
}

function clampInputValue(target, max_value) {
    target.value = target.value.slice(0, max_value);
}

const input_nickname = window.document.querySelector("#input_nickname");
const locked_nickname = window.document.querySelector("#locked_nickname");
const input_login = window.document.querySelector("#input_login");
const locked_login = window.document.querySelector("#locked_login");
const input_password = window.document.querySelector("#input_password");
const locked_password = window.document.querySelector("#locked_password");
const input_about = window.document.querySelector("#input_about");
const input_avatar = window.document.querySelector("#input_about");

input_nickname.addEventListener("input", counterNickname);
input_login.addEventListener("input", counterLogin);
input_password.addEventListener("input", counterPassword);
input_about.addEventListener("input", counterAbout);

window.document.querySelector("#password_unhide_button").addEventListener("change", (event) => {
    if (event.target.checked) {
        input_password.type = "text";
        locked_password.innerHTML = private_accaunt_data.password;
        event.target.parentNode.querySelector("i").classList = "bi bi-eye-slash-fill";
    } else {
        input_password.type = "password";
        let locked_password_string = "";
        for (let i = 0; i < private_accaunt_data.password.length; i++) {
            locked_password_string += "•";
        }
        locked_password.innerHTML = locked_password_string;
        event.target.parentNode.querySelector("i").classList = "bi bi-eye-fill";
    }
});

// window.document.querySelector("#nickname_unlock_button").addEventListener("change", (event) => {
//     if (event.target.checked) {
//         input_nickname.parentNode.style.display = "block";
//         input_nickname.value = private_accaunt_data.nickname;
//         edit_profile.querySelector(".counter-nickname").setAttribute("string", private_accaunt_data.nickname.length + "/" + public_server_values.max_user_nickname_length);
//         locked_nickname.style.display = "none";
//         event.target.parentNode.querySelector(".bi-pen-fill").classList = "bi bi-pen";
//     } else {
//         input_nickname.parentNode.style.display = "none";
//         input_nickname.value = private_accaunt_data.nickname;
//         edit_profile.querySelector(".counter-nickname").setAttribute("string", private_accaunt_data.nickname.length + "/" + public_server_values.max_user_nickname_length);
//         locked_nickname.style.display = "block";
//         console.log(event.target.parentNode);
//         event.target.parentNode.querySelector(".bi-pen").classList = "bi bi-pen-fill";
//     }
// });

window.document.querySelector("#login_unlock_button").addEventListener("change", (event) => {
    if (event.target.checked) {
        input_login.parentNode.style.display = "block";
        input_login.value = private_accaunt_data.login;
        edit_profile.querySelector(".counter-login").setAttribute("string", private_accaunt_data.login.length + "/" + public_server_values.max_user_login_length);
        locked_login.style.display = "none";
        event.target.parentNode.querySelector(".bi-pen-fill").classList = "bi bi-pen";
    } else {
        input_login.parentNode.style.display = "none";
        input_login.value = private_accaunt_data.login;
        edit_profile.querySelector(".counter-login").setAttribute("string", private_accaunt_data.login.length + "/" + public_server_values.max_user_login_length);
        locked_login.style.display = "block";
        event.target.parentNode.querySelector(".bi-pen").classList = "bi bi-pen-fill";
    }
});

window.document.querySelector("#password_unlock_button").addEventListener("change", (event) => {
    if (event.target.checked) {
        input_password.parentNode.style.display = "block";
        input_password.value = private_accaunt_data.password;
        edit_profile.querySelector(".counter-password").setAttribute("string", private_accaunt_data.password.length + "/" + public_server_values.max_user_password_length);
        locked_password.style.display = "none";
        event.target.parentNode.querySelector(".bi-pen-fill").classList = "bi bi-pen";
    } else {
        input_password.parentNode.style.display = "none";
        input_password.value = private_accaunt_data.password;
        edit_profile.querySelector(".counter-password").setAttribute("string", private_accaunt_data.password.length + "/" + public_server_values.max_user_password_length);
        locked_password.style.display = "block";
        event.target.parentNode.querySelector(".bi-pen").classList = "bi bi-pen-fill";
    }
});

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
    // Ещё нужно аватар добавить.

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

// let game_search_info;
// async function initGameSearchInfo() {
//     let response = await fetch("/mekanism/get_game_search_info", {
//         method: "GET",
//     });
//     game_search_info = await response.json();
//     console.log(game_search_info);
//     if (game_search_info[0]) {
//         if(game_search_info[1]) {
//             modifyGameSearchField();
//         } else {
//             callGameSearchField();
//         }
//     } 
// }
// initGameSearchInfo();

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