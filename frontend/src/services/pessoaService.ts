import api from "./api";

import type { Pessoa } from "../models/Pessoa";


export async function listarPessoas(){

    console.log("chamando api de pessoas");


    const resposta = await api.get<Pessoa[]>("/pessoas");


    console.log("retorno da api:", resposta.data);


    return resposta.data;

}