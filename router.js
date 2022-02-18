const express = require("express");
const router = express.Router();
const {/*errorHandle,*/ sendNotificationToParent, sendNotificationToParents, sendNotificationToEmployee, sendNotificationToStaff} = require("./controller");

router.route("/escort/send")
    .post(sendNotificationToParent);

router.route("/escort/sendToMany")
    .post(sendNotificationToParents);

router.route("/staff/send")
    .post(sendNotificationToEmployee);

router.route("/staff/sendToMany")
    .post(sendNotificationToStaff);

router.all("*",(req,res,next)=>next({message:"request is not found", code:404}));
//middleware errors manager
// router.use(errorHandler);

module.exports = router;