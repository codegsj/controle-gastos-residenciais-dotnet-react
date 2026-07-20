import { useEffect, useState } from "react";


import type { Pessoa } from "../../models/Pessoa";


import type { CreateTransacao } from "../../models/CreateTransacao";


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





interface Props {


    // função executada após cadastrar uma transação

    onTransacaoCriada: () => void;


}






// formulário responsável pelo cadastro de transações

export default function TransacaoForm({

    onTransacaoCriada

}: Props) {




    // lista de pessoas carregadas da api

    const [pessoas, setPessoas] = useState<Pessoa[]>([]);




    // campos do formulário

    const [descricao, setDescricao] = useState("");

    const [valor, setValor] = useState("");




    // controla o tipo da transação
    // 1 = receita
    // 2 = despesa

    const [tipo, setTipo] = useState<TipoTransacaoType>(

        TipoTransacao.Despesa

    );




    // pessoa selecionada

    const [pessoaId, setPessoaId] = useState<number>(0);








    useEffect(() => {


        carregarPessoas();


    }, []);








    // busca pessoas para preencher o select

    async function carregarPessoas() {


        const dados = await listarPessoas();


        setPessoas(dados);


    }








    // salva uma nova transação

    async function salvarTransacao() {


        const novaTransacao: CreateTransacao = {


            descricao,


            valor: Number(valor),


            tipo,


            data: new Date().toISOString(),


            pessoaId


        };




        try {


            await criarTransacao(novaTransacao);



            alert(
                "Transação salva com sucesso!"
            );



            // limpa o formulário

            setDescricao("");

            setValor("");

            setTipo(
                TipoTransacao.Despesa
            );

            setPessoaId(0);



            // atualiza a tabela

            onTransacaoCriada();



        }

        catch(error: any) {



            console.error(

                "Erro ao salvar transação:",

                error

            );




            const mensagem =

                error.response?.data?.message

                ??

                "Erro ao salvar transação.";





            alert(mensagem);



        }


    }









    return (



        <div className="form-transacao">



            <h2>
                Nova Transação
            </h2>






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