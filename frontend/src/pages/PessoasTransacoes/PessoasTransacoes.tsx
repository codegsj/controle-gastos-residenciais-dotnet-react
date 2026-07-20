import { useEffect, useState } from "react";


import { useParams } from "react-router-dom";


import PageHeader from "../../components/PageHeader/PageHeader";


import PessoaTable from "../Pessoas/PessoaTable";


import TransacaoTable from "../Transacoes/TransacaoTable";


import type {
    Pessoa
} from "../../models/Pessoa";


import type {
    Transacao
} from "../../models/Transacao";


import {
    listarPessoas
} from "../../services/pessoaService";


import {
    listarTransacoesPorPessoa
} from "../../services/transacaoService";


import "./PessoasTransacoes.css";









export default function PessoasTransacoes() {




    const { id } = useParams();




    const [pessoas, setPessoas] = useState<Pessoa[]>([]);



    const [transacoes, setTransacoes] = useState<Transacao[]>([]);









    useEffect(() => {


        carregarDados();


    }, [id]);









    async function carregarDados() {


        if(!id) return;




        const pessoasApi = await listarPessoas();



        const transacoesApi = await listarTransacoesPorPessoa(

            Number(id)

        );





        setPessoas(pessoasApi);



        setTransacoes(transacoesApi);


    }









    return (



        <div className="pessoas-transacoes-container">





            <PageHeader


                titulo="Transações da pessoa"


                descricao="Consulta das movimentações financeiras da pessoa selecionada."


            />









            <section className="secao">


                <h2>

                    Pessoas

                </h2>





                <PessoaTable


                    pessoas={pessoas.filter(


                        pessoa => pessoa.id === Number(id)


                    )}


                    onExcluir={() => carregarDados()}


                />



            </section>









            <section className="secao">


                <h2>

                    Transações

                </h2>






                <TransacaoTable


                    transacoes={transacoes}


                />



            </section>






        </div>


    );


}