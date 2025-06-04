import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaLock, FaTools, FaCheckCircle } from "react-icons/fa";
import styles from "./Register.module.css";

const Register = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    direccion: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    direccion: "",
    password: "",
    confirmPassword: "",
  });

  // Efecto para redirigir después del registro exitoso
  useEffect(() => {
    if (registrationSuccess) {
      createConfetti();
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [registrationSuccess, navigate]);

  // Función para crear efecto confeti
  const createConfetti = () => {
    const confettiContainer = document.createElement("div");
    confettiContainer.className = styles.confettiContainer;
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div");
      confetti.className = styles.confetti;
      const colors = ["#E74C3C", "#F39C12", "#3498DB"];
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.animationDelay = `${Math.random() * 3}s`;
      confetti.style.animationDuration = `${Math.random() * 2 + 2}s`;
      confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
      if (document.body.contains(confettiContainer)) {
        document.body.removeChild(confettiContainer);
      }
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name: string, value: string): void => {
    switch (name) {
      case "nombre":
        setErrors(prev => ({
          ...prev,
          nombre: !value ? "El nombre es obligatorio" : value.length < 2 ? "Debe tener al menos 2 caracteres" : ""
        }));
        break;

      case "apellido":
        setErrors(prev => ({
          ...prev,
          apellido: !value ? "El apellido es obligatorio" : value.length < 2 ? "Debe tener al menos 2 caracteres" : ""
        }));
        break;

        case "email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setErrors(prev => ({
            ...prev,
            email: !value ? "El email es obligatorio" : !emailRegex.test(value) ? "Formato inválido" : ""
        }));
        break;
        }

        case "telefono": {
        const phoneRegex = /^\+?[0-9]{9,15}$/;
        setErrors(prev => ({
            ...prev,
            telefono: !value ? "El teléfono es obligatorio" : 
                    !phoneRegex.test(value.replace(/\s/g, "")) ? "Formato inválido (9-15 dígitos)" : ""
        }));
        break;
        }

      case "direccion":
        setErrors(prev => ({
          ...prev,
          direccion: !value ? "La dirección es obligatoria" : value.length < 10 ? "Dirección demasiado corta" : ""
        }));
        break;

      case "password":
        setErrors(prev => ({
          ...prev,
          password: !value ? "La contraseña es obligatoria" : 
                   value.length < 6 ? "Debe tener al menos 6 caracteres" : ""
        }));

        if (formData.confirmPassword && value !== formData.confirmPassword) {
          setErrors(prev => ({
            ...prev,
            confirmPassword: "Las contraseñas no coinciden"
          }));
        }
        break;

      case "confirmPassword":
        setErrors(prev => ({
          ...prev,
          confirmPassword: !value ? "Confirmar contraseña es obligatorio" : 
                          value !== formData.password ? "Las contraseñas no coinciden" : ""
        }));
        break;

      default:
        break;
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {...errors};

    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        newErrors[key as keyof typeof errors] = "Este campo es obligatorio";
        valid = false;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulación de llamada API exitosa
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setRegistrationSuccess(true);
    } catch (error) {
      console.error("Error en registro:", error);
      alert("Error al registrar el usuario");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      {registrationSuccess ? (
        <div className={styles.successContainer}>
          <div className={styles.successIcon}>
            <FaCheckCircle />
          </div>
          <h2 className={styles.successTitle}>¡Registro Exitoso!</h2>
          <p className={styles.successMessage}>
            Tu cuenta en FERREMAS ha sido creada correctamente. Redirigiendo al login...
          </p>
        </div>
      ) : (
        <div className={styles.formContainer}>
          {/* Panel izquierdo con imagen y mensaje de bienvenida */}
          <div className={styles.leftPanel}>
            <div className={styles.logoContainer}>
              <div className={styles.logo}>
                <FaTools />
              </div>
              <h1 className={styles.brandName}>FERREMAS</h1>
            </div>

            <div className={styles.welcomeText}>
              <h2>¡Únete a nuestra ferretería!</h2>
              <p>
                Regístrate para acceder a descuentos exclusivos, hacer seguimiento de tus pedidos 
                y gestionar tus compras de materiales y herramientas.
              </p>
            </div>
          </div>

          {/* Panel derecho con el formulario */}
          <div className={styles.rightPanel}>
            <div className={styles.formHeader}>
              <Link to="/login" className={styles.backLink}>
                <FaArrowLeft /> <span>Volver al login</span>
              </Link>
              <h2 className={styles.formTitle}>Registro de Cliente</h2>
            </div>

            <form onSubmit={handleSubmit} className={styles.registerForm}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="nombre">Nombre *</label>
                  <div className={styles.inputContainer}>
                    <FaUser className={styles.inputIcon} />
                    <input
                      id="nombre"
                      type="text"
                      name="nombre"
                      placeholder="Ingresa tu nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.nombre && <p className={styles.errorText}>{errors.nombre}</p>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="apellido">Apellido *</label>
                  <div className={styles.inputContainer}>
                    <FaUser className={styles.inputIcon} />
                    <input
                      id="apellido"
                      type="text"
                      name="apellido"
                      placeholder="Ingresa tu apellido"
                      value={formData.apellido}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.apellido && <p className={styles.errorText}>{errors.apellido}</p>}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Correo electrónico *</label>
                <div className={styles.inputContainer}>
                  <FaEnvelope className={styles.inputIcon} />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="ejemplo@correo.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && <p className={styles.errorText}>{errors.email}</p>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="telefono">Teléfono *</label>
                <div className={styles.inputContainer}>
                  <FaPhone className={styles.inputIcon} />
                  <input
                    id="telefono"
                    type="text"
                    name="telefono"
                    placeholder="+56 9 XXXX XXXX"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </div>
                {errors.telefono && <p className={styles.errorText}>{errors.telefono}</p>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="direccion">Dirección *</label>
                <div className={styles.inputContainer}>
                  <input
                    id="direccion"
                    type="text"
                    name="direccion"
                    placeholder="Calle, número, ciudad"
                    value={formData.direccion}
                    onChange={handleChange}
                  />
                </div>
                {errors.direccion && <p className={styles.errorText}>{errors.direccion}</p>}
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="password">Contraseña *</label>
                  <div className={styles.inputContainer}>
                    <FaLock className={styles.inputIcon} />
                    <input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Mínimo 6 caracteres"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.password && <p className={styles.errorText}>{errors.password}</p>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="confirmPassword">Confirmar contraseña *</label>
                  <div className={styles.inputContainer}>
                    <FaLock className={styles.inputIcon} />
                    <input
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      placeholder="Repite tu contraseña"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.confirmPassword && <p className={styles.errorText}>{errors.confirmPassword}</p>}
                </div>
              </div>

              <div className={styles.formNote}>
                <p>* Todos los campos son obligatorios</p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`${styles.registerButton} ${isSubmitting ? styles.loading : ""}`}
              >
                <div className={styles.buttonContent}>
                  {isSubmitting && <div className={styles.spinner}></div>}
                  {isSubmitting ? "Registrando..." : "Crear cuenta"}
                </div>
              </button>

              <div className={styles.loginLinkContainer}>
                ¿Ya tienes una cuenta?{" "}
                <Link to="/login" className={styles.loginLink}>
                  Inicia sesión
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;