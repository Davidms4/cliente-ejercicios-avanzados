export function temporizador(milisegundos) {
    return new Promise(function (resolve, reject) {
        const inicio = Date.now();

        const limite = setTimeout(function () {
            reject("El tiempo no va bien");
        }, milisegundos * 2);

        setTimeout(function () {
            clearTimeout(limite);

            if (Date.now() - inicio >= milisegundos * 2) {
                reject("El tiempo no va bien");
            } else {
                resolve("Tiempo concluido");
            }
        }, milisegundos);
    });
}

export async function cuenta(inicio, elemento = document.body,
                             intervalo = 1000, callback) {
    // El span permite usar el body sin borrar el resto de la página.
    const texto = document.createElement("span");
    elemento.appendChild(texto);

    for (let numero = inicio; numero >= 0; numero--) {
        texto.textContent = numero;

        if (numero > 0) {
            try {
                await temporizador(intervalo);
            } catch (error) {
                texto.textContent = error;
                return;
            }
        }
    }

    if (callback) {
        callback();
    }
}