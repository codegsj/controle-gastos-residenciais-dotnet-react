import { useEffect, useState } from "react";


import PageHeader from "../../components/PageHeader/PageHeader";

import SectionCard from "../../components/SectionCard/SectionCard";


import PessoaForm from "./PessoaForm";


import PessoaTable from "./PessoaTable";


import type {
    Pessoa
} from "../../models/Pessoa";


import {
    listarPessoas,
    excluirPessoa
} from "../../services/pessoaService";


import "./Pessoas.css";








// página responsável pelo cadastro
// e gerenciamento de pessoas

export default function Pessoas() {





    // lista de pessoas carregadas da API

    const [pessoas, setPessoas] = useState<Pessoa[]>([]);








    useEffect(() => {


        carregarPessoas();


    }, []);









    // busca todas as pessoas cadastradas

    async function carregarPessoas() {


        const dados = await listarPessoas();


        setPessoas(dados);


    }









    // remove uma pessoa pelo id

    async function removerPessoa(

        id: number

    ) {


        await excluirPessoa(id);


        await carregarPessoas();


    }









    // executado após criar uma nova pessoa

    function atualizarLista() {


        carregarPessoas();


    }









    return (



        <div className="pessoas-container">







            <PageHeader


                titulo="Pessoas"


                descricao="Cadastro e gerenciamento de pessoas."


            />









            <SectionCard

                titulo="Nova Pessoa"

            >


                <PessoaForm


                    onPessoaCriada={atualizarLista}


                />


            </SectionCard>









            <SectionCard

                titulo="Pessoas cadastradas"

            >


                <PessoaTable


                    pessoas={pessoas}


                    onExcluir={removerPessoa}


                />


            </SectionCard>








        </div>



    );


}