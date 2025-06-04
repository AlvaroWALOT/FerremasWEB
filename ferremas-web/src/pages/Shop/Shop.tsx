import { useState, useEffect } from "react";
import {
  FaShoppingCart,
  FaSearch,
  FaTimes,
  FaPlus,
  FaMinus,
  FaArrowLeft,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Shop.module.css";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Shop = () => {
  // Estado para los productos
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Estado para el carrito
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Estado para filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Cargar productos (simulando una API)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simulando un retraso de red
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Productos de ejemplo para una ferretería
        const mockProducts: Product[] = [
          {
            id: 1,
            name: "Martillo de Acero",
            description: "Martillo con mango de fibra de vidrio, 16 oz",
            price: 12990,
            category: "herramientas",
            image: "https://m.media-amazon.com/images/I/71x+jQO4SaL._AC_SX679_.jpg",
          },
          {
            id: 2,
            name: "Destornillador Phillips",
            description: "Juego de destornilladores Phillips, 4 piezas",
            price: 8990,
            category: "herramientas",
            image: "https://m.media-amazon.com/images/I/81p+Z5+9MIL._AC_SX679_.jpg",
          },
          {
            id: 3,
            name: "Pintura Blanca",
            description: "Pintura látex blanco mate, 4 litros",
            price: 24990,
            category: "pinturas",
            image: "https://m.media-amazon.com/images/I/71tJ5W3r0BL._AC_SX679_.jpg",
          },
          {
            id: 4,
            name: "Cable Eléctrico",
            description: "Cable THW 2.5mm, 100 metros",
            price: 45990,
            category: "electricidad",
            image: "https://m.media-amazon.com/images/I/71Jd5I+ZWDL._AC_SX679_.jpg",
          },
          {
            id: 5,
            name: "Llave Inglesa",
            description: "Llave ajustable de 8 pulgadas",
            price: 11990,
            category: "herramientas",
            image: "https://m.media-amazon.com/images/I/71y+2qXrWIL._AC_SX679_.jpg",
          },
          {
            id: 6,
            name: "Tornillos Pack 100",
            description: "Tornillos para madera 3x25mm, pack de 100 unidades",
            price: 4990,
            category: "fijaciones",
            image: "https://m.media-amazon.com/images/I/81vVd+7U9IL._AC_SX679_.jpg",
          },
          {
            id: 7,
            name: "Taladro Percutor",
            description: "Taladro inalámbrico 20V con 2 baterías",
            price: 89990,
            category: "herramientas-electricas",
            image: "https://m.media-amazon.com/images/I/71+UB9CjLIL._AC_SX679_.jpg",
          },
          {
            id: 8,
            name: "Cinta Métrica",
            description: "Cinta métrica profesional 5 metros",
            price: 5990,
            category: "medicion",
            image: "https://m.media-amazon.com/images/I/71X5+GHwPIL._AC_SX679_.jpg",
          },
          {
            id: 9,
            name: "Broca para Concreto",
            description: "Juego de brocas para concreto 5 piezas",
            price: 12990,
            category: "accesorios",
            image: "https://m.media-amazon.com/images/I/71JRGvxE5JL._AC_SX679_.jpg",
          },
          {
            id: 10,
            name: "Guantes de Trabajo",
            description: "Guantes anticorte para construcción",
            price: 14990,
            category: "seguridad",
            image: "https://m.media-amazon.com/images/I/81+5YdGz3FL._AC_SX679_.jpg",
          },
        ];

        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar productos:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtrar productos según búsqueda y categoría
  useEffect(() => {
    let result = products;

    if (selectedCategory !== "all") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term)
      );
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, products]);

  // Agregar producto al carrito
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Eliminar producto del carrito
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Actualizar cantidad de un producto en el carrito
  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Calcular total del carrito
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Categorías disponibles
  const categories = [
    { value: "all", label: "Todos los productos" },
    { value: "herramientas", label: "Herramientas Manuales" },
    { value: "herramientas-electricas", label: "Herramientas Eléctricas" },
    { value: "pinturas", label: "Pinturas" },
    { value: "electricidad", label: "Material Eléctrico" },
    { value: "fijaciones", label: "Tornillería y Fijaciones" },
    { value: "medicion", label: "Medición" },
    { value: "seguridad", label: "Seguridad" },
    { value: "accesorios", label: "Accesorios" },
  ];

  return (
    <div className={styles.shopContainer}>
      <div className={styles.shopHeader}>
        <Link to="/" className={styles.backLink}>
          <FaArrowLeft /> <span>Volver</span>
        </Link>
        <h1 className={styles.shopTitle}>Ferretería ConstruMax</h1>
        <button
          className={styles.cartButton}
          onClick={() => setIsCartOpen(true)}
        >
          <FaShoppingCart />
          <span>Carrito</span>
          {cart.length > 0 && (
            <span className={styles.cartCount}>
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </button>
      </div>

      {/* Controles de búsqueda y filtro */}
      <div className={styles.shopControls}>
        <div className={styles.searchContainer}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className={styles.filterSelect}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de productos */}
      {loading ? (
        <div>Cargando productos...</div>
      ) : filteredProducts.length === 0 ? (
        <div>No se encontraron productos.</div>
      ) : (
        <div className={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
              />
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productDescription}>
                  {product.description}
                </p>
                <div className={styles.productPrice}>
                  ${product.price.toLocaleString("es-CL")}
                </div>
                <div className={styles.productActions}>
                  <div className={styles.quantityControls}>
                    <button
                      className={styles.quantityButton}
                      onClick={() => {
                        const cartItem = cart.find(
                          (item) => item.id === product.id
                        );
                        if (cartItem) {
                          updateQuantity(product.id, cartItem.quantity - 1);
                        }
                      }}
                    >
                      <FaMinus />
                    </button>
                    <span className={styles.quantityDisplay}>
                      {cart.find((item) => item.id === product.id)?.quantity ||
                        0}
                    </span>
                    <button
                      className={styles.quantityButton}
                      onClick={() => addToCart(product)}
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <button
                    className={styles.addToCartButton}
                    onClick={() => addToCart(product)}
                  >
                    Añadir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal del carrito */}
      <div
        className={`${styles.cartModalOverlay} ${
          isCartOpen ? styles.open : ""
        }`}
      >
        <div className={styles.cartModal}>
          <div className={styles.cartHeader}>
            <h2 className={styles.cartTitle}>Tu Carrito</h2>
            <button
              className={styles.closeButton}
              onClick={() => setIsCartOpen(false)}
            >
              <FaTimes />
            </button>
          </div>

          <div className={styles.cartItems}>
            {cart.length === 0 ? (
              <div className={styles.emptyCart}>
                <p>Tu carrito está vacío</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.cartItemImage}
                  />
                  <div className={styles.cartItemDetails}>
                    <h3 className={styles.cartItemName}>{item.name}</h3>
                    <p className={styles.cartItemPrice}>
                      ${item.price.toLocaleString("es-CL")} x {item.quantity} =
                      ${(item.price * item.quantity).toLocaleString("es-CL")}
                    </p>
                    <div className={styles.cartItemActions}>
                      <div className={styles.quantityControls}>
                        <button
                          className={styles.quantityButton}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <FaMinus />
                        </button>
                        <span className={styles.quantityDisplay}>
                          {item.quantity}
                        </span>
                        <button
                          className={styles.quantityButton}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <FaPlus />
                        </button>
                      </div>
                      <button
                        className={styles.removeItemButton}
                        onClick={() => removeFromCart(item.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className={styles.cartFooter}>
              <div className={styles.cartTotal}>
                <span>Total:</span>
                <span>${cartTotal.toLocaleString("es-CL")}</span>
              </div>
              <button
                className={styles.checkoutButton}
                onClick={() => {
                  alert(
                    "¡Compra realizada con éxito! Gracias por tu compra en Ferretería ConstruMax."
                  );
                  setCart([]);
                  setIsCartOpen(false);
                }}
              >
                Finalizar Compra
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;