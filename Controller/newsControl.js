import { News } from "../Models/news.model.js"

//creating news and store to db

export const createNews = async (req, res) => {
    try {
        const {
            subject,
            description,
            forTo,
            creater
        } = req.body
        const saveData = new News({
            subject,
            description,
            forTo,
            creater
        })
        await saveData.save()
        res.status(200).json({ message: 'news added succesfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//sending all  existed news to frontend

export const getAllNews = async (req, res) => {
    try {
        const allNews = await News.find()
        res.status(200).json({ message: 'leads fetched successfully', data: allNews })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//removing news from db

export const deleteNews = async (req, res) => {
    try {
        const id = req.params.id

        const deletedNews = await News.findByIdAndDelete(id)
        res.status(200).json({ message: 'news deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}