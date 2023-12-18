let pick_piece_arrow = window.document.getElementById("arrow");
let pick_piece_gear1 = window.document.getElementById("gear1");
let pick_piece_gear2 = window.document.getElementById("gear2");

let fieldsStyles = ["field00.png","field01.png","field02.png","field03.png","field04.png","field05.png","field06.png","field07.png","field08.png","field09.png","field10.png"];
default_field = "field10.png";

let slot_field = window.document.getElementById("settings").getElementsByClassName("field_select")[0].getElementsByClassName("slot_field")[0];
fieldsStyles.map(field => {
    button = window.document.createElement("input");
    button.setAttribute("type", "radio");
    button.setAttribute("name", "field");
    button.className = "slot";
    button.setAttribute("onclick", `changeChessField("${field}")`);
    button.style.backgroundImage = `url(img/${field})`
    if (field = default_field) {
        button.checked = true;
    }
    slot_field.appendChild(button);
})

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

        debugger;

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

window.document.querySelector(".window").querySelectorAll(".color_picker_section").forEach((section) => {
    if (parseInt(getComputedStyle(section.querySelector("h3")).height) > 40) {
        section.style.height = String(parseInt(getComputedStyle(section.querySelector("h3")).height)) + "px";
    } else {
        section.style.height = "40px";
    }
})

window.addEventListener("resize", setHeigthColorPickerSection);

function addQuitListenerAttension() {
    window.document.getElementById("attension").querySelector('.quit').addEventListener("click", attensionCencel);
}

function callAttensionStandart(title) {
    attensionCencel();
    let attension = window.document.getElementById("attension");
    attension.style.display = "flex";
    let attension_standart = window.document.getElementById("attension_standart")
    attension_standart.style.display = "flex";
    attension_standart.getElementsByTagName("h2")[0].innerHTML = title;  
    setTimeout(addQuitListenerAttension, 1000);
}

function callAttensionQuestion(title, left_buttton, right_button) {
    attensionCencel();
    window.document.getElementById("attension").style.display = "flex";
    let attension_question = window.document.getElementById("attension_question")
    attension_question.style.display = "flex";
    attension_question.getElementsByTagName("h2")[0].innerHTML = title;  
    let buttons = attension_question.getElementsByTagName("button");
    buttons[0].innerHTML = left_buttton;
    buttons[1].innerHTML = right_button;
}

function callProfileEdit(profile) {
    attensionCencel();
    let attension = window.document.getElementById("attension");
    attension.style.display = "flex";
    let edit_profile = window.document.getElementById("edit_profile")
    edit_profile.style.display = "flex";
    edit_profile.getElementsByClassName("name_input")[0].value = profile.name;
    let counter = edit_profile.getElementsByClassName("name_form")[0].getElementsByClassName("counter")[0];
    counter.setAttribute("string", String(edit_profile.getElementsByClassName("name_input")[0].value.length + "/20"));
    //edit_profile.getElementsByClassName("counter")[0].innerHTML = profile.name.length;
    edit_profile.getElementsByClassName("mail_input")[0].value = profile.mail; 
    edit_profile.getElementsByClassName("about_input")[0].value = profile.about;
    setTimeout(addQuitListenerAttension, 1000);
}

function callSettings() {
    attensionCencel();
    let attension = window.document.getElementById("attension");
    attension.style.display = "flex";
    let settings = window.document.getElementById("settings")
    settings.style.display = "flex";
    debugger;
    setTimeout(addQuitListenerAttension, 1000);
}

function callPieceWheel() {
    if (userRights.canPickPiece) {
        userRights.canMoveFigure = false;
        attensionCencel();
        debugger;
        let attension = window.document.getElementById("attension");
        attension.style.display = "flex";
        let attension_window = attension.getElementsByClassName("window")[0];
        attension_window.style.borderRadius = "100%";
        attension_window.style.height = "60vh";
        attension_window.style.width = "60vh";
        attension_window.style.overflow = "visible";
        attension_window.style.padding = "40px";
        attension_window.style.backgroundImage = "url(img/bgheader.png)";
        let figure_select_wheel = window.document.getElementById("figure_select_wheel");
        default_pieces_wheel = 0;
        if (turn === "white") {
            default_pieces_wheel = ["bq", "bc", "bb", "bn"];
        } else {
            default_pieces_wheel = ["wq", "wc", "wb", "wn"];
        }
        Object.values(figure_select_wheel.getElementsByClassName("slot")).map((e, i) => {
            e.classList.remove("bq");
            e.classList.remove("bc");
            e.classList.remove("bb");
            e.classList.remove("bn");
            e.classList.remove("wq");
            e.classList.remove("wc");
            e.classList.remove("wb");
            e.classList.remove("wn");
            e.classList.add(default_pieces_wheel[i]);
            e.addEventListener("click", pieceWheelPick);
        })
        figure_select_wheel.style.display = "flex";
        window.addEventListener("mousemove", arrowFollowPointer);
    }
}

