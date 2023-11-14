const productos = [
  {
    nombre: "iphone 11",
    precio: 1000,
    src: "../iphone-img/1540-1.png",
    parrafo:
      "¡La undécima edición del teléfono inteligente Redmi más popular  Cámara inteligente de 50 MP, procesador Snapdragon® 680 súper rápido, pantalla AMOLED con frecuencia de actualización de 90 Hz:todo esto y mucho más en una carcasa moderna.",
  },
  {
    nombre: "samsung s23",
    precio: 700,
    src: "../iphone-img/1540-1.png",
    parrafo:
      "¡La undécima edición del teléfono inteligente Redmi más popular  Cámara inteligente de 50 MP, procesador Snapdragon® 680 súper rápido, pantalla AMOLED con frecuencia de actualización de 90 Hz:todo esto y mucho más en una carcasa moderna.",
  },
  {
    nombre: "xiaomi poco x5",
    precio: 300,
    src: "../iphone-img/1540-1.png",
    parrafo:
      "¡La undécima edición del teléfono inteligente Redmi más popular  Cámara inteligente de 50 MP, procesador Snapdragon® 680 súper rápido, pantalla AMOLED con frecuencia de actualización de 90 Hz:todo esto y mucho más en una carcasa moderna.",
  },
];

const form = document.getElementById("formJs");
const nombreProductoInput = document.getElementById("nombreProducto");
const target = document.getElementById("target");

function mostrarProductos(productosAMostrar) {
  target.innerHTML = "";

  if (productosAMostrar.length === 0) {
    target.textContent = "Producto no encontrado";
  } else {
    productosAMostrar.forEach((producto) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <div class="tarjeta">
          <div>
            <img class="producto-img" src="${producto.src}" />
          </div>
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
              <button>64GB</button>
              <button>128GB</button>
            </div>
          </div>
          <div class="bottom-precio-comprar">
            <p>Precio: ${producto.precio} USD</p>
            <button class="bottom-comprar">Añadir al carrito</button>
          </div>
        </div>
      `;
      target.appendChild(div);
    });
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const nombre = nombreProductoInput.value.toLowerCase();
  const productosFiltrados = productos.filter((item) =>
    item.nombre.toLowerCase().includes(nombre)
  );

  mostrarProductos(productosFiltrados);

  // Agregar un evento de clic a los botones de compra en los productos filtrados
  const botonesComprarFiltrados = document.querySelectorAll(".bottom-comprar");
  botonesComprarFiltrados.forEach((boton, index) => {
    boton.addEventListener("click", () => {
      // Obtener el producto seleccionado de la lista filtrada
      const productoSeleccionado = productosFiltrados[index];

      // Obtener la lista de productos seleccionados del LocalStorage
      let productosSeleccionados =
        JSON.parse(localStorage.getItem("productosSeleccionados")) || [];

      // Agregar el producto seleccionado a la lista
      productosSeleccionados.push(productoSeleccionado);

      // Guardar la lista actualizada en el LocalStorage
      localStorage.setItem(
        "productosSeleccionados",
        JSON.stringify(productosSeleccionados)
      );

      // Mostrar la ventana emergente con los productos seleccionados
      mostrarProductosSeleccionadosEnVentanaEmergente();
    });
  });
});

// Mostrar todos los productos al cargar la página
mostrarProductos(productos);

/////

// Obtén el botón de carrito y la ventana emergente
const cartButton = document.getElementById("cart-button");
const productPopup = document.querySelector(".product-popup");
const mensajeCarritoVacio = document.getElementById("mensajeCarritoVacio");
// Función para abrir la ventana emergente con la información del producto

cartButton.addEventListener("click", () => {
  // Obtener la lista de productos seleccionados del LocalStorage
  const productosSeleccionados = JSON.parse(
    localStorage.getItem("productosSeleccionados")
  );

  if (productosSeleccionados && productosSeleccionados.length > 0) {
    // Si hay productos seleccionados, muestra la ventana emergente
    mostrarProductosSeleccionadosEnVentanaEmergente();
  } else {
    // Si no hay productos seleccionados, muestra el mensaje de "No hay productos seleccionados"
    mensajeCarritoVacio.style.display = "block";
  }
});

// Función para cerrar la ventana emergente
productPopup.addEventListener("dblclick", () => {
  productPopup.style.display = "none";
});

// Agregar un evento de clic a los botones de compra
const botonesComprar = document.querySelectorAll(".bottom-comprar");
botonesComprar.forEach((boton, index) => {
  boton.addEventListener("click", () => {
    // Obtener el producto seleccionado
    const productoSeleccionado = productos[index];

    // Obtener la lista de productos seleccionados del LocalStorage
    let productosSeleccionados =
      JSON.parse(localStorage.getItem("productosSeleccionados")) || [];

    // Agregar el producto seleccionado a la lista
    productosSeleccionados.push(productoSeleccionado);

    // Guardar la lista actualizada en el LocalStorage
    localStorage.setItem(
      "productosSeleccionados",
      JSON.stringify(productosSeleccionados)
    );

    // Mostrar la ventana emergente con los productos seleccionados
    mostrarProductosSeleccionadosEnVentanaEmergente();
  });
});

// ... (código existente)


function mostrarProductosSeleccionadosEnVentanaEmergente() {
  const productPopupContent = document.querySelector(".product-popup-content");
  productPopupContent.innerHTML = `<button id="cerrar-popup">X</button>`;

  // Obtener la lista de productos seleccionados del LocalStorage
  const productosSeleccionados = JSON.parse(
    localStorage.getItem("productosSeleccionados")
  );

  if (productosSeleccionados && productosSeleccionados.length > 0) {
    productosSeleccionados.forEach((producto, index) => {
      productPopupContent.innerHTML += `
        <div class="carrito-contenedor">
          <img class="img-carrito" src="${producto.src}" alt="${producto.nombre}">
          <h3 class="title-carrito">${producto.nombre}</h3>
          <p class="carrito-p">Precio: ${producto.precio} USD</p>
        </div>
        <div>
          <button class="eliminar-producto" data-index="${index}">Eliminar</button>
          <button class="comprar-producto">Finalizar compra</button>
        </div>
      `;
    });
  } else {
    // Si no hay productos seleccionados, muestra el mensaje de "No hay productos seleccionados"
    productPopupContent.innerHTML += `<p class="cero-productos">No hay productos seleccionados</p>`;
  }

  // Agregar eventos para eliminar productos
  const botonEliminarProducto = document.querySelectorAll(".eliminar-producto");
  botonEliminarProducto.forEach((boton) => {
    boton.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      eliminarProductoSeleccionado(index);
      mostrarProductosSeleccionadosEnVentanaEmergente();
    });
  });

  // Agregar un evento para cerrar la ventana emergente
  const botonCerrarPopup = document.getElementById("cerrar-popup");
  botonCerrarPopup.addEventListener("click", () => {
    productPopup.style.display = "none";
  });

  // Mostrar la ventana emergente
  productPopup.style.display = "block";
}


function eliminarProductoSeleccionado(index) {
  // Obtener la lista de productos seleccionados del LocalStorage
  let productosSeleccionados =
    JSON.parse(localStorage.getItem("productosSeleccionados")) || [];

  // Eliminar el producto con el índice especificado
  productosSeleccionados.splice(index, 1);

  // Guardar la lista actualizada en el LocalStorage
  localStorage.setItem(
    "productosSeleccionados",
    JSON.stringify(productosSeleccionados)
  );
}





