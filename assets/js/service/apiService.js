import {CONFIG} from "../config.js";

export default class ApiService{
    static request(event, type, customizedBody){
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
}