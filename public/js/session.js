export function obtenerUsuarioActual(){
    return localStorage.getItem("usuarioActual");
}

export function obtenerToken(){
    return localStorage.getItem("jwt");
}

export function cerrarSesion(){
    localStorage.removeItem("usuarioActual");
    localStorage.removeItem("jwt");

    window.location.href = "./login.html";
}

export function validarSesionExistente(){
    const usuario = obtenerUsuarioActual();
    const token = obtenerToken();

    if(usuario || token){
        window.location.href = "./index.html"
    }
}

export function validarSesion(){
    const usuario = obtenerUsuarioActual();
    const token = obtenerToken();
    
    if(usuario == null || token == null){
        window.location.href = "./login.html"
    }
}