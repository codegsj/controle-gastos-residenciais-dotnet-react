// representa os dados enviados para criar uma transação

import type { TipoTransacao } from "./TipoTransacao";


export interface CreateTransacao {


    descricao: string;


    valor: number;


    tipo: TipoTransacao;


    data: string;


    pessoaId: number;


}