//----- Variables ------
let loginButton = document.getElementById("login-button");

const urlAPI = "http://localhost:8080";

//----- Funciones -----

async function obtenerUsuario(correo) {
    try {
        const response = await fetch(`${urlAPI}/users/${correo}`);
        if (!response.ok) {
            throw new Error("Error en la respuesta")
        }
        const data = await response.json();
        console.log(data)
        return data
    } catch (error) {
        console.error('Error:', error)
    }
}

function validarCampos(userName, password){
    let bandera = false;
    if (userName && password){
        bandera = true;
    }
    return bandera;
}

//----- Eventos -----
loginButton.addEventListener('click', (e) => {
    e.preventDefault();

    let userName = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let validacion = validarCampos(userName, password);

    if (validacion){
        obtenerUsuario(userName);
    } else{
        alert("Debes llenar todos los campos")
    }
})