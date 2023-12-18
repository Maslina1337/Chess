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