console.log("does this...?");
console.log(process.env.PORT);

module.exports = {
    serverPort: process.env.PORT || "8000"
};
