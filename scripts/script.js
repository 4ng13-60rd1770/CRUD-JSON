const containerVj = document.getElementById("container-vj");
const modalBody = document.getElementById("modal-body");
const formSearch = document.getElementById("form-search");
const inputSearch = document.getElementById("input-search");
const filterSearch = document.getElementById("filter-search");
const category = document.getElementById("category");
const btnXbox = document.getElementById("btn-xbox");
const btnPc = document.getElementById("btn-pc");
const containSearch = document.getElementById("contain-search");


function createElemen(){
  // Card-group --> div 
  const cardGoup = document.createElement("div");
  cardGoup.classList.add("card-group");
  // card --> div
  const card = document.createElement("div");
  card.classList.add("card")
  // img --> img
  const cardImgTop = document.createElement("img");
  // cardImgTop.classList.add("card-img-top");
  // cardImgTop.classList.add("w-100");
  cardImgTop.style.width = "200px";
  cardImgTop.classList.add("my-5");
  cardImgTop.classList.add("ms-4");
  cardImgTop.setAttribute("src", arrTotal[i].imagen);

  // card-body --> div
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  // cardTitle --> h5
  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = arrTotal[i].nombre;

  // btnSuccess --> button
  const btnSuccess = document.createElement("button");
  btnSuccess.classList.add("btn");
  btnSuccess.classList.add("btn-success");
  btnSuccess.textContent = "Más detalles";
  btnSuccess.setAttribute("id", arrTotal[i].id);
  btnSuccess.setAttribute("data-bs-target", "#staticBackdrop");
  btnSuccess.setAttribute("data-bs-toggle", "modal");
  
  // Agregando card a cardGroup
  cardGoup.appendChild(card);

  // Agregando cardtitle y cardBody a card
  card.appendChild(cardImgTop);
  card.appendChild(cardBody);

  // Agregando cardTitle y btnSuccess a cardBody
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(btnSuccess);

  // AGREGANDO CONTENEDOR PADRE (cardGroup) AL DOM 
  containerVj.appendChild(cardGoup)
}
/////////////----------------- FUNCION SE EJECUTA AL CARGAR LA PAGINA -----------////////////
document.addEventListener("DOMContentLoaded", async() => {
  // Peticion videojuegos pc 
    const responsePc = await fetch("http://localhost:4000/pc");
    const dataPc = await responsePc.json();

  // Peticion videojuegos xboxOne 
    const responseXbox = await fetch("http://localhost:4000/xbox-one");
    const dataXbox = await responseXbox.json();
    

// Añadiendo las dos peticiones a un solo array 
  const arrTotal = dataPc.concat(dataXbox);
  // mandando informacion al sessionStorage
  sessionStorage.setItem("arrTotal", JSON.stringify(arrTotal))

  // Imprimiendo en pantalla todas las peliculas de forma distribuida 
  let boolean = true;
  for(let i = 0; i < arrTotal.length; i++) {
    
    if (boolean) {
      boolean = !boolean; 
      // Card-group --> div 
      const cardGoup = document.createElement("div");
      cardGoup.classList.add("card-group");
      // card --> div
      const card = document.createElement("div");
      card.classList.add("card")
      // img --> img
      const cardImgTop = document.createElement("img");
      // cardImgTop.classList.add("card-img-top");
      // cardImgTop.classList.add("w-100");
      cardImgTop.style.width = "200px"
      cardImgTop.classList.add("my-5");
      cardImgTop.classList.add("ms-4");
      cardImgTop.setAttribute("src", arrTotal[i].imagen);

      // card-body --> div
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      // cardTitle --> h5
      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");
      cardTitle.textContent = arrTotal[i].nombre;

      // btnSuccess --> button
      const btnSuccess = document.createElement("button");
      btnSuccess.classList.add("btn");
      btnSuccess.classList.add("btn-success");
      btnSuccess.textContent = "Más detalles";
      btnSuccess.setAttribute("id", arrTotal[i].id);
      btnSuccess.setAttribute("data-bs-target", "#staticBackdrop");
      btnSuccess.setAttribute("data-bs-toggle", "modal");
      
      // Agregando card a cardGroup
      cardGoup.appendChild(card);

      // Agregando cardtitle y cardBody a card
      card.appendChild(cardImgTop);
      card.appendChild(cardBody);

      // Agregando cardTitle y btnSuccess a cardBody
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(btnSuccess);

      // AGREGANDO CONTENEDOR PADRE (cardGroup) AL DOM 
      containerVj.appendChild(cardGoup)
    } else{
      boolean = !boolean;
      // Obteniendo indice 
      let y = arrTotal.length - i;

      // Card-group --> div 
      const cardGoup = document.createElement("div");
      cardGoup.classList.add("card-group");
      // card --> div
      const card = document.createElement("div");
      card.classList.add("card")
      // img --> img
      const cardImgTop = document.createElement("img");
      cardImgTop.classList.add("card-img-top");
      // cardImgTop.classList.add("w-100");
      cardImgTop.style.width = "200px"
      cardImgTop.classList.add("my-5");
      cardImgTop.classList.add("ms-4");
      cardImgTop.setAttribute("src", arrTotal[i].imagen);

      //  
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      // cardTitle --> h5
      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");
      cardTitle.textContent = arrTotal[y].nombre;

      // btnSuccess --> button
      const btnSuccess = document.createElement("button");
      btnSuccess.classList.add("btn");
      btnSuccess.classList.add("btn-success");
      btnSuccess.textContent = "Más detalles";
      btnSuccess.setAttribute("id", arrTotal[y].id);
      btnSuccess.setAttribute("data-bs-target", "#staticBackdrop");
      btnSuccess.setAttribute("data-bs-toggle", "modal");
      // data-bs-target="#staticBackdrop"")
      // Agregando card a cardGroup
      cardGoup.appendChild(card);

      // Agregando cardtitle y cardBody a card
      card.appendChild(cardImgTop);
      card.appendChild(cardBody);

      // Agregando cardTitle y btnSuccess a cardBody
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(btnSuccess);

      // AGREGANDO CONTENEDOR PADRE (cardGroup) AL DOM 
      containerVj.appendChild(cardGoup)
   
    }
  }  
});


