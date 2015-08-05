console.log("does this...?");
console.log(process.env.PORT);

module.exports = {
    serverIp: process.env.IP || "127.0.0.1",
    serverPort: process.env.PORT || "8000"
};
