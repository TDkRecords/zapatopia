<footer class="footer">
  <div class="container">
    <div class="row">
      <div class="col-lg-4 mb-5 mb-lg-0">
        <h3 class="brand-logo mb-3">NEW<span>STYLE</span></h3>
        <p class="mb-4">
          Tu destino para encontrar el calzado perfecto que combina estilo,
          comodidad y calidad.
        </p>
        <div class="social-icons">
          <a href="#"><i class="bi bi-facebook"></i></a>
          <a href="#"><i class="bi bi-instagram"></i></a>
          <a href="#"><i class="bi bi-twitter"></i></a>
          <a href="#"><i class="bi bi-pinterest"></i></a>
        </div>
      </div>

      <div class="col-lg-2 col-md-4 mb-4 mb-md-0">
        <h5>Enlaces</h5>
        <ul class="footer-links p-0">
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Productos</a></li>
          <li><a href="#">Categorías</a></li>
          <li><a href="#">Ofertas</a></li>
          <li><a href="#">Nuevos</a></li>
        </ul>
      </div>

      <div class="col-lg-2 col-md-4 mb-4 mb-md-0">
        <h5>Ayuda</h5>
        <ul class="footer-links p-0">
          <li><a href="#">Contacto</a></li>
          <li><a href="#">Envíos</a></li>
          <li><a href="#">Devoluciones</a></li>
          <li><a href="#">FAQs</a></li>
          <li><a href="#">Términos</a></li>
        </ul>
      </div>

      <div class="col-lg-4 col-md-8">
        <h5>Boletín informativo</h5>
        <p class="mb-3">
          Suscríbete para recibir ofertas exclusivas y novedades.
        </p>
        <form class="d-flex">
          <input
            type="email"
            class="form-control"
            placeholder="Tu correo electrónico"
          />
          <button class="btn btn-primary" type="submit">
            <i class="bi bi-send"></i>
          </button>
        </form>
        <div class="mt-4">
          <h5>Contacto</h5>
          <p class="mb-1">
            <i class="bi bi-geo-alt me-2"></i> Calle 123, Ciudad, País
          </p>
          <p class="mb-1">
            <i class="bi bi-telephone me-2"></i> +57 123 456 7890
          </p>
          <p class="mb-0">
            <i class="bi bi-envelope me-2"></i> info@zapatopia.com
          </p>
        </div>
      </div>
    </div>

    <div class="copyright">
      <p class="mb-0">&copy; 2023 Zapatopia. Todos los derechos reservados.</p>
    </div>
  </div>
</footer>

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

  .btn-primary {
    background-color: var(--primary);
    border-color: var(--primary);
    border-radius: 30px;
    padding: 10px 25px;
    font-weight: 600;
    transition: all 0.3s;
  }

  .btn-primary:hover {
    background-color: #0b5ed7;
    transform: translateY(-3px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .brand-logo {
    font-weight: 800;
    font-size: 1.8rem;
    color: var(--light);
    text-decoration: none;
  }

  .brand-logo span {
    color: var(--accent);
  }
  /* Footer */
  .footer {
    background-color: var(--dark);
    color: white;
    padding: 60px 0 30px;
    margin-top: 80px;
  }

  .footer h5 {
    margin-bottom: 20px;
    position: relative;
    padding-bottom: 10px;
  }

  .footer h5:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 2px;
    background-color: var(--accent);
  }

  .footer-links li {
    margin-bottom: 10px;
    list-style: none;
  }

  .footer-links a {
    color: #adb5bd;
    text-decoration: none;
    transition: all 0.3s;
  }

  .footer-links a:hover {
    color: white;
    padding-left: 5px;
  }

  .social-icons a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    margin-right: 10px;
    transition: all 0.3s;
    text-decoration: none;
  }

  .social-icons a:hover {
    background-color: var(--accent);
    transform: translateY(-3px);
  }

  .copyright {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 20px;
    margin-top: 30px;
    text-align: center;
    color: #adb5bd;
    font-size: 0.9rem;
  }
</style>
