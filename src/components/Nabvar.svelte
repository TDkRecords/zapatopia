<script>
  import { page } from "$app/stores";
  import { obtenerUsuario } from "$lib/assets/js/auth.js";

  export let cartCount = 0;
  let usuario = null;
  let loading = true;

  // Ruta actual
  $: currentPath = $page.url.pathname;

  // Escuchar autenticación
  obtenerUsuario((userData, isLoading, error) => {
    usuario = userData;
    loading = isLoading;
  });
</script>

<!-- Aviso superior -->
{#if usuario}
  <div class="bg-dark text-white text-center py-2">
    <i class="bi bi-truck"></i> Envío gratis por compras superiores a $299.900
  </div>
{/if}

<nav class="navbar navbar-expand-lg navbar-light sticky-top">
  <div class="container">
    <a class="navbar-brand brand-logo" href="/">
      NEW<span>STYLE</span>
    </a>

    {#if usuario}
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
            <a class="nav-link {currentPath === '/' ? 'active' : ''}" href="/"
              >Inicio</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link {currentPath === '/hombres' ? 'active' : ''}"
              href="/hombres">Hombres</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link {currentPath === '/mujeres' ? 'active' : ''}"
              href="/mujeres">Mujeres</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link {currentPath === '/kids' ? 'active' : ''}"
              href="/kids">Niños</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link {currentPath === '/ofertas' ? 'active' : ''}"
              href="/ofertas">Ofertas</a
            >
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
          <a href="/perfil" class="cart-icon position-relative">
            <i class="bi bi-person-circle"></i>
          </a>
        </div>
      </div>
    {:else}
      <div class="ms-auto">
        <a href="/login" class="btn btn-primary">Entrar</a>
      </div>
    {/if}
  </div>
</nav>

<style>
  :root {
    --primary: #0d6efd;
    --secondary: #6c757d;
    --dark: #212529;
    --light: #f8f9fa;
    --accent: #dc3545;
    --success: #198754;
    --border-radius: 12px;
  }

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

  /* Links con animación */
  .nav-link {
    font-weight: 500;
    color: var(--dark);
    margin: 0 10px;
    position: relative;
    transition: color 0.3s ease;
  }

  .nav-link::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--primary);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  .nav-link:hover {
    color: var(--primary);
  }

  .nav-link:hover::after {
    transform: scaleX(1);
  }

  .nav-link.active {
    color: var(--primary);
  }

  .nav-link.active::after {
    transform: scaleX(1);
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
