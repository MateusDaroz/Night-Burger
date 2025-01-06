const defaultValue = 28.99;

function updateTotal() {
    let total = defaultValue;

    document.querySelectorAll('.addon').forEach((addon) => {
        const amount = parseInt(addon.querySelector('input[type="number"]').value);
        const value = parseFloat(addon.querySelector('span').dataset.value);
        total += amount * value;
    });

    final_value = total * parseInt(document.getElementById("product-amount").value);
    document.getElementById("final-value").dataset.value = final_value.toFixed(2);
    document.getElementById("final-value").textContent = final_value.toFixed(2);
}

function increaseAmount(button) {
    const input = button.previousElementSibling;
    let currentValue = parseInt(input.value);

    if (currentValue < 10) {
        input.value = currentValue + 1;
        updateTotal();
    }
}

function decreaseAmount(button) {
    const input = button.nextElementSibling;
    let currentValue = parseInt(input.value);

    if (currentValue) {
        input.value = currentValue - 1;
        updateTotal();
    }
}

function decreaseQuantity(button) {
    const input = button.nextElementSibling;
    let currentValue = parseInt(input.value);

    if (currentValue > 1) {
        input.value = currentValue - 1;
        updateTotal();
    }
}

