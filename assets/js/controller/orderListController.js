import GetOrderService from "../service/getOrderService.js";

const COOKIE_NAME = 'access_token';

document.getElementById("testando123").addEventListener("click", loadOrderContent)

async function loadOrderContent(){
    var section = document.getElementById('order-section');
    var list = document.getElementById('products-list')
    if(!GetOrderService.getAccessToken()){
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
        const client = {
            access: GetOrderService.getAccessToken()
        }

        const responseClient = await GetOrderService.request(client, "/client/findByCookie");

        const body = {
            client_id: responseClient.client_id
        }

        section.classList.add('order-section-on');  
        const response = await GetOrderService.request(body, "/order/getAllOrdersOfClient");
        console.log(response);
        response.forEach(item => {
            Object.entries(item).forEach(([key, value]) => {
                list.innerHTML+= `<div id="list-item">
                            <div class="flex-container">`
                switch (key){
                    case "quantity":
                        list.innerHTML+= `<p id="product-quantity">${value}</p>`
                        break;    
                    case "name":
                        list.innerHTML+= `<p id="product-name">${value}</p>`
                        break;
                    case "value":
                        list.innerHTML+= `</div>
                                            <div class="flex-container">
                                                <p id="product-value">${value}</p>
                                            </div><div>`
                        break;
                }
            });    
        });
        
        list.innerHTML+= `</div>`
        
    }
 }