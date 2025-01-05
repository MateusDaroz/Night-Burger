let default_value = 28.99;
let actual_value = parseFloat(document.getElementById("final-value").innerHTML);

function increaseAmount(element, type){
    newValue = parseInt(element.previousElementSibling.value) + 1;
    newValue > 10 ? element.previousElementSibling.value = 10 : element.previousElementSibling.value = newValue;
    let amount = parseInt(document.getElementById(type + '-amount').value);
    let value = parseFloat(document.getElementById(type + '-value').innerHTML);
    actual_value += value;
    
    document.getElementById("final-value").innerHTML = actual_value.toFixed(2);
}

function decreaseAmount(element, type){
    newValue = parseInt(element.nextElementSibling.value) - 1;
    newValue < 0 ? element.nextElementSibling.value = 0 : element.nextElementSibling.value = newValue;
    let amount = parseInt(document.getElementById(type + '-amount').value);
    let value = parseFloat(document.getElementById(type + '-value').innerHTML);
    actual_value -= value;
    document.getElementById("final-value").innerHTML = actual_value.toFixed(2);
}