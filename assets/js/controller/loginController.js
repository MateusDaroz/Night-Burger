import { CONFIG } from "../config.js";
import ApiService from "../service/apiService.js";
import CookieService from "../service/cookieService.js";

const REDIRECT_URL = "../products.html";
const COOKIE_NAME = 'access_token';
const SESSION_DURATION = 1800 * 1000;

document.getElementById("login").addEventListener('submit', handleSubmit)
document.getElementById("register").addEventListener('submit', handleSubmit)

async function handleSubmit(event){
    event.preventDefault();

    const formId = event.target.id;
    const actionType = getActionType(formId);
    const formData = getFormData(event.target);

    if(!validateForm(actionType, formData))
        return;

    try{
        const response = await ApiService.request(event, "POST", undefined, undefined, false);
        if(response === "unauthorized"){
            alert("Dados inválidos!");
        }
        else{
            handleSubmission(response, actionType);
        }
    }
    catch(error){
        handleError(error);
    }

    function getActionType(formId){
        return formId === "login" ? "login" : "register";
    }

    function getFormData(form){
        const formData = new FormData(form);
        return Object.fromEntries(formData.entries());
    }

    function validateForm(actionType, formData){
        if(!formData){
            alert("Erro: Dados com valores inválidos.");
            return false;
        }

        if(actionType === "register"){
            if(!formData._password_hash){
                alert("Por favor, insira uma senha.");
                return false;
            }
        }
        
        return true;
    }

    function handleSubmission(response, actionType){
        setCookie(response.access_token);
        showSuccessMessage(actionType, actionType === "register" ? null : response.name);
        console.log(CookieService.getCookie(COOKIE_NAME));
        //redirectToProducts();
    }

    function setCookie(token) {
        const expirationDate = new Date();
        const rememberMe = document.getElementById('stay-conected')?.checked || false;
        
        if (rememberMe) {
            expirationDate.setFullYear(expirationDate.getFullYear() + 1);
        } else {
            expirationDate.setTime(expirationDate.getTime() + SESSION_DURATION);
        }
        
        CookieService.setCookie(COOKIE_NAME, token, expirationDate);
    }

    function redirectToProducts(){
        window.location.href = REDIRECT_URL;
    }

    function handleError(error){
        alert(error.message);
    }

    function showSuccessMessage(actionType, username) {
        const message = actionType === 'login'
            ? 'Login realizado com sucesso!, ' + username
            : 'Cadastro realizado com sucesso!';
        alert(message);
    }

}