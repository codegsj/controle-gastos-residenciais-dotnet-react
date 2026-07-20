import axios from "axios";

// criação de uma instância do axios para centralizar as chamadas para a api
// dessa forma não precisamos repetir a url completa em todos os arquivos
const api = axios.create({

    // endereço base da nossa api desenvolvida em .net
    baseURL: "https://localhost:7102/api"

});

// exporta a configuração para ser utilizada em outros arquivos do projeto
export default api;