const pick_piece_arrow = window.document.querySelector("#arrow");
const pick_piece_gear1 = window.document.querySelector("#gear1");
const pick_piece_gear2 = window.document.querySelector("#gear2");

const attension = window.document.querySelector("#attension");
const attension_window = attension.querySelector(".window");

const edit_profile = attension_window.querySelector("#edit_profile");
const attension_standart = attension_window.querySelector("#attension_standart");
const attension_question = attension_window.querySelector("#attension_question");
const settings = attension_window.querySelector("#settings");
const figure_select_wheel = attension_window.querySelector("#figure_select_wheel");
const game_end_info = attension_window.querySelector("#game_end_info");

let userOptionalRights = {
    visible_moves: [true, "Показывать возможность хода", "visible_moves", "checkbox"],
    visible_beat_moves: [true, "Показывать возможность атаки", "visible_beat_moves", "checkbox"],
    visible_double_jump: [false, "Показывать двойной ход пешек", "visible_double_jump", "checkbox"],
    visible_turn: [false, "Показывать чья очередь ходить", "visible_turn", "checkbox"],
    color_rasidual: ["#4ab94a80", "Цвет клеток прошлых ходов", "color_rasidual", "color_picker"],
    color_rasidual2: ["#4ab9aa80", "Цвет клеток прошлых ходов вторые", "color_rasidual2", "color_picker"],
    color_hover: ["#00a2ff94", "Цвет клеток при наведении", "color_hover", "color_picker"],
    color_select: ["#00a2ff94", "Цвет выделения", "color_select", "color_picker"],
}

const fieldsStyles = ["field00.png","field01.png","field02.png","field03.png","field04.png","field05.png","field06.png","field07.png","field08.png","field09.png","field10.png"];
default_field = "field10.png";

const slot_field = window.document.querySelector("#settings").querySelector(".field_select").querySelector(".slot_field");

// fieldsStyles.map(field => {
//     button = window.document.createElement("input");
//     button.setAttribute("type", "radio");
//     button.setAttribute("name", "field");
//     button.className = "slot";
//     button.setAttribute("onclick", `changeChessField("${field}")`);
//     button.style.backgroundImage = `url(img/${field})`
//     if (field = default_field) {
//         button.checked = true;
//     }
//     slot_field.appendChild(button);
// })

Object.values(userOptionalRights).map(i => {
    if (i[3] === "checkbox") {
        let checkbox_section = window.document.createElement("div");
        checkbox_section.classList.add("checkbox_section");

        let h3 = window.document.createElement("h3");
        h3.innerHTML = i[1];

        let checkbox_place = window.document.createElement("div");
        checkbox_place.classList.add("checkbox_place");

        let input = window.document.createElement("input");
        if (i[0]) {
            input.setAttribute("checked", true)
            input.classList.add("active");
        }
        input.classList.add("settings_checkbox");
        input.setAttribute("type", "checkbox");
        input.setAttribute("response", i[2]);

        input.addEventListener("change", settings_navigator);

        checkbox_place.appendChild(input);

        checkbox_section.appendChild(h3);
        checkbox_section.appendChild(checkbox_place);

        let settings = window.document.querySelector("#settings");

        settings.insertBefore(checkbox_section, settings.querySelector(".footer"));
    } else if (i[3] === "color_picker") {
        let color_picker_section = window.document.createElement("div");
        color_picker_section.classList.add("color_picker_section");

        let h3 = window.document.createElement("h3");
        h3.innerHTML = i[1];

        let color_picker_place = window.document.createElement("div");
        color_picker_place.classList.add("color_picker_place");

        let input = window.document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("response", i[2]);
        input.setAttribute("color", i[0]);
        input.style.backgroundColor = i[0];

        let alpha = window.document.createElement("div");
        alpha.classList.add("alpha");

        input.addEventListener("click", settings_navigator);

        color_picker_place.appendChild(alpha);
        color_picker_place.appendChild(input);

        let color_picker_menu = window.document.createElement("div");
        color_picker_menu.classList.add("color_picker_menu");

        let red_section = window.document.createElement("div");
        red_section.classList.add("red_section");
        red_section.classList.add("section");

        let red_line = window.document.createElement("input");
        red_line.setAttribute("type", "range");
        red_line.setAttribute("min", 0);
        red_line.setAttribute("max", 255);
        red_line.classList.add("red_line");

        red_section.appendChild(red_line);

        let green_section = window.document.createElement("div");
        green_section.classList.add("green_section");
        green_section.classList.add("section");

        let green_line = window.document.createElement("input");
        green_line.setAttribute("type", "range");
        green_line.setAttribute("min", 0);
        green_line.setAttribute("max", 255);
        green_line.classList.add("green_line");

        green_section.appendChild(green_line);

        let blue_section = window.document.createElement("div");
        blue_section.classList.add("blue_section");
        blue_section.classList.add("section");

        let blue_line = window.document.createElement("input");
        blue_line.setAttribute("type", "range");
        blue_line.setAttribute("min", 0);
        blue_line.setAttribute("max", 255);
        blue_line.classList.add("blue_line");

        blue_section.appendChild(blue_line);

        let alpha_section = window.document.createElement("div");
        alpha_section.classList.add("alpha_section");
        alpha_section.classList.add("section");

        let alpha_line = window.document.createElement("input");
        alpha_line.setAttribute("type", "range");
        alpha_line.setAttribute("min", 0);
        alpha_line.setAttribute("max", 100);
        alpha_line.classList.add("alpha_line");

        alpha_section.appendChild(alpha_line);

        red_section.addEventListener("change", settings_color_picker_line);
        green_section.addEventListener("change", settings_color_picker_line);
        blue_section.addEventListener("change", settings_color_picker_line);
        alpha_section.addEventListener("change", settings_color_picker_line);

        red_line.setAttribute("response", i[2]);
        green_line.setAttribute("response", i[2]);
        blue_line.setAttribute("response", i[2]);
        alpha_line.setAttribute("response", i[2]);

        let RGBColor = HEXToRGB(i[0]);
        red_line.value = RGBColor.r;
        green_line.value = RGBColor.g;
        blue_line.value = RGBColor.b;
        alpha_line.value = RGBColor.a;

        color_picker_menu.appendChild(red_section);
        color_picker_menu.appendChild(green_section);
        color_picker_menu.appendChild(blue_section);
        color_picker_menu.appendChild(alpha_section);

        color_picker_section.appendChild(h3);
        color_picker_section.appendChild(color_picker_menu);
        color_picker_section.appendChild(color_picker_place);

        let settings = window.document.querySelector("#settings");
        settings.insertBefore(color_picker_section, settings.querySelector(".footer"));
    }
})

