<script>
    import { db } from "$lib/assets/js/firebase";
    import {
        collection,
        addDoc,
        getDocs,
        deleteDoc,
        doc,
        updateDoc,
    } from "firebase/firestore";

    let nombre = "",
        modelo = "",
        marca = "",
        precio = "",
        imagen = "",
        descripcion = "",
        stock = "",
        categoria = "";
    let destacado = false;
    let mensaje = "",
        error = "",
        productos = [];
    let editando = false;
    let idEditar = null;

    async function agregarProducto() {
        mensaje = "";
        error = "";

        if (
            !nombre ||
            !modelo ||
            !marca ||
            !precio ||
            !imagen ||
            !descripcion ||
            !stock ||
            !categoria
        ) {
            error = "Todos los campos son obligatorios.";
            return;
        }

        const producto = {
            nombre,
            modelo,
            marca,
            precio: parseInt(precio),
            imagen,
            descripcion,
            stock: parseInt(stock),
            destacado,
            categoria,
        };

        try {
            if (editando && idEditar) {
                await updateDoc(doc(db, "productos", idEditar), producto);
                mensaje = "Producto actualizado con éxito ✅";
            } else {
                await addDoc(collection(db, "productos"), producto);
                mensaje = "Producto agregado con éxito 🎉";
            }
            limpiarFormulario();
            obtenerProductos();
        } catch (e) {
            console.error("Error al guardar producto:", e);
            error = "Ocurrió un error al guardar el producto.";
        }
    }

    function limpiarFormulario() {
        nombre =
            modelo =
            marca =
            precio =
            imagen =
            descripcion =
            stock =
            categoria =
                "";
        destacado = false;
        editando = false;
        idEditar = null;
    }

    async function obtenerProductos() {
        const snapshot = await getDocs(collection(db, "productos"));
        productos = snapshot.docs.map((doc, i) => ({
            id: doc.id,
            index: i + 1,
            ...doc.data(),
        }));
    }

    async function eliminarProducto(id) {
        if (confirm("¿Estás seguro de eliminar este producto?")) {
            await deleteDoc(doc(db, "productos", id));
            obtenerProductos();
        }
    }

    function cargarParaEditar(p) {
        nombre = p.nombre;
        modelo = p.modelo;
        marca = p.marca;
        precio = p.precio;
        imagen = p.imagen;
        descripcion = p.descripcion;
        stock = p.stock;
        categoria = p.categoria;
        destacado = p.destacado;
        editando = true;
        idEditar = p.id;
        mensaje = "";
        error = "";
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    obtenerProductos();
</script>

<!-- svelte-ignore a11y_label_has_associated_control -->
<!-- svelte-ignore a11y_consider_explicit_label -->
<div class="container py-5">
  <div class="row g-4 align-items-start">
    <!-- Formulario -->
    <div class="col-12 col-lg-4">
      <div class="card shadow border-success-subtle">
        <div class="card-header bg-success text-white text-center">
          <h5 class="mb-0">
            {editando ? "Editar producto" : "Agregar nuevo producto"}
          </h5>
        </div>
        <div class="card-body">
          {#if mensaje}
            <div class="alert alert-success">{mensaje}</div>
          {/if}
          {#if error}
            <div class="alert alert-danger">{error}</div>
          {/if}
          <form on:submit|preventDefault={agregarProducto}>
            <div class="mb-3">
              <label class="form-label">Nombre</label>
              <input class="form-control" bind:value={nombre} required />
            </div>
            <div class="mb-3">
              <label class="form-label">Modelo</label>
              <input class="form-control" bind:value={modelo} required />
            </div>
            <div class="mb-3">
              <label class="form-label">Marca</label>
              <input class="form-control" bind:value={marca} required />
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label">Precio</label>
                <input type="number" class="form-control" bind:value={precio} required />
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Stock</label>
                <input type="number" class="form-control" bind:value={stock} required />
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Categoría</label>
              <select class="form-select" bind:value={categoria} required>
                <option value="" disabled selected>Seleccione una categoría</option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
                <option value="Infantil">Infantil</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">URL de imagen</label>
              <input class="form-control" bind:value={imagen} required />
            </div>
            <div class="mb-3">
              <label class="form-label">Descripción</label>
              <textarea class="form-control" rows="3" bind:value={descripcion} required></textarea>
            </div>
            <div class="form-check mb-3">
              <input class="form-check-input" type="checkbox" bind:checked={destacado} id="destacadoCheck" />
              <label class="form-check-label" for="destacadoCheck">Producto destacado</label>
            </div>
            <button class="btn btn-success w-100">
              {editando ? "Actualizar producto" : "Agregar producto"}
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Listado de productos -->
    <div class="col-12 col-lg-8">
      <h4 class="mb-4">Lista de productos</h4>
      {#if productos.length > 0}
        <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
          {#each productos as p}
            <div class="col">
              <div class="card h-100 shadow-sm border-info-subtle">
                <img src={p.imagen} class="card-img-top object-fit-cover" style="height: 200px; object-fit: cover;" alt={p.nombre} />
                <div class="card-body">
                  <h6 class="card-title fw-bold mb-2">{p.nombre}</h6>
                  <p class="mb-1"><strong>Modelo:</strong> {p.modelo}</p>
                  <p class="mb-1"><strong>Marca:</strong> {p.marca}</p>
                  <p class="mb-1"><strong>Categoría:</strong> {p.categoria}</p>
                  <p class="mb-1"><strong>Precio:</strong> ${p.precio}</p>
                  <p class="mb-1"><strong>Stock:</strong> {p.stock}</p>
                  {#if p.descripcion}
                    <p class="mb-1"><strong>Descripción:</strong> {p.descripcion}</p>
                  {/if}
                  {#if p.destacado === "true" || p.destacado === true}
                    <span class="badge bg-warning text-dark">Destacado</span>
                  {/if}
                </div>
                <div class="card-footer bg-transparent d-flex justify-content-end gap-2">
                  <button class="btn btn-sm btn-outline-primary" on:click={() => cargarParaEditar(p)} title="Editar">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button class="btn btn-sm btn-outline-danger" on:click={() => eliminarProducto(p.id)} title="Eliminar">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <div class="alert alert-info">No hay productos registrados.</div>
      {/if}
    </div>
  </div>
</div>
