<script>
  import { auth, db } from "$lib/assets/jS/firebase";
  import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  import { doc, setDoc } from "firebase/firestore";

  import { goto } from "$app/navigation";

  let isLogin = true;

  // Campos del formulario
  let nombre = "";
  let apellido = "";
  let edad = "";
  let direccion = "";
  let email = "";
  let password = "";
  let recibirActualizaciones = false;
  let mensaje = "";

  const successfull = () => {
    setTimeout(() => {
      goto("/");
    }, 1700);
  };

  // Función para registrar usuario
  async function registrarUsuario() {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = cred.user.uid;

      await setDoc(doc(db, "usuarios", uid), {
        nombre,
        apellido,
        edad: parseInt(edad),
        direccion,
        email,
        recibirActualizaciones,
      });

      mensaje = "✅ Registro exitoso";

      successfull();
    } catch (error) {
      mensaje = "❌ Error: " + error.message;
    }
  }

  // Función para iniciar sesión
  async function loginUsuario() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      mensaje = "✅ Sesión iniciada";
      successfull();
    } catch (error) {
      mensaje = "❌ Error: " + error.message;
    }
  }

  function manejarSubmit(e) {
    e.preventDefault();
    if (isLogin) {
      loginUsuario();
    } else {
      registrarUsuario();
    }
  }
</script>

<div class="container py-5">
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card shadow p-4">
        <h2 class="text-center mb-4">
          {isLogin ? "Iniciar Sesión" : "Registro"}
        </h2>

        <!-- svelte-ignore a11y_label_has_associated_control -->
        <form on:submit={manejarSubmit}>
          {#if !isLogin}
            <div class="mb-3">
              <label class="form-label">Nombre</label>
              <input class="form-control" bind:value={nombre} required />
            </div>

            <div class="mb-3">
              <label class="form-label">Apellido</label>
              <input class="form-control" bind:value={apellido} required />
            </div>

            <div class="mb-3">
              <label class="form-label">Edad</label>
              <input
                type="number"
                class="form-control"
                bind:value={edad}
                required
              />
            </div>

            <div class="mb-3">
              <label class="form-label">Dirección</label>
              <input class="form-control" bind:value={direccion} required />
            </div>
          {/if}

          <div class="mb-3">
            <label class="form-label">Correo electrónico</label>
            <input
              type="email"
              class="form-control"
              bind:value={email}
              required
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Contraseña</label>
            <input
              type="password"
              class="form-control"
              bind:value={password}
              required
            />
          </div>

          {#if !isLogin}
            <div class="form-check mb-3">
              <input
                class="form-check-input"
                type="checkbox"
                bind:checked={recibirActualizaciones}
                id="updates"
              />
              <label class="form-check-label" for="updates">
                Quiero recibir actualizaciones de productos y la marca
              </label>
            </div>
          {/if}

          <button type="submit" class="btn btn-primary w-100 mb-3">
            {isLogin ? "Iniciar Sesión" : "Registrarse"}
          </button>

          <button
            type="button"
            class="btn btn-outline-secondary w-100"
            on:click={() => (isLogin = !isLogin)}
          >
            {isLogin ? "Crear cuenta" : "Ya tengo cuenta"}
          </button>
        </form>

        {#if mensaje}
          <div
            class="alert mt-3 {mensaje.startsWith('✅')
              ? 'alert-success'
              : 'alert-danger'}"
          >
            {mensaje}
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
