const aedes = require("aedes")();
const server  = require("net").createServer(aedes.handle);

const port = process.env.BROKER_PORT || 1883;

server.listen(port, () => {
	console.log(`Server listen on port ${port}`);
});
aedes.on('publish', async function (packet, client) {
  console.log('Client \x1b[31m' + (client ? client.id : 'BROKER_' + aedes.id) + '\x1b[0m has published', packet.payload.toString(), 'on', packet.topic, 'to broker', aedes.id)
})
// fired when a client connects
aedes.on('client', function (client) {
  console.log('Client Connected: \x1b[33m' + (client ? client.id : client) + '\x1b[0m', 'to broker', aedes.id)
})

aedes.on("clientDisconnect", function(client) {
	console.log("client disconnected");
});