attension_window.querySelectorAll(".color_picker_section").forEach((section) => {
    if (parseInt(getComputedStyle(section.querySelector("h3")).height) > 40) {
        section.style.height = String(parseInt(getComputedStyle(section.querySelector("h3")).height)) + "px";
    } else {
        section.style.height = "40px";
    }
})

window.addEventListener("resize", setHeigthColorPickerSection);

function addQuitListenerAttension() {
    attension.querySelector('.quit').addEventListener("click", attensionCencel);
    attension.querySelector('.quit').style.cursor = "pointer";
}

function callAttensionStandart(title) {
    attensionCencel();
    attension.style.display = "flex";
    attension_standart.style.display = "flex";
    attension_standart.getElementsByTagName("h2")[0].innerHTML = title;  
    setTimeout(addQuitListenerAttension, 500);
}

function callAttensionQuestion(title, left_buttton, right_button) {
    attensionCencel();
    attension.style.display = "flex";
    attension_question.style.display = "flex";
    attension_question.getElementsByTagName("h2")[0].innerHTML = title;  
    let buttons = attension_question.getElementsByTagName("button");
    buttons[0].innerHTML = left_buttton;
    buttons[1].innerHTML = right_button;
}

function callProfileEdit() {
    attensionCencel();
    attension.style.display = "flex";
    edit_profile.style.display = "flex";
    edit_profile.querySelector("#input_nickname").value = private_accaunt_data.nickname;
    edit_profile.querySelector(".counter-nickname").setAttribute("string", private_accaunt_data.nickname.length + "/" + public_server_values.max_user_nickname_length);

    edit_profile.querySelector("#input_login").value = private_accaunt_data.login;
    edit_profile.querySelector("#locked_login").innerHTML = private_accaunt_data.login;
    edit_profile.querySelector(".counter-login").setAttribute("string", private_accaunt_data.login.length + "/" + public_server_values.max_user_login_length);

    edit_profile.querySelector("#input_password").value = private_accaunt_data.password;
    edit_profile.querySelector("#locked_password").innerHTML = private_accaunt_data.password;
    edit_profile.querySelector(".counter-password").setAttribute("string", private_accaunt_data.password.length + "/" + public_server_values.max_user_password_length);

    edit_profile.querySelector("#input_about").value = private_accaunt_data.about;
    edit_profile.querySelector(".counter-about").setAttribute("string", private_accaunt_data.about.length + "/" + public_server_values.max_user_about_length);

    let locked_password_string = "";
    for (let i = 0; i < private_accaunt_data.password.length; i++) {
        locked_password_string += "•";
    }
    locked_password.innerHTML = locked_password_string;
    
    setTimeout(addQuitListenerAttension, 500);
}

