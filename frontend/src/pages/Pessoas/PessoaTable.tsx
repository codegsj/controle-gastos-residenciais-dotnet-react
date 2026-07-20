import type { Pessoa } from "../../models/Pessoa";



interface Props {


    pessoas: Pessoa[];


}



export default function PessoaTable({ pessoas }: Props){



    // componente responsável por exibir
    // a lista de pessoas cadastradas



    return (


        <table>


            <thead>

                <tr>

                    <th>
                        Nome
                    </th>


                    <th>
                        Idade
                    </th>


                </tr>

            </thead>



            <tbody>


                {
                    pessoas.map(pessoa => (

                        <tr key={pessoa.id}>


                            <td>

                                {pessoa.nome}

                            </td>


                            <td>

                                {pessoa.idade}

                            </td>


                        </tr>

                    ))
                }


            </tbody>


        </table>


    );


}