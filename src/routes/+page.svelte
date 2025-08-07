<script>
  import { onMount } from "svelte";
  import { db } from "$lib/assets/js/firebase";
  import { collection, getDocs } from "firebase/firestore";

  // Variables reactivas
  let productos = [];
  let cargando = true;
  let currentSlide = 0;
  let cartCount = 3;
  let selectedCategory = "todos";

  // Cargar productos desde Firestore
  onMount(async () => {
    try {
      const snapshot = await getDocs(collection(db, "productos"));
      productos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      console.error("Error al cargar productos:", e);
    } finally {
      cargando = false;
    }
  });

  // Funciones de navegación
  const changeCategory = (category) => {
    selectedCategory = category;
  };

  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % 3;
  };

  const prevSlide = () => {
    currentSlide = (currentSlide - 1 + 3) % 3;
  };

  // Filtrar productos por categoría
  const filteredProducts = () => {
    if (selectedCategory === "todos") return productos;
    return productos.filter((p) => p.categoria === selectedCategory);
  };
</script>

<svelte:head>
  <title>NewStyle - Tienda de Zapatos Premium</title>
  <meta
    name="description"
    content="Encuentra los mejores zapatos de calidad para hombre, mujer y niños en Zapatopia. Envío gratis por compras superiores a $299.900"
  />
</svelte:head>

<!-- Hero Section -->
<section class="hero-section">
  <div class="container text-center">
    <h1 class="hero-title">Encuentra tu estilo perfecto</h1>
    <p class="hero-subtitle">
      Calzado de calidad para cada ocasión, diseñado para tu comodidad y estilo.
    </p>
    <div class="d-flex justify-content-center gap-3">
      <a href="/productos" class="btn btn-light btn-lg px-4 py-2 rounded-pill">
        <i class="bi bi-cart me-2"></i> Comprar ahora
      </a>
    </div>
  </div>
</section>

<!-- Banner de envío gratis -->
<section class="container mb-5">
  <div class="shipping-banner">
    <div class="row align-items-center">
      <div class="col-md-4 text-center mb-4 mb-md-0">
        <img
          src="https://i.pinimg.com/736x/06/05/80/0605808a85fd8f2bdf2a55d3770b8b8b.jpg"
          class="shipping-image"
          alt="Sandalia mujer"
        />
      </div>
      <div class="col-md-4 text-center">
        <div class="shipping-icon">
          <i class="bi bi-truck"></i>
        </div>
        <h2 class="fw-bold mb-3">Envío <strong>GRATIS</strong></h2>
        <p class="fs-5">Por compras superiores a <strong>$299.900</strong></p>
        <a class="btn btn-light btn-lg px-4 rounded-pill mt-2" href="/">
          <i class="bi bi-cart me-2"></i> Comprar ahora
        </a>
        <p class="mt-3 small opacity-75">Exclusivo online • Aplican TyC</p>
      </div>
      <div class="col-md-4 text-center">
        <img
          src="https://i.pinimg.com/736x/45/da/eb/45daeb6aaa38dfd41f43bbf0e886861d.jpg"
          class="shipping-image"
          alt="Zapatilla hombre"
        />
      </div>
    </div>
  </div>
</section>

<!-- Sección de características -->
<section class="features-section">
  <div class="container">
    <div class="row text-center">
      <div class="col-md-3 mb-4 mb-md-0">
        <div class="feature-box">
          <div class="feature-icon">
            <i class="bi bi-truck"></i>
          </div>
          <h5>Envío Rápido</h5>
          <p>Recibe tus productos en 24-48 horas</p>
        </div>
      </div>
      <div class="col-md-3 mb-4 mb-md-0">
        <div class="feature-box">
          <div class="feature-icon">
            <i class="bi bi-arrow-left-right"></i>
          </div>
          <h5>Devoluciones Fáciles</h5>
          <p>30 días para cambiar tu producto</p>
        </div>
      </div>
      <div class="col-md-3 mb-4 mb-md-0">
        <div class="feature-box">
          <div class="feature-icon">
            <i class="bi bi-shield-check"></i>
          </div>
          <h5>Pago Seguro</h5>
          <p>Protegemos tus datos personales</p>
        </div>
      </div>
      <div class="col-md-3">
        <div class="feature-box">
          <div class="feature-icon">
            <i class="bi bi-headset"></i>
          </div>
          <h5>Soporte 24/7</h5>
          <p>Asistencia personalizada siempre</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Sección de productos -->
