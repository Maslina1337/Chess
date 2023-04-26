let dragged_element;

let figure = window.document.querySelectorAll(".figure");
figure = Array.from(figure);
figure.map((f) => {
    f.addEventListener('dragstart', (event) => {
        // console.log(event);
        dragged_element = f;
        // console.log(dragged_element);
    });
});

let place_drop = window.document.querySelectorAll(".place");
place_drop = Array.from(place_drop);
place_drop.map((pd) => {
    pd.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    pd.addEventListener('drop', (event) => {
        pd.prepend(dragged_element);
    });
});




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
    // debugger;

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
        right_click_menu.style.borderTopRightRadius = "0px";
    } else if (isBothSidesAreFull[0] && !isBothSidesAreFull[1]) {
        right_click_menu.style.borderBottomLeftRadius = "0px";
    } else if (!isBothSidesAreFull[0] && !isBothSidesAreFull[1]) {
        right_click_menu.style.borderTopLeftRadius = "0px";
    }
}

figure.map((f) => {
    f.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        callRightClickMenu(test);
    })
});

window.addEventListener("mousemove", (event) => {
    mouse_pos.y = String(event.clientY) + "px";
    mouse_pos.x = String(event.clientX) + "px";
});

window.document.addEventListener("click", (event) => {
    right_click_menu.style.display = "none";
    // right_click_menu.style.display = "none";
});

right_click_menu.addEventListener("click", (event) => {
    // right_click_menu.style.display = "none";
});