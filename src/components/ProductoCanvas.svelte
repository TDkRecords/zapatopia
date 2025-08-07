<!-- ProductoCanvas.svelte -->
<script>
  export let producto = null;
</script>

<div
  class="offcanvas offcanvas-end"
  tabindex="-1"
  id="canvasProducto"
  aria-labelledby="canvasProductoLabel"
>
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="canvasProductoLabel">
      {producto?.nombre}
    </h5>
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="offcanvas"
      aria-label="Close"
    ></button>
  </div>
  <div class="offcanvas-body">
    {#if producto}
      <img
        src={producto.imagen}
        class="img-fluid mb-3 rounded-4 shadow-sm"
        alt={producto.nombre}
      />
      <small class="text-muted d-block mb-1"
        >{producto.marca} - {producto.modelo}</small
      >
      <p>{producto.descripcion}</p>
      <h5 class="fw-bold text-dark">$ {producto.precio.toLocaleString()}</h5>

      {#if producto.colores}
        <div class="d-flex gap-2 mt-3">
          {#each producto.colores as color}
            <span
              class="rounded-circle border"
              style="width: 25px; height: 25px; background-color: {color};"
            ></span>
          {/each}
        </div>
      {/if}
    {:else}
      <p class="text-muted">No hay producto seleccionado.</p>
    {/if}
  </div>
</div>
