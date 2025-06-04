import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaTools, FaChevronDown, FaHammer, FaHome, FaShoppingCart } from "react-icons/fa";
import styles from "./Header.module.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleProducts = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsProductsOpen(!isProductsOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsProductsOpen(false);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <nav className={styles.container}>
        <div className={styles.navWrapper}>
          <NavLink to="/" className={styles.brand} onClick={closeMenu}>
            <FaTools className={styles.logo} /> FERREMAS
          </NavLink>

          <button
            className={styles.hamburger}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Menú"
          >
            <span className={styles.hamburgerIcon}></span>
          </button>

          <div className={`${styles.navMenu} ${isMenuOpen ? styles.showMenu : ""}`}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <NavLink
                  to="/"
                  className={({ isActive }) => 
                    `${styles.navLink} ${isActive ? styles.activeNavLink : ""}`
                  }
                  onClick={closeMenu}
                >
                  <FaHome className={styles.navIcon} /> Inicio
                </NavLink>
              </li>

              <li className={`${styles.navItem} ${styles.specialtiesItem}`}>
                <button
                  className={`${styles.navLink} ${
                    isProductsOpen ? styles.activeNavLink : ""
                  }`}
                  onClick={toggleProducts}
                >
                  <FaHammer className={styles.navIcon} /> Productos <FaChevronDown className={styles.chevron} />
                </button>
                {isProductsOpen && (
                  <ul className={styles.subMenu}>
                    <NavLink
                      to="/herramientas-electricas"
                      className={styles.subNavLink}
                      onClick={closeMenu}
                    >
                      Herramientas Eléctricas
                    </NavLink>
                    <NavLink
                      to="/materiales-construccion"
                      className={styles.subNavLink}
                      onClick={closeMenu}
                    >
                      Materiales de Construcción
                    </NavLink>
                    <NavLink
                      to="/fontaneria"
                      className={styles.subNavLink}
                      onClick={closeMenu}
                    >
                      Fontanería
                    </NavLink>
                    <NavLink
                      to="/pinturas"
                      className={styles.subNavLink}
                      onClick={closeMenu}
                    >
                      Pinturas
                    </NavLink>
                  </ul>
                )}
              </li>

              <li className={styles.navItem}>
                <NavLink
                  to="/servicios"
                  className={({ isActive }) => 
                    `${styles.navLink} ${isActive ? styles.activeNavLink : ""}`
                  }
                  onClick={closeMenu}
                >
                  <FaTools className={styles.navIcon} /> Servicios
                </NavLink>
              </li>

              <li className={styles.navItem}>
                <NavLink
                  to="/contacto"
                  className={({ isActive }) => 
                    `${styles.navLink} ${isActive ? styles.activeNavLink : ""}`
                  }
                  onClick={closeMenu}
                >
                  Contacto
                </NavLink>
              </li>

              <li className={styles.navItem}>
                <NavLink
                  to="/carrito"
                  className={({ isActive }) => 
                    `${styles.navLink} ${isActive ? styles.activeNavLink : ""}`
                  }
                  onClick={closeMenu}
                >
                  <FaShoppingCart className={styles.navIcon} /> Carrito
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;