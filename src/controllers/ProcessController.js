const { createCanvas, loadImage } = require("canvas");
// const { json } = require("express");
const controller = {};

controller.inputVal_ala_hor_derecha = (req, res) => {
    // Draw cat with lime helmet
    loadImage(
        "https://bandejas.sotano.digital/img/bandejaDHD_vacio.png"
    ).then((image) => {
        const parametrosrecibidos = JSON.parse(req.params.parametros);
        const ancho = parseInt(parametrosrecibidos.ancho);
        const desvio = parseInt(parametrosrecibidos.desvio);
        const distancia = parseInt(parametrosrecibidos.distancia);
        const tolerancia = parseInt(parametrosrecibidos.tolerancia);
        const extremoizquierdo = parseInt(parametrosrecibidos.extremoizquierdo);
        const extremoDerecho = parseInt(parametrosrecibidos.extremoDerecho);

        // Calculos previos para graficar 1 grafico - Pendiente
        const pendiente = Math.round(
            Math.sqrt(Math.pow(desvio, 2) + Math.pow(distancia - tolerancia * 2, 2))
        );
        const angulo = Math.round(
            radToDeg(Math.atan(desvio / (distancia - tolerancia * 2)))
        );

        const canvas = createCanvas(500, 267);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, 500, 267);
        ctx.font = "16px Impact";

        var color1, font, lineHeight, x, y;
        lineHeight = 15; // this is guess and check as far as I know
        color1 = "BLUE";
        x = 290;
        y = 130;

        // Pendiente   ------------------------------------
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(-Math.PI / 3.5);
        ctx.textAlign = "center";
        ctx.fillStyle = "yellow";
        ctx.fillText(pendiente + " mm", -40, -5);
        ctx.restore();
        // ---------------------------------------------------------------
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(-Math.PI / 12);
        ctx.textAlign = "center";
        ctx.fillStyle = color1;
        ctx.fillText(distancia + " mm", -115, -145);
        ctx.fillText(extremoizquierdo + " mm", -125, 81);
        ctx.fillText(extremoDerecho + " mm", 129, 25);
        ctx.fillText(tolerancia + " mm", 140, 55);
        ctx.fillText(tolerancia + " mm", 40, 105);
        ctx.restore();
        // ---------------------------------------------------------------
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(-Math.PI / 1.92);
        ctx.textAlign = "center";
        ctx.fillStyle = color1;
        ctx.fillText(desvio + " mm", 35, -147);
        ctx.restore();
        // ---------------------------------------------------------------
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = "center";
        ctx.fillStyle = color1;
        ctx.fillText(ancho + " mm", 105, 181);
        ctx.restore();
        // ---------------------------------------------------------------



        // ---------------------------------------------------------------

        angulo;
        // Angulo   ------------------------------------------------------
        ctx.fillStyle = "yellow";
        ctx.fillText(angulo + " °", 210, 197);
        // ---------------------------------------------------------------



        res.send(JSON.stringify({ imagen: canvas.toDataURL() })); //sending the image!
        console.log(" ");
        console.log("*******************   Monitor Servidor   ************************");
        console.log("***   Controlador : ProcessController - inputVal_ala_hor_derecha");
        console.log("***   Descripcion : Ingreso de Valores");
        console.log("***          SEND : Grafica");
        console.log("****************************************************************");
        console.log(" ");
    });
};

