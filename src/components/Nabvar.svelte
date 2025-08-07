<script>
  export let cartCount = 0;
</script>

<!-- Aviso superior -->
<div class="bg-dark text-white text-center py-2">
  <i class="bi bi-truck"></i> Envío gratis por compras superiores a $299.900
</div>

<!-- svelte-ignore a11y_consider_explicit_label -->
<!-- Barra de navegación -->
<nav class="navbar navbar-expand-lg navbar-light sticky-top">
  <div class="container">
    <a class="navbar-brand brand-logo" href="/">
      NEW<span>STYLE</span>
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link active" href="/">Inicio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/">Hombres</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/">Mujeres</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/">Niños</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/">Deportivos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/">Ofertas</a>
        </li>
      </ul>
      <div class="d-flex align-items-center">
        <div class="input-group me-3" style="max-width: 300px;">
          <input
            type="text"
            class="form-control"
            placeholder="Buscar zapatos..."
          />
          <button class="btn btn-outline-primary" type="button">
            <i class="bi bi-search"></i>
          </button>
        </div>
        <a href="/" class="cart-icon position-relative">
          <i class="bi bi-cart3"></i>
          <span class="cart-count">{cartCount}</span>
        </a>
      </div>
    </div>
  </div>
</nav>

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

  /* Header */
  .navbar {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: white;
    padding: 15px 0;
  }

  .brand-logo {
    font-weight: 800;
    font-size: 1.8rem;
    color: var(--dark);
    text-decoration: none;
  }

  .brand-logo span {
    color: var(--accent);
  }

  .nav-link {
    font-weight: 500;
    color: var(--dark);
    margin: 0 10px;
    transition: color 0.3s;
    position: relative;
  }

  .nav-link:hover,
  .nav-link.active {
    color: var(--primary);
  }

  .nav-link.active:after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--primary);
  }

  .cart-icon {
    position: relative;
    color: var(--dark);
    font-size: 1.2rem;
    margin-left: 20px;
  }

  .cart-count {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: var(--accent);
    color: white;
    font-size: 0.7rem;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
