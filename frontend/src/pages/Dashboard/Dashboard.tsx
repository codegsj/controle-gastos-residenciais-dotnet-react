import { useEffect, useState } from "react";


import PageHeader from "../../components/PageHeader/PageHeader";

import PageContainer from "../../components/PageContainer/PageContainer";

import Card from "../../components/Card/Card";


import {
    listarPessoas
} from "../../services/pessoaService";


import {
    buscarTotais
} from "../../services/relatorioService";


import "./Dashboard.css";








export default function Dashboard() {




    const [quantidadePessoas, setQuantidadePessoas] = useState(0);


    const [totalReceitas, setTotalReceitas] = useState(0);


    const [totalDespesas, setTotalDespesas] = useState(0);


    const [saldo, setSaldo] = useState(0);









    useEffect(() => {


        carregarDashboard();


    }, []);









    async function carregarDashboard() {


        try {


            const pessoas = await listarPessoas();


            setQuantidadePessoas(

                pessoas.length

            );







            const relatorio = await buscarTotais();




            const receitas = relatorio.pessoas.reduce(


                (total, pessoa) =>

                    total + pessoa.totalReceitas,


                0


            );







            const despesas = relatorio.pessoas.reduce(


                (total, pessoa) =>

                    total + pessoa.totalDespesas,


                0


            );







            setTotalReceitas(receitas);


            setTotalDespesas(despesas);


            setSaldo(

                receitas - despesas

            );





        }

        catch(error) {


            console.error(

                "Erro ao carregar dashboard:",

                error

            );


        }


    }









    function formatarValor(valor:number) {


        return valor.toLocaleString(

            "pt-BR",

            {

                style:"currency",

                currency:"BRL"

            }

        );


    }









    return (



        <PageContainer>



            <PageHeader


                titulo="Dashboard"


                descricao="Visão geral dos gastos residenciais."


            />








            <div className="cards-container">





                <Card


                    titulo="Pessoas"


                    valor={`${quantidadePessoas} cadastradas`}


                />








                <Card


                    titulo="Receitas"


                    valor={formatarValor(totalReceitas)}


                />








                <Card


                    titulo="Despesas"


                    valor={formatarValor(totalDespesas)}


                />








                <Card


                    titulo="Saldo"


                    valor={formatarValor(saldo)}


                />






            </div>






        </PageContainer>



    );

}