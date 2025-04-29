import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSave, FaTimes, FaArrowLeft, FaUserEdit } from 'react-icons/fa';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';

function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ 
        name: '', 
        email: '', 
        password: '',
        role: 'user'
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`https://184.72.119.254/usuarios/${id}`);
                
                if (!response.ok) {
                    throw new Error('Usuario no encontrado');
                }
                
                const data = await response.json();
                setForm(data);
                setLoading(false);
            } catch (err) {
                setErrors({ fetch: err.message });
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const validateForm = () => {
        const newErrors = {};
        
        if (!form.name) newErrors.name = "Nombre es obligatorio";
        if (!form.email) {
            newErrors.email = "Email es obligatorio";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Email no válido";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setIsSubmitting(true);
        
        try {
            const response = await fetch(`https://184.72.119.254/usuarios/editar/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el usuario');
            }

            navigate('/usuarios', {
                state: { message: 'Usuario actualizado correctamente' }
            });
        } catch (err) {
            setErrors({ submit: err.message });
            setIsSubmitting(false);
        }
    };

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

    if (errors.fetch) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">
                    {errors.fetch}
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
                <Card.Header className="bg-warning text-white d-flex justify-content-between align-items-center">
                    <h3 className="mb-0">
                        <FaUserEdit className="me-2" /> Editar Usuario
                    </h3>
                    <Button variant="light" onClick={handleBack}>
                        <FaArrowLeft className="me-1" /> Volver
                    </Button>
                </Card.Header>
                <Card.Body>
                    {errors.submit && <Alert variant="danger">{errors.submit}</Alert>}
                    
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre Completo</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Dejar en blanco para no cambiar"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                            />
                            <Form.Text muted>
                                Dejar vacío si no deseas cambiar la contraseña
                            </Form.Text>
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2">
                            <Button 
                                variant="secondary" 
                                onClick={handleBack}
                                disabled={isSubmitting}
                            >
                                <FaTimes className="me-1" /> Cancelar
                            </Button>
                            <Button 
                                variant="warning" 
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Spinner as="span" animation="border" size="sm" /> Actualizando...
                                    </>
                                ) : (
                                    <>
                                        <FaSave className="me-1" /> Actualizar Usuario
                                    </>
                                )}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default EditUser;