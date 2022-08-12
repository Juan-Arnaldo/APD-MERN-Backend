import nodemailer from 'nodemailer';

const emailRecoverPass = async (date) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const {name, email, token} = date

    const info = await transport.sendMail({
        from: "APD - Administrador de pacientes",
        to: email,
        subject: 'Recupera tu password APD',
        text: 'Recupera tu password APD',
        html: `<p> Hola ${name}, solicitaste restablecer tu password.</p>
               <p> Lo unico que tenes que hacer es darle al siguiente link
                  <a href="${process.env.FRONTEND_URL}/recover-pass/${token}">Cambiar password</a> </p>
                <p> Si vos no creaste la cuenta, puedes ignorar este mensaje </p>`,

    })
}

export default emailRecoverPass