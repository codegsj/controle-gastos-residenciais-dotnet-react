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
// apresenta uma visão geral dos dados financeiros

export default function Dashboard() {





    // guarda os dados vindos do relatório

    const [relatorios, setRelatorios] = useState<RelatorioPessoa[]>([]);







    useEffect(() => {


        carregarDados();


    }, []);







    // busca informações gerais no backend

    async function carregarDados() {


        const dados = await buscarTotais();


        setRelatorios(

            dados.pessoas

        );


    }







    // quantidade de pessoas cadastradas

    const quantidadePessoas = relatorios.length;







    // soma das receitas

    const totalReceitas = relatorios.reduce(


        (total, pessoa) =>


            total + pessoa.totalReceitas,


        0


    );







    // soma das despesas

    const totalDespesas = relatorios.reduce(


        (total, pessoa) =>


            total + pessoa.totalDespesas,


        0


    );







    // saldo geral

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

                    valor={`${quantidadePessoas} cadastradas`}

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