controller.cutVal_ala_hor_derecha = (req, res) => {
    // Draw cat with lime helmet
    loadImage(
        "https://bandejas.sotano.digital/img/ala_horizontal_derecha_cortada.png"
    ).then((image) => {
        const parametrosrecibidos = JSON.parse(req.params.parametros);
        const ancho = parseInt(parametrosrecibidos.ancho);
        const desvio = parseInt(parametrosrecibidos.desvio);
        const distancia = parseInt(parametrosrecibidos.distancia);
        const tolerancia = parseInt(parametrosrecibidos.tolerancia);
        const extremoizquierdo = parseInt(parametrosrecibidos.extremoizquierdo);
        const extremoDerecho = parseInt(parametrosrecibidos.extremoDerecho);

        // Calculos previos
        const pendiente = Math.round(
            Math.sqrt(Math.pow(desvio, 2) + Math.pow(distancia - tolerancia * 2, 2))
        );
        const angulo = Math.round(
            radToDeg(Math.atan(desvio / (distancia - tolerancia * 2)))
        );
        const mediocorte = Math.round(
            Math.tan(Math.asin(desvio / pendiente) / 2) * ancho
        ); //.roundToLong()
        const corte = mediocorte * 2;

        // Calculos Adicionales
        const extremoIzquierdo_inferior = extremoizquierdo + tolerancia;
        const extremoDerecho_inferior = extremoDerecho + tolerancia;
        const extremoIzquierdo_superior = extremoIzquierdo_inferior - mediocorte;
        const extremoDerecho_superior = extremoDerecho_inferior + mediocorte;

        const niple = extremoIzquierdo_inferior + pendiente + corte + extremoDerecho_inferior;

        const canvas = createCanvas(500, 267);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, 500, 267);
        ctx.font = "20px Impact";

        var color1, font, lineHeight, x, y;
        font = 20;
        lineHeight = 15; // this is guess and check as far as I know
        color1 = "white";
        colorcalculado = "yellow";
        x = 290;
        y = 130;

        // acomodar   -------------------------------------------
        ctx.fillStyle = colorcalculado;
        ctx.fillText(niple + " mm ", 230, 30);
        // ---------------------------------------------------------------

        // Extremo Corte   -----------------------------------------------
        ctx.fillStyle = colorcalculado;
        ctx.fillText(corte + " mm", 188, 102);
        ctx.fillText(corte + " mm", 270, 184);
        // ---------------------------------------------------------------

        // Extremo Izquierdo   -------------------------------------------
        ctx.fillStyle = colorcalculado;
        ctx.fillText(extremoIzquierdo_superior + " mm", 40, 70);
        ctx.fillText(extremoIzquierdo_inferior + " mm", 45, 230);
        // ---------------------------------------------------------------

        // Pendiente   ------------------------------------
        ctx.fillStyle = colorcalculado;
        ctx.fillText(pendiente + " mm", 230, 230);
        ctx.fillText(pendiente + " mm", 230, 70);
        // ---------------------------------------------------------------

        // Extremo Derecho  ----------------------------------------------
        ctx.fillStyle = colorcalculado;
        ctx.fillText(extremoDerecho_superior + " mm", 405, 70);
        ctx.fillText(extremoDerecho_inferior + " mm", 405, 230);
        // ---------------------------------------------------------------

        // Ancho  --------------------------------------------------------
        ctx.fillStyle = color1;
        ctx.fillText(ancho + " mm", 405, 146);
        // --------------------------------------------------------------

        res.send(JSON.stringify({ imagen: canvas.toDataURL() })); //sending the image!
        console.log(" ");
        console.log("*******************   Monitor Servidor   ************************");
        console.log("***     Controlador : ProcessController - cutVal_ala_hor_derecha");
        console.log("***     Descripcion : Corte a Realizar");
        console.log("***            SEND : Grafica");
        console.log("****************************************************************");
        console.log(" ");
    });
};