function pieceWheelPick(event) {
    let valid = false;
    if (String(event.target.classList).includes("up-left-slot")) {
        chessField[userRights.canPickPiece[0]][userRights.canPickPiece[1]] = default_pieces_wheel[0];
        valid = true;
    } else if (String(event.target.classList).includes("up-right-slot")) {
        chessField[userRights.canPickPiece[0]][userRights.canPickPiece[1]] = default_pieces_wheel[1];
        valid = true;
    } else if (String(event.target.classList).includes("down-left-slot")) {
        chessField[userRights.canPickPiece[0]][userRights.canPickPiece[1]] = default_pieces_wheel[2];
        valid = true;
    } else if (String(event.target.classList).includes("down-right-slot")) {
        chessField[userRights.canPickPiece[0]][userRights.canPickPiece[1]] = default_pieces_wheel[3];
        valid = true;
    }

    if (valid) {
        default_pieces_wheel = undefined;
        userRights.canMoveFigure = true;
        window.removeEventListener("mousemove", arrowFollowPointer);

        let attension = window.document.getElementById("attension");
        let attension_window = attension.getElementsByClassName("window")[0];
        attension_window.style.borderRadius = "";
        attension_window.style.height = "";
        attension_window.style.width = "";
        attension_window.style.overflow = "";
        attension_window.style.padding = "";
        attension_window.style.backgroundImage = "";

        attensionCencel();
        arrangeFigures();
    }
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

function attensionCencel() {
    window.document.getElementById("attension").style.display = "none";
    window.document.getElementById("attension_standart").style.display = "none";
    window.document.getElementById("edit_profile").style.display = "none";
    window.document.getElementById("edit_profile").getElementsByClassName("error")[0].style.display = "none";
    window.document.getElementById("attension_question").style.display = "none";
    window.document.getElementById("settings").style.display = "none";
    window.document.getElementById("edit_icon_scale_position").style.display = "none";
    window.document.getElementById("figure_select_wheel").style.display = "none";
    window.document.getElementById("figure_select_wheel").style.display = "none";
    window.document.getElementById("attension").querySelector('.quit').removeEventListener("click", attensionCencel);
}

function saveProfileChanges(profile) {
    let edit_profile = window.document.getElementById("edit_profile")
    let name = edit_profile.getElementsByClassName("name_input")[0].value;
    let mail = edit_profile.getElementsByClassName("mail_input")[0].value;
    
    if (name === "") {
        let error = edit_profile.getElementsByClassName('error')[0];
        error.style.display = "block";
        error.innerHTML = "У вас что нет имени?";
        edit_profile.getElementsByClassName("name_input")[0].value = profile.name;
        let counter = edit_profile.getElementsByClassName("name_form")[0].getElementsByClassName("counter")[0];
        counter.setAttribute("string", String(edit_profile.getElementsByClassName("name_input")[0].value.length + "/20"));
        return 0;
    }
    if (mail === "") {
        let error = edit_profile.getElementsByClassName('error')[0];
        error.style.display = "block";
        error.innerHTML = "Нам категорически нужна ваша почта.";
        edit_profile.getElementsByClassName("mail_input")[0].value = profile.mail;
        return 0;
    }
    attensionCencel();
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
    debugger;
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
    debugger;
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

function iconUpload(inputBox) { // undone
    inputBox = window.document.getElementsByClassName(inputBox)[0];
    let input = inputBox.getElementsByTagName("input")[0];
    if (true) {
        console.log(input.files[0]);
        attensionCencel();
        window.document.getElementById("attension").style.display = "flex";
        let edit_icon_scale_position = window.document.getElementById('edit_icon_scale_position');
        edit_icon_scale_position.style.display = "flex";
        edit_icon_scale_position.getElementsByClassName('icon_change_field')[0].getElementsByTagName("img")[0].setAttribute("src", input.files[0])
    }
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