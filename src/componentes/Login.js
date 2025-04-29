import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://184.72.119.254/usuarios/iniciar-sesion`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) throw new Error('Credenciales inválidas');

            const userData = await response.json();
            login({ id: userData.id, name: userData.name });
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            setErrorMessage('Error al iniciar sesión');
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center mb-4 text-primary">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="email" className="form-control" placeholder="Correo Electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <button type="submit" className="btn btn-primary w-100">Ingresar</button>
                    <button type="button" className="btn btn-outline-primary w-100 mt-2" onClick={() => navigate('/signup')}>
                        ¿No tienes cuenta? Regístrate
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
