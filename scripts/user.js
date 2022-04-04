let btnGuardar = document.getElementById('btnGuardar');
let btnEditar = document.getElementById('btnEditar');
let btnEliminar = document.getElementById('btnEliminar');
let formulario = document.getElementById('formulario');
const play= ' http://localhost:3000/';
const inputSearch = document.getElementById("form-search");
const containSearch = document.getElementById("contain-search");
// Inputs del formulario 
let name = document.getElementById('name');
let description = document.getElementById('description');
let lanzamiento = document.getElementById('date');
let categoria = document.getElementById('category');

formulario.addEventListener('submit', async (e)=>{
    e.preventDefault();

    let resp = await fetch(play + categoria.value,{
        method:'POST',
        body:JSON.stringify({
            nombre: name.value,
            description: description.value,
            date:lanzamiento.value,
            category:categoria.value
        }),
        headers:{
            "Content-Type": "application/json; charset=utf-8"
        }

    })
    let data = await resp.json()
    console.log(data)
})


// BUSACAR 
inputSearch.addEventListener("keyup", async() => {
  containSearch.innerHTML = "";
  // Peticion videojuegos pc 
  const responsePc = await fetch("http://localhost:3000/PC");
  const dataPc = await responsePc.json();
  
  // Peticion videojuegos xboxOne 
  const responseXbox = await fetch("http://localhost:3000/xbox-one");
  const dataXbox = await responseXbox.json();
  
  
  // Añadiendo las dos peticiones a un solo array 
  const arrTotal = dataPc.concat(dataXbox);
  
  // capturando valor del input 
  const teclaOprimida = inputSearch.value;
  // filtrando cada tecla que se oprime 
  const searchTecla = arrTotal.filter(element => element.nombre.toLowerCase().includes(teclaOprimida.toLowerCase()) );
  
  // pintando el filtrado 
  searchTecla.forEach(element => {
    
    // creando etiqueta img 
    // const filterImg = document.createElement("img");
    // filterImg.setAttribute("src", element.imagen);
    // // creando etiqueta p 
    const filterName = document.createElement("p");
    filterName.style.borderBottom = "solid 1px"
    filterName.textContent = element.nombre;
    filterName.setAttribute("id", element.id)
  
    // Añadiendo etiqueta p al DOM (lista de filtrados) 
    containSearch.appendChild(filterName);

  });

});


containSearch.addEventListener("click", async(e)=>{
  const id = e.target.id;
  sessionStorage.setItem("objId", JSON.stringify(id));
  // Peticion videojuegos pc 
  const responsePc = await fetch("http://localhost:3000/PC");
  const dataPc = await responsePc.json();
  
  // Peticion videojuegos xboxOne 
  const responseXbox = await fetch("http://localhost:3000/xbox-one");
  const dataXbox = await responseXbox.json();
  
  
  // Añadiendo las dos peticiones a un solo array 
  const arrTotal = dataPc.concat(dataXbox);

  const filterId = arrTotal.find(element => element.id == id)
  
  name.value = filterId.nombre;
  description.value = filterId.descripcion;
  lanzamiento.value = filterId.lanzamiento;
  
  categoria.value = filterId.categoria;
})



// ELIMINAR 
btnEliminar.addEventListener('click', async(e) => {
  e.preventDefault()
    const id = JSON.parse(sessionStorage.getItem("objId"))
  console.log(play + categoria.value + "/" + id)
    let resp = await fetch(play + categoria.value + "/" + id, {
        method: 'DELETE'
    })
    let data = await resp.json()

});


// EDITAR CONTENIDO 
btnEditar.addEventListener("click", async()=>{
  let resp = await fetch(play + categoria.value,{
    method:'PUT',
    body:JSON.stringify({
        nombre: name.value,
        description: description.value,
        date:lanzamiento.value,
        category:categoria.value
    }),
    headers:{
        "Content-Type": "application/json; charset=utf-8"
    }
    
})
let data = await resp.json()

})


