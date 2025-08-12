<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { signOut } from "firebase/auth";
  import { auth } from "$lib/assets/js/firebase";
  import { obtenerUsuario } from "$lib/assets/js/auth";

  let usuario = null;
  let cargando = true;
  let mensaje = "";

  onMount(() => {
    obtenerUsuario((userData, loading, error) => {
      cargando = loading;
      if (error) {
        mensaje = error;
        if (error === "No autenticado") {
          goto("/login"); // ahora sí solo en cliente
        }
      } else {
        usuario = userData;
      }
    });
  });

  function cerrarSesion() {
    signOut(auth).then(() => {
      goto("/login");
    });
  }
</script>

<div class="container py-5">
  {#if cargando}
    <div class="text-center">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-3">Cargando perfil...</p>
    </div>
  {:else if usuario}
    <div class="card shadow p-4">
      <h2 class="mb-4 text-center">Perfil de Usuario</h2>

      <ul class="list-group list-group-flush mb-5">
        <li class="list-group-item">
          <strong>Nombre:</strong>
          {usuario.nombre}
        </li>
        <li class="list-group-item">
          <strong>Apellido:</strong>
          {usuario.apellido}
        </li>
        <li class="list-group-item"><strong>Edad:</strong> {usuario.edad}</li>
        <li class="list-group-item">
          <strong>Dirección:</strong>
          {usuario.direccion}
        </li>
        <li class="list-group-item">
          <strong>Correo:</strong>
          {usuario.email}
        </li>
        <li class="list-group-item">
          <strong>Recibir Actualizaciones:</strong>
          {usuario.recibirActualizaciones ? "Sí" : "No"}
        </li>
      </ul>

      <div
        class="row d-flex justify-content-evenly align-items-center pt-2 mb-2"
      >
        <div class="col-md-6">
          <a class="btn btn-primary" href="/admin"> INVENTARIO </a>
        </div>
        <div class="col-md-6">
          <button class="btn text-danger" on:click={cerrarSesion}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  {:else}
    <div class="alert alert-warning text-center">
      {mensaje}
    </div>
  {/if}
</div>
