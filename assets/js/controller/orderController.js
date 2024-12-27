import ApiService from "../service/apiService.js"

function increaseAmount(element){
    newValue = parseInt(element.previousElementSibling.value) + 1;
    newValue > 10 ? element.previousElementSibling.value = 10 : element.previousElementSibling.value = newValue;
}

function decreaseAmount(element){
    newValue = parseInt(element.nextElementSibling.value) - 1;
    newValue < 0 ? element.nextElementSibling.value = 0 : element.nextElementSibling.value = newValue;
}

const REDIRECT_TO_CART_URL = "../../../order.html";
const REDIRECT_TO_PRODUCTS_URL = "../../../products.html";

document.getElementById("registerOrder").addEventListener('submit', insertToCart);

async function insertToCart(event){
    event.preventDefault();

    const formId = event.target.id;
    const actionType = event.submitter.id;
    const formData = getFormData(event.target);
    console.log(formData);
    console.log(JSON.stringify(formData));

    function getFormData(form){
        const formData = new FormData(form);
        return Object.fromEntries(formData.entries());
    }

    try{    
        const response = await ApiService.request(event, "POST");
        /*redirect(actionType);*/
    }
    catch(error){
        handleError(error);
    }

    function handleError(error){
        alert(error.message);
    }

    function redirect(actionType){
         actionType === "cart" ? window.location.href = REDIRECT_TO_CART_URL : window.location.href = REDIRECT_TO_PRODUCTS_URL;
    }
}