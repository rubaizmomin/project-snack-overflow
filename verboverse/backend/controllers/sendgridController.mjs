import sendEmail from "../models/sendgrid.mjs";

export async function sendEmail(req, res) {

    const to = req.body.to;
    const from = "verboverse101@gmail.com";

    const subject = "Invitation to join Verboverse";
    const code = req.body.code;

    const msg = `
        <h1>Invitation to join Verboverse</h1>
        <p>You have been invited to join Verboverse!</p>
        <p>Click <a href="http://localhost:3000/invite/${code}">here</a> to join.</p>
    `;

    sendEmail(to, from, subject, msg);
    res.redirect("/sent");

}