import CookieService from "../service/cookieService";

const COOKIE_NAME = 'access_token';

function retardo(){
    var section = document.getElementById('order-section');
    if(!CookieService.getCookie(COOKIE_NAME)){
    section.classList.add('order-section-off');
    section.innerHTML = `
    <img src="https://cdn-icons-png.flaticon.com/512/1046/1046886.png">
    <h1>Ops... Parece que você não possui uma conta ou não está logado no sistema</h1>
    <p>Crie sua conta agora ou faça login para realizar seu pedido</p>
    <div class="flex-container">
        <a href="login.html"><button class="btn">Fazer Login</button></a>
        <a href="login.html"><button class="btn btn-alt">Criar Conta</button></a>
    </div>
    `
    }
    else{
        section.classList.add('order-section-on');
        section.innerHTML = `
        <div class="order-list-container">
                <h1>Pedidos</h1>
                <div id="products-list">
        
        `
        for()
        
        
        += `
        </div>
                </div>
        `
        
    }
 }