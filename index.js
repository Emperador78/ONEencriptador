/* Se obtienen los elementos del DOM */
let mostrarTexto = document.getElementById("texto-intervenido");
let botonCopiar = document.getElementById("boton-copiar");
let imagenMuneco= document.getElementById("sinT");
let textoAyuda= document.getElementById("texto-ayuda");

const primaryKey = 6547;   /*Es la llave que cifra o descifra, sin esta no se puede recuperar el mensaje. En este ejemplo no cambia de valor, pero se puede agregar un campo en el html donde se coloque esta clave y solo va a poder descifrar el mensaje quien la tenga.*/
const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " ", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ",", ".", "?", "!", "@", ":", ";", "A", "B"
    , "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "á", "é", "í", "ó", "ú", "Á", "É", "Í", "Ó", "Ú"];
let texto = "";
//console.log(texto);
let arrayTexto = [];
let arrayTextoCifrado = [];
let textoCifrado = "";





//funcion Cifrar

function cifrar() {
    //Se obtienen los elementos del DOM
    texto = document.getElementById("texto-ingresado").value;
    // console.log(texto);

    separarTexto(texto);

    for (let i = 0; i < arrayTexto.length; i++) {
        let letraOracion = arrayTexto[i];

        for (let e = 0; e < alfabeto.length; e++) {

            if (letraOracion == alfabeto[e]) {

                //aca usa la primary key para reemplazar el caracter original por el encriptado
                claveCifrado = e + primaryKey;
                //console.log(claveCifrado);

                //si el valor para buscar el caracter encriptado es mayor al numero de posiciones del array del alfabeto, calcula uno.
                if (claveCifrado >= alfabeto.length) {

                    //aca llama a una funcion que lo calcula
                    calcularCifrarPrimaryKey(claveCifrado, alfabeto);
                    //console.log(claveCifrado);
                }
                //construye la oracion encriptada a partir de cada caracter que entra al for
                letraOracion = alfabeto[claveCifrado];
                textoCifrado = textoCifrado + letraOracion;
                letraOracion = "";
                claveCifrado = "";

            }


        }

    } //console.log(textoCifrado)
    // se ejecutan todas las acciones para representar el parrafo encriptado

    //muestra el texto por medio del DOM
    mostrarTexto.innerHTML = textoCifrado;

    //da el estilo necesario al parrafo
    mostrarTexto.style.overflow= "auto";
    mostrarTexto.style.overflowWrap="break-word";
    mostrarTexto.style.textAlign="justify";

    //resetea las variables usadas para volver a usarlas si el usuario quisiera encriptar otro parrafo.
    texto = "";
    arrayTexto = [""];
    textoCifrado = "";
    arrayTextoCifrado = [""];

    //muestra el boton copiar, para copiar el parrafo encriptado
    botonCopiar.style.visibility = "visible";

    // desaparece la imagen que muestra cuando no hay texto.
    imagenMuneco.style.display= "none";
    textoAyuda.style.display="none";

}


//funcion para descifrar

function descifrar() {
    //Se obtienen los elementos del DOM
    texto = document.getElementById("texto-ingresado").value;
    // console.log(texto);
    separarTexto(texto);
    for (let i = 0; i < arrayTexto.length; i++) {
        let letraOracion = arrayTexto[i];

        for (let e = 0; e < alfabeto.length; e++) {

            if (letraOracion == alfabeto[e]) {

                /*aca usa la primary key para reemplazar el caracter encriptado  por el original. A diferencia de cuando se encripta, se resta el primary key. De esta forma se llega al caracter original cuando la clave sea positiva.*/

                claveCifrado = e - primaryKey;
                //console.log(claveCifrado);
                if (claveCifrado <= 0) {
                    calcularDescifrarPrimaryKey(claveCifrado, alfabeto);
                    // console.log(claveCifrado);
                }

                //construye la oracion desencriptada a partir de cada caracter que entra al for
                letraOracion = alfabeto[claveCifrado];
                textoCifrado = textoCifrado + letraOracion;
                letraOracion = "";
                claveCifrado = "";

            }


        }

    } //console.log(textoCifrado)

     // se ejecutan todas las acciones para representar el parrafo desencriptado

    //muestra el texto por medio del DOM
    mostrarTexto.innerHTML = textoCifrado;

    //da el estilo necesario al parrafo
    mostrarTexto.style.overflow= "auto";
    mostrarTexto.style.overflowWrap="break-word";
    mostrarTexto.style.textAlign="justify";
    

    //resetea las variables usadas para volver a usarlas si el usuario quisiera encriptar o desencriptar otro parrafo.
    texto = "";
    arrayTexto = [""];
    textoCifrado = "";
    arrayTextoCifrado = [""];

    //muestra el boton copiar, para copiar el parrafo encriptado si no estuviera.
    botonCopiar.style.visibility = "visible";

    // desaparece la imagen que muestra cuando no hay texto, si estuviera.
    imagenMuneco.style.display= "none";
    textoAyuda.style.display="none";



}

/* cuando la funcion es llamada, es porque la clave es un numero mayor al tamaño del alfabeto*/

function calcularCifrarPrimaryKey(clave, alfabetoT) {
//si es menor la clave no se modifica, si es mayor al tamaño del alfabeto se le resta el tamaño del alfabeto y se llama a la funcion nuevamente.
    if (clave < alfabetoT.length) {
        //console.log(clave);
        claveCifrado = clave;

    } else {
        // console.log(clave);
        clave = clave - alfabetoT.length;

        // console.log(alfabetoT.length);
        //se usa recursivida hasta que la clave es menor al tamaño del alfabeto.
        calcularCifrarPrimaryKey(clave, alfabeto);
    }



}



/* cuando la funcion es llamada, es porque la clave es un numero menor a 0*/
function calcularDescifrarPrimaryKey(clave, alfabetoT) {
    /*si la clave es mayor o igual 0, la clave no se modifica, si es menor a 0 se le suma el tamaño del alfabeto y se llama a la funcion nuevamente.*/
    if (clave >= 0) {
        //console.log(clave);
        claveCifrado = clave;

    } else {
        //console.log(clave);
        clave = clave + alfabetoT.length;
        if (clave == 0) {
            clave = "0";
        }
        //console.log(alfabetoT.length);
        //se usa recursivida hasta que la clave es mayor o igual 0. 
        calcularDescifrarPrimaryKey(clave, alfabeto);
    }



}



// funcion que se llama desde las funciones cifrar o descifrar, para separar el parrafo en caracteres y guardarlos en un array, como parametro se pasa el texto ingresado por el usuario
function separarTexto(texto) {

    for (let i = 0; i < texto.length; i++) {
        arrayTexto.push(texto[i]);
        // console.log(arrayTexto);


    }

}
//funcion que se ejecuta desde la interfaz, que llama a la funcion asincronica que copia al porta papeles.
function copiar() {
    paracopiar = mostrarTexto.innerHTML;
    //console.log(paracopiar);
    clipboard(paracopiar)
}


//funcion asincronica para copiar el texto
async function clipboard(str) {
    try {
        await navigator.clipboard.writeText(str);
        console.log("copied");
    } catch (error) {
        console.log(error);
    }

}
