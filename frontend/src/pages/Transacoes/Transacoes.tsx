import { useEffect, useState } from "react";



import type {
    Transacao
} from "../../models/Transacao";



import {
    listarTransacoes
} from "../../services/transacaoService";



import PageHeader from "../../components/PageHeader/PageHeader";


import SectionCard from "../../components/SectionCard/SectionCard";



import TransacaoForm from "./TransacaoForm";


import TransacaoTable from "./TransacaoTable";


import "./Transacoes.css";







// página responsável pelo gerenciamento das transações

export default function Transacoes() {




    // lista de transações carregadas da API

    const [transacoes, setTransacoes] = useState<Transacao[]>([]);







    useEffect(() => {


        carregarTransacoes();


    }, []);









    // busca as transações na API

    async function carregarTransacoes() {


        const dados = await listarTransacoes();


        setTransacoes(dados);


    }











    return (



        <div className="transacoes-container">







            <PageHeader


                titulo="Transações"


                descricao="Gerencie receitas e despesas do sistema."


            />









            <SectionCard

                titulo="Nova Transação"

            >



                <TransacaoForm


                    onTransacaoCriada={carregarTransacoes}


                />



            </SectionCard>









            <SectionCard

                titulo="Transações cadastradas"

            >



                <TransacaoTable


                    transacoes={transacoes}


                />



            </SectionCard>








        </div>


    );


}