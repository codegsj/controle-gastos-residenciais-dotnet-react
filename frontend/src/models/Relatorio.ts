// representa os totais financeiros de uma pessoa

export interface ConsultaTotais {

    // id da pessoa
    pessoaId: number;

    // nome da pessoa
    nomePessoa: string;

    // soma das receitas da pessoa
    totalReceitas: number;

    // soma das despesas da pessoa
    totalDespesas: number;

    // resultado final entre receitas e despesas
    saldo: number;

}


// representa os totais gerais do sistema

export interface TotalGeral {

    // soma de todas as receitas cadastradas
    totalReceitas: number;

    // soma de todas as despesas cadastradas
    totalDespesas: number;

    // saldo final geral
    saldoLiquido: number;

}


// representa o relatório completo retornado pela api

export interface Relatorio {

    // lista contendo o resumo financeiro de cada pessoa
    pessoas: ConsultaTotais[];

    // informações financeiras gerais
    totalGeral: TotalGeral;

}