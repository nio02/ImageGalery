//----- Variables -----
const urlAPI = "http://localhost:8080";

const userImageButton = document.getElementById("user-images-button");
const userCollectionButton = document.getElementById("user-collections-button");
const userImagesContainer = document.getElementById("user-images");
const userCollectionContainer = document.getElementById("user-collections");

const loadImageButton = document.getElementById("load-image");
const loadModalContainer = document.getElementById("load-modal");
const loadModalContent = document.getElementById("load-modal-content");

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

function loadSkeleton(){
    const loadAnimation = document.createElement('div');
    loadAnimation.textContent = "Cargando..."
    
}

function cerrarSesion(){
    localStorage.removeItem("usuarioActual");
    localStorage.removeItem("jwt");

    window.location.href = "./login.html"
}

async function subirImagen() {
    try {
        const token = localStorage.getItem("jwt");
        const userFile = document.getElementById("user-file").files[0];
    
        if (!userFile){
            alert("Por favor, sube un archivo")
            return;
        }
        
        const formData = new FormData();
        formData.append("file", userFile);
        formData.append("upload_preset", "ImageGallery");
    
        const responseCloudinary = await fetch('https://api.cloudinary.com/v1_1/donrhclb6/image/upload', {
            method: 'POST',
            body: formData
        });
    
        const dataCloudinary = await responseCloudinary.json();
        const urlImage = dataCloudinary.secure_url;
        console.log("Imagen subida en cloudinary", dataCloudinary.secure_url);
    
        const responseUsuario = await fetch(`${urlAPI}/users/username/${localStorage.getItem("usuarioActual")}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    
        const dataUsuario = await responseUsuario.json();
        let idUsuario = dataUsuario.id_usuario;
    
        let solicitud = {
            "descripcion": `${imageUserDescription.value}`,
            "url": `${urlImage}`,
            "usuario": {
                "id_usuario": idUsuario
            }
        }
        
        const saveImage = await fetch(`${urlAPI}/images/upload`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(solicitud)
        })
    
        if (saveImage.ok){
            const mensaje = await saveImage.text();
            console.log(mensaje)
            mostrarModal();
            return mensaje;
        } else {
            ocultarElementos();
        }
    
        mostrarModal();
        
    } catch (error) {
        console.error("Error : ", error)
    }

}

//----- Eventos ------

//Mostrar Informacion
document.addEventListener('DOMContentLoaded', () => {
    //Validar
    const usuario = localStorage.getItem("usuarioActual");
    const token = localStorage.getItem("jwt");
    
    if(usuario == null || token == null){
        window.location.href = "./login.html"
    }
    //Mostrar informacion
    mostrarInformacion();
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

//Cerrar Sesión
logoutButton.addEventListener('click', () => {
    cerrarSesion();
})

//Subir imagen
loadButton.addEventListener('click', () => {
    subirImagen();
})