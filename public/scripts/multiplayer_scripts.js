const search_start = window.document.querySelector("#search-start");

page_allow_to_show_game_search_field = true;

search_start.addEventListener("click", async (event) => {
    let response = await fetch("/mekanism/multiplayer_search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            mode: window.document.querySelector("input[name='mode-radio']:checked").value,
            is_ranked: (window.document.querySelector("input[name='rank-radio']:checked").value === "true" ? true : false),
            search_speed: window.document.querySelector("input[name='speed-radio']:checked").value,
        }),
    })
    response = await response.json();
    if (response[0]) {
        if (game_search_field.style.display !== "block") {
            callGameSearchField();
        }
    }
});