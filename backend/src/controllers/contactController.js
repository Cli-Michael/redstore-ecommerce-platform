const Contact = require("../models/Contact");

const handleContactForm = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (name === "" || email === "" || message === "") {
            res.status(200).json({ message: "Some fields are missing." });
            return;
        }

        const newContact = new Contact({ username: name, emailAddress: email, content: message });
        await newContact.create();

        res.status(201).json({ status: "Contact stored" });
    } catch (err) {
        res.status(404).json({ message: "Unable to store contact info" });
    }
};

module.exports = { handleContactForm };