/////////////----------------- FUNCION CLICK MAS DETALLE EN BOTON -----------////////////
containerVj.addEventListener("click", (e)=>{

  modalBody.innerHTML = ""

  // Obteniendo id del boton 'mas detalle' de cada card
  const id = e.target.id;
  
  // Pidiendo todos los videojuegos totales del sessionStorage
  const arrTotal = JSON.parse(sessionStorage.getItem("arrTotal"));
  
  // encontrando el elemento al que se le dio click 
  const searchDetail = arrTotal.find(vj => vj.id == id);
  
  
  // CREANDO CONTENIDO DEL MODAL 
  // creando etiqueta contenedor (div)
  const divCard = document.createElement("div");
  console.log(divCard)
    // Creando etiqueta h3 
  const h3Name = document.createElement("h3");
  h3Name.textContent = searchDetail.nombre;
  //  creando equita fecha de lanzamiento (div)
  const lanzamiento = document.createElement("div");
  lanzamiento.textContent = searchDetail.lanzamiento;
    // creando etiqueta img 
  const imgVj = document.createElement("img");
  imgVj.setAttribute("src", searchDetail.imagen);
  //  creando etiqueta categoria (div)
  const category = document.createElement("div");
  category.textContent = searchDetail.categoria;
  // creando etiqueta descripcion (div)
  const description = document.createElement("p");
  description.textContent = searchDetail.descripcion;
    
  // Agregando contenido a cada carta 
  divCard.appendChild(h3Name);
  divCard.appendChild(lanzamiento);
  divCard.appendChild(imgVj);
  divCard.appendChild(category);
  divCard.appendChild(description);

  // agregado carta al DOM (modal)
  modalBody.appendChild(divCard);
})

