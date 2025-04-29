import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser, FaEnvelope, FaShieldAlt, FaCalendarAlt } from 'react-icons/fa';
import { Container, Card, Button, Alert, Spinner, ListGroup } from 'react-bootstrap';

function ViewUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`https://184.72.119.254/usuarios/${id}`);
                
                if (!response.ok) {
                    throw new Error('Usuario no encontrado');
                }
                
                const data = await response.json();
                setUser(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const handleBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Cargando información del usuario...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">
                    {error}
                    <div className="mt-2">
                        <Button variant="primary" onClick={handleBack}>
                            Volver
                        </Button>
                    </div>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <Card className="shadow">
                <Card.Header className="bg-info text-white d-flex justify-content-between align-items-center">
                    <h3 className="mb-0">
                        <FaUser className="me-2" /> Detalles del Usuario
                    </h3>
                    <Button variant="light" onClick={handleBack}>
                        <FaArrowLeft className="me-1" /> Volver
                    </Button>
                </Card.Header>
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="d-flex align-items-center">
                            <FaUser className="me-3 text-primary" size={20} />
                            <div>
                                <h5 className="mb-0">Nombre</h5>
                                <p className="mb-0">{user.name}</p>
                            </div>
                        </ListGroup.Item>
                        
                        <ListGroup.Item className="d-flex align-items-center">
                            <FaEnvelope className="me-3 text-primary" size={20} />
                            <div>
                                <h5 className="mb-0">Email</h5>
                                <p className="mb-0">{user.email}</p>
                            </div>
                        </ListGroup.Item>
                        
                        <ListGroup.Item className="d-flex align-items-center">
                            <FaShieldAlt className="me-3 text-primary" size={20} />
                            <div>
                                <h5 className="mb-0">Rol</h5>
                                <p className="mb-0">{user.role || 'Usuario'}</p>
                            </div>
                        </ListGroup.Item>
                        
                        {user.createdAt && (
                            <ListGroup.Item className="d-flex align-items-center">
                                <FaCalendarAlt className="me-3 text-primary" size={20} />
                                <div>
                                    <h5 className="mb-0">Fecha de Creación</h5>
                                    <p className="mb-0">
                                        {new Date(user.createdAt).toLocaleDateString()} a las {new Date(user.createdAt).toLocaleTimeString()}
                                    </p>
                                </div>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                    
                    <div className="mt-4 d-flex justify-content-end">
                        <Button variant="info" onClick={() => navigate(`/usuarios/edit/${id}`)}>
                            Editar Usuario
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ViewUser;