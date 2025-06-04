import { Link } from "react-router-dom";
import { FaShoppingCart, FaTools } from "react-icons/fa";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Logo y nombre de la marca */}
        <Link to="/" className={styles.logoContainer}>
          <FaTools className={styles.logoIcon} />
          <h1 className={styles.brandName}>FERREMAS</h1>
        </Link>

        {/* Navegación principal */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/" className={styles.navLink}>
                Inicio
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/products" className={styles.navLink}>
                Productos
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/services" className={styles.navLink}>
                Servicios
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/contact" className={styles.navLink}>
                Contacto
              </Link>
            </li>
          </ul>
        </nav>

        {/* Carrito de compras */}
        <div className={styles.cartContainer}>
          <Link to="/cart" className={styles.cartLink}>
            <FaShoppingCart className={styles.cartIcon} />
            <span className={styles.cartText}>Carrito</span>
            {/* Opcional: Mostrar cantidad de items */}
            {/* <span className={styles.cartBadge}>3</span> */}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;