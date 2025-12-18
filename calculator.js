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

    function tokenizer() {
        return currentValue.match(/\d+(\.\d+)?|[+\-*/%]/g);
    }

    function evaluate(operation) {
        let i = 0;

        while (i < operation.length) {
            if (
                operation[i] === "*" ||
                operation[i] === "/" ||
                operation[i] === "%"
            ) {
                const a = Number(operation[i - 1]);
                const b = Number(operation[i + 1]);
                let result;

                if (operation[i] === "*") result = a * b;
                if (operation[i] === "/") {
                    if (b == 0) {
                        throw new Error("Cannot be divided by zero");
                    }
                    result = a / b;
                }
                if (operation[i] === "%") result = a % b;

                operation.splice(i - 1, 3, result);
                i = 0;
            } else {
                i++;
            }
        }

        let j = 0;

        while (j < operation.length) {
            if (operation[j] === "+" || operation[j] === "-") {
                const a = Number(operation[j - 1]);
                const b = Number(operation[j + 1]);
                const result = operation[j] === "+" ? a + b : a - b;

                operation.splice(j - 1, 3, result);
                j = 0;
            } else {
                j++;
            }
        }
        return operation[0];
    }

    function calculate() {
        try {
            const tokens = tokenizer(currentValue);
            const result = evaluate(tokens);
            currentValue = result.toString();
            screen.textContent = currentValue;
        } catch (error) {
            screen.textContent = error;
            currentValue = "";
        }
    }

    function validateOp(op) {
        return /\d$/.test(op);
    }
});
