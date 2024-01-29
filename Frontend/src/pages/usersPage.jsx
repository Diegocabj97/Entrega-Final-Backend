import React, { useContext, useEffect, useState } from "react";
import { URLBACK } from "../App.jsx";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import Navbar from "../components/navbar/navbar.jsx";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const isAdmin = () => {
    const userInfo = localStorage.getItem("userData");

    const token = getCookieValue("jwtCookie");
    const user = JSON.parse(userInfo);
    if (user && token) {
      return user.role === "2635JDA";
    }
    return false;
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = getCookieValue("jwtCookie");
        const user = localStorage.getItem("userData");
        if (!user) {
          throw new Error("No se pudo obtener el token.");
        }

        const userRole = JSON.parse(user).role;

        const response = await fetch(`${URLBACK}/api/users`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
            role: userRole,
          },
          credentials: "include",
        });

        if (!response.ok) {
          console.log("Usted no tiene permisos necesarios");
        }

        const data = await response.json();
        const usersData = data.mensaje;
        setUsers(usersData);
        console.log("haciendo fetch...");
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
      const token = getCookieValue("jwtCookie");
      if (!token) {
        console.log("Debes iniciar sesión!");
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

  const getCookieValue = (name) => {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=").map((c) => c.trim());
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  };

  useEffect(() => {
    // Redirige a la página de inicio después de 5 segundos si no hay usuario
    const redirectIfNoUser = setTimeout(() => {
      const token = getCookieValue("jwtCookie");
      if (!token) {
        navigate("/");
      }
    }, 2000);

    return () => clearTimeout(redirectIfNoUser);
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <div>
        {isAdmin() === true ? (
          <div>
            <div>Estos son todos los usuarios</div>
            <Container
              sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                margin: "50px",
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
        ) : (
          <div>
            <h1>Usted no tiene permisos para ver todos los usuarios</h1>
            <h2>Será redirigido a la pagina de inicio...</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
