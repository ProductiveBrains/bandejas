const controller = {};

//Pagina Principal
controller.homePage = (req, res) => {
    res.render("Home_Page");
    console.log(" ");
    console.log("*******************   Monitor Servidor   ************************");
    console.log("***        Controlador : PagesController - homePage");
    console.log("***        Descripcion : Pagina Principal Iniciada");
    console.log("****************************************************************");
    console.log(" ");
};


//Pagina Principal
controller.alaDesvioHorizontalDerecho = (req, res) => {
    res.render("bandeja/alaDesvioHorDerecho");
    console.log(" ");
    console.log("*******************   Monitor Servidor   ************************");
    console.log("***        Controlador : PagesController - alaDesvioHorDerecho");
    console.log("***        Descripcion : Ala - Desvio Horizontal Derecho");
    console.log("****************************************************************");
    console.log(" ");
};

controller.alaDesvioHorizontalIzquierdo = (req, res) => {
    res.render("bandeja/alaDesvioHorIzquierdo");
    console.log(" ");
    console.log("*******************   Monitor Servidor   ************************");
    console.log("***        Controlador : PagesController - alaDesvioHorIzquierdo");
    console.log("***        Descripcion : Ala - Desvio Horizontal Izquierdo");
    console.log("****************************************************************");
    console.log(" ");
};

//VERTICALES
controller.alaDesvioVerDerecho = (req, res) => {
    res.render("bandeja/alaDesvioVerDerecho");
    console.log(" ");
    console.log("*******************   Monitor Servidor   ************************");
    console.log("***        Controlador : PagesController - alaDesvioVerDerecho");
    console.log("***        Descripcion : Ala - Desvio Vertical Derecho");
    console.log("****************************************************************");
    console.log(" ");
};


controller.alaDesvioVerIzquierdo = (req, res) => {
    res.render("bandeja/alaDesvioVerIzquierdo");
    console.log(" ");
    console.log("*******************   Monitor Servidor   ************************");
    console.log("***        Controlador : PagesController - alaDesvioVerIzquierdo");
    console.log("***        Descripcion : Ala - Desvio Vertical Izquierdo");
    console.log("****************************************************************");
    console.log(" ");
};


module.exports = controller;