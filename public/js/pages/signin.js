import { validarSesionExistente } from "../utils/session.js";

//-------Variables-------

const signInButtonHeader = document.getElementById("header-signin-button");
const signinButton = document.getElementById("signin-button");

const urlAPI = "http://localhost:8080";

//-------Funciones-------

function validarFormulario(userName, email, password){
    let bandera = false;
    if (userName && email && password){
        bandera = true;
        return bandera;
    }
    return bandera;
}

function limpiarErrores(){
    document.getElementById("error-message").textContent = "";
    
}

//-------Eventos-------

//Registrar Usuario
signinButton.addEventListener('click', async function (e) {
    e.preventDefault();

    limpiarErrores();

    let userName = document.getElementById("username").value;
    let correo = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let validacion = validarFormulario(userName, correo, password);

    if (validacion){
        let usuario = {
            "nombreUsuario": userName,
            "correo": correo,
            "password": password
        }
        
        try {
            const response = await fetch(`${urlAPI}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(usuario)
            });

            if (response.ok){
                const exito = await response.text();
                console.log(exito);
                //Mostrar Modal
                window.location.href = "./login.html";
                return exito;
            } else {
                const errorMessage = await response.text();
                if (errorMessage === "El correo ya está registrado"){
                    document.getElementById("error-message").textContent = `!${errorMessage}! ${correo}`
                    return;
                } else if (errorMessage === "El nombre de usuario ya está registrado"){
                    document.getElementById("error-message").textContent = `!${errorMessage}! ${userName}`
                    return;
                }
            }
        } catch (error) {
            // Solo mostramos en consola si es un error grave, como sin conexión.
            if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
                console.error('No se pudo conectar al servidor.');
            }
            document.getElementById("error-message").textContent = "Error de conexión. Inténtalo más tarde.";
        }

    } else {
        alert("Debes llenar todos los campos")
    }
})

//Verificar Sesión
document.addEventListener('DOMContentLoaded', () => {
    validarSesionExistente();
})