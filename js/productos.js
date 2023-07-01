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
                  <select
                    class="form-select input-focus"
                    aria-label="Default select example"
                    name="select-direccion"
                  >
                    <option value="avenida" selected>Avenida</option>
                    <option value="carrera">Carrera</option>
                    <option value="calle">Calle</option>
                  </select>
                  <input required 
                    type="text"
                    class="form-control ms-1 input-focus"
                    name="d-uno"
                    placeholder="1A"
                  />
                  <span class="mx-1">#</span>
                  <input required 
                    type="text"
                    class="form-control input-focus"
                    name="d-dos"
                    placeholder="11"
                  />
                  <span class="mx-1">-</span>
                  <input required 
                    type="text"
                    class="form-control input-focus"
                    name="d-tres"
                    placeholder="54"
                  />
                </div>
                <label>Barrio, Apto, Casa o Punto de Referencia?</label>
                <input required name="referencia" type="text" class="form-control input-focus" />
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
                  name="select-mesa"
                >
                   
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <label for="">Fecha</label>
                <input required name="fecha" type="date" class="form-control" />
                <label for="">Hora</label>
                <input required name="hora" type="time" class="form-control" />
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
                  name="select-mesa"
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
    var plantilla = `
                <div
                  class="col-12 d-flex align-items-center values-drop border-drop pe-2 mt-1"
                >
                  <img
                    class="img-drop"
                    src="${src}"
                    alt=""
                  />
                  <div class="d-flex justify-content-between w-100">
                    <div class="d-flex flex-column">
                      <span class="fs-6">${titulo}</span>
                      <span><b>Precio:</b>$<i id="precio">${precio}</i> X<i id="cantidad">${cantidad}</i></span>
                    </div>
                    <div class="d-flex">
                      <button class="btn-des minus">
                      <img
                        class="icono-flecha"
                        src="/img/menos.png"
                        alt=""
                      />
                    </button>
                    
                      <button class="btn-des plus">
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
    const carrito = document.getElementById("carrito");
    let carritoActual = (carrito.innerHTML += plantilla);
    carrito.innerHTML = carritoActual;
  }
  //funciones
  //agregar evento a cada boton de los productos para obtener sus valores
  function eventoBotonesProductos() {
    const botonesP = document.querySelectorAll("#accordionExample .btn-des");

    console.log(botonesP.length)
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
      });

      // Agregar el botón clonado de vuelta al DOM
      parent.appendChild(botonClonado);
    });
  }
  eventoBotonesProductos();
});
