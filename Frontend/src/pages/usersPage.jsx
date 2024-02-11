import React, { useContext, useEffect, useState } from "react";
import { URLBACK } from "../App.jsx";
import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import Navbar from "../components/navbar/navbar.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";
import HasCookie from "../utils/hasCookie.jsx";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${URLBACK}/api/users`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
            role: token.role,
          },
          credentials: "include",
        });
        const data = await response.json();
        const usersData = data.mensaje;
        setUsers(usersData);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    fetchUsers();

    const intervalId = setInterval(fetchUsers, 5000);
    return () => clearInterval(intervalId);
  }, [navigate]);
  const handleClick = (userId) => {
    deleteUser(userId);
  };
  const deleteUser = async (userId) => {
    try {
      if (!token) {
        navigate("/login");
      } else {
        const response = await fetch(`${URLBACK}/api/users/${userId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            jwtCookie: `${token}`,
          },
        });
        if (response.ok) {
          // Actualizar la lista de usuarios en el estado local después de la eliminación
          const updatedUsers = users.filter((user) => user._id !== userId);
          setUsers(updatedUsers);
        }
      }
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  useEffect(() => {
    // Redirige a la página de inicio después de 5 segundos si no hay usuario
    const redirectIfNoUser = setTimeout(() => {
      if (!token) {
        navigate("/");
      } else {
        // Desactiva el loader después de 1 segundo
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(redirectIfNoUser);
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <div style={{ margin: "auto" }}>
        <div>
          {HasCookie() ? (
            loading ? (
              <CircularProgress size={48} />
            ) : (
              <div>
                <h1>Estos son todos los usuarios</h1>
                <Container
                  sx={{
                    height: "100vh",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                  fixed
                >
                  {users.map((user) => (
                    <Card
                      key={user._id}
                      sx={{
                        margin: "20px",
                        minWidth: 220,
                        maxWidth: 345,
                        maxHeight: 400,
                        boxShadow: "0px 0px 25px 0px rgba(15, 0, 90, 0.9)",
                      }}
                    >
                      <CardMedia
                        sx={{ height: 140 }}
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="green iguana"
                      />
                      <CardContent sx={{ height: 120 }}>
                        <Typography gutterBottom variant="h5" component="div">
                          {user.first_name} {user.last_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Email: {user.email}
                        </Typography>
                      </CardContent>
                      <CardActions
                        sx={{
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          onClick={() => {
                            handleClick(user._id);
                          }}
                          variant="contained"
                          color="success"
                        >
                          Eliminar usuario
                        </Button>
                      </CardActions>
                    </Card>
                  ))}
                </Container>
              </div>
            )
          ) : (
            <div>
              <h1>Usted no tiene permisos para ver todos los usuarios</h1>
              <h2>Serás redireccionado a la pagina de inicio...</h2>
            </div>
            /*  <div>
            <h1>Usted no tiene permisos para ver todos los usuarios</h1>
            <h2>Será redirigido a la pagina de inicio...</h2>
          </div> */
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
