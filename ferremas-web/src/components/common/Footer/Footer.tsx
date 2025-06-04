import { FaTools, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import styles from "./Footer.module.css";

interface FooterLink {
  text: string;
  url: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
  isContact?: boolean;
}

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Datos estructurados (fácil de modificar)
  const columns: FooterColumn[] = [
    {
      title: "Enlaces Rápidos",
      links: [
        { text: "Inicio", url: "/" },
        { text: "Servicios", url: "/services" },
        { text: "Sobre Nosotros", url: "/about" },
        { text: "Contacto", url: "/contact" },
      ]
    },
    {
      title: "Contacto",
      isContact: true,
      links: [
        { text: "(123) 456-7890", url: "tel:+1234567890" },
        { text: "info@ferremas.com", url: "mailto:info@ferremas.com" },
        { text: "Av. ferremas 123, Ciudad", url: "https://maps.google.com" }
      ]
    }
  ];

  const socialLinks = [
    { icon: <FaFacebook />, url: "#", label: "Facebook" },
    { icon: <FaInstagram />, url: "#", label: "Instagram" },
    { icon: <FaTwitter />, url: "#", label: "Twitter" }
  ];

  return (
    <footer className={styles.footer} aria-label="Pie de página">
      <div className={styles.footerWave}>
        <svg 
          data-name="Layer 1" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            className={styles.waveFill}
          />
        </svg>
      </div>
      
      <div className={styles.footerContent}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            {/* Columna Logo */}
            <div className={styles.footerColumn}>
              <div className={styles.footerLogo}>
                <FaTools className={styles.logoIcon} aria-hidden="true" />
                <span>Ferremas</span>
              </div>
              <p className={styles.footerDesc}>
                Tu aliado en cada proyecto. Calidad, asesoría experta y las mejores herramientas bajo un mismo techo.
              </p>
            </div>

            {/* Columnas dinámicas */}
            {columns.map((column, index) => (
              <div key={index} className={styles.footerColumn}>
                <h3 className={styles.footerHeading}>{column.title}</h3>
                
                {column.isContact ? (
                  <ul className={styles.footerContact}>
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex} className={styles.contactItem}>
                        {linkIndex === 0 && <FaPhone className={styles.contactIcon} aria-hidden="true" />}
                        {linkIndex === 1 && <FaEnvelope className={styles.contactIcon} aria-hidden="true" />}
                        {linkIndex === 2 && <FaMapMarkerAlt className={styles.contactIcon} aria-hidden="true" />}
                        <a href={link.url} className={styles.contactLink}>{link.text}</a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className={styles.footerLinks}>
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a href={link.url} className={styles.footerLink}>{link.text}</a>
                      </li>
                    ))}
                  </ul>
                )}

                {column.isContact && (
                  <div className={styles.socialLinks}>
                    {socialLinks.map((social, socialIndex) => (
                      <a 
                        key={socialIndex} 
                        href={social.url} 
                        className={styles.socialIcon} 
                        aria-label={social.label}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className={styles.footerBottomBar}>
            <p className={styles.copyright}>
              © {currentYear} Ferremas - Todos los derechos reservados
            </p>
            <div className={styles.footerBottomLinks}>
              <a href="/privacy" className={styles.bottomLink}>Privacidad</a>
              <a href="/terms" className={styles.bottomLink}>Términos</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;