controller.inputVal_ala_hor_izquierdo = (req, res) => {
    // Draw cat with lime helmet
    loadImage(
        "https://bandejas.sotano.digital/img/bandejaDHI_vacio.png"
    ).then((image) => {
        const parametrosrecibidos = JSON.parse(req.params.parametros);
        const ancho = parseInt(parametrosrecibidos.ancho);
        const desvio = parseInt(parametrosrecibidos.desvio);
        const distancia = parseInt(parametrosrecibidos.distancia);
        const tolerancia = parseInt(parametrosrecibidos.tolerancia);
        const extremoizquierdo = parseInt(parametrosrecibidos.extremoizquierdo);
        const extremoDerecho = parseInt(parametrosrecibidos.extremoDerecho);

        // Calculos previos para graficar 1 grafico - Pendiente
        const pendiente = Math.round(
            Math.sqrt(Math.pow(desvio, 2) + Math.pow(distancia - tolerancia * 2, 2))
        );
        const angulo = Math.round(
            radToDeg(Math.atan(desvio / (distancia - tolerancia * 2)))
        );

        const canvas = createCanvas(500, 267);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, 500, 267);
        ctx.font = "16px Impact";

        var color1, font, lineHeight, x, y;
        lineHeight = 15; // this is guess and check as far as I know
        color1 = "BLUE";
        x = 290;
        y = 130;

        ctx.textAlign = "center";

        ctx.fillStyle = "yellow";
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.PI / 3.5);
        ctx.fillText(pendiente + " mm", -20, 58);
        ctx.restore();
        ctx.fillText(angulo + " °", 284, 197);


        ctx.fillStyle = color1;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(ancho + " mm", 105, -245);
        ctx.restore();
        // ---------------------------------------------------------------
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(-Math.PI / 2.05);
        ctx.fillText(desvio + " mm", 25, 75);
        ctx.restore();
        // ---------------------------------------------------------------

        ctx.save();
        ctx.translate(150, 150);
        ctx.rotate(Math.PI / 12);
        ctx.fillText(distancia + " mm", 180, -181);
        ctx.fillText(extremoDerecho + " mm", 195, 45);
        ctx.fillText(tolerancia + " mm", 5, 70);
        ctx.fillText(tolerancia + " mm", -95, 20);
        ctx.fillText(extremoizquierdo + " mm", -78, -10);

        ctx.restore();


        res.send(JSON.stringify({ imagen: canvas.toDataURL() })); //sending the image!
        console.log(" ");
        console.log("*******************   Monitor Servidor   ************************");
        console.log("***   Controlador : ProcessController - inputVal_ala_hor_izquierdo");
        console.log("***   Descripcion : Ingreso de Valores");
        console.log("***          SEND : Grafica");
        console.log("****************************************************************");
        console.log(" ");
    });
};

controller.cutVal_ala_hor_izquierdo = (req, res) => {
    // Draw cat with lime helmet
    loadImage(
        "https://bandejas.sotano.digital/img/ala_horizontal_izquierda_cortada.png"
    ).then((image) => {
        const parametrosrecibidos = JSON.parse(req.params.parametros);
        const ancho = parseInt(parametrosrecibidos.ancho);
        const desvio = parseInt(parametrosrecibidos.desvio);
        const distancia = parseInt(parametrosrecibidos.distancia);
        const tolerancia = parseInt(parametrosrecibidos.tolerancia);
        const extremoizquierdo = parseInt(parametrosrecibidos.extremoizquierdo);
        const extremoDerecho = parseInt(parametrosrecibidos.extremoDerecho);

        // Calculos previos
        const pendiente = Math.round(
            Math.sqrt(Math.pow(desvio, 2) + Math.pow(distancia - tolerancia * 2, 2))
        );
        const angulo = Math.round(
            radToDeg(Math.atan(desvio / (distancia - tolerancia * 2)))
        );
        const mediocorte = Math.round(
            Math.tan(Math.asin(desvio / pendiente) / 2) * ancho
        ); //.roundToLong()
        const corte = mediocorte * 2;

        // Calculos Adicionales
        const extremoIzquierdo_inferior = extremoizquierdo + tolerancia;
        const extremoDerecho_inferior = extremoDerecho + tolerancia;
        const extremoIzquierdo_superior = extremoIzquierdo_inferior + mediocorte;
        const extremoDerecho_superior = extremoDerecho_inferior - mediocorte;

        const niple = extremoIzquierdo_inferior + pendiente + corte + extremoDerecho_inferior;

        const canvas = createCanvas(500, 267);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, 500, 267);
        ctx.font = "20px Impact";

        var color1, font, lineHeight, x, y;
        font = 20;
        lineHeight = 15; // this is guess and check as far as I know
        color1 = "white";
        colorcalculado = "yellow";
        x = 290;
        y = 130;

        // acomodar   -------------------------------------------
        ctx.fillStyle = colorcalculado;
        ctx.fillText(niple + " mm ", 230, 30);
        // ---------------------------------------------------------------

        // Extremo Corte   -----------------------------------------------
        ctx.fillStyle = colorcalculado;
        ctx.fillText(corte + " mm", 270, 102);
        ctx.fillText(corte + " mm", 170, 184);
        // ---------------------------------------------------------------

        // Extremo Izquierdo   -------------------------------------------
        ctx.fillStyle = colorcalculado;
        ctx.fillText(extremoIzquierdo_superior + " mm", 37, 70);
        ctx.fillText(extremoIzquierdo_inferior + " mm", 33, 230);
        // ---------------------------------------------------------------

        // Pendiente   ------------------------------------
        ctx.fillStyle = colorcalculado;
        ctx.fillText(pendiente + " mm", 230, 230);
        ctx.fillText(pendiente + " mm", 230, 70);
        // ---------------------------------------------------------------

        // Extremo Derecho  ----------------------------------------------
        ctx.fillStyle = colorcalculado;
        ctx.fillText(extremoDerecho_superior + " mm", 400, 70);
        ctx.fillText(extremoDerecho_inferior + " mm", 390, 230);
        // ---------------------------------------------------------------

        // Ancho  --------------------------------------------------------
        ctx.fillStyle = 'black';
        ctx.fillText(ancho + " mm", 405, 146);
        // --------------------------------------------------------------

        res.send(JSON.stringify({ imagen: canvas.toDataURL() })); //sending the image!
        console.log(" ");
        console.log("*******************   Monitor Servidor   ************************");
        console.log("***     Controlador : ProcessController - cutVal_ala_hor_izquierdo");
        console.log("***     Descripcion : Corte a Realizar");
        console.log("***            SEND : Grafica");
        console.log("****************************************************************");
        console.log(" ");
    });
};


