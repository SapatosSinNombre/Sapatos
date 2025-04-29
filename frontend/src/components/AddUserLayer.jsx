import { Icon } from "@iconify/react/dist/iconify.js";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const AddUserLayer = () => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [usuario, setUsuario] = useState({
    nombre: "",
    correo: "",
    organizacion: "",
    contrasena: "",
    rol: "",
    diasordenprom: 0,
    valorordenprom: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Revisar si venimos con datos para editar
  useEffect(() => {
    if (location.state && location.state.usuarioEditar) {
      setUsuario(location.state.usuarioEditar);
    }
  }, [location.state]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const guardarUsuario = async () => {
    setLoading(true);
    setError(null);
    try {
      if (location.state && location.state.usuarioEditar) {
        // Si hay usuario a editar, actualizar
        await axios.put('http://localhost:5000/users/updateUser', usuario);
      } else {
        // Si no, registrar nuevo
        await axios.post('http://localhost:5000/users/register', usuario);
      }
      navigate("/usuarios"); // Redirigir después de guardar
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      setError('Error al guardar usuario: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card h-100 p-0 radius-12">
      <div className="card-body p-24">
        <div className="row justify-content-center">
          <div className="col-xxl-6 col-xl-8 col-lg-10">
            <div className="card border">
              <div className="card-body">
                <h6 className="text-md text-primary-light mb-16">
                  Imagen de perfil
                </h6>

                {/* Cargar Imagen */}
                <div className="mb-24 mt-16">
                  <div className="avatar-upload">
                    <div className="avatar-edit position-absolute bottom-0 end-0 me-24 mt-16 z-1 cursor-pointer">
                      <input
                        type="file"
                        id="imageUpload"
                        accept=".png, .jpg, .jpeg"
                        hidden
                        onChange={handleImageChange}
                      />
                      <label
                        htmlFor="imageUpload"
                        className="w-32-px h-32-px d-flex justify-content-center align-items-center bg-primary-50 text-primary-600 border border-primary-600 bg-hover-primary-100 text-lg rounded-circle"
                      >
                        <Icon icon="solar:camera-outline" className="icon" />
                      </label>
                    </div>
                    <div className="avatar-preview">
                      <div
                        id="imagePreview"
                        style={{
                          backgroundImage: imagePreviewUrl ? `url(${imagePreviewUrl})` : "",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Formulario */}
                <form onSubmit={(e) => { e.preventDefault(); guardarUsuario(); }}>
                  <div className="mb-20">
                    <label htmlFor="name" className="form-label fw-semibold text-primary-light text-sm mb-8">
                      Nombre completo <span className="text-danger-600">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control radius-8"
                      id="name"
                      name="nombre"
                      placeholder="Ingrese el nombre completo"
                      value={usuario.nombre}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-20">
                    <label htmlFor="email" className="form-label fw-semibold text-primary-light text-sm mb-8">
                      Correo electrónico <span className="text-danger-600">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control radius-8"
                      id="email"
                      name="correo"
                      placeholder="Ingrese el correo electrónico"
                      value={usuario.correo}
                      onChange={handleInputChange}
                      disabled={location.state && location.state.usuarioEditar} // No permitir editar correo en edición
                      required
                    />
                  </div>

                  {/* Contraseña solo para agregar, no para editar */}
                  {!location.state && (
                    <div className="mb-20">
                      <label htmlFor="contrasena" className="form-label fw-semibold text-primary-light text-sm mb-8">
                        Contraseña <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="password"
                        className="form-control radius-8"
                        id="contrasena"
                        name="contrasena"
                        placeholder="Ingrese la contraseña"
                        value={usuario.contrasena}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  )}

                  <div className="mb-20">
                    <label htmlFor="organizacion" className="form-label fw-semibold text-primary-light text-sm mb-8">
                      Organización
                    </label>
                    <input
                      type="text"
                      className="form-control radius-8"
                      id="organizacion"
                      name="organizacion"
                      placeholder="Nombre de la organización"
                      value={usuario.organizacion}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-20">
                    <label htmlFor="rol" className="form-label fw-semibold text-primary-light text-sm mb-8">
                      Rol
                    </label>
                    <select
                      className="form-control radius-8 form-select"
                      id="rol"
                      name="rol"
                      value={usuario.rol}
                      onChange={handleInputChange}
                    >
                      <option value="">Seleccionar rol</option>
                      <option value="admin">Admin</option>
                      <option value="proveedor">Proveedor</option>
                      <option value="cliente">Cliente</option>
                      <option value="dueno">Dueño</option>
                    </select>
                  </div>

                  <div className="d-flex align-items-center justify-content-center gap-3">
                    <button
                      type="button"
                      className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                      onClick={() => window.history.back()}
                    >
                      Cancelar
                    </button>

                    <button
                      type="submit"
                      className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8 d-flex align-items-center justify-content-center gap-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          {location.state ? "Actualizando..." : "Guardando..."}
                        </>
                      ) : (
                        location.state ? "Actualizar" : "Guardar"
                      )}
                    </button>
                  </div>

                  {error && (
                    <div className="mt-3 text-danger text-center">
                      {error}
                    </div>
                  )}
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserLayer;
