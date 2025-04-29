const BASE_URL = "https://18.116.62.128/";

export async function getAllUsers() {
    const response = await fetch(BASE_URL + 'users/');
    return response.json();
}

export async function getUserById(id) {
    const response = await fetch(BASE_URL + `users/${id}`);
    return response.json();
}

export async function createUser(user) {
    const response = await fetch(BASE_URL + 'users/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
    return response.json();
}

export async function updateUser(id, user) {
    const response = await fetch(BASE_URL + `users/edit/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
    return response.json();
}

export async function deleteUser(id) {
    await fetch(BASE_URL + `users/delete/${id}`, {
        method: 'DELETE',
    });
}

export const loginUser = async (credentials) => {
    try {
        const response = await fetch(BASE_URL + 'users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            throw new Error(`Error en el login: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error en loginUser:", error);
        return { error: "Error al iniciar sesión" };
    }
};
