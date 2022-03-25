const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const MONTHS = [
    "Janvier", "Février", "Mars",
    "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre",
    "Octobre", "Novembre", "Decembre"
];

exports.getMonth = () => {
    const months = MONTHS;
    const d = new Date();
    return months[d.getMonth()];
}

exports.transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: process.env.NODEMAILER
    }
}))

exports.getMessageToConfirmInvoice = (daysWorked, invoiceId) => {
    return `
            <h1>Hello Maxime, Antoine,</h1>
            <p>Jours travaillés en ${this.getMonth()} = ${daysWorked}</p>
            <a href=http://localhost:5002/confirmation-facture/${invoiceId}>Confirmer facture</a>
             <h2>Cordialement,</h2>
             <h3>Younes Chaoui</h3>
            `
}
