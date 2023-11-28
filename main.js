const form = document.getElementById("formJs");
const nombreProductoInput = document.getElementById("nombreProducto");
const productPopup = document.querySelector(".product-popup");
const productPopupContent = document.querySelector(".product-popup-content");
const cartButton = document.getElementById("cart-button");

let productos = []; 

async function cargarProductos() {
  try {
    const response = await fetch('../productos.json');
    const categorias = await response.json();

    const divsCategorias = document.querySelectorAll('.categoria');

    divsCategorias.forEach(async (divCategoria) => {
      const categoria = divCategoria.dataset.categoria;
      const categoriaEncontrada = categorias.find(item => item.categoria === categoria);

      if (categoriaEncontrada) {
        const productosMostrados = categoriaEncontrada.productos;
        mostrarProductos(productosMostrados, divCategoria); 
      } 
    });
  } catch (error) {
    console.error('Error al cargar los productos:', error);
  }
}


function mostrarProductosPorCategoria(categoria, divId) {
  const productosCategoria = productos.find(item => item.categoria === categoria);

  if (productosCategoria) {
    const productosMostrados = productosCategoria.productos;
    mostrarProductos(productosMostrados, divId);
  } else {
    document.getElementById(divId).innerHTML = '<p>No se encontraron productos en esta categoría</p>';
  }
}

function mostrarProductos(productosAMostrar, div) {
  if (productosAMostrar.length === 0) {
    div.innerHTML = "Producto no encontrado";
  } else {
    productosAMostrar.forEach((producto) => {
      const productoElement = document.createElement("div");
      productoElement.innerHTML = `
        <div class="tarjeta">
          <img class="producto-img" src="${producto.src}" />
          <div class="descripcion-principal">
            <h2>${producto.nombre}</h2>
            <div class="descripcion">
              <p>${producto.parrafo}</p>
            </div>
            <p class="colores">
              Color: <button class="gris"></button>
              <button class="negro"></button>
              <button class="blanco"></button>
              <button class="blue"></button>
            </p>
            <div class="memorias">
              <button class="memoria-btn" data-capacidad="64">64GB</button>
              <button class="memoria-btn" data-capacidad="128">128GB</button>
            </div>
          </div>
          <div class="bottom-precio-comprar">
            <p>Precio: ${producto.precios[64]} USD</p>
            <button class="bottom-comprar">Añadir al carrito</button>
          </div>
        </div>
      `;
      div.appendChild(productoElement);

      const botonesMemoria = productoElement.querySelectorAll(".memorias .memoria-btn");
      const precioMostrado = productoElement.querySelector(".bottom-precio-comprar p");

      botonesMemoria.forEach((memoriaBtn) => {
        memoriaBtn.addEventListener("click", () => {
          botonesMemoria.forEach((btn) => {
            btn.classList.remove("memoria-seleccionada");
          });

          memoriaBtn.classList.add("memoria-seleccionada");

          const capacidad = parseInt(memoriaBtn.getAttribute("data-capacidad"));
          const precioProducto = producto.precios[capacidad];

          precioMostrado.textContent = `Precio: ${precioProducto} USD`;

          producto.memoria = capacidad;
          producto.precio = precioProducto;

          const botonComprar = productoElement.querySelector(".bottom-comprar");
          botonComprar.removeAttribute("disabled"); // Habilitar el botón después de seleccionar memoria
        });
      });

      const botonComprar = productoElement.querySelector(".bottom-comprar");
      botonComprar.setAttribute("disabled", "true"); // Deshabilitar el botón al inicio

      botonComprar.addEventListener("click", () => {
        const productosSeleccionados =
          JSON.parse(localStorage.getItem("productosSeleccionados")) || [];
        if (producto.memoria) {
          if (productosSeleccionados.length < 3) {
            productosSeleccionados.push({
              nombre: producto.nombre,
              src: producto.src,
              memoria: producto.memoria,
              precio: producto.precio,
            });

            localStorage.setItem(
              "productosSeleccionados",
              JSON.stringify(productosSeleccionados)
            );
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Producto añadido",
              showConfirmButton: false,
              timer: 1500,
            });
          }else {
      Swal.fire({
        icon: "warning",
        title: "¡Límite alcanzado!",
        text: "Ya has agregado el máximo de productos permitidos en el carrito.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Entendido",
      });
    }
        }
      });
    });
  }
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const nombre = nombreProductoInput.value.toLowerCase();

  
  const contenedorResultados = document.getElementById('target');


  contenedorResultados.innerHTML = '';

  try {
    const response = await fetch('../productos.json');
    const categorias = await response.json();

    const productosFiltrados = categorias.reduce((result, categoria) => {
      const productosCategoria = categoria.productos.filter((item) =>
        item.nombre.toLowerCase().includes(nombre)
      );
      if (productosCategoria.length > 0) {
        result.push(...productosCategoria);
      }
      return result;
    }, []);

    if (productosFiltrados.length === 0 && nombre.length > 0) {
      // Si no se encontraron productos pero se ingresó un término de búsqueda, buscar coincidencias 
      const productosCoincidentes = categorias.reduce((result, categoria) => {
        const productosCategoria = categoria.productos.filter((item) =>
          item.nombre.toLowerCase().includes(nombre[0])
        );
        if (productosCategoria.length > 0) {
          result.push(...productosCategoria);
        }
        return result;
      }, []);

      // Mostrar productos coincidentes en el contenedor actualizado
      mostrarProductos(productosCoincidentes, contenedorResultados);
    } else {
      // Mostrar productos filtrados en el contenedor actualizado
      mostrarProductos(productosFiltrados, contenedorResultados);
    }
  } catch (error) {
    console.error('Error al cargar los productos:', error);
  }
});









