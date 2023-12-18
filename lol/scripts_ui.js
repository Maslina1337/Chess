let profile1 = {
    name: "Michael Jackson",
    elo: "325",
    about: "Im real MJ.",
    password: "13572468",
    mail: "skurat12051983@gmail.com",
    number: "+375336561591"
}

let profile2 = {
    name: "Dog",
    elo: "999",
    about: ":):):):):):):):):):):):):):):):):):):):):):):):):):):):):):)",
    password: "578934563945",
    mail: "dogCoolDog@gmail.com",
    number: "+375336561592"
}

let settings_current_opend_color_picker = undefined;

let windowSize = [0, 0];

// function getWindowSize() {
//     windowSize[0] = getComputedStyle(window).width;
//     windowSize[1] = getComputedStyle(window).height;
// }

function setSizeChessSection() {
    let chess_field = window.document.querySelector("#chess_field");
    // let acheaveSize = String(parseInt(getComputedStyle(chess_field).height) - parseInt(getHeaderHeight())) + "px";
    let acheaveSize = "calc(100vmin - 92px - " + String(parseInt(getHeaderHeight())) + "px)";
    chess_field.style.height = acheaveSize;
    chess_field.style.width = acheaveSize;
}

function getHeaderHeight() {
    return getComputedStyle(window.document.querySelector("header")).height;
}

function profileInteract(className, value, profile) {
    window.document.querySelectorAll(className).forEach(element => {
        element.innerHTML = profile[value];
    })
}

function counterText(className, inputName, maxLength) {
    let main = window.document.getElementsByClassName(className)[0];
    let counter = main.getElementsByClassName("counter")[0];
    counter.setAttribute("string", String(main.getElementsByClassName(inputName)[0].value.length) + "/" + String(maxLength));
}

// function RowGridSwitch(where, stuff) {
//     debugger
//     let whereHTML = window.document.getElementById(where);
//     if (whereHTML.getElementsByClassName("header")[0].getElementsByClassName("radio")[0].getElementsByTagName('input')[0].checked) {
//         whereHTML.getElementsByClassName("slot_field")[0].style = "";
//         let computedHeigth = parseInt(getComputedStyle(whereHTML.getElementsByClassName("slot_field")[0].getElementsByClassName("slot")[0]).height);
//         whereHTML.getElementsByClassName("slot_field")[0].style.maxHeigth = String(computedHeigth + 12) + "px";
//     } else {
//         whereHTML.getElementsByClassName("slot_field")[0].style = "";
//         let computedWidth = parseInt(getComputedStyle(whereHTML.getElementsByClassName("slot_field")[0].getElementsByClassName("slot")[0]).width);
//         whereHTML.getElementsByClassName("slot_field")[0].style.maxWidth = String((computedWidth + 12) * 4) + "px";
//     }
// }

function changeChessField(field) {
    window.document.getElementById("chess_field").style.backgroundImage = "url(img/" + field + ")";
}

function compliteBeatenFigures(turn) {
    let beatenFigureField = (turn === "white" ? beatenFiguresBlack_value : beatenFiguresWhite_value);
    if (beatenFigureField !== null) {
        if ((turn === "white" ? beatenFiguresBlack.length : beatenFiguresWhite.length) === 1) {
            beatenFigureField.style.display = "flex";
            let slot = window.document.createElement("div");
            slot.classList.add("slot")
            slot.style.backgroundImage = "url(img/" + (turn === "white" ? beatenFiguresBlack[0] : beatenFiguresWhite[0]) + ".png)"; 
            beatenFigureField.appendChild(slot);
        } else {
            beatenFigureField.style.display = "flex";
            let slot = window.document.createElement("div");
            slot.classList.add("slot")
            slot.style.backgroundImage = "url(img/" + (turn === "white" ? beatenFiguresBlack[beatenFiguresBlack.length - 1] : beatenFiguresWhite[beatenFiguresWhite.length - 1]) + ".png)"; 
            beatenFigureField.appendChild(slot);
        }
    }
}

function callSpectateWarning() {
    let spectateModeWarning = window.document.getElementById("spectateModeWarning");
    spectateModeWarning.style.display = "flex";
    if (spectateModeWarning.getElementsByTagName("input")[0].checked) {
        spectateModeWarning.getElementsByTagName("p")[0].style.display = "none";
    } else {
        spectateModeWarning.getElementsByTagName("p")[0].style.display = "block";
    }
}

