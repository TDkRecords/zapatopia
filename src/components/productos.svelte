<script>
  import { onMount } from "svelte";
  import { db } from "$lib/assets/js/firebase";
  import { collection, getDocs, query, where } from "firebase/firestore";

  export let categoria = "todos";
  export let soloDestacados = false; // nuevo filtro

  let productos = [];
  let cargando = true;

  onMount(async () => {
    try {
      let productosRef = collection(db, "productos");
      let condiciones = [];

      // Filtro por categoría
      if (categoria !== "todos") {
        condiciones.push(where("categoria", "==", categoria));
      }

      // Filtro por destacados
      if (soloDestacados) {
        condiciones.push(where("destacado", "==", true));
      }

      let q =
        condiciones.length > 0
          ? query(productosRef, ...condiciones)
          : query(productosRef);

      const querySnapshot = await getDocs(q);
      productos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error obteniendo productos:", error);
    } finally {
      cargando = false;
    }
  });
</script>

{#if cargando}
  <p class="text-center text-muted mt-4">Cargando productos...</p>
{:else if productos.length === 0}
  <p class="text-center text-muted mt-4">No hay productos disponibles.</p>
{:else}
  <div class="container my-4">
    <div class="row g-4">
      {#each productos as p}
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 fade-in">
          <div
            class="card shadow-sm h-100 position-relative d-flex flex-column"
          >
            {#if p.destacado}
              <span
                class="badge bg-warning text-dark position-absolute top-0 start-0 m-2 fade-in"
              >
                <i class="bi bi-star-fill"></i> Destacado
              </span>
            {/if}

            <img
              src={p.imagen}
              class="card-img-top"
              alt={p.nombre}
              style="height: 200px; object-fit: cover;"
            />

            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{p.nombre}</h5>
              <p class="card-text text-muted small flex-grow-1">
                {p.descripcion}
              </p>

              <div class="mt-auto">
                <p class="fw-bold text-primary fs-5 mb-1">
                  ${p.precio.toLocaleString()}
                </p>
                <p class="text-secondary small">Stock: {p.stock}</p>
                <button class="btn btn-primary w-100 mt-2">
                  <i class="bi bi-cart-fill"></i> Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}

<style>
  .fade-in {
    animation: fadeIn 0.6s ease-in-out;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
