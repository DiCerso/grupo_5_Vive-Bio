let nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "vivebioservices@gmail.com", // generated ethereal user
        pass: 'gzdmazxkadsyitkr', // generated ethereal password

    },
});

transporter.verify().then(() => {
    console.log('ready for send emails')
}).catch(error => console.log(error));

module.exports = { transporter };