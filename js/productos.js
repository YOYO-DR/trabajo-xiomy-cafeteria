function activarDesactivarSubmit() {
  const produtosEnCarrito = document.querySelectorAll(".item-producto");
  const boton = document.getElementById("btnSubmit");
  if (produtosEnCarrito.length === 0) {
    boton.disabled = true;
  } else {
    boton.disabled = false;
  }
}
//mensaje
function carritoMensaje(a = null) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  if (a === "e") {
    Toast.fire({
      icon: "success",
      title: "Producto eliminado",
    });
  } else if (a === "sin") {
    Toast.fire({
      icon: "error",
      title: "Carrito vacio",
    });
  }
  
  else {
    Toast.fire({
      icon: "success",
      title: "Carrito actualizado",
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  //Buscar los productos
  //selecciono el div que tiene todos los productos
  const accordionContainer = document.querySelector("#accordionExample");
  //guardo el html para cuando no se busque
  const originalAccordionContent = accordionContainer.innerHTML;
  //obtengo todos los productos, los copio para modificarlos sin afectar a los elementos originales
  const allProducts = Array.from(document.querySelectorAll(".producto")).map(
    (node) => node.cloneNode(true)
  );

  //selecciono el input que va a realizar la busqueda
  document
    .querySelector(".form-control")
    .addEventListener("input", function () {
      // con el evento input que es el de reaccionada cada que escribe, realizo la busqueda
      //obtengo la busqueda y le aplico una normalizacion, que ignore las tildes, lo pongo en minuscula, y que quite los espacios de inicio y fin
      var searchText = this.value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

      if (searchText === "") {
        //si esta vacio, dejo todo el contenido normal
        accordionContainer.innerHTML = originalAccordionContent;
        eventoBotonesProductos();
      } else {
        //si tiene valores, dejo el contenedor vacio para poner los resultados de busqueda
        accordionContainer.innerHTML = "";

        allProducts.forEach(function (product) {
          product.classList.remove("mt-md-0");
          var itemText = product.textContent
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
          if (itemText.indexOf(searchText) > -1) {
            accordionContainer.appendChild(product);
          }
        });
        //si no se ingreso ningun producto, le digo que hubo resultados
        if (accordionContainer.innerHTML === "") {
          accordionContainer.innerHTML =
            '<p class="ms-0 ms-md-5 fs-4">Sin resultados</p>';
        }
        eventoBotonesProductos();
      }
    });
  /* Formulario */
  //guardo cada formulario
  var formDomicilio = `
  <div class="mb-3 border rounded-4 p-2">
                <label for="i-nombre" class="form-label">Nombre</label>
                <input required 
                  type="text"
                  class="form-control input-focus"
                   name="nombre"
                />
                <label>Dirección:</label>
                <div class="input-group">
                  <select class="form-select input-focus" aria-label="Default select example" name="selectdireccion">
  <option value="avenida" selected>Avenida</option>
  <option value="carrera">Carrera</option>
  <option value="calle">Calle</option>
</select>
                  <input required 
                    type="text"
                    class="form-control ms-1 input-focus"
                    name="duno"
                    placeholder="1A"
                  />
                  <span class="mx-1">#</span>
                  <input required 
                    type="text"
                    class="form-control input-focus"
                    name="ddos"
                    placeholder="11"
                  />
                  <span class="mx-1">-</span>
                  <input required 
                    type="text"
                    class="form-control input-focus"
                    name="dtres"
                    placeholder="54"
                  />
                </div>
                <label>Barrio, Apto, Casa o Punto de Referencia?</label>
                <input name="referencia" type="text" class="form-control input-focus" />
              </div>
  `;
  var formReserva = `
  <div class="mb-3 border rounded-4 p-2">
                <label for="i-nombre" class="form-label">Nombre</label>
                <input required 
                  type="text"
                  class="form-control input-focus"
                   name="nombre"
                />
                <label>Mesa:</label>
                <select
                  class="form-select input-focus"
                  aria-label="Default select example"
                  name="selectmesa"
                >
                   
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <label for="">Fecha</label>
                <input required name="fecha" type="date" class="form-control input-focus" />
                <label for="">Hora</label>
                <input required name="hora" type="time" class="form-control input-focus" />
              </div>
  `;
  var formEnTienda = `
  <div class="mb-3 border rounded-4 p-2">
                <label for="i-nombre" class="form-label">Nombre</label>
                <input required 
                  type="text"
                  class="form-control input-focus"
                   name="nombre"
                />
              </div>
  `;
  var formLocal = `
  <div class="mb-3 border rounded-4 p-2">
                <label for="i-nombre" class="form-label">Nombre</label>
                <input required 
                  type="text"
                  class="form-control input-focus"
                   name="nombre"
                />
                <label>Mesa:</label>
                <select
                  name="selectmesa"
                  class="form-select input-focus"
                  aria-label="Default select example"
                >
                   
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
  `;
  //agrego el evento de cambio de pedido para cargar el formulario
  document
    .getElementById("tipo-pedido")
    .addEventListener("change", function () {
      //agrego la funcion change que es cuando se selecciona algun valor del select
      var valorSeleccionado = this.value;

      if (valorSeleccionado == "domicilio") {
        document.getElementById("form-dinamico").innerHTML = formDomicilio;
      } else if (valorSeleccionado == "reserva") {
        document.getElementById("form-dinamico").innerHTML = formReserva;
      } else if (valorSeleccionado == "en-tienda") {
        document.getElementById("form-dinamico").innerHTML = formEnTienda;
      } else if (valorSeleccionado == "local") {
        document.getElementById("form-dinamico").innerHTML = formLocal;
      }
    });
  /* carrito */
  function plantillaCart(src, titulo, precio, cantidad) {
    const carrito = document.getElementById("carrito");
    const valoresCarrito = carrito.querySelectorAll(".item-producto");
    const itemsCarrito = [...valoresCarrito];
    const nombresItems = itemsCarrito.map((item) => {
      const tituloElement = item.querySelector(".fs-6");
      return tituloElement.textContent;
    });
    let productoExist = false;
    let nodoProducto = null;
    for (let item of nombresItems) {
      if (item === titulo) {
        productoExist = true;
        //obtengo el producto si el titulo es sigual al que ya viene
        nodoProducto = itemsCarrito.find(
          (item) => item.querySelector(".fs-6").textContent === titulo
        );
        break;
      }
    }
    if (productoExist) {
      const precioProducto = nodoProducto.querySelector("#precio");
      const cantidadProducto = nodoProducto.querySelector("#cantidad");
      cantidadProducto.innerHTML = parseInt(cantidadProducto.innerHTML) + 1;
      precioProducto.innerHTML = precio * parseInt(cantidadProducto.innerHTML);
    } else {
      var plantilla = `
                <div
                  class="col-12 d-flex align-items-center values-drop border-drop pe-2 mt-1 item-producto"
                >
                  <img
                    class="img-drop"
                    src="${src}"
                    alt=""
                  />
                  <div class="d-flex justify-content-between w-100">
                    <div class="d-flex flex-column">
                      <span class="fs-6">${titulo}</span>
                      <span><b>Precio:</b>$<i id="precio">${precio}</i> X <i id="cantidad">${cantidad}</i></span>
                    </div>
                    <div class="d-flex flex-column flex-md-row justify-content-center align-items-center">
                      <button type="button" class="btn-des minus">
                      <img
                        class="icono-flecha"
                        src="/img/menos.png"
                        alt=""
                      />
                    </button>
                    
                      <button type="button" class="btn-des plus">
                      <img
                        class="icono-flecha"
                        src="/img/agregar.png"
                        alt=""
                      />
                    </button>
                    </div>
                    
                  </div>
                </div>
    `;
      let carritoActual = (carrito.innerHTML += plantilla);
      carrito.innerHTML = carritoActual;
      //le agrego los eventos a los botones + y - solo cuando se crean
      eventoBotonesCarrito();
    }
    //mensaje

    carritoMensaje();
  }
  //agregar evento a cada boton de los productos para obtener sus valores
  function eventoBotonesProductos() {
    const botonesP = document.querySelectorAll("#accordionExample .btn-des");
    botonesP.forEach(function (boton) {
      // Clonar el botón para conservar sus propiedades
      const botonClonado = boton.cloneNode(true);

      // Obtener el padre del botón
      const parent = boton.parentNode;

      // Eliminar el botón original del DOM
      parent.removeChild(boton);

      // Agregar el nuevo evento al botón clonado
      botonClonado.addEventListener("click", function () {
        let parent = this.parentNode.parentNode;

        const image = parent.querySelector(".img-drop");
        const title = parent.querySelector(".fs-5");
        const price = parent.querySelector("i");

        const src = image.getAttribute("src");
        const titleText = title.textContent;
        const priceText = price.textContent;

        plantillaCart(src, titleText, priceText, 1);
        activarDesactivarSubmit();
      });

      // Agregar el botón clonado de vuelta al DOM
      parent.appendChild(botonClonado);
    });
  }
  //agregar evento a cada boton del carrito para aumentar y disminuir
  function eventoBotonesCarrito() {
    const botones = document.querySelectorAll(".item-producto");
    const botonesPlus = document.querySelectorAll(".plus");
    const botonesMinus = document.querySelectorAll(".minus");
    if (botones) {
      //evento botones de mas y menos
      botonesPlus.forEach(function (boton) {
        boton.addEventListener("click", function () {
          //nodo producto
          const nodoProducto = boton.parentNode.parentNode.parentNode;
          const cantidad = nodoProducto.querySelector("#cantidad");
          const precio = nodoProducto.querySelector("#precio");
          let precioUnitario =
            parseInt(precio.textContent) / parseInt(cantidad.textContent);
          cantidad.innerHTML = parseInt(cantidad.innerHTML) + 1;
          precio.innerHTML = parseInt(cantidad.innerHTML) * precioUnitario;
          
        });
      });
      botonesMinus.forEach(function (boton) {
        boton.addEventListener("click", function () {
          //nodo producto
          const nodoProducto = boton.parentNode.parentNode.parentNode;
          const cantidad = nodoProducto.querySelector("#cantidad");
          if (parseInt(cantidad.innerHTML) > 1) {
            const precio = nodoProducto.querySelector("#precio");
            let precioUnitario =
              parseInt(precio.textContent) / parseInt(cantidad.textContent);
            cantidad.innerHTML = parseInt(cantidad.innerHTML) - 1;

            precio.innerHTML = parseInt(cantidad.innerHTML) * precioUnitario;
          } else {
            const parentProducto = nodoProducto.parentNode;
            parentProducto.removeChild(nodoProducto);
            carritoMensaje("e");
          }
          activarDesactivarSubmit();
        });
      });
    }
  }
  eventoBotonesProductos();
  // boton de formulario

  const Form = document.getElementById("form-pedido");
  //objeto para poner los nombres mejor en el mensaje
  let valoresForm = {
    tipopedido: "Tipo de pedido",
    nombre: "Nombre",
    selectdireccion: "Dirección",
    referencia: "Referencia",
    selectmesa: "Mesa",
    fecha: "Fecha",
    hora: "Hora",
  };
  //trabajo en el evento submit del formulario
  Form.addEventListener("submit", function (e) {
    //detengo la funcion normal
    e.preventDefault();
    //obtengo el formulario
    var parameters = new FormData(this);
    //inicializo el mensaje a crear
    let mensaje = `Pedido de Cafeteria D"Coffe\nInformación:\n`;
    //inicializo los valores del formulario
    const valores = {};
    //recorreo el FormData y obtengo los valores
    parameters.forEach(function (value, key) {
      valores[key] = value;
    });
    //creo el mensaje
    for (let key in valores) {
      if ("selectdireccion" === key) {
        mensaje += ` - ${valoresForm[key]}: ${valores["duno"]}# ${valores["ddos"]} - ${valores["dtres"]}\n`;
      } else {
        if (key in valoresForm) {
          //el chartAt y lo demas, es para poner la primera letra en mayuscula
          mensaje += ` - ${valoresForm[key]}: ${
            valores[key].charAt(0).toUpperCase() + valores[key].slice(1)
          } \n`;
        }
      }
    }
    const produtosEnCarrito = document.querySelectorAll(".item-producto");
    if (produtosEnCarrito.length === 0){
      carritoMensaje("sin");
    } else {
      mensaje += `Productos:\n`;
      let totalPedido = 0;
      produtosEnCarrito.forEach((producto) => {
        const titulo = producto.querySelector(".fs-6").textContent;
        const cantidad = producto.querySelector("#cantidad").textContent;
        const precio = producto.querySelector("#precio").textContent;
        mensaje += `   - ${titulo} ~ Cantidad: ${cantidad} ~ Total: $${precio}\n`;
        totalPedido += parseInt(precio);
      });
      if (valores["notapedido"].trim() !== "") {
        mensaje += `Nota usuario: ${valores["notapedido"]}`;
      }
      mensaje += `Total pedido: $${totalPedido}\n`;
      mensaje = encodeURIComponent(mensaje);
      window.location.href = `https://wa.me/573206081583?text=${mensaje}`;
    }
  });
});
