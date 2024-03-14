const socket = io();

socket.on("game_found", (opponent_info) => {
    modifyGameSearchField(opponent_info.nickname, opponent_info.elo, opponent_info.avatar);
})

socket.on("game_accepted", (opponent_info) => {
    modifyWaitGameSearchField();
})

socket.on("game_start", () => {
    window.location = "/multiplayer_play_page";
})

//Устарело
// socket.on("game_search_countionous", (game_search_info) => {
//     if (game_search_info !== null) {
//         if (game_search_info.type === "return") {
//             console.log("Меня попросили отобразить вам окошко возвращения.");
//             setTimeout(callReturnField, 1000) // Таймайт нужен потому что скрипт не успевает подгрузиться.
//         } else if (game_search_info.type === "search") {
//             console.log("Меня попросили отобразить вам окошко поиска.");
//             setTimeout(callGameSearchField, 1000) // Таймайт нужен потому что скрипт не успевает подгрузиться.
//         }
//     }
// })

socket.on("game_denyed", () => {
    claerIntervalTimers();
    uncallGameSearchField();
    callGameSearchField();
})

socket.on("piece_moved", (new_info) => {
    chess_client_info = new_info;
    arrangeFigures();
})

socket.on("piece_pick", (pieces) => {
    console.log("Call piece wheel");
    callPieceWheel(pieces);
})

socket.on("game_end", (game_end_data) => {
    console.log("GAME END: ", game_end_data);
    callGameEndInfo(game_end_data.title, game_end_data.description, game_end_data.elo);
})

socket.on("chat_msg_come", (data) => {
    let msg = window.document.createElement("div");
    msg.classList.add("message-box");
    msg.innerHTML = 
    `<div class="msg-header">
    <div class="nickname">${data.nickname}</div>
        <div class="date">${data.date}</div>
    </div>
    <p class="msg-text">${data.msg}</p>`
    messages.appendChild(msg);
    messages.scrollTo(0, messages.scrollHeight);
})