//VERTICALES
controller.inputVal_ala_ver_derecha = (req, res) => {
    // Draw cat with lime helmet
    loadImage(
        "https://bandejas.sotano.digital/img/bandejaDVD_Cotas.png"
    ).then((image) => {
        const parametrosrecibidos = JSON.parse(req.params.parametros);
        const ancho = parseInt(parametrosrecibidos.ancho);
        const desvio = parseInt(parametrosrecibidos.desvio);
        const distancia = parseInt(parametrosrecibidos.distancia);
        const tolerancia = parseInt(parametrosrecibidos.tolerancia);
        const extremoizquierdo = parseInt(parametrosrecibidos.extremoizquierdo);
        const extremoDerecho = parseInt(parametrosrecibidos.extremoDerecho);

        // Calculos previos para graficar 1 grafico - Pendiente
        const pendiente = Math.round(
            Math.sqrt(Math.pow(desvio, 2) + Math.pow(distancia - tolerancia * 2, 2))
        );
        const angulo = Math.round(
            radToDeg(Math.atan(desvio / (distancia - tolerancia * 2)))
        );

        const canvas = createCanvas(500, 267);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, 500, 267);
        ctx.font = "16px Impact";

        var color1, font, lineHeight, x, y;
        lineHeight = 15; // this is guess and check as far as I know
        color1 = "BLUE";
        x = 290;
        y = 130;
        ctx.textAlign = "center";

        // Pendiente   ------------------------------------
        ctx.fillStyle = "yellow";
        ctx.save();
        ctx.translate(230, 130);
        ctx.rotate(-Math.PI / 5);
        ctx.fillText(pendiente + " mm", 0, 0);
        ctx.restore();

        ctx.fillText(angulo + " °", 195, 170);
        // ---------------------------------------------------------------

        ctx.fillStyle = color1;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(extremoizquierdo + " mm", 95, -75);
        ctx.fillText(tolerancia + " mm", 35, -185);
        ctx.fillText(tolerancia + " mm", 105, -115);
        ctx.fillText(extremoDerecho + " mm", -60, -135);
        ctx.restore();

        ctx.save();
        ctx.translate(x, 365);
        ctx.rotate(-Math.PI / 12);
        ctx.fillText(ancho + " mm", -115, -145);
        ctx.restore();
        // ---------------------------------------------------------------
        ctx.save();
        ctx.translate(400, 300);
        ctx.rotate(-Math.PI / 12);
        ctx.fillText(desvio + " mm", -20, -135);
        ctx.restore();
        // ---------------------------------------------------------------
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(-Math.PI / 1.92);
        ctx.fillText(distancia + " mm", -30, 167);
        ctx.restore();
        // ---------------------------------------------------------------

        res.send(JSON.stringify({ imagen: canvas.toDataURL() })); //sending the image!
        console.log(" ");
        console.log("*******************   Monitor Servidor   ************************");
        console.log("***   Controlador : ProcessController - inputVal_ala_hor_derecha");
        console.log("***   Descripcion : Ingreso de Valores");
        console.log("***          SEND : Grafica");
        console.log("****************************************************************");
        console.log(" ");
    });
};


