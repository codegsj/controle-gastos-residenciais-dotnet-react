import { useEffect, useState } from "react";


import type { Transacao } from "../../models/Transacao";


import {
    listarTransacoes
} from "../../services/transacaoService";


import PageHeader from "../../components/PageHeader/PageHeader";


import TransacaoForm from "./TransacaoForm";


import TransacaoTable from "./TransacaoTable";


import "./Transacoes.css";




// página responsável pelo gerenciamento das transações

export default function Transacoes() {



    const [transacoes, setTransacoes] = useState<Transacao[]>([]);




    useEffect(() => {


        carregarTransacoes();


    }, []);






    // busca as transações na api

    async function carregarTransacoes() {


        const dados = await listarTransacoes();


        setTransacoes(dados);


    }






    return (


        <div className="transacoes-container">



            <PageHeader

                title="Transações"

                description="Gerencie receitas e despesas do sistema."

            />




            <TransacaoForm

                onTransacaoCriada={carregarTransacoes}

            />




            <TransacaoTable

                transacoes={transacoes}

            />



        </div>


    );

}