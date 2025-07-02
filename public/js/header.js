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

function mostrarModalLogOut(){
    const body = document.body;
    const modal = document.createElement("div");

    modal.innerHTML = `
        <div id="load-modal" class="fixed inset-0 flex bg-main bg-opacity-50 items-center justify-center z-50 w-full h-full">
        <article class="relative flex flex-col bg-primary p-12 rounded-lg shadow-lg max-w-fit w-full justify-center items-center">
            <h1 class="font-bold text-main text-2xl mb-4">Tu sesión ha expirado</h1>
            <p class="text-tertiary">Te vamos a redirigir al inicio de sesión</p>
        </article>
        </div>
    `;

    body.appendChild(modal);

    setTimeout(() => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("usuarioActual");
        window.location.href = "./login.html"
    }, 3000)
}

async function mostrarOpcionesUsuario(){
    const usuario = localStorage.getItem("usuarioActual");
    const token = localStorage.getItem("jwt");

    if (usuario || token){
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
                if (response.status === 401 || response.status === 403){
                    mostrarModalLogOut();
                }
                return;
            }
        } catch (error) {
            // Solo mostramos en consola si es un error grave, como sin conexión.
            if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
                console.error('No se pudo conectar al servidor.');
            }
        }
    }
}

//----- Eventos -----
document.addEventListener('DOMContentLoaded', () => {
    mostrarOpcionesUsuario();
})