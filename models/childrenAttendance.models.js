const {Schema, model} = require("mongoose");

const childAttandanceReportSchema = new Schema({
    _childId : Number,
    _date : String,
    _arrivalTime : String,
    _departureTime : String,
    _absence:String,
    _delay:Boolean
}, {versionKey:false, collection:"children_attendance"}); 

module.exports = model("childAttendanceReport", childAttandanceReportSchema);