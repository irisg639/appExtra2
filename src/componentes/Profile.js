import { useNavigate } from "react-router-dom";

const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    if (!user) {
        navigate("/");
        return null;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Perfil de Usuario</h2>
            <div className="p-3 border rounded bg-light">
                <p><strong>Nombre:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <button className="btn btn-secondary" onClick={() => navigate("/")}>
                    Volver
                </button>
            </div>
        </div>
    );
};

export default Profile;
