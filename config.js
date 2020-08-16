const apiUrl = "https://localhost:44399/api";
const siteUrl =  process.env.VUE_APP_ROOT_SITE;
const domain = process.env.VUE_APP_DOMAIN;
const domainApi = process.env.VUE_APP_DOMAIN_API;
var config = {
    apiUrl,siteUrl,domain, domainApi
}

export default config;

// import axios from "axios";

// export const http = axios.create({

//     baseURL: "https://localhost:44399/api"
    
// });