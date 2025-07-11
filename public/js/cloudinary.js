//Subir
export async function subirACloud(userFile){
    const formData = new FormData();
    formData.append("file", userFile);
    formData.append("upload_preset", "ImageGallery");

    const responseCloudinary = await fetch('https://api.cloudinary.com/v1_1/donrhclb6/image/upload', {
        method: 'POST',
        body: formData
    });

    if (responseCloudinary.ok){
        const dataCloudinary = await responseCloudinary.json();
        return dataCloudinary;
    } else{
        const mensaje = await response.text();
        throw new Error(`Error HTTP ${response.status}: ${mensaje}`);
    }
}

//Eliminar de Cloud