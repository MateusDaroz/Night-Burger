function increaseAmount(element){
    newValue = parseInt(element.previousElementSibling.value) + 1;
    newValue > 10 ? element.previousElementSibling.value = 10 : element.previousElementSibling.value = newValue;
}

function decreaseAmount(element){
    newValue = parseInt(element.nextElementSibling.value) - 1;
    newValue < 0 ? element.nextElementSibling.value = 0 : element.nextElementSibling.value = newValue;
}