cartButton.addEventListener("click", () => {
  mostrarProductosSeleccionadosEnVentanaEmergente();
});

function mostrarProductosSeleccionadosEnVentanaEmergente() {
  productPopupContent.innerHTML = `<button id="cerrar-popup">X</button>`;
  const productosSeleccionados = JSON.parse(
    localStorage.getItem("productosSeleccionados")
  );

  if (productosSeleccionados && productosSeleccionados.length > 0) {
    productPopupContent.innerHTML += productosSeleccionados
      .map(
        (producto) => `
      <div class="carrito-contenedor">
        <img class="img-carrito" src="${producto.src}" alt="${producto.nombre}">
        <h3 class="title-carrito">${producto.nombre}</h3>
        <p class="carrito-p">Memoria: ${producto.memoria}GB</p>
        <p class="carrito-p">Precio: ${producto.precio} USD</p>
        <button class="comprar-producto">Finalizar compra</button>
        <button class="eliminar-producto">Eliminar</button>
        
      </div>
    `
      )
      .join("");
  } else {
    productPopupContent.innerHTML += `<p class="cero-productos">No hay productos seleccionados</p>`;
  }

  const botonCerrarPopup = document.getElementById("cerrar-popup");
  botonCerrarPopup.addEventListener("click", () => {
    productPopup.style.display = "none";
  });

  const botonesEliminar = document.querySelectorAll(".eliminar-producto");
  botonesEliminar.forEach((boton, index) => {
    boton.addEventListener("click", () => {
      eliminarProductoSeleccionado(index);
      mostrarProductosSeleccionadosEnVentanaEmergente();
    });
  });

  productPopup.style.display = "block";
}

function eliminarProductoSeleccionado(index) {
  let productosSeleccionados =
    JSON.parse(localStorage.getItem("productosSeleccionados")) || [];
  productosSeleccionados.splice(index, 1);
  localStorage.setItem(
    "productosSeleccionados",
    JSON.stringify(productosSeleccionados)
  );
}


cargarProductos();
