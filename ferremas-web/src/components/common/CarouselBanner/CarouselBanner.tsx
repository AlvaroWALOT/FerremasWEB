import { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./CarouselBanner.module.css";

const CarouselBanner = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      title: "Cuidamos a quien más quieres",
      description: "Atención médica veterinaria de calidad con un equipo profesional",
      buttonText: "Ver servicios veterinarios",
      theme: "veterinaria",
      image: "/src/assets/images/ferreteria1.jpg",
      alt: "Servicios Veterinarios",
      action: () => navigate("/services")
    },
    {
      id: 2,
      title: "Todo para tu mascota en un solo lugar",
      description: "Productos de calidad con entrega rápida a domicilio",
      buttonText: "Visitar nuestra tienda",
      theme: "ecommerce",
      image: "/src/assets/images/ecommerce.jpg",
      alt: "Tienda Online",
      action: () => navigate("/shop")
    },
    {
      id: 3,
      title: "Adopta una vida, cambia dos destinos",
      description: "En Happy Pet trabajamos para dar un nuevo hogar a mascotas rescatadas",
      buttonText: "Conoce nuestras mascotas",
      theme: "adopcion",
      image: "/src/assets/images/adopcion.jpg",
      alt: "Adopciones",
      action: () => navigate("/adoption")
    }
  ];

  const handleSlideChange = (selectedIndex: number) => {
    setIsTransitioning(true);
    setActiveIndex(selectedIndex);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  useEffect(() => {
    const interval = !isHovered
      ? setInterval(() => {
          const nextIndex = (activeIndex + 1) % slides.length;
          setActiveIndex(nextIndex);
        }, 7000)
      : null;

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeIndex, isHovered, slides.length]);

  return (
    <div
      className={`${styles.carouselWrapper} ${
        isTransitioning ? styles.transitioning : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Carousel
        fade
        activeIndex={activeIndex}
        onSelect={handleSlideChange}
        indicators={false}
        controls={false}
        className={styles.carousel}
      >
        {slides.map((slide) => (
          <Carousel.Item key={slide.id}>
            <div className={styles.imageContainer}>
              <img
                className="d-block w-100"
                src={slide.image}
                alt={slide.alt}
                loading="lazy"
              />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Navigation Controls */}
      <div className={styles.customControls}>
        <button
          className={styles.controlPrev}
          onClick={() => handleSlideChange((activeIndex - 1 + slides.length) % slides.length)}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          className={styles.controlNext}
          onClick={() => handleSlideChange((activeIndex + 1) % slides.length)}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>

      {/* Indicators */}
      <div className={styles.customIndicators}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${
              activeIndex === index ? styles.active : ""
            }`}
            onClick={() => handleSlideChange(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Dynamic Content */}
      <div className={styles.mainMessageOverlay}>
        <div
          className={`${styles.mainMessageContent} ${
            styles[`${slides[activeIndex].theme}Message`]
          }`}
        >
          <h1>{slides[activeIndex].title}</h1>
          <p>{slides[activeIndex].description}</p>
          <button
            className={styles.mainActionButton}
            onClick={slides[activeIndex].action}
          >
            {slides[activeIndex].buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarouselBanner;