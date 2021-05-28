// Este archivo ejecuta todo el servidor

const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mysql = require("mysql");
const myConnection = require("express-myconnection");

const app = express();

//Importando rutas
const mainRoutes = require("./routes/mainRoutes");

//Setting
app.set("port", process.env.PORT || 4000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extends: false })); //permite entender los datos que vienen de formulario
app.use(express.json()); //escucho jsons

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

//Routes
app.use("/", mainRoutes);

// static files
app.use(express.static(path.join(__dirname, "public")));
//Iniciando el servidor
app.listen(app.get("port"), () => {
    console.log(`Servidor activo en puerto 4000`);
});
