const chess_field_places = [["place11", "place12", "place13", "place14", "place15", "place16", "place17", "place18"],
                ["place21", "place22", "place23", "place24", "place25", "place26", "place27", "place28"], 
                ["place31", "place32", "place33", "place34", "place35", "place36", "place37", "place38"], 
                ["place41", "place42", "place43", "place44", "place45", "place46", "place47", "place48"], 
                ["place51", "place52", "place53", "place54", "place55", "place56", "place57", "place58"], 
                ["place61", "place62", "place63", "place64", "place65", "place66", "place67", "place68"], 
                ["place71", "place72", "place73", "place74", "place75", "place76", "place77", "place78"], 
                ["place81", "place82", "place83", "place84", "place85", "place86", "place87", "place88"]];

let chess_client_info = null;

let last_wanted_move = {
    from_y: null,
    from_x: null,
    to_y: null,
    to_x: null,
}

async function get_chess_client_info() {
    let response = await fetch("/mekanism/get_chess_client_info", {
        method: "GET",
    });
    let info = await response.json();
    if (info[0]) {
        chess_client_info = info[1];
        console.log("Шо я получаю", info);
        if (player_color !== null) {
            arrangeFigures();
        }
    }
}

async function moveFigure(from_y, from_x, to_y, to_x) {

    // Отражение, если игра идёт за чёрных.
    if (player_color === "black") {
        from_y = 7 - from_y;
        from_x = 7 - from_x;
        to_y = 7 - to_y;
        to_x = 7 - to_x;
    }

    last_wanted_move.from_y = from_y;
    last_wanted_move.from_x = from_x;
    last_wanted_move.to_y = to_y;
    last_wanted_move.to_x = to_x;
    
    let response = await fetch("/mekanism/chess_move_figure", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from_y: from_y,
            from_x: from_x,
            to_y: to_y,
            to_x: to_x,
            piece: null,
        }),
    });
    let move_status = await response.json();
    console.log("MOVE STATUS: ", move_status);
}

async function pickFigure(piece) {

    let response = await fetch("/mekanism/chess_move_figure", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from_y: last_wanted_move.from_y,
            from_x: last_wanted_move.from_x,
            to_y: last_wanted_move.to_y,
            to_x: last_wanted_move.to_x,
            piece: piece,
        }),
    });
    let pick_status = await response.json();
    console.log("pick STATUS: ", pick_status);
}

let player_color = null;

async function get_client_color() {
    let response = await fetch("/mekanism/get_chess_client_color");
    let info = await response.json();
    if (info[0]) {
        player_color = info[1];
    }
    console.log(info);
    if (chess_client_info !== null) {
        arrangeFigures();
    }
}

get_client_color();
get_chess_client_info();