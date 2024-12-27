import ApiService from "../service/apiService.js";

const REDIRECT_URL = "../products.html";

document.getElementById("login").addEventListener('submit', handleSubmit)
document.getElementById("register").addEventListener('submit', handleSubmit)

async function handleSubmit(event){
    event.preventDefault();

    const formId = event.target.id;
    const actionType = getActionType(formId);
    const formData = getFormData(event.target);
    console.log(formData);
    console.log(JSON.stringify(formData));

    if(!validateForm(actionType, formData))
        return;

    try{
        const response = await ApiService.request(event, "POST");
        if(response === "unauthorized"){
            alert("Dados inválidos!");
        }
        else{
            showSuccessMessage(actionType);
            redirectToProducts();
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
        redirectToProducts();
    }

    function redirectToProducts(){
        window.location.href = REDIRECT_URL;
    }

    function handleError(error){
        alert(error.message);
    }

    function showSuccessMessage(actionType, username) {
        const message = actionType === 'login'
            ? 'Login realizado com sucesso!'
            : 'Cadastro realizado com sucesso!';
        alert(message);
    }

}