controller.cutVal_ala_ver_derecha = (req, res) => {
    // Draw cat with lime helmet
    loadImage(
        "https://bandejas.sotano.digital/img/ala_horizontal_izquierda_cortada.png"
    ).then((image) => {
        const parametrosrecibidos = JSON.parse(req.params.parametros);
        const ancho = parseInt(parametrosrecibidos.ancho);
        const desvio = parseInt(parametrosrecibidos.desvio);
        const distancia = parseInt(parametrosrecibidos.distancia);
        const tolerancia = parseInt(parametrosrecibidos.tolerancia);
        const extremoizquierdo = parseInt(parametrosrecibidos.extremoizquierdo);
        const extremoDerecho = parseInt(parametrosrecibidos.extremoDerecho);

        // Calculos previos
        const pendiente = Math.round(
            Math.sqrt(Math.pow(desvio, 2) + Math.pow(distancia - tolerancia * 2, 2))
        );
        const angulo = Math.round(
            radToDeg(Math.atan(desvio / (distancia - tolerancia * 2)))
        );
        const mediocorte = Math.round(
            Math.tan(Math.asin(desvio / pendiente) / 2) * ancho
        ); //.roundToLong()
        const corte = mediocorte * 2;

        // Calculos Adicionales
        const extremoIzquierdo_inferior = extremoizquierdo + tolerancia;
        const extremoDerecho_inferior = extremoDerecho + tolerancia;
        const extremoIzquierdo_superior = extremoIzquierdo_inferior + mediocorte;
        const extremoDerecho_superior = extremoDerecho_inferior - mediocorte;

        const niple = extremoIzquierdo_inferior + pendiente + corte + extremoDerecho_inferior;

        const canvas = createCanvas(500, 267);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, 500, 267);
        ctx.font = "20px Impact";

        var color1, font, lineHeight, x, y;
        font = 20;
        lineHeight = 15; // this is guess and check as far as I know
        color1 = "white";
        colorcalculado = "yellow";
        x = 290;
        y = 130;

        // acomodar   -------------------------------------------
        ctx.fillStyle = colorcalculado;
        ctx.fillText(niple + " mm ", 230, 30);
        // ---------------------------------------------------------------

        // Extremo Corte   -----------------------------------------------
        ctx.fillStyle = colorcalculado;
        ctx.fillText(corte + " mm", 270, 102);
        ctx.fillText(corte + " mm", 170, 184);
        // ---------------------------------------------------------------

        // Extremo Izquierdo   -------------------------------------------
        ctx.fillStyle = colorcalculado;
        ctx.fillText(extremoIzquierdo_superior + " mm", 37, 70);
        ctx.fillText(extremoIzquierdo_inferior + " mm", 33, 230);
        // ---------------------------------------------------------------

        // Pendiente   ------------------------------------
        ctx.fillStyle = colorcalculado;
        ctx.fillText(pendiente + " mm", 230, 230);
        ctx.fillText(pendiente + " mm", 230, 70);
        // ---------------------------------------------------------------

        // Extremo Derecho  ----------------------------------------------
        ctx.fillStyle = colorcalculado;
        ctx.fillText(extremoDerecho_superior + " mm", 400, 70);
        ctx.fillText(extremoDerecho_inferior + " mm", 390, 230);
        // ---------------------------------------------------------------

        // Ancho  --------------------------------------------------------
        ctx.fillStyle = 'black';
        ctx.fillText(ancho + " mm", 405, 146);
        // --------------------------------------------------------------

        res.send(JSON.stringify({ imagen: canvas.toDataURL() })); //sending the image!
        console.log(" ");
        console.log("*******************   Monitor Servidor   ************************");
        console.log("***     Controlador : ProcessController - cutVal_ala_hor_izquierdo");
        console.log("***     Descripcion : Corte a Realizar");
        console.log("***            SEND : Grafica");
        console.log("****************************************************************");
        console.log(" ");
    });
};


