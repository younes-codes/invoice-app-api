const Invoice = require('../models/invoice');
const Client = require('../models/client');
const {getMessageToConfirmInvoice, transporter, getMonth} = require("../utils/email");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.NODEMAILER);


const emailClient = 'chaouiyounes11@gmail.com';
const emailClient2 = 'chaouiyouns@gmail.com';
const emailClient3 = 'youneschanel5@gmail.com';

exports.createInvoice = async (req, res, next) => {
    const daysWorked = req.body.daysWorked;
    const tjm = req.body.tjm;
    const userId = req.params.userId;
    const invoice = await new Invoice({daysWorked, tjm});
    const client = await Client.findOne({userId});
    try {
        invoice.userId = userId;
        invoice.clientId = client._id.toString();
        invoice.save();
        res.status(201).json({message: 'invoice created'})
        //  const invoices = await Invoice.find({userId});
        // const invoiceLength = invoices.length;
        /*        const email = await transporter.sendMail({
                    to: [emailClient, emailClient2, emailClient3],
                    from: 'Younes Chaoui <chaouiyounes11@gmail.com>',
                    subject: `Facture #${invoiceLength}`,
                    html: getMessageToConfirmInvoice(daysWorked, invoice._id)
                })*/
    } catch (e) {
        console.log(e)
    }
}

exports.getInvoices = async (req, res, next) => {
    const userId = req.params.userId;
    const invoices = await Invoice.find({userId});
    try {
        return res.status(200).json({invoices, message: 'invoices available'})
    } catch (e) {
        console.log(e);
    }
}

exports.deleteInvoice = async (req, res, next) => {
    const invoiceId = req.params.invoiceId;
    await Invoice.findByIdAndRemove(invoiceId);
    try {
        res.status(201).json({message: 'invoice deleted'})
    } catch (e) {
        console.log(e);
    }
}

exports.getInvoiceById = async (req, res, next) => {
    const invoiceId = req.params.invoiceId;
    const month = getMonth();
    const invoice = await Invoice.findById(invoiceId);
    try {
        res.status(200).json({
            message: 'invoice available',
            invoice,
            month
        })
    } catch (e) {
        console.log(e)
    }
}

exports.confirmedInvoice = async (req, res, next) => {
    const invoiceId = req.body.invoiceId;
    const invoice = await Invoice.findById(invoiceId);

    try {
        invoice.confirmed = true;
        invoice.save();
        res.status(201).json({message: 'invoice confirmed'});

    } catch (e) {
        console.log(e)
    }
}

exports.confirmedInvoicePaid = async (req, res, next) => {
    const invoicePaid = req.body.invoicePaid;
    const invoiceConfirmed = req.body.invoiceConfirmed;
    const invoiceId = req.body.invoiceId;
    const invoice = await Invoice.findById(invoiceId);
    try {
        invoice.paid = invoicePaid;
        invoice.confirmed = invoiceConfirmed;
        invoice.save();
        res.status(201).json({message: 'invoice status updated', invoice});
    } catch (e) {
        console.log(e)
    }
}