/////////////----------------- FUNCION CLICK BUSQUEDA POR NOMBRE -----------////////////
inputSearch.addEventListener("keyup", () => {
  containSearch.innerHTML = "";
    // Pidiendo todos los videojuegos totales del sessionStorage
  const arrTotal = JSON.parse(sessionStorage.getItem("arrTotal"));
  // capturando valor del input 
  const teclaOprimida = inputSearch.value;
  // filtrando cada tecla que se oprime 
  const searchTecla = arrTotal.filter(element => element.nombre.toLowerCase().includes(teclaOprimida.toLowerCase()) );

  // pintando el filtrado 
  searchTecla.forEach(element => {
    
    // creando etiqueta img 
    const filterImg = document.createElement("img");
    filterImg.setAttribute("src", element.imagen);
    // creando etiqueta p 
    const filterName = document.createElement("p");
    filterName.style.borderBottom = "solid 1px"
    filterName.textContent = element.nombre;
  
    // Añadiendo etiqueta p al DOM (lista de filtrados) 
    containSearch.appendChild(filterName);

  });

});


/////////////----------------- FUNCION FILTRAR POR CATEGORiA -----------////////////
category.addEventListener("click", (e) => {
  containerVj.innerHTML = "";

  // Pidiendo todos los videojuegos totales del sessionStorage
  const arrTotal = JSON.parse(sessionStorage.getItem("arrTotal"));

  // filtrando categorias 
  const filterPc = arrTotal.filter(element => element.categoria == "PC");
  const filterXbox = arrTotal.filter(element => element.categoria == "xbox-one");

  if(e.target.id == "btn-pc") {

    filterPc.forEach(element => {

      // Card-group --> div 
      const cardGoup = document.createElement("div");
      cardGoup.classList.add("card-group");
      // card --> div
      const card = document.createElement("div");
      card.classList.add("card")
      // img --> img
      const cardImgTop = document.createElement("img");
      // cardImgTop.classList.add("card-img-top");
      // cardImgTop.classList.add("w-100");
      cardImgTop.style.width = "200px"
      cardImgTop.classList.add("my-5");
      cardImgTop.classList.add("ms-4");
      cardImgTop.setAttribute("src", element.imagen);

      // card-body --> div
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      // cardTitle --> h5
      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");
      cardTitle.textContent = element.nombre;

      // btnSuccess --> button
      const btnSuccess = document.createElement("button");
      btnSuccess.classList.add("btn");
      btnSuccess.classList.add("btn-success");
      btnSuccess.textContent = "Más detalles";
      btnSuccess.setAttribute("id", element.id);
      btnSuccess.setAttribute("data-bs-target", "#staticBackdrop");
      btnSuccess.setAttribute("data-bs-toggle", "modal");

      // Agregando card a cardGroup
      cardGoup.appendChild(card);

      // Agregando cardtitle y cardBody a card
      card.appendChild(cardImgTop);
      card.appendChild(cardBody);

      // Agregando cardTitle y btnSuccess a cardBody
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(btnSuccess);

      // AGREGANDO CONTENEDOR PADRE (cardGroup) AL DOM 
      containerVj.appendChild(cardGoup)

    });

  } else if (e.target.id == "btn-xbox") {
    
    filterXbox.forEach(element => {

      // Card-group --> div 
      const cardGoup = document.createElement("div");
      cardGoup.classList.add("card-group");
      // card --> div
      const card = document.createElement("div");
      card.classList.add("card")
      // img --> img
      const cardImgTop = document.createElement("img");
      // cardImgTop.classList.add("card-img-top");
      // cardImgTop.classList.add("w-100");
      cardImgTop.style.width = "200px"
      cardImgTop.classList.add("my-5");
      cardImgTop.classList.add("ms-4");
      cardImgTop.setAttribute("src", element.imagen);

      // card-body --> div
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      // cardTitle --> h5
      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");
      cardTitle.textContent = element.nombre;

      // btnSuccess --> button
      const btnSuccess = document.createElement("button");
      btnSuccess.classList.add("btn");
      btnSuccess.classList.add("btn-success");
      btnSuccess.textContent = "Más detalles";
      btnSuccess.setAttribute("id", element.id);
      btnSuccess.setAttribute("data-bs-target", "#staticBackdrop");
      btnSuccess.setAttribute("data-bs-toggle", "modal");
      
      // Agregando card a cardGroup
      cardGoup.appendChild(card);

      // Agregando cardtitle y cardBody a card
      card.appendChild(cardImgTop);
      card.appendChild(cardBody);

      // Agregando cardTitle y btnSuccess a cardBody
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(btnSuccess);

      // AGREGANDO CONTENEDOR PADRE (cardGroup) AL DOM 
      containerVj.appendChild(cardGoup)

    });
  };
});




