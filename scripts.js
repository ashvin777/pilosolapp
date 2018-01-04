var components = global.get("components");
var frameComponents = [];

msg.signals.shift();
msg.signals.shift();
msg.signals.shift();

var compData = msg.signals;

components.forEach(function(comp){
    if(comp.frameid == global.get("selectedFrame").id){
        frameComponents.push(comp);
    }
});

msg.payload = [];

var frameSerial = parseInt(global.get("selectedFrame")['serial']) + 1;

var isValid = frameComponents.every(function(comp, key){
    return compData[key] === true ;
});


if(!isValid){
    frameSerial = frameSerial - 1;
}

frameComponents.forEach(function(comp, key){
    msg.payload.push({
      frametype: global.get("selectedFrame") ? global.get("selectedFrame").name : '',
      framenumber: isValid ? frameSerial: '---',
      frameid: global.get("selectedFrame")['id'],
      framecomponent: comp.name,
      shiftnumber: getShift(),
      processingtime: "",
      status: compData[key] === true ? "ok" : "not ok",
      timestamp: new Date()
    });
});


global.set("selectedFrame", {
  name: global.get("selectedFrame").name,
  id : global.get("selectedFrame").id,
  serial: frameSerial
});

msg.topic = global.get("selectedFrame");

function getShift(){
  var shifts = global.get("shifts");
  var shiftName = '';
  var currentTime = new Date().toString().slice(16, 21);
  
  currentTime = parseInt(currentTime.replace(":", ""));
  
  for(var i = 0; i < shifts.length; i++){
      var start = parseInt(shifts[i].starttime.replace(":", ""));
      var end = parseInt(shifts[i].endtime.replace(":", ""));
      
      // Fix time for compare.
      if (end < start) {
          end += 2400;

          if (!((currentTime >= start) && (currentTime <= end)))
              currentTime += 2400;
      }
      
      if(currentTime < end && currentTime >= start){
          shiftName = shifts[i].name;
          break;
      }
      
  }
  
  return shiftName;
}

return msg;