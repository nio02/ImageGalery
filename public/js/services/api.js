const urlCen = "http://localhost:8080";

//Traer Usuario por Username

export async function traerUsuarioPorUserName(userName, token) {
    const responseUsuario = await fetch(`${urlCen}/users/username/${userName}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if(responseUsuario.ok){
        const dataUsuario = await responseUsuario.json();
        return dataUsuario;
    } else {
        const mensaje = await responseUsuario.text();
        throw new Error(`Error HTTP ${responseUsuario.status}: ${mensaje}`);
    }
}

//Crear Imagen en BD

export async function crearImagenBack(imagenDto, file, token) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("descripcion", imagenDto.descripcion);
    formData.append("usuarioId", imagenDto.usuarioId)

    const saveImage = await fetch(`${urlCen}/images/upload`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    })

    if (saveImage.ok){
        const mensaje = await saveImage.text();
        return mensaje;
    } else {
        const mensaje = await saveImage.text();
        throw new Error(`Error HTTP ${saveImage.status}: ${mensaje}`);
    }
}

//Traer Imagenes por Id

export async function imagenPorId(id, token) {
    const response = await fetch(`${urlCen}/images/username/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    
    if(response.ok){
        const data = await response.json();
        return data;
    } else {
        const mensaje = await responseUsuario.text();
        throw new Error(`Error HTTP ${responseUsuario.status}: ${mensaje}`);
    }
}

//Eliminar imagen

export async function eliminarImagenBack(idImagen, token) {
    try {
        const response = await fetch(`${urlCen}/images/delete/${idImagen}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.ok) {
            return response.text();
        }
    } catch (e) {
        throw new Error('Error eliminando la imagen')
    }
}

//Acceder a cuenta

export async function accederCuenta(token) {
    const response = await fetch(`${urlCen}/users/cuenta`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if(response.ok){
        let mensaje = await response.text();
        return mensaje;
    }
}
