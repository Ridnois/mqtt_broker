const mqtt = require("mqtt");

const client = mqtt.connect(`mqtt://localhost:${process.env.BROKER_PORT || 1883}`);

const topic = "test";
const message = "Yeah";

client.on("connect", () => {
	console.log(`Client connected!`);
	client.end();
});

client.publish(topic, message);