function callSettings() {
    attensionCencel();
    attension.style.display = "flex";
    settings.style.display = "flex";
    setTimeout(addQuitListenerAttension, 500);
}

function callPieceWheel(pieces) {
    attensionCencel();
    attension.style.display = "flex";

    attension_window.style.borderRadius = "100%";
    attension_window.style.height = "60vh";
    attension_window.style.width = "60vh";
    attension_window.style.overflow = "visible";
    attension_window.style.padding = "40px";
    attension_window.style.backgroundImage = "url(img/bgheader.png)";

    Object.values(figure_select_wheel.querySelectorAll(".slot")).forEach((slot, i) => {
        slot.classList.remove("bq");
        slot.classList.remove("bc");
        slot.classList.remove("bb");
        slot.classList.remove("bn");
        slot.classList.remove("bk");
        slot.classList.remove("bp");
        slot.classList.remove("wq");
        slot.classList.remove("wc");
        slot.classList.remove("wb");
        slot.classList.remove("wn");
        slot.classList.remove("wk");
        slot.classList.remove("wp");
        slot.classList.add(pieces[i]);
        slot.addEventListener("click", pieceWheelPick);
    })

    figure_select_wheel.style.display = "flex";
    window.addEventListener("mousemove", arrowFollowPointer);
    setTimeout(addQuitListenerAttension, 500);
}

function pieceWheelPick(event) {
    console.log("CLASSLIST: ", Array.from(event.target.classList));
    let class_list_array = Array.from(event.target.classList);

    if (class_list_array.includes("wp")) {
        pickFigure("wp");
    } else if (class_list_array.includes("bp")) {
        pickFigure("bp");
    } else if (class_list_array.includes("wk")) {
        pickFigure("wk");
    } else if (class_list_array.includes("bk")) {
        pickFigure("bk");
    } else if (class_list_array.includes("wq")) {
        pickFigure("wq");
    } else if (class_list_array.includes("bq")) {
        pickFigure("bq");
    } else if (class_list_array.includes("wn")) {
        pickFigure("wn");
    } else if (class_list_array.includes("bn")) {
        pickFigure("bn");
    } else if (class_list_array.includes("wc")) {
        pickFigure("wc");
    } else if (class_list_array.includes("bc")) {
        pickFigure("bc");
    } else if (class_list_array.includes("wb")) {
        pickFigure("wb");
    } else if (class_list_array.includes("bb")) {
        pickFigure("bb");
    }

    // userRights.canMoveFigure = true;
    window.removeEventListener("mousemove", arrowFollowPointer);
    
    attensionCencel();
}

function arrowFollowPointer(event) {
    let width = window.innerWidth / 2 - parseInt(mouse_pos.x_vp);
    let height = window.innerHeight / 2 - parseInt(mouse_pos.y_vp);
    let rotate = Math.atan(height / width) * 180 / Math.PI;
    if (width < 0) {
        pick_piece_arrow.style.transform = "rotate(" + String(rotate) + "deg)";
    } else {
        pick_piece_arrow.style.transform = "rotate(" + String(rotate + 180) + "deg)";
    }
    pick_piece_gear1.style.transform = "rotate(" + String(rotate + 22,5) + "deg)";
    pick_piece_gear2.style.transform = "rotate(" + String(360 - rotate) + "deg)";
    // console.log(String(Math.atan(height / width) * 180 / Math.PI));
}

function callGameEndInfo(title, description, elo) {
    attensionCencel();
    attension.style.display = "flex";
    game_end_info.style.display = "flex";
    game_end_info.querySelector(".title").innerHTML = title;
    game_end_info.querySelector(".description").innerHTML = description;
    game_end_info.querySelector(".elo").innerHTML = elo;
    setTimeout(addQuitListenerAttension, 500);
}

function attensionCencel() {
    attension.style.display = "none";
    attension_standart.style.display = "none";

    edit_profile.style.display = "none";
    edit_profile.querySelector("#save_error_message").style.display = "none";
    clearInputFile(input_avatar);

    attension_question.style.display = "none";
    settings.style.display = "none";
    figure_select_wheel.style.display = "none";
    game_end_info.style.display = "none";

    attension_window.style.borderRadius = "";
    attension_window.style.height = "";
    attension_window.style.width = "";
    attension_window.style.overflow = "";
    attension_window.style.padding = "";
    attension_window.style.backgroundImage = "";

    attension.querySelector('.quit').removeEventListener("click", attensionCencel);
    attension.querySelector('.quit').style.cursor = "";
}

