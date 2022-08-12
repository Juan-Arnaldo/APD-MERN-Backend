import nodemailer from 'nodemailer';

const emailRegister = async (date) => {

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
        subject: 'Comprueba tu cuenta APD',
        text: 'Comprueba tu cuenta APD',
        html: `<p> Hola ${name}, comprueba tu cuenta APD.</p>
               <p> Tu cuenta ya esta lista, solo debes comprobarla ingresando
                   al siguiente link  <a href="${process.env.FRONTEND_URL}/confirm/${token}">Recover Password</a> </p>
                <p> Si vos no creaste la cuenta, puedes ignorar este mensaje </p>`,

    })
}

export default emailRegister;