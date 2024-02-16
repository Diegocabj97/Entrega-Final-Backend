import React, { useState } from "react";
import { Button, CircularProgress, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import theme from "../utils/theme";
import { useAuth } from "../context/authContext";
import HasCookie from "../utils/hasCookie";

const IndexPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState(null);

  const handleRegisterClick = () => {
    setLoading2(true);
    setTimeout(() => {
      setLoading2(false);
      navigate("/register");
    }, 500);
  };

  const handleLoginClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 500);
  };

  const handleLogoutClick = async () => {
    try {
      setLoading(true);

      // Simular un proceso de carga de 1 segundo antes de realizar el logout
      setTimeout(async () => {
        await logout();
        setLoading(false);
        navigate("/login");
      }, 700);
    } catch (error) {
      setError(error.message);
      setLoading(false); // Desactivar el loader en caso de error
    }
  };

  return (
    <div>
      <Navbar />
      <div className="idxPage">
        <h2 sx={{ variant: "h1" }}>Bienvenido a mi entrega final de Backend</h2>
        <Stack
          marginTop={3}
          alignItems="center"
          spacing={3}
          direction="column"
          sx={{ height: "600px" }}
        >
          {HasCookie() ? (
            <section>
              <Button
                type="submit"
                onClick={handleLogoutClick}
                variant="contained"
                size="medium"
                disabled={loading}
              >
                {loading && <CircularProgress size={24} />} Cerrar Sesión
              </Button>
              {error && <div style={{ color: "red" }}>{error}</div>}
            </section>
          ) : (
            <div>
              <Button
                onClick={handleRegisterClick}
                variant="contained"
                sx={{ width: "150px" }}
                disabled={loading2}
              >
                {loading2 && <CircularProgress size={24} />} Registrarse
              </Button>
              {error && <div style={{ color: "red" }}>{error}</div>}
              <Button
                onClick={handleLoginClick}
                variant="contained"
                sx={{ width: "150px", marginLeft: "10px" }}
                disabled={loading}
              >
                {loading && <CircularProgress size={24} />} Ir al login
              </Button>
              {error && <div style={{ color: "red" }}>{error}</div>}
            </div>
          )}
        </Stack>
      </div>
    </div>
  );
};

export default IndexPage;
