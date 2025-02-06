import {CONFIG} from "../config.js";

export default class ApiService{
    static request(event, type, customizedBody, bearer_token=true){
        event.preventDefault();
        
        const baseUrl = CONFIG.apiBaseUrl;
        const urlMap = CONFIG.endpoints;

        const form = event.target;
        const formId = form.id;
        const endpoint = urlMap[formId];

        if(!endpoint){
            console.error("FORM Id not found in URL map.")
            return
        }

        const url = `${baseUrl}${endpoint}`;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        //console.log(data);
        
        const options = {
            method: type,
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(data)
        };

        switch (type){
            case "POST":
                customizedBody === undefined || customizedBody === null ? options.body = JSON.stringify(data) : options.body = JSON.stringify(customizedBody);
                break;
            case "GET":
                
        }

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