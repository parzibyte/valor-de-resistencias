var app = angular["module"]('resistencias', ['ui.bootstrap.contextMenu']);
app["constant"]('BANDA_DE_DIGITO', 0);
app["constant"]('BANDA_MULTIPLICADORA', 1);
app["constant"]('BANDA_DE_TOLERANCIA', 2);
app["controller"]('controlador', ['$scope', 'BANDA_DE_DIGITO', 'BANDA_MULTIPLICADORA', 'BANDA_DE_TOLERANCIA', function (esto, BANDA_DE_DIGITO, BANDA_MULTIPLICADORA, BANDA_DE_TOLERANCIA) {

    /*
     Inicialmente definimos
     la resistencia como 0
     */
    esto["resistencia"] = 0;


    /*
     Un arreglo para todas las bandas de
     las resistencias, Cada banda cuenta
     con las siguientes propiedades:
     etiqueta: el texto que se muestra
     color: el color. Debe ser un color que esté dentro
     del arreglo 'colores' definido anteriormente
     tipo: ¿cómo actúa la banda? puede actuar como digito,
     como multiplicador o como tolerancia.
     Nota importante: el orden no importa, pero es recomendable
     poner en el arreglo primero las bandas que
     actúan como dígitos, luego únicamente una
     banda que actúe como multiplicador y
     finalmente úncamente una banda que actúe
     como tolerancia
     */
    esto["bandas"] = [
        {
            "etiqueta": "B1",
            "color": "verde",
            "tipo": BANDA_DE_DIGITO
        },
        {
            "etiqueta": "B2",
            "color": "azul",
            "tipo": BANDA_DE_DIGITO
        },
        {
            "etiqueta": "B3",
            "color": "rojo",
            "tipo": BANDA_MULTIPLICADORA
        },
        {
            "etiqueta": "T",
            "color": "dorado",
            "tipo": BANDA_DE_TOLERANCIA
        }
    ];

    /*
     Un arreglo para las opciones de
     medida de la resistencia
     */
    esto["unidades"] = [
        /*
         Múltiplos
         */

        {
            "id": 5,
            "etiqueta": 'KiloOhm',
            "multiplicador": 10e-4
        },
        {
            "id": 6,
            "etiqueta": 'MegaOhm',
            "multiplicador": 10e-7
        },
        {
            "id": 7,
            "etiqueta": 'GigaOhm',
            "multiplicador": 10e-10
        },
        /*
         Unidad absoluta
         */
        {
            "id": 1,
            "etiqueta": 'Ohm',
            "multiplicador": 1
        },
        /*
         Submúltiplos
         */
        {
            "id": 2,
            "etiqueta": 'MiliOhm',
            "multiplicador": 10e+2
        },
        {
            "id": 3,
            "etiqueta": 'MicroOhm',
            "multiplicador": 10e+5
        },
        {
            "id": 4,
            "etiqueta": 'NanoOhm',
            "multiplicador": 10e+8
        }
    ];

    /*
     Por defecto ponemos la medida
     que esté en el índice 4; es decir,
     el ohm

     */
    esto["unidadSeleccionada"] = esto["unidades"][3];


    /*
     Simple función ayudante para refrescar el color
     de la resistencia cuando seleccionan un color del
     menú contextual
     */
    esto["cambiarColorDeBanda"] = function ($itemScope, a, b, texto) {
        var nuevoColor = texto[0]["text"].toLowerCase();
        if ($itemScope["banda"]["tipo"] === BANDA_DE_TOLERANCIA && (nuevoColor === "blanco" || nuevoColor === "negro")) {
            alert("La banda de tolerancia no puede ser de color " + nuevoColor);
            return;
        }
        $itemScope["banda"]["color"] = nuevoColor;

        // Ya actualizamos el color, pero también
        // debemos refrescar la resistencia completa
        esto["refrescarResistencia"]();
    };

    /*
     Un arreglo para los colores. Cada
     color tiene las siguientes propiedades:
     nombre: el nombre del color en minúsculas
     valorBanda: lo que vale cuando actúa como banda
     valorMultiplicador: lo que vale cuando actúa como multiplicador
     valorTolerancia: lo que vale cuando actúa como tolerancia

     Si una propiedad está definida como nula significa
     que no es posible que la resistencia tenga ese color.
     Por ejemplo, no hay tolerancia para el color negro, por
     lo que en valorTolerancia ponemos null

     Si en el futuro se añadieran más colores, simplemente se
     agregaría otro color a la lista.

     Importante: el orden de los colores no importa
     */
    esto["colores"] = [
        {
            "nombre": "negro",
            "valorBanda": 0,
            "valorMultiplicador": 1,
            "valorTolerancia": null
        },
        {
            "nombre": "café",
            "valorBanda": 1,
            "valorMultiplicador": 1e+1,
            "valorTolerancia": 0.01
        },
        {
            "nombre": "rojo",
            "valorBanda": 2,
            "valorMultiplicador": 1e+2,
            "valorTolerancia": 0.02
        },
        {
            "nombre": "naranja",
            "valorBanda": 3,
            "valorMultiplicador": 1e+3,
            "valorTolerancia": 0.03
        },
        {
            "nombre": "amarillo",
            "valorBanda": 4,
            "valorMultiplicador": 1e+4,
            "valorTolerancia": 0.04
        },
        {
            "nombre": "verde",
            "valorBanda": 5,
            "valorMultiplicador": 1e+5,
            "valorTolerancia": 0.005
        },
        {
            "nombre": "azul",
            "valorBanda": 6,
            "valorMultiplicador": 1e+6,
            "valorTolerancia": 0.0025
        },
        {
            "nombre": "violeta",
            "valorBanda": 7,
            "valorMultiplicador": 1e+7,
            "valorTolerancia": 0.001
        },
        {
            "nombre": "gris",
            "valorBanda": 8,
            "valorMultiplicador": 1e+8,
            "valorTolerancia": 0.0005
        },
        {
            "nombre": "blanco",
            "valorBanda": 9,
            "valorMultiplicador": 1e+9,
            "valorTolerancia": null
        },
        {
            "nombre": "dorado",
            "valorBanda": null,
            "valorMultiplicador": 1e-2,
            "valorTolerancia": 0.05
        },
        {
            "nombre": "plateado",
            "valorBanda": null,
            "valorMultiplicador": 1e-1,
            "valorTolerancia": 0.1
        }
    ];
    /*
     El menú contextual que aparece
     al hacer clic en cada banda
     */
    esto["opcionesColores"] = [
        ['<span class="label negro">NEGRO</span>', esto["cambiarColorDeBanda"]],
        ['<span class="label café">CAFÉ</span>', esto["cambiarColorDeBanda"]],
        ['<span class="label rojo">ROJO</span>', esto["cambiarColorDeBanda"]],
        ['<span class="label naranja">NARANJA</span>', esto["cambiarColorDeBanda"]],
        ['<span class="label amarillo">AMARILLO</span>', esto["cambiarColorDeBanda"]],
        ['<span class="label verde">VERDE</span>', esto["cambiarColorDeBanda"]],
        ['<span class="label azul">AZUL</span>', esto["cambiarColorDeBanda"]],
        ['<span class="label violeta">VIOLETA</span>', esto["cambiarColorDeBanda"]],
        ['<span class="label gris">GRIS</span>', esto["cambiarColorDeBanda"]],
        ['<span class="label blanco">BLANCO</span>', esto["cambiarColorDeBanda"]],
        ['<span class="label dorado">DORADO</span>', esto["cambiarColorDeBanda"], esto["comprobarColorValido"]],
        ['<span class="label plateado">PLATEADO</span>', esto["cambiarColorDeBanda"], esto["comprobarColorValido"]]

    ];

    /*
     Esta función es llamada al inicio, se
     encarga de definir todas las variables
     que usaremos durante la ejecución de la app
     */


    /*
     Vigilamos cuando la unidad de medida
     cambie, cuando eso pase refrescamos el
     valor de la resistencia
     */
    esto["$watch"]('unidadSeleccionada', function () {
        esto["refrescarResistencia"]();
    });
    /*
     Esta función se encarga de devolver
     el objeto que coincida con el color
     de búsqueda. Devuelve un objeto de
     los que están definidos en el arreglo
     "colores".
     */
    esto["valorAPartirDeColor"] = function (colorBuscado) {
        // Leemos todo el arreglo...
        for (var x = esto["colores"]["length"] - 1; x >= 0; x--)
            // Buscamos si el color de búsqueda coincide con el
            // objeto en donde estamos
            if (esto["colores"][x]["nombre"] === colorBuscado) return esto["colores"][x];
        // ¿No lo encontramos? bueno, regresamos null en caso de que
        // el color no exista
        return null;
    };


    /*
     Esta función se encarga de calcular el valor de la resistencia.
     */
    esto["refrescarResistencia"] = function () {
        var valorString = "",     // Los primeros dígitos antes del multiplicador pueden ser tratados como cadena
            multiplicador = null, // Aquí alojaremos el valor del multiplicador
            tolerancia = null;    // Aquí alojaremos el valor de la tolerancia

        // Usamos el método que angular ya ha programado
        angular["forEach"](esto["bandas"], function (banda) {
            // En cada iteración comprobamos el tipo

            // Si la banda actúa como dígito, entonces concatenamos el valor porque, como lo mencionamos
            // anteriormente: los dígitos antes del multiplicador deben unirse y ser tratados como cadena
            if (banda["tipo"] === BANDA_DE_DIGITO) valorString += esto["valorAPartirDeColor"](banda["color"])["valorBanda"];

            // En caso de que no sea dígito, pero sea multiplicador, guardamos el multiplicador
            else if (banda["tipo"] === BANDA_MULTIPLICADORA) multiplicador = esto["valorAPartirDeColor"](banda["color"])["valorMultiplicador"];

            // Si no es multiplicador ni dígito, entonces es la tolerancia
            else if (banda["tipo"] === BANDA_DE_TOLERANCIA) tolerancia = esto["valorAPartirDeColor"](banda["color"])["valorTolerancia"];
        });

        // Hora de las matemáticas. Convertimos los dígitos (que eran cadena)
        // a entero, luego ese valor lo multiplicamos por el multiplicador y
        // listo, ese es el valor de la resistencia
        esto["resistencia"] = parseInt(valorString, 0) * multiplicador * esto["unidadSeleccionada"]["multiplicador"];

        // Para calcular la tolerancia multiplicamos el valor
        // de la resistencia por la tolerancia.
        // Nota importante: no confundir esto.tolerancia con tolerancia
        // tolerancia es una variable local, mientras que esto.tolerancia
        // pertenece a todo el ámbito del controlador, así que no son las
        // mismas variables. Una es la tolerancia total, la otra es la
        // tolerancia de la banda
        esto["tolerancia"] = esto["resistencia"] * tolerancia;

        // Ahora simplemente calculamos desde dónde hasta dónde
        // puede ir la resistencia. Simples sumas y restas,
        esto["valorMinimoResistencia"] = esto["resistencia"] - esto["tolerancia"];
        esto["valorMaximoResistencia"] = esto["resistencia"] + esto["tolerancia"];
    };


    /*
     Debido a que los últimos colores
     (plateado y dorado) solamente son
     válidos en bandas de tipo multiplicador
     o de tolerancia, debemos deshabilitar
     dichos colores en bandas que sirven como
     dígitos. Simplemente comprobamos el tipo
     de banda que es.
     Si es de tolerancia o multiplicador entonces
     regresamos "verdadero" en caso de que no,
     regresamos "falso".
     Dependiendo de lo que regrese esta, el color
     puede ser deshabilitado o no.
     */
    esto["comprobarColorValido"] = function ($itemScope) {
        var tipoBanda = $itemScope["banda"]["tipo"];
        return tipoBanda === "tolerancia" || tipoBanda === "multiplicador";
    };

    /*
     Luego de definir todo allá arriba, y dado
     que las resistencias ya tienen un valor por
     defecto llamamos al método refrescarResistencia
     */
    esto["refrescarResistencia"]();
}]);
