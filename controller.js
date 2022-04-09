const { sendMessageToParent } = require("./telegram/parentsBot");
const { sendMessageToStaff } = require("./telegram/staffBot");

exports.sendNotificationToParent = async (req, res, next) => {
  try {
    await sendMessageToParent(req.body.userId, req.body.msg);
    return res.json({success: true});
  } catch (error) {
    return res.sendStatus(500);
  }
};

//TODO: fix return value

exports.sendNotificationToParents = async (req, res, next) => {
  await Promise.all(req.body.parents.map(parentId => {
    return sendMessageToParent(parentId, req.body.msg);
  }))
  return res.status(200);
};

exports.sendNotificationToEmployee = async (req, res, next) => {
  await sendMessageToStaff(req.body.userId, req.body.msg);
  return res.status(200);
};
exports.sendNotificationToStaff = async (req, res, next) => {
  await Promise.all(req.body.staff.map(employeeId => {
    return sendMessageToStaff(employeeId, req.body.msg);
  }))
  return res.status(200);
};




