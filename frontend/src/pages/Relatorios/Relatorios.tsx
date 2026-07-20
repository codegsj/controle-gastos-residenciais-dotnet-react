import { useEffect, useState } from "react";


import PageHeader from "../../components/PageHeader/PageHeader";


import SectionCard from "../../components/SectionCard/SectionCard";


import ResumoFinanceiro from "../../components/ResumoFinanceiro/ResumoFinanceiro";


import RelatorioPessoa from "../../components/RelatorioPessoa/RelatorioPessoa";


import {
    buscarTotais
} from "../../services/relatorioService";


import type {
    RelatorioPessoa as RelatorioPessoaModel
} from "../../models/Relatorio";


import "./Relatorios.css";







// página responsável pelos relatórios financeiros

export default function Relatorios() {



    const [relatorios, setRelatorios] = useState<RelatorioPessoaModel[]>([]);






    useEffect(() => {


        carregarRelatorio();


    }, []);







    async function carregarRelatorio() {


        const dados = await buscarTotais();


        setRelatorios(

            dados.pessoas

        );


    }









    return (



        <div className="relatorios-container">





            <PageHeader


                titulo="Relatórios"


                descricao="Consulta de receitas, despesas e saldo líquido."


            />








            <SectionCard

                titulo="Resumo financeiro por pessoa"

            >



                <ResumoFinanceiro


                    relatorios={relatorios}


                />



            </SectionCard>









            <SectionCard


                titulo="Consulta individual"


            >



                <RelatorioPessoa />



            </SectionCard>






        </div>



    );


}