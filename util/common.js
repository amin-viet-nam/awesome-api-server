class Common {

    getRandomNumber(length) {
        let text = "";
        const possible = "1234567890";

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}

module.exports = new Common();