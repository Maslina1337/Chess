let alertLebel = window.document.getElementById('alert');

function copyToClipboard(event) {
    debugger;
    navigator.clipboard.writeText(event.currentTarget.querySelector("strong").innerHTML);
    showAlertLable("Номер скопирован в буфер обмена.", 3000);
}

function showAlertLable(text, time) {
    alertLebel.querySelector("p").innerHTML = text;
    alertLebel.style.translate = "0 0";
    alertLebel.style.opacity = 1;
    setTimeout(closeAlertLable, time);
}

function closeAlertLable() {
    alertLebel.style.translate = "0 -100px";
    alertLebel.style.opacity = 0;
}

window.document.querySelectorAll(".number").forEach((i) => {
    i.addEventListener("click", copyToClipboard);
});