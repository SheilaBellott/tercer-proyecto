const productos = [
  {
    nombre: "iphone 11",
    precios: {
      64: 1000,
      128: 1100
    },
    src: "../iphone-img/1540-1.png",
    parrafo:
      "¡La undécima edición del teléfono inteligente Redmi más popular  Cámara inteligente de 50 MP, procesador Snapdragon® 680 súper rápido, pantalla AMOLED con frecuencia de actualización de 90 Hz: todo esto y mucho más en una carcasa moderna.",
  },
  {
    nombre: "samsung s23",
    precios: {
      64: 700,
      128: 750
    },
    src: "../iphone-img/1540-1.png",
    parrafo:
      "¡La undécima edición del teléfono inteligente Redmi más popular  Cámara inteligente de 50 MP, procesador Snapdragon® 680 súper rápido, pantalla AMOLED con frecuencia de actualización de 90 Hz: todo esto y mucho más en una carcasa moderna.",
  },
  {
    nombre: "xiaomi poco x5",
    precios: {
      64: 300,
      128: 350
    },
    src: "../iphone-img/1540-1.png",
    parrafo:
      "¡La undécima edición del teléfono inteligente Redmi más popular  Cámara inteligente de 50 MP, procesador Snapdragon® 680 súper rápido, pantalla AMOLED con frecuencia de actualización de 90 Hz: todo esto y mucho más en una carcasa moderna.",
  },
];

const form = document.getElementById("formJs");
const nombreProductoInput = document.getElementById("nombreProducto");
const target = document.getElementById("target");
const productPopup = document.querySelector(".product-popup");
const productPopupContent = document.querySelector(".product-popup-content");
const cartButton = document.getElementById("cart-button");
const mensajeCarritoVacio = document.getElementById("mensajeCarritoVacio");

function mostrarProductos(productosAMostrar) {
  target.innerHTML = "";

  if (productosAMostrar.length === 0) {
    target.textContent = "Producto no encontrado";
  } else {
    productosAMostrar.forEach((producto) => {
      const div = document.createElement("div");
      div.innerHTML = `
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
              <button class="memoria-btn">64GB</button>
              <button class="memoria-btn">128GB</button>
            </div>
          </div>
          <div class="bottom-precio-comprar">
            <p>Precio: ${producto.precios[64]} USD</p>
            <button class="bottom-comprar">Añadir al carrito</button>
          </div>
        </div>
      `;
      target.appendChild(div);


const botonesMemoria = div.querySelectorAll('.memorias button');
botonesMemoria.forEach((memoriaBtn) => {
  memoriaBtn.addEventListener('click', () => {
    botonesMemoria.forEach((btn) => {
      btn.classList.remove('memoria-seleccionada'); 
    });

    memoriaBtn.classList.add('memoria-seleccionada'); 

    const capacidad = parseInt(memoriaBtn.textContent.replace('GB', ''));
    const precioProducto = producto.precios[capacidad];
    div.querySelector('.bottom-precio-comprar p').textContent = `Precio: ${precioProducto} USD`;
    producto.memoria = capacidad;
    producto.precio = precioProducto;

    const botonComprar = div.querySelector('.bottom-comprar');
    botonComprar.removeAttribute('disabled'); // Habilitar el botón después de seleccionar memoria
  });
});


      const botonComprar = div.querySelector('.bottom-comprar');
      botonComprar.setAttribute('disabled', 'true'); // Deshabilitar el botón al inicio

      botonComprar.addEventListener('click', () => {
        const productosSeleccionados = JSON.parse(localStorage.getItem("productosSeleccionados")) || [];
        if (producto.memoria) {
          productosSeleccionados.push({
            nombre: producto.nombre,
            src: producto.src,
            memoria: producto.memoria,
            precio: producto.precio
          });
          localStorage.setItem("productosSeleccionados", JSON.stringify(productosSeleccionados));
          mostrarProductosSeleccionadosEnVentanaEmergente();
        } else {
          alert('Por favor, selecciona una memoria antes de agregar al carrito.');
        }
      });
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
});

cartButton.addEventListener("click", () => {
  mostrarProductosSeleccionadosEnVentanaEmergente();
});

function mostrarProductosSeleccionadosEnVentanaEmergente() {
  productPopupContent.innerHTML = `<button id="cerrar-popup">X</button>`;
  const productosSeleccionados = JSON.parse(localStorage.getItem("productosSeleccionados"));

  if (productosSeleccionados && productosSeleccionados.length > 0) {
    productPopupContent.innerHTML += productosSeleccionados.map((producto) => `
      <div class="carrito-contenedor">
        <img class="img-carrito" src="${producto.src}" alt="${producto.nombre}">
        <h3 class="title-carrito">${producto.nombre}</h3>
        <p class="carrito-p">Memoria: ${producto.memoria}GB</p>
        <p class="carrito-p">Precio: ${producto.precio} USD</p>
        <button class="eliminar-producto">Eliminar</button>
        <button class="comprar-producto">Finalizar compra</button>
      </div>
    `).join('');
  } else {
    productPopupContent.innerHTML += `<p class="cero-productos">No hay productos seleccionados</p>`;
  }

  const botonCerrarPopup = document.getElementById("cerrar-popup");
  botonCerrarPopup.addEventListener("click", () => {
    productPopup.style.display = "none";
  });

  const botonesEliminar = document.querySelectorAll('.eliminar-producto');
  botonesEliminar.forEach((boton, index) => {
    boton.addEventListener('click', () => {
      eliminarProductoSeleccionado(index);
      mostrarProductosSeleccionadosEnVentanaEmergente();
    });
  });

  productPopup.style.display = "block";
}

function eliminarProductoSeleccionado(index) {
  let productosSeleccionados = JSON.parse(localStorage.getItem("productosSeleccionados")) || [];
  productosSeleccionados.splice(index, 1);
  localStorage.setItem("productosSeleccionados", JSON.stringify(productosSeleccionados));
}

// Mostrar todos los productos al cargar la página
mostrarProductos(productos);


 


