import {CONFIG} from "../config.js";

export default class GetOrderService{
    static request(body, endpoint, bearer_token=true){
        
        const baseUrl = CONFIG.apiBaseUrl;
        var url = `${baseUrl}`+endpoint;
        
        const options = {
            method: "POST",
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(body)
        };


        if (bearer_token) {
            options.headers['Authorization'] = `Bearer ${this.getAccessToken()}`;
        }
        
        return fetch(url, options)
        .then(res => {
            if(res.status === 401)
                return "unauthorized";

            else if(!res.ok){
                throw new Error(`HTTP status: ${res.status}`);
            }
                return res.json();
        })
        .catch(error => {
            console.error('Error in API call: ',error)
        });
    }

    static getAccessToken() {
        const cookieName = CONFIG.cookies.access;
        const match = document.cookie.match(new RegExp(`(^| )${cookieName}=([^;]+)`));
        
        return match ? match[2] : null;
    }
}