const express = require('express');
const router = express.Router();
const ProcessController = require('../controllers/ProcessController');
const PagesController = require('../controllers/PagesController');





// PAGINAS
router.get('/', PagesController.homePage);
router.get('/alaDesvioHorizontalDerecho', PagesController.alaDesvioHorizontalDerecho);
router.get('/alaDesvioHorizontalIzquierdo', PagesController.alaDesvioHorizontalIzquierdo);
router.get('/alaDesvioVerDerecho', PagesController.alaDesvioVerDerecho);
router.get('/alaDesvioVerIzquierdo', PagesController.alaDesvioVerIzquierdo);




// PROCESOS HORIZONTALES
router.get('/inputVal_ala_hor_derecha/:parametros', ProcessController.inputVal_ala_hor_derecha);
router.get('/cutVal_ala_hor_derecha/:parametros', ProcessController.cutVal_ala_hor_derecha);
router.get('/inputVal_ala_hor_izquierdo/:parametros', ProcessController.inputVal_ala_hor_izquierdo);
router.get('/cutVal_ala_hor_izquierdo/:parametros', ProcessController.cutVal_ala_hor_izquierdo);

// PROCESOS VERTICALES
router.get('/inputVal_ala_ver_derecha/:parametros', ProcessController.inputVal_ala_ver_derecha);
router.get('/cutVal_ala_ver_derecha/:parametros', ProcessController.cutVal_ala_ver_derecha);


router.get('/inputVal_ala_ver_izquierdo/:parametros', ProcessController.inputVal_ala_ver_izquierdo);
router.get('/cutVal_ala_ver_izquierdo/:parametros', ProcessController.cutVal_ala_ver_izquierdo);



module.exports = router;