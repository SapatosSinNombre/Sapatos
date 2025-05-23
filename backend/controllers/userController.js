const { connection } = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { correo, nombre, organizacion, contrasena, rol } = req.body;

  if (!correo || !nombre || !contrasena) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const contrasenaHash = await bcrypt.hash(contrasena, 10);
    const query = "INSERT INTO DBADMIN.Usuarios (Correo, Nombre, Organizacion, Contrasena, Rol) VALUES (?, ?, ?, ?, ?)";
    const params = [correo, nombre, organizacion, contrasenaHash, rol];

    connection.exec(query, params, (err) => {
      if (err) {
        console.error("Insert Error:", err);
        return res.status(500).json({ error: "Server error" });
      }
      res.status(201).json({ message: "User registered successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const query = "SELECT correo, nombre, organizacion, contrasena, rol FROM DBADMIN.Usuarios WHERE correo = ?";
    const params = [correo];

    connection.exec(query, params, async (err, result) => {
      if (err) {
        console.error("Query Error:", err);
        return res.status(500).json({ error: "Server error" });
      }
      if (!result || result.length === 0) {
        return res.status(404).json({ error: "Email or password incorrect" });
      }      

      const user = result[0];
      const contrasenaMatch = await bcrypt.compare(contrasena, user.CONTRASENA);
      
      if (!contrasenaMatch) {
        return res.status(401).json({ error: "Email or password incorrect" });
      }
      
      // Generate JWT
      const token = jwt.sign(
        {
          CORREO: user.CORREO,
          ROL: user.ROL,
          ORGANIZACION: user.ORGANIZACION
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      
      // Secure auth token in HttpOnly cookie
      res.cookie("Auth", token, {
        httpOnly: true,
        secure: false, // Set to true in production (HTTPS required)
        sameSite: "Lax",
        maxAge: 3600000 // 1 hour
      });
      
      res.cookie("UserData", JSON.stringify({
        CORREO: user.CORREO,
        ROL: user.ROL,
        ORGANIZACION: user.ORGANIZACION,
        NOMBRE: user.NOMBRE // added for clarity
      }), {
        httpOnly: false,
        secure: false, // true in prod
        sameSite: "Lax",
        maxAge: 3600000
      });
      

      //console.log("Logged in")
      return res.json({ message: "Login successful" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};


const getUsers = async (req, res) => {
  try {
    const query = "SELECT correo, nombre, organizacion, contrasena, rol, fechacreacion FROM DBADMIN.Usuarios";

    connection.exec(query, [], (err, result) => {
      if (err) {
        console.error("Error fetching users:", err);
        return res.status(500).json({ error: "Server error" });
      }
      res.status(200).json(result);
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getSession = async (req, res) => {
  const token = req.cookies.Auth;  // Read the cookie
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  return res.json({ token });
}

const logoutUser = async (req, res) => {
  res.clearCookie("Auth", { path: "/", httpOnly: true, secure: false, sameSite: "Lax" });
  res.status(200).json({ message: "Sesión cerrada" });
};


module.exports = { registerUser, loginUser, getUsers, getSession, logoutUser };
