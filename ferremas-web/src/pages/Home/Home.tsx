import { FaTools, FaHardHat, FaTruck } from "react-icons/fa";
import CarouselBanner from "../../components/common/CarouselBanner/CarouselBanner";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <CarouselBanner />
      
      <section className={styles.aboutSection}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            <FaTools className={styles.toolIcon} /> FERREMAS
          </h1>
          
          <div className={styles.contentBox}>
            <p className={styles.description}>
              En FERREMAS llevamos más de 30 años siendo tu aliado en construcción y mejoras del hogar. 
              Con las mejores marcas, asesoría profesional y un amplio catálogo de productos, 
              te ayudamos a hacer realidad tus proyectos con calidad y garantía.
            </p>
            
            <p className={styles.description}>
              Nuestro compromiso va más allá de la venta: ofrecemos servicios de instalación, 
              asesoría técnica especializada y entregas rápidas. Porque en FERREMAS entendemos 
              que cada proyecto es único y merece soluciones a la medida.
            </p>
          </div>
        </div>
      </section>
      
      <section className={styles.servicesPreview}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Nuestros Servicios</h2>
          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <FaTools />
              </div>
              <h3>Venta de Materiales</h3>
              <p>Todo en materiales de construcción, herramientas y artículos para el hogar</p>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <FaHardHat />
              </div>
              <h3>Asesoría Técnica</h3>
              <p>Expertos en construcción listos para resolver tus dudas y necesidades</p>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <FaTruck />
              </div>
              <h3>Entrega a Domicilio</h3>
              <p>Servicio de transporte para tus compras mayores con personal especializado</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;