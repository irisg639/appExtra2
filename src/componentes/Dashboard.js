import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      {/* Encabezado */}
      <header className="bg-primary text-white p-4 shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="h3 mb-0">¡Hola, {user?.name}!</h1>
          <button onClick={handleLogout} className="btn btn-outline-light">
            <i className="bi bi-box-arrow-right"></i> Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow-1 container my-5">
        <div className="row g-4">
          {/* Tarjeta 1 */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center">
                <i className="bi bi-box-seam display-4 text-primary mb-3"></i>
                <h5 className="card-title">Gestionar Productos</h5>
                <p className="card-text">Administra tus productos de manera sencilla y rápida.</p>
                <button className="btn btn-primary" onClick={() => navigate('/productos')}>
                  Ir a Productos
                </button>
              </div>
            </div>
          </div>

          {/* Tarjeta 2 */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body text-center">
                <i className="bi bi-people-fill display-4 text-success mb-3"></i>
                <h5 className="card-title">Gestionar Usuarios</h5>
                <p className="card-text">Controla los permisos y registros de los usuarios.</p>
                <button className="btn btn-success" onClick={() => navigate('/usuarios')}>
                  Ir a Usuarios
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Imagen decorativa */}
        <div className="text-center mt-5">
          <img
            src="https://wallpapers.com/images/hd/welcome-background-4yrhirh7bcms16n9.jpg"
            alt="Bienvenido"
            className="img-fluid rounded shadow"
            style={{ maxHeight: '300px', objectFit: 'cover' }}
          />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
