// NodeJS Broker
// MQTT handler
const aedes = require("aedes")()
const server = require("net").createServer(aedes.handle)
const port = process.env.BROKER_PORT || 1883
const wsPort = process.env.BROKER_WS_PORT || 1884
// WebSocket handler
const ws = require("websocket-stream")
const httpServer = require('http').createServer()

ws.createServer({ server: httpServer }, aedes.handle)

// For WebSocket devices
httpServer.listen(wsPort, function () {
  console.log('websocket server listening on port ', wsPort)
})

// For MQTT directly
server.listen(port, () => {
  console.log(`Server listen on port ${port}`)
})

const floatFromBuffer = (buff) => {
  return parseFloat(buff.toString());
}

aedes.on('publish', async (packet, client) => {
  let temp, hum;
  if(packet.topic == 'ESP8266/DHT22/TEMP') {
    temp = floatFromBuffer(packet.payload)
    console.log(`Temperature: ${temp}°C`)
  }
  if(packet.topic == 'ESP8266/DHT22/HUM') {
    hum = floatFromBuffer(packet.payload);
    console.log(`Humidity: ${hum}%`)
  }
})
