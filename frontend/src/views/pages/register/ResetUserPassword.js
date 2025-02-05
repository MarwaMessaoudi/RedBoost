import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import backlogin from "../../../assets/images/backlogin.jpg";

const ResetUserPassword = () => {
  const { token } = useParams(); // Get the token from the URL
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Client-side validation
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    try {
      // Log the request payload
      console.log("Sending request with:", { token, password });
      const response = await axiosInstance.post("/api/reset-password", {
        token,
        password,
      });
      // Log the response
      console.log("Response:", response.data);
      setSuccess(response.data.message);
      setError("");
      setTimeout(() => navigate("/"), 3000); // Redirect to login after 3 seconds
    } catch (err) {
      // Log the error
      console.error("Error:", err.response?.data);
      setError(err.response?.data?.message || "Erreur inattendue.");
      setSuccess("");
    }
  };

  return (
    <div
      className="h-screen flex justify-center items-center"
      style={{
        backgroundImage: `url(${backlogin})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md w-96"
        style={{ backdropFilter: "blur(10px)" }}
      >
        <h2 className="text-2xl font-bold text-center mb-4">Réinitialiser votre mot de passe</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Nouveau mot de passe</label>
          <input
            type="password"
            className="w-full p-2 border rounded mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="block mb-2">Confirmez le mot de passe</label>
          <input
            type="password"
            className="w-full p-2 border rounded mb-3"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            Réinitialiser
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetUserPassword;