import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './componentes/Login';
import PrivateRoute from './componentes/PrivateRoute';
import SignUp from './componentes/SignUp';
import Dashboard from './componentes/Dashboard';
import Usuarios from './componentes/usuarios/ListaUsuarios';
import CreateUser from './componentes/usuarios/CrearUsuario';
import EditUser from './componentes/usuarios/EditarUsuario';
import ViewUser from './componentes/usuarios/VerUsuario';
import Productos from './componentes/productos/ListaProductos';
import CreateProduct from './componentes/productos/CrearProducto';
import EditProduct from './componentes/productos/EditarProducto';
import ViewProduct from './componentes/productos/VerProducto';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                } />
                <Route path="/productos" element={
                    <PrivateRoute>
                        <Productos />
                    </PrivateRoute>
                } />
                <Route path="/productos/create" element={
                    <PrivateRoute>
                        <CreateProduct />
                    </PrivateRoute>
                } />
                <Route path="/productos/edit/:id" element={
                    <PrivateRoute>
                        <EditProduct />
                    </PrivateRoute>
                } />
                <Route path="/productos/view/:id" element={
                    <PrivateRoute>
                        <ViewProduct />
                    </PrivateRoute>
                } />
                <Route path="/usuarios" element={
                    <PrivateRoute>
                        <Usuarios />
                    </PrivateRoute>
                } />
                <Route path="/usuarios/create" element={
                    <PrivateRoute>
                        <CreateUser />
                    </PrivateRoute>
                } />
                <Route path="/usuarios/edit/:id" element={
                    <PrivateRoute>
                        <EditUser />
                    </PrivateRoute>
                } />
                <Route path="/usuarios/view/:id" element={
                    <PrivateRoute>
                        <ViewUser />
                    </PrivateRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;
