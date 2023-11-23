let alpha_section = window.document.createElement("div");
        alpha_section.classList.add("alpha_section");
        alpha_section.classList.add("section");

        let alpha_line = window.document.createElement("input");
        alpha_line.setAttribute("type", "range");
        alpha_line.classList.add("alpha_line");

        let alpha_number = window.document.createElement("input");
        alpha_number.setAttribute("type", "number");
        alpha_number.classList.add("alpha_number");

        alpha_section.appendChild(alpha_line);
        alpha_section.appendChild(alpha_number);