controller.inputVal_ala_ver_izquierdo = (req, res) => {
    // Draw cat with lime helmet
    loadImage(
        "https://bandejas.sotano.digital/img/bandejaDVI_Cotas.png"
    ).then((image) => {
        const parametrosrecibidos = JSON.parse(req.params.parametros);
        const ancho = parseInt(parametrosrecibidos.ancho);
        const desvio = parseInt(parametrosrecibidos.desvio);
        const distancia = parseInt(parametrosrecibidos.distancia);
        const tolerancia = parseInt(parametrosrecibidos.tolerancia);
        const extremoizquierdo = parseInt(parametrosrecibidos.extremoizquierdo);
        const extremoDerecho = parseInt(parametrosrecibidos.extremoDerecho);

        // Calculos previos para graficar 1 grafico - Pendiente
        const pendiente = Math.round(
            Math.sqrt(Math.pow(desvio, 2) + Math.pow(distancia - tolerancia * 2, 2))
        );
        const angulo = Math.round(
            radToDeg(Math.atan(desvio / (distancia - tolerancia * 2)))
        );

        const canvas = createCanvas(500, 267);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, 500, 267);
        ctx.font = "16px Impact";

        var color1, font, lineHeight, x, y;
        lineHeight = 15; // this is guess and check as far as I know
        color1 = "BLUE";
        x = 290;
        y = 130;
        ctx.textAlign = "center";

        // Pendiente   ------------------------------------
        ctx.fillStyle = "yellow";
        ctx.save();
        ctx.translate(230, 130);
        ctx.rotate(-Math.PI / -5);
        ctx.fillText(pendiente + " mm", 40, -25);
        ctx.restore();

        ctx.fillText(angulo + " °", 310, 170);
        // ---------------------------------------------------------------

        ctx.fillStyle = color1;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(extremoizquierdo + " mm", 95, 0);
        ctx.fillText(tolerancia + " mm", 35, 120);
        ctx.fillText(tolerancia + " mm", 105, 50);
        ctx.fillText(extremoDerecho + " mm", -60, 70);
        ctx.restore();

        ctx.save();
        ctx.translate(400, 360);
        ctx.rotate(-Math.PI / -12);
        ctx.fillText(ancho + " mm", -45, -90);
        ctx.restore();
        // ---------------------------------------------------------------
        ctx.save();
        ctx.translate(150, 310);
        ctx.rotate(-Math.PI / -14);
        ctx.fillText(desvio + " mm", -20, -135);
        ctx.restore();
        // ---------------------------------------------------------------
        ctx.save();
        ctx.translate(-120, y);
        ctx.rotate(-Math.PI / 2.05);
        ctx.fillText(distancia + " mm", -15, 167);
        ctx.restore();
        // ---------------------------------------------------------------

        res.send(JSON.stringify({ imagen: canvas.toDataURL() })); //sending the image!
        console.log(" ");
        console.log("*******************   Monitor Servidor   ************************");
        console.log("***   Controlador : ProcessController - inputVal_ala_hor_derecha");
        console.log("***   Descripcion : Ingreso de Valores");
        console.log("***          SEND : Grafica");
        console.log("****************************************************************");
        console.log(" ");
    });
};

