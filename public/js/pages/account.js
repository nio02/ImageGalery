import { cerrarSesion, obtenerUsuarioActual, obtenerToken, validarSesion } from "../utils/session.js";
import { subirACloud } from "../services/cloudinary.js";
import { traerUsuarioPorUserName, crearImagenBack, imagenPorId } from "../services/api.js";

//----- Variables -----

const userImageButton = document.getElementById("user-images-button");
const userCollectionButton = document.getElementById("user-collections-button");
const userImagesContainer = document.getElementById("user-images");
const userCollectionContainer = document.getElementById("user-collections");

const loadImageButton = document.getElementById("load-image");
const loadModalContainer = document.getElementById("load-modal");
const loadModalContent = document.getElementById("load-modal-content");
const closeModalButton = document.getElementById("close-load-modal-button");
const cancelLoadButton = document.getElementById("cancel-load-button");

const logoutButton = document.getElementById("log-out");

const infoUserName = document.getElementById("profile-info-username");
const infoUserLogo = document.getElementById("user-logo");

const loadButton = document.getElementById("load-button");
const imageUserDescription = document.getElementById("image-description");

//----- Funciones -----

function mostrarElementos(){
    userImageButton.classList.toggle("active-tab");
    userImageButton.classList.toggle("text-tertiary");
    userImagesContainer.classList.toggle("hidden");

    userCollectionButton.classList.toggle("active-tab");
    userCollectionButton.classList.toggle("text-tertiary");
    userCollectionContainer.classList.toggle("hidden");
}

function mostrarInformacion(){
    let user = localStorage.getItem("usuarioActual");
    infoUserName.textContent = user;

    infoUserLogo.textContent = `${user.slice(0, 2).toLocaleUpperCase()}`;
}

function mostrarModal(){
    loadModalContainer.classList.toggle("hidden");
}

function ocultarElementos(){
    Array.from(loadModalContainer.children).forEach(hijo =>{
        hijo.classList.toggle("hidden");
    })    
}

function limpiarImagenesUsuario(){
    while (userImagesContainer.firstChild){
        userImagesContainer.removeChild(userImagesContainer.firstChild);
    }
}

function loadSkeleton(){
    const loadAnimation = document.createElement('div');
    loadAnimation.textContent = "Cargando..."

}

async function subirImagen() {
    const userName = obtenerUsuarioActual();
    const token = obtenerToken();
    const userFile = document.getElementById("user-file").files[0];

    if (!userFile){
        alert("Por favor, sube un archivo")
        return;
    }
    
    //Generar URL de imagen
    let dataCloudinary;
    let urlImage;

    try {
        dataCloudinary = await subirACloud(userFile);
        urlImage = dataCloudinary.secure_url;
        console.log("Imagen subida en cloudinary", dataCloudinary.secure_url);
    } catch (error) {
        console.error(error);
        alert(`Error al subir imagen: ${error.message}`);
        return;
    }

    //Traer Usuario por userName
    let dataUsuario;

    try {
        dataUsuario = await traerUsuarioPorUserName(userName, token);
    } catch (error) {
        console.error(error);
        alert(`Error al traer usuario: ${error.message}`);
        return;
    }

    let idUsuario = dataUsuario.id;
    
    //Asignar Imagen al usuario

    let solicitud = {
        "descripcion": `${imageUserDescription.value}`,
        "url": `${urlImage}`,
        "usuario": {
            "id": idUsuario
        }
    };
    
    try {
        const saveImage = await crearImagenBack(solicitud, token);
        console.log(saveImage);
        mostrarModal();
    } catch (error) {
        ocultarElementos();
        console.error(error);
        alert(`Error al crear imagen: ${error.message}`);
        return;
    }
}

function mostrarImagenesUsuario(url){
    const imageContainer = document.createElement('a');
    imageContainer.href = "./detalle.html";
    imageContainer.classList.add("image-box", "overflow-hidden");
    imageContainer.innerHTML = `
        <img src="${url}" alt="" class="rounded-md w-full h-52 object-cover">
    `;

    userImagesContainer.prepend(imageContainer);
}

async function renderizarImagenesUsuario(id, token) {
    try {
        const data = await imagenPorId(id, token);

        for (let i = 0; i < data.length; i++){
            let urlRender = data[i].url;
            mostrarImagenesUsuario(urlRender);
        }
    } catch (error) {
        console.error("Error al obtener imagenes:", error);
    }
}



//----- Eventos ------

//Mostrar Informacion
document.addEventListener('DOMContentLoaded', async () => {
    //Validar
    validarSesion();
    //Mostrar informacion
    mostrarInformacion();

    let usuario = obtenerUsuarioActual();
    let token = obtenerToken();

    //Traer Usuario
    let userId;

    try {
        const responseUsuario = await traerUsuarioPorUserName(usuario, token);
        userId = responseUsuario.id;
    } catch (error) {
        console.error(error);
        alert(`Error al obtener usuario: ${error.message}`);
        return;
    }
    
    renderizarImagenesUsuario(userId, token);

})

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
//Botones Cerrar Modal
closeModalButton.addEventListener('click', () =>{
    mostrarModal();
})
cancelLoadButton.addEventListener('click', () =>{
    mostrarModal();
})

//Cerrar Sesión
logoutButton.addEventListener('click', () => {
    cerrarSesion();
})

//Subir imagen
loadButton.addEventListener('click',async () => {
    await subirImagen();
    limpiarImagenesUsuario();

    //Traer Usuario
    let usuario = obtenerUsuarioActual();
    let token = obtenerToken();

    //Traer Usuario
    let userId;

    try {
        const responseUsuario = await traerUsuarioPorUserName(usuario, token);
        userId = responseUsuario.id;
    } catch (error) {
        console.error(error);
        alert(`Error al obtener usuario: ${error.message}`);
        return;
    }
    
    renderizarImagenesUsuario(userId, token);

})