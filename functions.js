document.addEventListener("DOMContentLoaded", () => {
    const screen = document.getElementById("screen_value");
    const buttons = document.querySelectorAll(".btn");
    let currentValue = "";

    buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
            updateScreen(event.target.textContent);
        });
    });

    function updateScreen(value) {
        currentValue += value;
        screen.textContent = currentValue;
    }
});
