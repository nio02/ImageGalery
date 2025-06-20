//-------Variables-------

const signInButtonHeader = document.getElementById("header-signin-button");
const signinButton = document.getElementById("signin-button");


//-------Funciones-------



//-------Eventos-------
//Prevenir Recarga
signInButtonHeader.addEventListener('click', (e) => {
    e.preventDefault();
});
