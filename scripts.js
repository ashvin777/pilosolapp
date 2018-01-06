var selectedFrame = global.get("selectedFrame");

var frameComponents = msg.payload.rows || [];

msg.signals.shift();
msg.signals.shift();
msg.signals.shift();

var signals = msg.signals;

if (selectedFrame && getShift() && !isNaN(selectedFrame.serial)) {

    msg.payload = [];

    var frameSerial = parseInt(selectedFrame.serial) + 1;

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
                timestamp: new Date()
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
                timestamp: new Date()
            });
        }
    });

    global.set("selectedFrame", {
        name: selectedFrame.name,
        number: selectedFrame.number,
        id: selectedFrame.id,
        serial: frameSerial
    });

    msg.topic = selectedFrame;

    return msg;
}

function getShift() {
    var shifts = global.get("shifts");
    var shiftName = '';
    var currentTime = new Date().toString().slice(16, 21);

    currentTime = parseInt(currentTime.replace(":", ""));

    for (var i = 0; i < shifts.length; i++) {
        var start = parseInt(shifts[i].starttime.replace(":", ""));
        var end = parseInt(shifts[i].endtime.replace(":", ""));

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