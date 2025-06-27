//----- Variables -----

const headerContainer = document.getElementById("nav-options");
const url = "http://localhost:8080";

//----- Funciones -----

function renderizarUsuario(){
    const loginButton = document.getElementById("login-header-button");
    const signinButton = document.getElementById("signin-header-button");

    let nombreUsuario = localStorage.getItem("usuarioActual");

    if (loginButton){
        headerContainer.removeChild(loginButton);
    } 
    if (signinButton){
        headerContainer.removeChild(signinButton);
    }
    
    let infoUsuario = document.createElement("li");
    infoUsuario.classList.add("mr-5");
    infoUsuario.innerHTML = `
            <p class="bg-shadow rounded-lg py-2 px-2"><span class="rounded-full bg-secondary p-2 mr-4 select-none">${nombreUsuario.slice(0, 2).toLocaleUpperCase()}</span>Bienvenido, ${nombreUsuario}</p>
    `;

    let accountButton = document.createElement("li");
    accountButton.classList.add("mr-5");
    accountButton.innerHTML = `
        <a href="./account.html">
            <button class="bg-secondary p-2 px-4 rounded-[12px] font-bold text-primary">Tu Cuenta</button>
        </a>
    `;

    headerContainer.appendChild(infoUsuario);
    headerContainer.appendChild(accountButton);
}

async function mostrarOpcionesUsuario(){
    const usuario = localStorage.getItem("usuarioActual");
    const token = localStorage.getItem("jwt");

    try {
        const response = await fetch(`${url}/users/cuenta`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.ok){
            const mensaje = await response.text();
            console.log(mensaje)
            renderizarUsuario();
        } else {
            const errorMessage = await response.text();
            console.log(errorMessage)
        }

    } catch {

    }
}

//----- Eventos -----
document.addEventListener('DOMContentLoaded', () => {
    mostrarOpcionesUsuario();
})