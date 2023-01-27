import moment from "moment";

export const FormatTime = (input) => {
    const rawTime = input;
    const rawToObject = moment(rawTime).toObject();
    const nowTime = moment(Date()).toObject();
    var msgTime;

    if (rawToObject.years == nowTime.years && rawToObject.months == nowTime.months && rawToObject.date == nowTime.date) {
        msgTime = moment(rawTime).format("h:mm A");
        return msgTime;
    } else if (rawToObject.years == nowTime.years && rawToObject.months == nowTime.months && rawToObject.date == nowTime.date - 1) {
        msgTime = "Yesterday";
        return msgTime;
    } else {
        msgTime = moment(rawTime).format("DD/MM/YYYY");
        return msgTime;
    }
}

