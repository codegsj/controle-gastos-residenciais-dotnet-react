import { useEffect, useState } from "react";


import ResumoFinanceiro from "../../components/ResumoFinanceiro/ResumoFinanceiro";


import RelatorioPessoa from "../../components/RelatorioPessoa/RelatorioPessoa";


import {
    buscarTotais
} from "../../services/relatorioService";


import type {
    RelatorioPessoa as RelatorioPessoaModel
} from "../../models/Relatorio";


import "./Relatorios.css";







// tela responsável pelos relatórios financeiros

export default function Relatorios() {




    // guarda os dados do relatório geral

    const [relatorios, setRelatorios] = useState<RelatorioPessoaModel[]>([]);







    useEffect(() => {


        carregarRelatorio();


    }, []);








    // busca os totais de todas as pessoas

    async function carregarRelatorio() {


        const dados = await buscarTotais();


        setRelatorios(

            dados.pessoas

        );


    }








    return (



        <div className="relatorios-container">






            <h1>

                Relatórios

            </h1>






            <p>

                Consulta de receitas, despesas e saldo líquido.

            </p>









            {/*

                relatório geral

                mostra todas as pessoas

            */}


            <ResumoFinanceiro

                relatorios={relatorios}

            />









            {/*

                relatório individual

                consulta uma pessoa específica

            */}


            <RelatorioPessoa />







        </div>



    );


}