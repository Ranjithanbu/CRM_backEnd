import { CalendarEvent } from "../Models/event.model.js"

//creating new event and store to db 

export const createEvent = async (req, res) => {
    try {
        const {
            title,
            start,
            end,
            url } = req.body
        const AddEvent = new CalendarEvent({
            title,
            start,
            end,
            url
        })
        await AddEvent.save()
        res.status(200).json({ message: "Event created successfully", data: AddEvent })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//getting event from db and send to frontend 

export const getEvent = async (req, res) => {
    try {

        const getData = await CalendarEvent.find().select('-__v')
        res.status(200).json({ message: 'fetched successfully', data: getData })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

//delete events 

export const deleteEvent = async (req, res) => {
    try {

        await CalendarEvent.deleteMany({})
        res.status(200).json({ message: 'cleared successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }

}