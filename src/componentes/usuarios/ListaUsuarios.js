import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash, FaPlus, FaSignOutAlt, FaHome, FaUser } from 'react-icons/fa';
import { Container, Card, Button, Table, Alert, Modal, Spinner } from 'react-bootstrap';

function Usuarios() {
    const { logout, user } = useAuth();
    const [users, setUsers] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch('https://184.72.119.254/usuarios');
            
            if (!response.ok) {
                throw new Error('Error al obtener los usuarios');
            }
            
            const data = await response.json();
            setUsers(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleEdit = (id) => {
        navigate(`/usuarios/edit/${id}`);
    };

    const handleView = (id) => {
        navigate(`/usuarios/view/${id}`);
    };

    const confirmDelete = (id) => {
        setUserToDelete(id);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://184.72.119.254/usuarios/eliminar/${userToDelete}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error('Error al eliminar el usuario');
            }
            
            setUsers(users.filter(user => user.id !== userToDelete));
            setShowDeleteModal(false);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleCreate = () => {
        navigate('/usuarios/create');
    };

    const handleBack = () => {
        navigate('/dashboard');
    };

    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Cargando lista de usuarios...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">
                    <strong>Error:</strong> {error}
                    <div className="mt-2">
                        <Button variant="primary" onClick={fetchUsers}>
                            Reintentar
                        </Button>
                    </div>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro que deseas eliminar este usuario? Esta acción no se puede deshacer.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Card className="shadow">
                <Card.Header className="bg-primary text-white">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className="mb-0">
                            <FaUser className="me-2" /> Gestión de Usuarios
                        </h3>
                        <div>
                            <Button variant="light" onClick={handleBack} className="me-2">
                                <FaHome className="me-1" /> Inicio
                            </Button>
                            <Button variant="success" onClick={handleCreate} className="me-2">
                                <FaPlus className="me-1" /> Nuevo
                            </Button>
                            <Button variant="danger" onClick={handleLogout}>
                                <FaSignOutAlt className="me-1" /> Salir
                            </Button>
                        </div>
                    </div>
                </Card.Header>
                
                <Card.Body>
                    {users.length === 0 ? (
                        <Alert variant="info" className="text-center">
                            No hay usuarios registrados. Crea tu primer usuario.
                        </Alert>
                    ) : (
                        <div className="table-responsive">
                            <Table striped bordered hover>
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Email</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <Button 
                                                    variant="info" 
                                                    size="sm" 
                                                    className="me-2"
                                                    onClick={() => handleView(user.id)}
                                                >
                                                    <FaEye /> Ver
                                                </Button>
                                                <Button 
                                                    variant="warning" 
                                                    size="sm" 
                                                    className="me-2"
                                                    onClick={() => handleEdit(user.id)}
                                                >
                                                    <FaEdit /> Editar
                                                </Button>
                                                <Button 
                                                    variant="danger" 
                                                    size="sm"
                                                    onClick={() => confirmDelete(user.id)}
                                                >
                                                    <FaTrash /> Eliminar
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Usuarios;