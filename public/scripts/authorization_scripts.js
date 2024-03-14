let input_login = window.document.querySelector("#input_login");
let input_password = window.document.querySelector("#input_password");

let page_allow_to_show_game_search_field = true;

window.document.querySelector("#submit_button").addEventListener("click", async (event) => {
    event.preventDefault();
    let login = input_login.value;
    let password = input_password.value;
    let response = await fetch("/mekanism/enter_accaunt", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            login: login,
            password: password,
        }),
    });
    response = await response.json();
    if (!response[0]) {
        callErrorMessage(window.document.querySelector("#authorization_error_message"), response[1]);
    } else {
        window.location.href = "/";
    }
});

let public_server_values;
async function initLaunchServerData() {
    let response = await fetch("/mekanism/get_public_server_values", {
        method: "GET",
    });
    public_server_values = await response.json();
    public_server_values = JSON.parse(public_server_values);
}
initLaunchServerData();

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

function clampInputValue(target, max_value) {
    target.value = target.value.slice(0, max_value);
}

input_login.addEventListener("input", counterLogin);
input_password.addEventListener("input", counterPassword);

window.document.querySelector("#password_unhide_button").addEventListener("change", (event) => {
    if (event.target.checked) {
        input_password.type = "text";
        event.target.parentNode.querySelector("i").classList = "bi bi-eye-slash-fill";
    } else {
        input_password.type = "password";
        event.target.parentNode.querySelector("i").classList = "bi bi-eye-fill";
    }
});

function callErrorMessage(DOM_object, string) {
    DOM_object.style.display = "block";
    DOM_object.innerHTML = string;
}

function uncallErrorMessage(DOM_object) {
    DOM_object.style.display = "none";
    DOM_object.innerHTML = "";
}

// uncallGameSearchFieldAndExitSearch();