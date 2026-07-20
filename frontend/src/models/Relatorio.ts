// representa os dados de resumo financeiro de uma pessoa

export interface RelatorioPessoa {


    pessoaId: number;


    nomePessoa: string;


    totalReceitas: number;


    totalDespesas: number;


    saldo: number;


}





// retorno completo do relatório

export interface RelatorioTotais {


    pessoas: RelatorioPessoa[];


}