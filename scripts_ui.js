let profile1 = {
    name: "Michael Jackson",
    elo: "325",
    about: "Im real MJ.",
    password: "13572468",
    mail: "skurat12051983@gmail.com",
    number: "+375336561591"
}

default_field = "field10.png";

let fieldsStyles = ["field00.png","field01.png","field02.png","field03.png","field04.png","field05.png","field06.png","field07.png","field08.png","field09.png","field10.png"];

function callAttensionStandart(title) {
    attensionCencel();
    window.document.getElementById("attension").style.display = "flex";
    let attension_standart = window.document.getElementById("attension_standart")
    attension_standart.style.display = "flex";
    attension_standart.getElementsByTagName("h2")[0].innerHTML = title;  
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
    window.document.getElementById("attension").style.display = "flex";
    let edit_profile = window.document.getElementById("edit_profile")
    edit_profile.style.display = "flex";
    edit_profile.getElementsByClassName("name_input")[0].value = profile.name;
    let counter = edit_profile.getElementsByClassName("name_form")[0].getElementsByClassName("counter")[0];
    counter.setAttribute("string", String(edit_profile.getElementsByClassName("name_input")[0].value.length + "/20"));
    //edit_profile.getElementsByClassName("counter")[0].innerHTML = profile.name.length;
    edit_profile.getElementsByClassName("mail_input")[0].value = profile.mail; 
    edit_profile.getElementsByClassName("about_input")[0].value = profile.about;
}

function callSettings() {
    attensionCencel();
    window.document.getElementById("attension").style.display = "flex";
    let settings = window.document.getElementById("settings")
    settings.style.display = "flex";
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

function attensionCencel() {
    window.document.getElementById("attension").style.display = "none";
    window.document.getElementById("attension_standart").style.display = "none";
    window.document.getElementById("edit_profile").style.display = "none";
    window.document.getElementById("edit_profile").getElementsByClassName("error")[0].style.display = "none";
    window.document.getElementById("attension_question").style.display = "none";
    window.document.getElementById("settings").style.display = "none";
    window.document.getElementById("edit_icon_scale_position").style.display = "none";
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

function changeChessField(field) {
    window.document.getElementById("chess_field").style.backgroundImage = "url(img/" + field + ")";
}

function iconUpload(inputBox) {
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

profileInteract(".name", "name", profile1);
profileInteract(".elo", "elo", profile1);
profileInteract(".about", "about", profile1);
