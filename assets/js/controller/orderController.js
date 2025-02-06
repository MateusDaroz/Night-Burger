import ApiService from "../service/apiService.js"
import CookieService from "../service/cookieService.js";

const REDIRECT_TO_CART_URL = "../../../order.html";
const REDIRECT_TO_PRODUCTS_URL = "../../../products.html";
const COOKIE_NAME = 'access_token';

document.getElementById("registerOrder").addEventListener('submit', insertToCart);



async function insertToCart(event){
    event.preventDefault();

    if(!CookieService.getCookie(COOKIE_NAME)){
        console.log("Você não está logado no sistema!");
    }

    else{
        const formId = event.target.id;
        const actionType = event.submitter.id;

        try{    
            const cookieData = { cookie: ApiService.getAccessToken(COOKIE_NAME) }
            const response = await ApiService.request(event, "GET", undefined);
            var id = response.client_id;
        }
        catch(error){
            handleError(error);
        }

        const formData = getAddonData(event.target, id);
        
        console.log(formData);

        function getAddonData(form, id){
            const formData = new FormData(form);
            
            const order = {
                product: {product_id: 1},
                client: {client_id: id},
                observation: formData.get("observation"),
                quantity: formData.get("product-amount"),
                addons: formatAddons(formData),
                price: document.getElementById("final-value").dataset.value
            }
            
            return order; 
        }
        
        try{    
            const response = await ApiService.request(event, "POST", formData);
            redirect(actionType);
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

        function formatAddons(addonData){
            let addonString = '';
            for(let [key, value] of addonData.entries()){
                if(key === "observation" || key === "product-amount")
                    continue;
                else{
                    key = key.replace('-amount','');
                    addonString += (`${key}: ${value}x `);
                    
                }
            }
            return addonString;
        }
    }
}