function clearInputFile(f){
    if(f.value){
        try{
            f.value = ''; //for IE11, latest Chrome/Firefox/Opera...
        }catch(err){ }
        if(f.value){ //for IE5 ~ IE10
            var form = document.createElement('form'),
                parentNode = f.parentNode, ref = f.nextSibling;
            form.appendChild(f);
            form.reset();
            parentNode.insertBefore(f,ref);
        }
    }
}

function OpenCloseSwitch(placement, heigth) {
    let whereHTML = window.document.getElementById(placement);
    if (whereHTML.getElementsByClassName("OpenClose")[0].checked) {
        whereHTML.getElementsByClassName("slot_field")[0].style.maxHeight = String(heigth) + "px";
        whereHTML.getElementsByClassName("slot_field")[0].style.overflowClipMargin = "content-box";
    } else {
        whereHTML.getElementsByClassName("slot_field")[0].style.maxHeight = "";
        whereHTML.getElementsByClassName("slot_field")[0].style.overflowClipMargin = "";
    }
}

function settings_navigator(event) {
    if (userOptionalRights[event.target.getAttribute("response")][3] === "checkbox") {
        settings_checkbox(event);
    } else if (userOptionalRights[event.target.getAttribute("response")][3] === "color_picker") {
        settings_color_picker(event);
    }
}

function settings_checkbox(event) {
    switch (event.target.getAttribute("response")) {
        case "visible_moves":
            userOptionalRights.visible_moves[0] = (event.target.checked ? true : false);
        break;
        case "visible_beat_moves":
            userOptionalRights.visible_beat_moves[0] = (event.target.checked ? true : false);
        break;
        case "visible_double_jump":
            userOptionalRights.visible_double_jump[0] = (event.target.checked ? true : false);
            if (event.target.checked) {
                showPawnStep();
            } else {
                unshowPawnStep();
            }
        break;
        case "visible_turn":
            userOptionalRights.visible_turn[0] = (event.target.checked ? true : false);
        break;
    }
    if (event.target.checked) {
        event.target.classList.add("active");
    } else {
        event.target.classList.remove("active");
    }
}

function settings_color_picker(event) {
    if (event.target.checked) {
        if (settings_current_opend_color_picker !== undefined && event.target.parentElement.parentElement !== settings_current_opend_color_picker) {
            settings_current_opend_color_picker.querySelector(".color_picker_place").querySelector("input").checked = false;
            settings_close_color_picker(settings_current_opend_color_picker);
        }
        let section = event.target.parentElement.parentElement;
        settings_current_opend_color_picker = section;
        settings_open_color_picker(section);
    } else {
        let section = event.target.parentElement.parentElement;
        settings_close_color_picker(section);
        settings_current_opend_color_picker = undefined;
    }
}

function settings_open_color_picker(section) {
    // if (parseInt(section.querySelector("h3").height) > 20) {
    //     section.style.height = section.querySelector("h3").height;
    // } else {
    //     section.style.height = "40px";
    // }
    section.querySelector("h3").style.display = "none";
    section.querySelector(".color_picker_menu").style.visibility = "visible";
    section.querySelector(".color_picker_menu").style.opacity = "1";
    settings_current_opend_color_picker = section;
    section.querySelector(".color_picker_place").classList.add("opend");  
    section.style.height = String(section.querySelector(".color_picker_menu").scrollHeight * 2 - parseInt(getComputedStyle(section.querySelector(".color_picker_menu")).height)) + "px";
}

function settings_close_color_picker(section) {
    section.querySelector(".color_picker_place").style.maxWidth = getComputedStyle(section.querySelector(".color_picker_place")).width;
    section.querySelector("h3").style.display = "block";
    section.querySelector(".color_picker_menu").style.visibility = "hidden";
    section.querySelector(".color_picker_menu").style.opacity = "0";
    section.querySelector(".color_picker_place").classList.remove("opend");  

    // setTimeout(function() {
    //     if (parseInt(getComputedStyle(section.querySelector("h3")).height) > 30) {
    //         section.style.height = String(parseInt(getComputedStyle(section.querySelector("h3")).height)) + "px";
    //     } else {
    //         section.style.height = "40px";
    //     }
    // }, 200)

    if (parseInt(getComputedStyle(section.querySelector("h3")).height) > 40) {
        section.style.height = String(parseInt(getComputedStyle(section.querySelector("h3")).height)) + "px";
    } else {
        section.style.height = "40px";
    }
}

