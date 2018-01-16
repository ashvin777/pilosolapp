var selectedFrame = global.get("selectedFrame");

var frameComponents = msg.payload.rows || [];

msg.signals.shift();
msg.signals.shift();
msg.signals.shift();

var signals = msg.signals;


console.info("------frame", selectedFrame);
console.info("------shift", getShift());
console.info("-------frameserial", getFrameSerial());

if (selectedFrame && getShift() && getFrameSerial() > 1) {

    msg.payload = [];

    var frameSerial = getFrameSerial();

    console.log("frameSerial--", frameSerial);

    var isValid = signals.every(function (comp) {
        return comp === true;
    });

    if (!isValid) {
         frameSerial = frameSerial - 1;
    }

    frameComponents.forEach(function (comp, index) {
        if (isValid && index == 0) {
            msg.payload.push({
                frametype: selectedFrame ? selectedFrame.name : '',
                framenumber: isValid ? frameSerial : '---',
                frameid: selectedFrame.id,
                framecomponent: 'ALL',
                shiftnumber: getShift(),
                processingtime: "",
                status: msg.signals[index] === true ? "PRESENT" : "ABSENT",
                timestamp: new Date(),
                frameDynamicCode: getFrameCode(new Date(), frameSerial)
            });
        } else if(!isValid && msg.signals[index] == false){
            msg.payload.push({
                frametype: selectedFrame ? selectedFrame.name : '',
                framenumber: isValid ? frameSerial : '---',
                frameid: selectedFrame.id,
                framecomponent: comp.name,
                shiftnumber: getShift(),
                processingtime: "",
                status: msg.signals[index] === true ? "PRESENT" : "ABSENT",
                timestamp: new Date(),
                frameDynamicCode: '---'
            });
        }
    });

    global.set("selectedFrame", {
        name: selectedFrame.name,
        number: selectedFrame.number,
        id: selectedFrame.id,
        serial: frameSerial,
        serialstart: selectedFrame.serialstart
    });

    msg.topic = global.get("selectedFrame");//selectedFrame;

    //msg.topic.serial = frameserial;

    return msg;
}

function getShift() {
    var shifts = global.get("shifts");
    var shiftName = '';

    for (var i = 0; i < shifts.length; i++) {

        var currentTime = new Date().toString().slice(16, 21);
        currentTime = parseInt(currentTime.replace(":", ""));

        var start = parseInt(shifts[i].starttime.replace(":", ""));
        var end = parseInt(shifts[i].endtime.replace(":", ""));

        //console.log(i, shifts[i], currentTime, start, end);
        // Fix time for compare.
        if (end < start) {

            end += 2400;

            if (!((currentTime >= start) && (currentTime <= end)))
                currentTime += 2400;
        }

        if (currentTime < end && currentTime >= start) {
            shiftName = shifts[i].name;
            break;
        }

    }

    return shiftName;
}

function getFrameCode(date, frameSerial) {
    var dd = date.getDate();
    var mm = date.getMonth()+1; //January is 0!

    var yyyy = date.getFullYear();
    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
    return dd+'-'+mm+'-'+yyyy +'-'+getShift()+'-'+frameSerial;
}

function getFrameSerial() {
    var frames = global.get('frames');
    var serial = null;
    var lastLogs = global.get('lastLogs');

    frames.forEach(function (frame) {
        if (selectedFrame.id == frame.id) {
            //console.log(lastLogs[0].shiftnumber, getShift())
            if (lastLogs && lastLogs[0] && lastLogs[0].shiftnumber && lastLogs[0].shiftnumber != getShift()) {
                serial = frame.serialstart;
            } else if(lastLogs && lastLogs[0] && lastLogs[0].framenumber > 0){
                console.log('framesearch for each---', frame.serial);
                serial = parseInt(lastLogs[0].framenumber) + 1;
            } else {
                serial = frame.serial > 0 ?  (parseInt(frame.serial) + 1) : frame.serialstart;
            }
        }

    });

    return serial;
}