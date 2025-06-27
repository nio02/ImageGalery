//----- Variables -----

const userImageButton = document.getElementById("user-images-button");
const userCollectionButton = document.getElementById("user-collections-button");
const userImagesContainer = document.getElementById("user-images");
const userCollectionContainer = document.getElementById("user-collections");

const loadImageButton = document.getElementById("load-image");
const loadModalContainer = document.getElementById("load-modal");
const loadModalContent = document.getElementById("load-modal-content");

const logoutButton = document.getElementById("log-out");

//----- Funciones -----

function mostrarElementos(){
    userImageButton.classList.toggle("active-tab");
    userImageButton.classList.toggle("text-tertiary");
    userImagesContainer.classList.toggle("hidden");

    userCollectionButton.classList.toggle("active-tab");
    userCollectionButton.classList.toggle("text-tertiary");
    userCollectionContainer.classList.toggle("hidden");
}

function mostrarModal(){
    const modalContainer = document.getElementById("load-modal");
    modalContainer.classList.toggle("hidden");
}

function cerrarSesion(){
    localStorage.removeItem("usuarioActual");
    localStorage.removeItem("jwt");

    window.location.href = "./login.html"
}

//----- Eventos ------

//Mostrar Elementos
userImageButton.addEventListener('click', () => {
    if(userImageButton.classList.contains("active-tab")){
        return;
    } else {
        mostrarElementos();
    }
})
userCollectionButton.addEventListener('click', () => {
    if(userCollectionButton.classList.contains("active-tab")){
        return;
    } else {
        mostrarElementos();
    }
})

//Mostrar Modal
loadImageButton.addEventListener('click', () =>{
    mostrarModal();
});
//Cerrar modal
loadModalContainer.addEventListener('click', (e) => {
    if (e.target === loadModalContainer){
        mostrarModal();
    }
})

//Cerrar Sesión
logoutButton.addEventListener('click', () => {
    cerrarSesion();
})