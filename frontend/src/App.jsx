import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import SignInPage from "./pages/SignInPage";
import InvoiceListPage from "./pages/InvoiceListPage"; 
import HomeAdmin from "./pages/admin/Home";
import InventarioAdmin from "./pages/admin/Inventario";

import HomeDueno from "./pages/dueno/Home";
import InventarioDueno from "./pages/dueno/Inventario";
import OrdenesProveedoresDueno from "./pages/dueno/OrdenesProveedores";
import OrdenesClientesDueno from "./pages/dueno/OrdenesClientes";
import RecomendacionesIADueno from "./pages/dueno/RecomendacionesIA";

import HomeCliente from "./pages/cliente/Home";
import InventarioCliente from "./pages/cliente/Inventario"

import HomeProveedor from "./pages/proveedor/Home";
import InventarioProveedor from "./pages/proveedor/Inventario"
import OrdenesProveedor from "./pages/proveedor/Ordenes"

const App = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const cookieResponse = await fetch("http://localhost:5000/users/getSession", {
          credentials: "include",
        });

        if (!cookieResponse.ok) {
          setLoading(false);
          return;
        }

        const data = await cookieResponse.json();
        const token = data.token;
        if (!token) {
          setLoading(false);
          return;
        }

        const decoded = jwtDecode(token);
        setRole(decoded.ROL);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
      setLoading(false);
    };

    fetchSession();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route
          path="/dashboard"
          element={
            role === "admin" ? <HomeAdmin /> :
            role === "dueno" ? <HomeDueno /> :
            role === "cliente" ? <HomeCliente /> :
            role === "proveedor" ? <HomeProveedor /> :
            <Navigate to="/" />
          }
        />
        <Route 
          path="/inventario" 
          element={
            role === "admin" ? <InventarioAdmin /> :
            role === "dueno" ? <InventarioDueno /> :
            role === "cliente" ? <InventarioCliente/> :
            role === "proveedor" ? <InventarioProveedor/> :
            <Navigate to="/" />
          } 
        />
        <Route 
          path="/ordenes-proveedores" 
          element={
            role === "dueno" ? <OrdenesProveedoresDueno/> :
            <Navigate to="/"/>
          }
        />
        <Route 
          path="/ordenes-clientes" 
          element={
            role === "dueno" ? <OrdenesClientesDueno/> :
            <Navigate to="/"/>
          }
        />
        <Route 
          path="/recomendaciones-IA" 
          element={
            role === "dueno" ? <RecomendacionesIADueno/> :
            <Navigate to="/"/>
          }
        />
        <Route 
          path="/ordenes" 
          element={
            role === "proveedor" ? <OrdenesProveedor/> :
            <Navigate to="/"/>
          }
        />
        <Route 
          path="/pedidos" 
          element={
            role === "admin" ? <InvoiceListPage /> :
            role === "dueno" ? <InvoiceListPage /> :
            role === "cliente" ? <InvoiceListPage /> :
            role === "proveedor" ? <InvoiceListPage /> :
            <Navigate to="/" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
