// tipos disponíveis para uma transação

export const TipoTransacao = {


    Receita: 1,


    Despesa: 2


} as const;



// tipo criado automaticamente baseado nos valores acima

export type TipoTransacao =
    typeof TipoTransacao[keyof typeof TipoTransacao];