<section class="container my-5" id="productos">
  <div class="d-flex justify-content-between align-items-center mb-4"></div>

  <!-- Estado de carga -->
  {#if cargando}
    <div class="row">
      <div class="col-12 text-center py-5">
        <div class="spinner-border loading-spinner" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
        <p class="mt-3">Cargando productos...</p>
      </div>
    </div>

    <!-- Sin productos -->
  {:else if productos.length === 0}
    <div class="row">
      <div class="col-12 text-center py-5">
        <i class="bi bi-exclamation-circle fs-1 text-secondary"></i>
        <h3 class="mt-3">No hay productos disponibles</h3>
        <p>Pronto tendremos nuevos productos en nuestra tienda</p>
      </div>
    </div>

    <!-- Lista de productos -->
  {:else}
    <div class="row g-4">
      <!-- Productos -->
      <div class="col-12 col-lg-8">
        <div class="row w-100">
          <div class="col-md-6">
            <h2 class="section-title">Nuestros Productos Destacados</h2>
          </div>
          <div class="col-md-6">
            <div class="btn-group" role="group">
              <button
                class="btn category-btn {selectedCategory === 'todos'
                  ? 'active'
                  : 'btn-outline-primary'}"
                on:click={() => changeCategory("todos")}
              >
                Todos
              </button>
              <button
                class="btn category-btn {selectedCategory === 'Hombre'
                  ? 'active'
                  : 'btn-outline-primary'}"
                on:click={() => changeCategory("Hombre")}
              >
                Hombre
              </button>
              <button
                class="btn category-btn {selectedCategory === 'Mujer'
                  ? 'active'
                  : 'btn-outline-primary'}"
                on:click={() => changeCategory("Mujer")}
              >
                Mujer
              </button>
            </div>
          </div>
        </div>
        <div class="row row-cols-1 row-cols-md-2 g-4">
          {#each filteredProducts() as p}
            <div class="col">
              <div class="card-product px-3 py-4">
                <div class="card-img-container">
                  <img src={p.imagen} alt={p.nombre} class="img-fluid" />
                  {#if p.destacado}
                    <span class="badge bg-danger badge-discount">Destacado</span
                    >
                  {/if}
                  <span class="badge bg-info category-badge">
                    {p.categoria.charAt(0).toUpperCase() + p.categoria.slice(1)}
                  </span>
                </div>
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-start">
                    <div>
                      <h5 class="product-title">{p.nombre}</h5>
                      <p class="product-model">{p.marca} · {p.modelo}</p>
                      <div class="rating">
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-half"></i>
                        <span class="text-muted ms-2">(42)</span>
                      </div>
                    </div>
                  </div>
                  <div class="price-container mt-3">
                    <div>
                      <div class="current-price">
                        $ {p.precio.toLocaleString("es-CO")}
                      </div>
                    </div>
                    <button class="btn-details">
                      <i class="bi bi-cart me-1"></i> Añadir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Carrusel lateral y promociones -->
      <div class="col-12 col-lg-4 mt-5 mt-lg-0">
        <div class="promo-section">
          <h3 class="section-title">Promociones</h3>

          <!-- Carrusel de promociones -->
          <div class="promo-card">
            <div class="position-relative">
              {#if currentSlide === 0}
                <img
                  src="https://i.pinimg.com/736x/28/a7/31/28a73190ddc0879a30d3fb6fdb6cd3d8.jpg"
                  alt="Promoción 1"
                />
              {:else if currentSlide === 1}
                <img
                  src="https://i.pinimg.com/736x/f7/71/54/f77154218233b60a149d584803e47816.jpg"
                  alt="Promoción 2"
                />
              {:else}
                <img
                  src="https://i.pinimg.com/736x/ba/d4/35/bad435a4a198ff94f0b6994eaa94fb68.jpg"
                  alt="Promoción 3"
                />
              {/if}

              <!-- svelte-ignore a11y_consider_explicit_label -->
              <div class="position-absolute top-0 end-0 p-3">
                <button
                  class="btn btn-sm btn-light rounded-circle me-1"
                  on:click={prevSlide}
                >
                  <i class="bi bi-chevron-left"></i>
                </button>
                <button
                  class="btn btn-sm btn-light rounded-circle"
                  on:click={nextSlide}
                >
                  <i class="bi bi-chevron-right"></i>
                </button>
              </div>

              <div class="carousel-caption bg-dark bg-opacity-75 p-3 rounded-3">
                <h5>
                  {#if currentSlide === 0}
                    Rebajas de temporada
                  {:else if currentSlide === 1}
                    Nueva colección
                  {:else}
                    Envío gratuito
                  {/if}
                </h5>
                <p class="mb-0">
                  {#if currentSlide === 0}
                    Aprovecha descuentos en referencias seleccionadas
                  {:else if currentSlide === 1}
                    Descubre lo nuevo en calzado urbano
                  {:else}
                    Por compras mayores a $299.900
                  {/if}
                </p>
              </div>
            </div>
          </div>

          <!-- Tarjetas de promoción adicionales -->
          <div class="promo-card">
            <img
              src="https://i.pinimg.com/736x/06/05/80/0605808a85fd8f2bdf2a55d3770b8b8b.jpg"
              alt="Promoción 4"
            />
            <div class="promo-content">
              <h5 class="fw-bold">Colección Verano 2023</h5>
              <p class="mb-2">Sandalia y calzado fresco para esta temporada</p>
              <a href="/" class="btn btn-sm btn-outline-primary"
                >Ver colección</a
              >
            </div>
          </div>

          <div class="promo-card">
            <img
              src="https://i.pinimg.com/1200x/5b/29/ae/5b29ae274109c43979f87518001c8636.jpg"
              alt="Promoción 5"
            />
            <div class="promo-content">
              <h5 class="fw-bold">Outlet Especial</h5>
              <p class="mb-2">Hasta 50% de descuento en modelos anteriores</p>
              <a href="/" class="btn btn-sm btn-outline-primary">Ver ofertas</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</section>

<style>
  /* Variables CSS */
  :root {
    --primary: #0d6efd;
    --secondary: #6c757d;
    --dark: #212529;
    --light: #f8f9fa;
    --accent: #dc3545;
    --success: #198754;
    --border-radius: 12px;
  }

  /* Componentes reutilizables */
  .section-title {
    position: relative;
    margin-bottom: 30px;
    padding-bottom: 15px;
    font-weight: 700;
    color: var(--dark);
    font-size: 1.8rem;
  }

  .section-title:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: var(--accent);
  }

  /* Hero Section */
  .hero-section {
    background: url("https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80");
    background-size: cover;
    background-position: center;
    color: white;
    padding: 100px 0;
    margin-bottom: 40px;
  }

  .hero-title {
    font-weight: 700;
    font-size: 3rem;
    margin-bottom: 20px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .hero-subtitle {
    font-size: 1.2rem;
    max-width: 600px;
    margin: 0 auto 30px;
  }

  /* Banner de envío */
  .shipping-banner {
    background: linear-gradient(to right, var(--primary), #0b5ed7);
    border-radius: var(--border-radius);
    color: white;
    padding: 30px;
    margin-bottom: 50px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  .shipping-icon {
    font-size: 3rem;
    margin-bottom: 15px;
  }

  .shipping-image {
    border: 3px solid white;
    border-radius: 10px;
    max-height: 180px;
    transition: transform 0.3s;
  }

  .shipping-image:hover {
    transform: scale(1.03);
  }

  /* Tarjetas de producto */
  .card-product {
    transition: all 0.3s ease;
    border-radius: var(--border-radius);
    overflow: hidden;
    border: none;
    height: 100%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    background: white;
  }

  .card-product:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }

  .card-img-container {
    height: 240px;
    overflow: hidden;
    position: relative;
    background-color: #f8f9fa;
  }

  .card-img-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .card-product:hover .card-img-container img {
    transform: scale(1.05);
  }

  .badge-discount {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: var(--accent);
    font-weight: 600;
    padding: 5px 15px;
    border-radius: 20px;
    z-index: 2;
  }

  .category-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 2;
    background-color: var(--primary);
  }

  .product-title {
    font-weight: 600;
    margin-bottom: 5px;
    font-size: 1.1rem;
    color: var(--dark);
  }

  .product-model {
    color: #6c757d;
    font-size: 0.9rem;
    margin-bottom: 10px;
  }

  .price-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
  }

  .current-price {
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--accent);
  }

  .btn-details {
    background-color: var(--primary);
    color: white;
    border-radius: 30px;
    padding: 8px 20px;
    font-weight: 500;
    transition: all 0.3s;
    border: none;
  }

  .btn-details:hover {
    background-color: #0b5ed7;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .rating {
    color: #ffc107;
    margin-bottom: 10px;
  }

  /* Carousel lateral */
  .promo-section {
    position: sticky;
    top: 90px;
  }

  .promo-card {
    border-radius: var(--border-radius);
    overflow: hidden;
    margin-bottom: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
  }

  .promo-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  .promo-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .promo-content {
    padding: 20px;
    background-color: white;
  }

  /* Features */
  .features-section {
    background-color: white;
    padding: 60px 0;
    margin: 50px 0;
  }

  .feature-box {
    text-align: center;
    padding: 30px;
    border-radius: 10px;
    transition: all 0.3s ease;
    height: 100%;
  }

  .feature-box:hover {
    background-color: #f8f9fa;
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  }

  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: var(--primary);
  }

  /* Spinner */
  .loading-spinner {
    width: 3rem;
    height: 3rem;
    margin: 0 auto;
    color: var(--primary);
  }

  /* Botones de categoría */
  .category-btn {
    border-radius: 30px;
    padding: 8px 20px;
    margin: 0 5px;
    transition: all 0.3s;
  }

  .category-btn.active {
    background-color: var(--primary);
    color: white;
  }
</style>
