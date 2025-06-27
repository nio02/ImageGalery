//----- Variables ------
let loginButton = document.getElementById("login-button");

const urlAPI = "http://localhost:8080";

//----- Funciones -----

async function logearUsuario(usuario) {
    try {
        const response = await fetch(`${urlAPI}/users/loginDto`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

        if (response.ok) {
            const token = await response.text();
            localStorage.setItem('jwt', token);
            window.location.href = "./account.html";
        } else if (response.status === 403){
            document.getElementById("error-message").textContent = `!El usuario no existe!`;
        } else {
            const errorMessage = await response.text();
            console.log(errorMessage)
            document.getElementById("error-message").textContent = `!${errorMessage}!`;
        }

        const data = await response.json();
        console.log(data)
        return data
    } catch (error) {
        // Solo mostramos en consola si es un error grave, como sin conexión.
        if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
            console.error('No se pudo conectar al servidor.');
            document.getElementById("error-message").textContent = "Error de conexión. Inténtalo más tarde.";
        }
    }
}

function validarCampos(userName, password){
    let bandera = false;
    if (userName && password){
        bandera = true;
    }
    return bandera;
}

function limpiarErrores(){
    document.getElementById("error-message").textContent = "";
    
}

//----- Eventos -----
loginButton.addEventListener('click', (e) => {
    e.preventDefault();

    limpiarErrores();

    let userName = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let usuario = {
        "nombreUsuario": userName,
        "password": password
    }

    let validacion = validarCampos(userName, password);

    if (validacion){
        logearUsuario(usuario);
    } else{
        alert("Debes llenar todos los campos")
    }
})