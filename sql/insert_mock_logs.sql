INSERT INTO LOGS (
  frametype,
  framenumber,
  framecomponent,
  shiftnumber,
  processingtime,
  status,
  timestamp
) 

VALUES (
'{{msg.payload.frametype}}',
'{{msg.payload.framenumber}}',
'{{msg.payload.framecomponent}}',
'{{msg.payload.shiftnumber}}',
'{{msg.payload.processingtime}}',
'{{msg.payload.status}}',
'{{msg.payload.timestamp}}'
);