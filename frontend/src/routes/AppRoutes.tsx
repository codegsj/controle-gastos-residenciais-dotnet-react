import { BrowserRouter, Routes, Route } from "react-router-dom";


import MainLayout from "../layouts/MainLayout";


import Dashboard from "../pages/Dashboard/Dashboard";

import Pessoas from "../pages/Pessoas/Pessoas";

import PessoasTransacoes from "../pages/PessoasTransacoes/PessoasTransacoes";

import Transacoes from "../pages/Transacoes/Transacoes";

import Relatorios from "../pages/Relatorios/Relatorios";





// arquivo responsável por controlar
// todas as rotas da aplicação

export default function AppRoutes() {



    return (



        <BrowserRouter>



            <Routes>





                {/*

                    o MainLayout será carregado primeiro

                    e dentro dele as páginas serão renderizadas

                */}



                <Route element={<MainLayout />}>







                    {/* página inicial */}

                    <Route

                        path="/"

                        element={<Dashboard />}

                    />








                    {/* página de pessoas */}

                    <Route

                        path="/pessoas"

                        element={<Pessoas />}

                    />








                    {/*

                        página de transações

                        de uma pessoa específica

                    */}



                    <Route

                        path="/pessoas/:id/transacoes"

                        element={<PessoasTransacoes />}

                    />








                    {/* página geral de transações */}

                    <Route

                        path="/transacoes"

                        element={<Transacoes />}

                    />








                    {/* página de relatórios */}

                    <Route

                        path="/relatorios"

                        element={<Relatorios />}

                    />






                </Route>





            </Routes>





        </BrowserRouter>



    );


}