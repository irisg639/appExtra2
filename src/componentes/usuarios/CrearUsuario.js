import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSave, FaTimes, FaArrowLeft, FaUserPlus } from 'react-icons/fa';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';

function CreateUser() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ 
        name: '', 
        email: '', 
        password: '',
        role: 'user'
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        
        if (!form.name) newErrors.name = "Nombre es obligatorio";
        if (!form.email) {
            newErrors.email = "Email es obligatorio";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Email no válido";
        }
        if (!form.password) {
            newErrors.password = "Contraseña es obligatoria";
        } else if (form.password.length < 6) {
            newErrors.password = "Mínimo 6 caracteres";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setIsSubmitting(true);
        
        try {
            const response = await fetch('https://184.72.119.254/usuarios/crear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });

            if (!response.ok) {
                throw new Error('Error al crear el usuario');
            }

            navigate('/usuarios', {
                state: { message: 'Usuario creado correctamente' }
            });
        } catch (err) {
            setErrors({ submit: err.message });
            setIsSubmitting(false);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <Container className="mt-4">
            <Card className="shadow">
                <Card.Header className="bg-success text-white d-flex justify-content-between align-items-center">
                    <h3 className="mb-0">
                        <FaUserPlus className="me-2" /> Crear Nuevo Usuario
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
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                            <Form.Text muted>
                                Mínimo 6 caracteres
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
                                variant="success" 
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Spinner as="span" animation="border" size="sm" /> Creando...
                                    </>
                                ) : (
                                    <>
                                        <FaSave className="me-1" /> Crear Usuario
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

export default CreateUser;