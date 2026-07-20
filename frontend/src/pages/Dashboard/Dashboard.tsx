import { useEffect, useState } from "react";


import Card from "../../components/Card/Card";


import {
    buscarTotais
} from "../../services/relatorioService";


import type {
    RelatorioPessoa
} from "../../models/Relatorio";


import "./Dashboard.css";






// tela inicial da aplicação

export default function Dashboard() {



    // guarda os dados financeiros das pessoas

    const [relatorios, setRelatorios] = useState<RelatorioPessoa[]>([]);





    useEffect(() => {


        carregarDados();


    }, []);








    // busca os dados do relatório no backend

    async function carregarDados() {


        const dados = await buscarTotais();


        setRelatorios(dados.pessoas);


    }







    // soma todas as receitas

    const totalReceitas = relatorios.reduce(

        (total, pessoa) =>

            total + pessoa.totalReceitas,

        0

    );







    // soma todas as despesas

    const totalDespesas = relatorios.reduce(

        (total, pessoa) =>

            total + pessoa.totalDespesas,

        0

    );







    // calcula o saldo geral

    const saldoTotal =

        totalReceitas - totalDespesas;








    return (



        <div>





            <h1>

                Dashboard

            </h1>





            <p>

                Visão geral dos gastos residenciais.

            </p>








            <div className="cards-container">





                <Card

                    titulo="Pessoas"

                    valor={`${relatorios.length} cadastradas`}

                />






                <Card

                    titulo="Receitas"

                    valor={

                        totalReceitas.toLocaleString(

                            "pt-BR",

                            {

                                style: "currency",

                                currency: "BRL"

                            }

                        )

                    }

                />







                <Card

                    titulo="Despesas"

                    valor={

                        totalDespesas.toLocaleString(

                            "pt-BR",

                            {

                                style: "currency",

                                currency: "BRL"

                            }

                        )

                    }

                />







                <Card

                    titulo="Saldo"

                    valor={

                        saldoTotal.toLocaleString(

                            "pt-BR",

                            {

                                style: "currency",

                                currency: "BRL"

                            }

                        )

                    }

                />







            </div>





        </div>



    );


}