const pc = document.getElementById("pc");
const xboxOne = document.getElementById("xboxOne");
// console.log(pc)
// DOMContentLoaded
pc.addEventListener(" click", async() => {
  // Peticion videojuegos pc 
  try {
    const response = await fetch("http://localhost:4000/PC");
    const data = await response.json();
    console.log(data);

  } catch (error) {
    console.log(error)
  };

  // Peticion videojuegos xboxOne 
  // try {
  //   const response = await fetch("http://localhost:4000/xbox-one");
  //   const data = await response.json();
  //   console.log(data);

  // } catch (error) {
  //   console.log(error)
  // }

});