function setHeigthColorPickerSection(event) {
    window.document.querySelector(".window").querySelectorAll(".color_picker_section").forEach((section) => {
        if (parseInt(getComputedStyle(section.querySelector("h3")).height) > 40) {
            section.style.height = String(parseInt(getComputedStyle(section.querySelector("h3")).height)) + "px";
        } else {
            section.style.height = "40px";
        }
    })
}

function settings_color_picker_line(event) {
    current_value = parseInt(event.target.value);
    
    Object.values(event.target.classList).forEach(i => {
        let indexes = 0;
        let alpha = false;
        
        if (i === "red_line") {
            indexes = [1, 2];
        } else if (i === "green_line") {
            indexes = [3, 4];
        } else if (i === "blue_line") {
            indexes = [5, 6];
        } else if (i === "alpha_line") {
            indexes = [7, 8];
            alpha = true
        }

        if (indexes !== 0) {
            userOptionalRights[event.target.getAttribute("response")][0] = characterReplace(indexes[0], userOptionalRights[event.target.getAttribute("response")][0], (alpha ? valueToHEXAlpha(current_value)[0] : valueToHEX(current_value)[0]));
            userOptionalRights[event.target.getAttribute("response")][0] = characterReplace(indexes[1], userOptionalRights[event.target.getAttribute("response")][0], (alpha ? valueToHEXAlpha(current_value)[1] : valueToHEX(current_value)[1]));
            let button = event.target.parentElement.parentElement.parentElement.querySelector(".color_picker_place").querySelector("input");
            button.style.backgroundColor = userOptionalRights[event.target.getAttribute("response")][0];
            button.setAttribute("color", userOptionalRights[event.target.getAttribute("response")][0]);
            indexes = 0;
            alpha = false;
            return 0;
        }
    })
}

function valueToHEX(value) {
    if (value > 16) {
        return value.toString(16);
    } else {
        return "0" + value.toString(16);
    }
}

function valueToHEXAlpha(value) {
    value = value*255/100
    if (value > 16) {
        return value.toString(16);
    } else {
        return "0" + value.toString(16);
    }
}

function HEXToRGB(hexCode) {
    opacity = hexCode[7] + hexCode[8];
    let hex = hexCode.replace('#', '');
    
    if (hex.length === 3) {
        hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
    }    
    
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    if (opacity > 1 && opacity <= 100) {
        opacity = opacity / 100;   
    }

    return {
        r: r,
        g: g,
        b: b,
        a: opacity * 100
    }
}

edit_profile.querySelector(".close_button").addEventListener("click", (event) => {
    attensionCencel();
})

edit_profile.querySelector(".save_button").addEventListener("click", async (event) => {
    console.log("AVA: ", input_avatar.files[0]);
    let response = await fetch("/mekanism/update_accaunt_data", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nickname: input_nickname.value,
            login: input_login.value,
            password: input_password.value,
            about: input_about.value,
        }),
    });
    response = await response.json();

    let response_avatar = null;
    if (input_avatar.files.length !== 0) {
        let avatar_file = input_avatar.files[0];
        let form_data = new FormData();
        form_data.append('file', avatar_file);
        response_avatar = await fetch("/mekanism/update_accaunt_avatar", {
            method: "POST",
            body: form_data,
        });
        response_avatar = await response_avatar.json();
    }

    await initPrivateAccauntData();
    if (response[0]) {
        window.document.querySelectorAll(".user-nickname").forEach((i) => {
            i.innerHTML = private_accaunt_data.nickname;
        })
        debugger;
        if (response_avatar === null) {
            attensionCencel();
            window.document.querySelectorAll(".user-avatar").forEach((element) => {
                element.style.backgroundImage = "url('../img/avatars/" + response_avatar[1] + "')";
            })
        } else {
            if (response_avatar[0]) {
                attensionCencel();
                window.document.querySelectorAll(".user-avatar").forEach((element) => {
                    element.style.backgroundImage = "url('../img/avatars/" + response_avatar[1] + "')";
                })
            } else {
                callErrorMessage(edit_profile.querySelector("#save_error_message"), response_avatar[1]);
            }
        }
    } else {
        callErrorMessage(edit_profile.querySelector("#save_error_message"), response[1]);
    }
})

window.document.querySelectorAll(".exit_accaunt_button").forEach((i) => {
    i.addEventListener("click", exit_accaunt);
})

function callErrorMessage(DOM_object, string) {
    DOM_object.style.display = "block";
    DOM_object.innerHTML = string;
}

function uncallErrorMessage(DOM_object) {
    DOM_object.style.display = "none";
    DOM_object.innerHTML = "";
}

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
const input_avatar = window.document.querySelector("#input_avatar");

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