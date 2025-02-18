export const CONFIG = {
    cookies: {
        access: "access_token"
    },
    apiBaseUrl: "http://localhost:8080/nightburger",
    endpoints: {
        login: "/client/login",
        register: "/client/register",
        findCookie: "/client/findByCookie",
        registerOrder: "/order/registerOrder",
        getOrders: "/order/getAllOrders"
    }
};