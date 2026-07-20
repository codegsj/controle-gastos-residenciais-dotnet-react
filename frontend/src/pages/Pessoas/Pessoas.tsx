import { useEffect, useState } from "react";

import type { Pessoa } from "../../models/Pessoa";

import { listarPessoas } from "../../services/pessoaService";

import PessoaTable from "./PessoaTable";

import PessoaForm from "./PessoaForm";

import "./Pessoas.css";


// página responsável pelo gerenciamento de pessoas

export default function Pessoas() {


    // guarda as pessoas vindas da api

    const [pessoas, setPessoas] = useState<Pessoa[]>([]);



    // executa quando a tela é carregada

    useEffect(() => {


        carregarPessoas();


    }, []);




    // busca as pessoas na api

    async function carregarPessoas() {


        const dados = await listarPessoas();


        setPessoas(dados);


    }




    // atualiza a tabela depois de cadastrar uma pessoa

    async function atualizarLista() {


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



            <PessoaForm

                onPessoaCriada={atualizarLista}

            />



            <PessoaTable

                pessoas={pessoas}

            />


        </div>

    );


}