//-------Variables-------

const signInButtonHeader = document.getElementById("header-signin-button");
const signinButton = document.getElementById("signin-button");

const urlAPI = "http://localhost:8080";

//-------Funciones-------



//-------Eventos-------

//Prevenir Recarga
signInButtonHeader.addEventListener('click', (e) => {
    e.preventDefault();
});

//Registrar Usuario
signinButton.addEventListener('click', (e) =>{
    e.preventDefault();

    let userName = document.getElementById("username").value;
    let correo = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let usuario = {
        "nombreUsuario": userName,
        "correo": correo,
        "password": password
    }

    console.log(usuario)

    fetch(`${urlAPI}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    .then(response => {
        if(!response.ok){
            return response.text().then(errorMessage =>{
                throw new Error(errorMessage || "Error al registrar el usuario")
            })
        }
        return response.text();
    })
    .then(data => {
        console.log(data)
    })
    .catch(error =>{
        console.log("Error al hacer post:", error)
    })
})