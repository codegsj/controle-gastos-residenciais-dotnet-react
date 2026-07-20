import { useEffect, useState } from "react";


import type {
    Pessoa
} from "../../models/Pessoa";


import type {
    CreateTransacao
} from "../../models/CreateTransacao";


import {
    TipoTransacao
} from "../../models/TipoTransacao";


import type {
    TipoTransacao as TipoTransacaoType
} from "../../models/TipoTransacao";


import {
    listarPessoas
} from "../../services/pessoaService";


import {
    criarTransacao
} from "../../services/transacaoService";


import "./TransacaoForm.css";





interface Props {


    onTransacaoCriada: () => void;


}





export default function TransacaoForm({

    onTransacaoCriada

}: Props) {




    const [pessoas, setPessoas] = useState<Pessoa[]>([]);


    const [descricao, setDescricao] = useState("");


    const [valor, setValor] = useState("");



    const [tipo, setTipo] = useState<TipoTransacaoType>(

        TipoTransacao.Despesa

    );



    const [pessoaId, setPessoaId] = useState<number>(0);






    useEffect(() => {


        carregarPessoas();


    }, []);






    async function carregarPessoas() {


        const dados = await listarPessoas();


        setPessoas(dados);


    }







    async function salvarTransacao() {



        const novaTransacao: CreateTransacao = {


            descricao,


            valor:Number(valor),


            tipo,


            data:new Date().toISOString(),


            pessoaId


        };




        try {



            await criarTransacao(novaTransacao);



            alert(
                "Transação salva com sucesso!"
            );



            setDescricao("");

            setValor("");

            setTipo(
                TipoTransacao.Despesa
            );

            setPessoaId(0);



            onTransacaoCriada();



        }
        catch(error:any) {



            console.error(

                "Erro ao salvar transação:",

                error

            );



            alert(

                error.response?.data?.message

                ??

                "Erro ao salvar transação."

            );

        }


    }








    return (


        <div className="form-transacao">



            <input

                placeholder="Descrição"

                value={descricao}

                onChange={
                    e => setDescricao(e.target.value)
                }

            />





            <input

                placeholder="Valor"

                type="number"

                value={valor}

                onChange={
                    e => setValor(e.target.value)
                }

            />







            <select

                value={tipo}

                onChange={

                    e =>

                    setTipo(

                        Number(e.target.value) as TipoTransacaoType

                    )

                }

            >


                <option value={TipoTransacao.Receita}>
                    Receita
                </option>


                <option value={TipoTransacao.Despesa}>
                    Despesa
                </option>


            </select>







            <select

                value={pessoaId}

                onChange={
                    e => setPessoaId(Number(e.target.value))
                }

            >


                <option value={0}>
                    Selecione a pessoa
                </option>



                {

                    pessoas.map(pessoa => (


                        <option

                            key={pessoa.id}

                            value={pessoa.id}

                        >

                            {pessoa.nome}

                        </option>


                    ))

                }


            </select>







            <button

                onClick={salvarTransacao}

            >

                Salvar

            </button>




        </div>


    );


}