import { useEffect, useState } from "react";

import type { Pessoa } from "../../models/Pessoa";

import { listarPessoas } from "../../services/pessoaService";

import PessoaTable from "./PessoaTable";

import "./Pessoas.css";



export default function Pessoas(){


    // guarda as pessoas vindas da API

    const [pessoas, setPessoas] = useState<Pessoa[]>([]);



    useEffect(() => {


        carregarPessoas();


    }, []);



    async function carregarPessoas(){


        const dados = await listarPessoas();


        setPessoas(dados);


    }



    return (

    <div className="pessoas-container">


        <h1>
            Pessoas
        </h1>


        <p>
            Cadastro e gerenciamento de pessoas.
        </p>


        <PessoaTable 
            pessoas={pessoas}
        />


    </div>

);

}