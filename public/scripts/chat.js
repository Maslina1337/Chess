messages = window.document.querySelector("#messages");
msg_send_button = window.document.querySelector("#msg-send-button");
msg_send_input = window.document.querySelector("#msg-send-input");

msg_send_button.addEventListener("click", event_chat_msg_send);

msg_send_input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        msg_send_button.click();
    }
})

msg_send_input.addEventListener("input", (event) => {
    if (event.target.value.length > public_server_values.max_length_chat_msg) {
        event.target.value = event.target.value.splice(0, public_server_values.max_length_chat_msg);
    }
})

async function restore_chat_history() {
    let response = await fetch("/mekanism/chess_chat_restore", {
        method: "GET",
    });
    let data = await response.json();
    console.log("CHAT: ", data);
    if (data[0]) {
        messages.innerHTML = data[1];

        // В самый низ списка сообщений
        messages.scrollTo(0, messages.scrollHeight);
    }
}

function event_chat_msg_send(event) {
    chat_msg_send(msg_send_input.value);
    msg_send_input.value = "";
}

async function chat_msg_send(msg) {
    if (msg > public_server_values.max_length_chat_msg || msg === "") {
        return;
    }
    
    let response = await fetch("/mekanism/chess_chat_msg_send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            msg: msg,
        }),
    });
    let send_status = await response.json();
    console.log("SEND STATUS: ", send_status);

    if (send_status[0]) {
        lock_send_button();
        setTimeout(unlock_send_button, public_server_values.chat_msg_delay * 1000);
    }
}

function lock_send_button() {
    msg_send_button.removeEventListener("click", event_chat_msg_send);
    msg_send_button.innerHTML = '<i class="bi bi-lock-fill"></i>';
    msg_send_button.classList.add("btn-lock");
}

function unlock_send_button() {
    msg_send_button.addEventListener("click", event_chat_msg_send);
    msg_send_button.innerHTML = '<i class="bi bi-envelope-fill"></i>';
    msg_send_button.classList.remove("btn-lock");
}

restore_chat_history()

// В самый низ списка сообщений
messages.scrollTo(0, messages.scrollHeight);