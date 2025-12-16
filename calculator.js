document.addEventListener("DOMContentLoaded", () => {
    const screen = document.getElementById("screen_value");
    const buttons = document.querySelectorAll(".btn");
    const equals = document.querySelector(".equals");
    const reset = document.querySelector(".reset");
    const back = document.querySelector(".dlt");
    let currentValue = "";

    buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
            updateScreen(event.target.dataset.value);
        });
    });

    equals.addEventListener("click", () => {
        calculate(currentValue);
    });

    reset.addEventListener("click", () => {
        currentValue = "";
        screen.innerHTML = 0;
    });

    back.addEventListener("click", () => {
        currentValue = currentValue.slice(0, -1);
        screen.textContent = currentValue;
    });

    function updateScreen(value) {
        currentValue += value;
        screen.textContent = currentValue;
    }

    function calculate(op) {
        if (validateOp(op)) {
            currentValue = eval(op).toString();
            screen.textContent = currentValue;
            console.log("El resultado es: " + op);
        }
    }

    function validateOp(op) {
        return /\d$/.test(op);
    }
});