function uncallSpectateWarning() {
    window.document.getElementById("spectateModeWarning").style.display = "none";
}

function characterReplace(index, str, replace) {
    return str.substring(0, index) + replace + str.substring(index + 1, str.length);
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

function RightClickMenuEventAdd() {
    figure.map((f) => {                                             //context menu
        f.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            callRightClickMenu(test);
        })
    });
}




let test = [{type: "button", title: "call HI", function: "alert('hi')"}, {type: "button", title: "call HO", function: "alert('HO')"}];
const right_click_menu = window.document.getElementById("right_click_menu");
let mouse_pos = {
    x: "",
    y: ""
}

function callRightClickMenu(array) {
    right_click_menu.innerHTML = "";
    array.map((object) => {
        if (object.type === "button") {
            let button = window.document.createElement("button");
            button.innerHTML = object.title;
            button.addEventListener("click", (event) => {
                object.function;
                alert("it work");
            })
            right_click_menu.appendChild(button);
        }
    });
    right_click_menu.style = "";
    right_click_menu.style.display = "flex";
    
    // alert(getComputedStyle(right_click_menu).width);
    // alert(getComputedStyle(right_click_menu).height);
    // alert(window.innerWidth);
    // alert(window.innerHeight);
    // 

    let isBothSidesAreFull = [false, false];

    if (parseInt(getComputedStyle(right_click_menu).width) + parseInt(mouse_pos.x) > window.innerWidth) {
        right_click_menu.style.left = parseInt(mouse_pos.x) - parseInt(getComputedStyle(right_click_menu).width) + "px";
        isBothSidesAreFull[0] = true;
    } else {
        right_click_menu.style.left = mouse_pos.x;
    }
    
    if (parseInt(getComputedStyle(right_click_menu).height) + parseInt(mouse_pos.y) > window.innerHeight) {
        right_click_menu.style.top = parseInt(mouse_pos.y) - parseInt(getComputedStyle(right_click_menu).height) + "px";
        isBothSidesAreFull[1] = true;
    } else {
        right_click_menu.style.top = mouse_pos.y;
    }

    if (isBothSidesAreFull[0] && isBothSidesAreFull[1]) { //Не пашет
        right_click_menu.style.borderBottomRightRadius = "0px";
    } else if (!isBothSidesAreFull[0] && isBothSidesAreFull[1]) {
        right_click_menu.style.borderBottomLeftRadius = "0px";
    } else if (isBothSidesAreFull[0] && !isBothSidesAreFull[1]) {
        right_click_menu.style.borderTopRightRadius = "0px";
    } else if (!isBothSidesAreFull[0] && !isBothSidesAreFull[1]) {
        right_click_menu.style.borderTopLeftRadius = "0px";
    }
}

let beatenFiguresBlack_value = window.document.getElementById("beatenFiguresBlack");
let beatenFiguresWhite_value = window.document.getElementById("beatenFiguresWhite");

// beatenFiguresBlack_value.style.maxHeight = 0;
// beatenFiguresBlack_value.style.paddingTop = 0;
// beatenFiguresBlack_value.style.paddingBottom = 0;
beatenFiguresBlack_value.style.display = "none";

// beatenFiguresWhite_value.style.maxHeight = 0;
// beatenFiguresWhite_value.style.paddingTop = 0;
// beatenFiguresWhite_value.style.paddingBottom = 0;
beatenFiguresWhite_value.style.display = "none";

window.document.addEventListener("click", (event) => {
    right_click_menu.style.display = "none";
    // right_click_menu.style.display = "none";
});
    
window.document.getElementById("right_click_menu").addEventListener("contextmenu", (event) => {
    event.preventDefault();
})

window.addEventListener("mousemove", (event) => {
    mouse_pos.y = String(event.pageY) + "px";
    mouse_pos.x = String(event.pageX) + "px";
    mouse_pos.y_vp = String(event.clientY) + "px";
    mouse_pos.x_vp = String(event.clientX) + "px";
});

window.addEventListener("resize", setSizeChessSection);
// window.addEventListener("resize", getWindowSize);


// window.document.querySelector("settings").querySelector(".OpenClose").addEventListener("change", OpenCloseSwitch('field_select', 152));

profileInteract(".name", "name", profile1);
profileInteract(".elo", "elo", profile1);
profileInteract(".about", "about", profile1);

setSizeChessSection();
// OpenCloseSwitch('field_select', 152);