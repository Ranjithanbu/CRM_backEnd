import { MailDB } from "../Models/mailModel.js"
import { transport } from "../nodeMailer.js"

//sending mail  and store to db

export const sendMails = async (req, res) => {
    try {
        const { sender, reciever, subject, text, creater } = req.body
        const saveMail = new MailDB({
            sender, reciever, subject, creater, text
        })
        console.log(saveMail);
        await saveMail.save()
        const mailOption = {
            from: sender,
            to: reciever,
            subject: subject,
            text: text
        }
        await transport.sendMail(mailOption, (err) => {
            if (err) { res.status(500).json({ message: err.message }) }
            else (res.status(200).json({ message: 'mail sent successfully' }))
        }
        )

    } catch (error) {

        res.status(500).json({ message: error.message })

    }
}

//get all mails

export const getMail = async (req, res) => {
    try {

        const data = await MailDB.find()
        res.status(200).json({ message: 'fetched successfully', data: data })
    } catch (error) {

        res.status(500).json({ message: error.message })
    }
}

//delete mail

export const deleteMail = async (req, res) => {
    try {
        const id = req.params.id

        await MailDB.findByIdAndDelete(id)

        res.status(200).json({ message: 'deleted successfully' })
    } catch (error) {

        res.status(500).json({ message: error.message })
    }
}