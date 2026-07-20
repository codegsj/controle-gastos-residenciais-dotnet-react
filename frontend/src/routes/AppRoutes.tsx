import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import Pessoas from "../pages/Pessoas/Pessoas";
import Transacoes from "../pages/Transacoes/Transacoes";
import Relatorios from "../pages/Relatorios/Relatorios";


export default function AppRoutes() {


    // arquivo responsável por controlar
    // todas as rotas da aplicação


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


                    {/* página de transações */}
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