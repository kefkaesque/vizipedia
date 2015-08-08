module.exports = {
    serverPort: process.env.PORT || "8000",
    cloudAMQP: process.env.CLOUDAMQP_URL || 'amqp://localhost'
};
