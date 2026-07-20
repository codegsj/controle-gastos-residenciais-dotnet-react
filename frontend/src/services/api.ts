import axios from "axios";


// configuração central da comunicação com a API .NET

const api = axios.create({


    // endereço do backend

    baseURL: "https://localhost:7102/api"


});



export default api;