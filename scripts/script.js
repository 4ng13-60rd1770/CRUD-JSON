const containerVj = document.getElementById("container-vj");
const modal = document.getElementById("modal");
const formSearch = document.getElementById("form-search");
const inputSearch = document.getElementById("input-search");
const filterSearch = document.getElementById("filter-search");
const category = document.getElementById("category");
const btnXbox = document.getElementById("btn-xbox");
const btnPc = document.getElementById("btn-pc");


/////////////----------------- FUNCION SE EJECUTA AL CARGAR LA PAGINA -----------////////////
document.addEventListener("DOMContentLoaded", async() => {
  // Peticion videojuegos pc 
    const responsePc = await fetch("http://localhost:3000/pc");
    const dataPc = await responsePc.json();

  // Peticion videojuegos xboxOne 
    const responseXbox = await fetch("http://localhost:3000/xbox-one");
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

      // creando contenedor(div) para cada carta 
      const divCard = document.createElement("div");
      // Creando etiqueta h3 
      const h3Name = document.createElement("h3");
      h3Name.textContent = arrTotal[i].nombre;
      // creando etiqueta img 
      const imgVj = document.createElement("img");
      imgVj.setAttribute("src", arrTotal[i].imagen);
      // creando etiqueta button
      const btnDetail = document.createElement("button");
      btnDetail.textContent = "Más detalles";
      btnDetail.setAttribute("id", arrTotal[i].id);

      // Agregando contenido a cada carta 
      divCard.appendChild(h3Name);
      divCard.appendChild(imgVj);
      divCard.appendChild(btnDetail);

      // agregado carta al DOM
      containerVj.appendChild(divCard);

    } else{
      boolean = !boolean;
      // Obteniendo indice 
      let y = arrTotal.length - i

      // creando contenedor(div) para cada carta 
      const divCard = document.createElement("div");
      // Creando etiqueta h3 
      const h3Name = document.createElement("h3");
      h3Name.textContent = arrTotal[y].nombre;
      // creando etiqueta img 
      const imgVj = document.createElement("img");
      imgVj.setAttribute("src", arrTotal[y].imagen);
      // creando etiqueta button
      const btnDetail = document.createElement("button");
      btnDetail.textContent = "Más detalles"
      btnDetail.setAttribute("id", arrTotal[y].id)

      // Agregando contenido a cada carta 
      divCard.appendChild(h3Name);
      divCard.appendChild(imgVj);
      divCard.appendChild(btnDetail);

      // agregado carta al DOM
      containerVj.appendChild(divCard);
   
    }
  }  
});


/////////////----------------- FUNCION CLICK MAS DETALLE EN BOTON -----------////////////
containerVj.addEventListener("click", (e)=>{
  modal.innerHTML = ""

  // Obteniendo id del boton 'mas detalle' de cada card
  const id = e.target.id;

  // Pidiendo todos los videojuegos totales del sessionStorage
  const arrTotal = JSON.parse(sessionStorage.getItem("arrTotal"));

  // encontrando el elemento al que se le dio click 
  const searchDetail = arrTotal.find(vj => vj.id == id);


  // CREANDO CONTENIDO DEL MODAL 
  // creando etiqueta contenedor (div)
  const divCard = document.createElement("div");
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
  modal.appendChild(divCard);
})

/////////////----------------- FUNCION CLICK BUSQUEDA POR NOMBRE -----------////////////
inputSearch.addEventListener("keyup", () => {
  filterSearch.innerHTML = "";
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
    filterName.textContent = element.nombre;
  
    // Añadiendo etiqueta p al DOM (lista de filtrados) 
    filterSearch.appendChild(filterName);

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

      // creando contenedor(div) para cada carta 
      const divCard = document.createElement("div");
      // Creando etiqueta h3 
      const h3Name = document.createElement("h3");
      h3Name.textContent = element.nombre;
      // creando etiqueta img 
      const imgVj = document.createElement("img");
      imgVj.setAttribute("src", element.imagen);
      // creando etiqueta button
      const btnDetail = document.createElement("button");
      btnDetail.textContent = "Más detalles";
      btnDetail.setAttribute("id", element.id);

      // Agregando contenido a cada carta 
      divCard.appendChild(h3Name);
      divCard.appendChild(imgVj);
      divCard.appendChild(btnDetail);

      // agregado carta al DOM
      containerVj.appendChild(divCard);
    });

  } else if (e.target.id == "btn-xbox") {
    
    filterXbox.forEach(element => {

      // creando contenedor(div) para cada carta 
      const divCard = document.createElement("div");
      // Creando etiqueta h3 
      const h3Name = document.createElement("h3");
      h3Name.textContent = element.nombre;
      // creando etiqueta img 
      const imgVj = document.createElement("img");
      imgVj.setAttribute("src", element.imagen);
      // creando etiqueta button
      const btnDetail = document.createElement("button");
      btnDetail.textContent = "Más detalles";
      btnDetail.setAttribute("id", element.id);

      // Agregando contenido a cada carta 
      divCard.appendChild(h3Name);
      divCard.appendChild(imgVj);
      divCard.appendChild(btnDetail);

      // agregado carta al DOM
      containerVj.appendChild(divCard);
    });
  };
});


