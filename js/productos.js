document.addEventListener("DOMContentLoaded", function () {
  //Buscar los productos
  //selecciono el div que tiene todos los productos
  const accordionContainer = document.querySelector("#accordionExample");
  //guardo el html para cuando no se busque
  const originalAccordionContent = accordionContainer.innerHTML;
  //obtengo todos los productos, los copio para modificarlos sin afectar a los elementos originales
  const allProducts = Array.from(document.querySelectorAll(".values-drop")).map(
    (node) => node.cloneNode(true)
  );

  //selecciono el input que va a realizar la busqueda
  document
    .querySelector(".form-control")
    .addEventListener("input", function () { // con el evento input que es el de reaccionada cada que escribe, realizo la busqueda
      //obtengo la busqueda y le aplico una normalizacion, que ignore las tildes, lo pongo en minuscula, y que quite los espacios de inicio y fin
      var searchText = this.value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

      if (searchText === "") {
        //si esta vacio, dejo todo el contenido normal
        accordionContainer.innerHTML = originalAccordionContent;
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
           accordionContainer.innerHTML = '<p class="ms-0 ms-md-5 fs-4">Sin resultados</p>';
         }
      }
    });
});