controller.cutVal_ala_ver_izquierdo = (req, res) => {
    // Draw cat with lime helmet
    loadImage(
        "https://bandejas.sotano.digital/img/ala_horizontal_derecha_cortada.png"
    ).then((image) => {
        const parametrosrecibidos = JSON.parse(req.params.parametros);
        const ancho = parseInt(parametrosrecibidos.ancho);
        const desvio = parseInt(parametrosrecibidos.desvio);
        const distancia = parseInt(parametrosrecibidos.distancia);
        const tolerancia = parseInt(parametrosrecibidos.tolerancia);
        const extremoizquierdo = parseInt(parametrosrecibidos.extremoizquierdo);
        const extremoDerecho = parseInt(parametrosrecibidos.extremoDerecho);

        // Calculos previos
        const pendiente = Math.round(
            Math.sqrt(Math.pow(desvio, 2) + Math.pow(distancia - tolerancia * 2, 2))
        );
        const angulo = Math.round(
            radToDeg(Math.atan(desvio / (distancia - tolerancia * 2)))
        );
        const mediocorte = Math.round(
            Math.tan(Math.asin(desvio / pendiente) / 2) * ancho
        ); //.roundToLong()
        const corte = mediocorte * 2;

        // Calculos Adicionales
        const extremoIzquierdo_inferior = extremoizquierdo + tolerancia;
        const extremoDerecho_inferior = extremoDerecho + tolerancia;
        const extremoIzquierdo_superior = extremoIzquierdo_inferior - mediocorte;
        const extremoDerecho_superior = extremoDerecho_inferior + mediocorte;

        const niple = extremoIzquierdo_inferior + pendiente + corte + extremoDerecho_inferior;

        const canvas = createCanvas(500, 267);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, 500, 267);
        ctx.font = "20px Impact";

        var color1, font, lineHeight, x, y;
        font = 20;
        lineHeight = 15; // this is guess and check as far as I know
        color1 = "white";
        colorcalculado = "yellow";
        x = 290;
        y = 130;

        // acomodar   -------------------------------------------
        ctx.fillStyle = colorcalculado;
        ctx.fillText(niple + " mm ", 230, 30);
        // ---------------------------------------------------------------

        // Extremo Corte   -----------------------------------------------
        ctx.fillStyle = colorcalculado;
        ctx.fillText(corte + " mm", 188, 102);
        ctx.fillText(corte + " mm", 270, 184);
        // ---------------------------------------------------------------

        // Extremo Izquierdo   -------------------------------------------
        ctx.fillStyle = colorcalculado;
        ctx.fillText(extremoIzquierdo_superior + " mm", 405, 230);
        ctx.fillText(extremoIzquierdo_inferior + " mm", 45, 70);
        // ---------------------------------------------------------------

        // Pendiente   ------------------------------------
        ctx.fillStyle = colorcalculado;
        ctx.fillText(pendiente + " mm", 230, 230);
        ctx.fillText(pendiente + " mm", 230, 70);
        // ---------------------------------------------------------------

        // Extremo Derecho  ----------------------------------------------
        ctx.fillStyle = colorcalculado;
        ctx.fillText(extremoDerecho_superior + " mm", 45, 230);
        ctx.fillText(extremoDerecho_inferior + " mm", 405, 70);
        // ---------------------------------------------------------------

        // Ancho  --------------------------------------------------------
        ctx.fillStyle = color1;
        ctx.fillText(ancho + " mm", 405, 146);
        // --------------------------------------------------------------

        res.send(JSON.stringify({ imagen: canvas.toDataURL() })); //sending the image!
        console.log(" ");
        console.log("*******************   Monitor Servidor   ************************");
        console.log("***     Controlador : ProcessController - cutVal_ala_hor_derecha");
        console.log("***     Descripcion : Corte a Realizar");
        console.log("***            SEND : Grafica");
        console.log("****************************************************************");
        console.log(" ");
    });
};







function radToDeg(rad) {
    return rad * (180.0 / Math.PI);
}


module.exports = controller;