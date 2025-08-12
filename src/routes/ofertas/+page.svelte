<script>
  import Productos from "/src/components/productos.svelte";
</script>

<div class="container py-4">
  <h1 class="text-center pb-3">Zapatos para Destacados</h1>
  <Productos categoria="todos" soloDestacados={true} />
</div>
