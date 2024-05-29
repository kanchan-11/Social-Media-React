import axios from "axios";

const jwtToken=localStorage.getItem("jwt")
// export const API_BASE_URL="http://localhost:5454";
// export const API_BASE_URL="https://social-media-application-production.up.railway.app";
export const API_BASE_URL="https://spring-projects-social-media.azuremicroservices.io";
export const api =axios.create({baseURL:API_BASE_URL,
        headers:{
            "Authorization":`Bearer ${jwtToken}`,
            "Content-Type":"application/json"
        }})