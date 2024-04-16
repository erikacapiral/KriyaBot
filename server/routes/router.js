const con = require('../connection/database');
const router = require("express").Router();
const controller = require('../controller/controller');



router.post('/', controller.login);
router.get('/authentication', controller.authentication);
router.get('/logout', controller.logout);


//router to fetch type of concerns from database
router.get('/concerns', controller.fetchConcerns);

//removed will use new function in socket.io
//router.post('/requestAgent', controller.requestAgent);


router.get('/checkOngoingRequest', controller.checkOngoingRequest);


//removed because will use socket
//router.get('/user_concerns', controller.fetchUserConcerns);

//modified April 03 from delete to get
router.get('/deleteRequestAgent/:id', controller.deleteRequestAgent);
router.get('/archiveRequestAgent/:id', controller.archiveRequestAgent);
router.get('/archived_user_concerns', controller.fetchArchivedUserConcerns);
router.get('/unarchiveRequestAgent/:id', controller.unarchiveRequestAgent);




module.exports = router;