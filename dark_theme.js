function checkDarkMode() {
    if (localStorage.getItem("isDarkMode") === "true") {
        window.document.body.classList.add("dark-mode");
        localStorage.isDarkMode = true;

        let buttonCircle = window.document.getElementById("buttonCircle");
        buttonCircle.style.transform = "translate(2em) scale(1.2)"

        let darkButton = window.document.getElementById("darkButton");
        darkButton.setAttribute("onclick", "switchToLight()");
    } else {
        window.document.body.classList.remove("dark-mode");
        localStorage.isDarkMode = false;
    }
}

function switchToDark() {
    let buttonCircle = window.document.getElementById("buttonCircle");
    buttonCircle.style.transform = "translate(2em) scale(1.2)"

    let darkButton = window.document.getElementById("darkButton");
    darkButton.setAttribute("onclick", "switchToLight()");

    let body = window.document.body;
    body.classList.toggle("dark-mode");

    localStorage.setItem("isDarkMode", true);
}

function switchToLight() {
    let buttonCircle = window.document.getElementById("buttonCircle");
    buttonCircle.style.transform = "translate(0) scale(1.2)"

    let darkButton = window.document.getElementById("darkButton");
    darkButton.setAttribute("onclick", "switchToDark()");

    let body = window.document.body;
    body.classList.toggle("dark-mode");

    localStorage.setItem("isDarkMode", false);
}

checkDarkMode();