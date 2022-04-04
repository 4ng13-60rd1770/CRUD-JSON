let btnGuardar = document.getElementById('btnGuardar');
let btnEditar = document.getElementById('btnEditar');
let btnEliminar = document.getElementById('btnEliminar');
let formulario = document.getElementById('formulario');
const play= ' http://localhost:3000/PC'



formulario.addEventListener('submit', async (e)=>{
    e.preventDefault();
    let name = document.getElementById('name').value;
    let description = document.getElementById('description').value;
    let date = document.getElementById('date').value
    let categoria = document.getElementById('category').value

    let resp = await fetch(pc,{
        method:'POST',
        body:JSON.stringify({
            nombre: name,
            description:description,
            date:date,
            category:categoria

        }),
        headers:{
            "Content-Type": "application/json; charset=utf-8"
        }

    })
    let data = await resp.json()
    console.log(data)
})



btnEliminar.addEventListener('click', async() =>{
    let idEliminar = document.getElementById('id').value

    let resp = await fetch(play+idEliminar, {
        method: 'DELETE'
    })
    let data = await resp.json()
    console.log(data)

})