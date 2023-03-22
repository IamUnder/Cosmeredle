import mongoose from 'mongoose'
import dotenv from 'dotenv'
import characterModel from './Models/character.js'
import { outro } from '@clack/prompts'

dotenv.config()
mongoose.connect(
    `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBNAME}.${process.env.DBCLUSTER}.mongodb.net/?retryWrites=true&w=majority`,
    {}
).catch( e => console.log('Error on db connection: ', e) )


export async function insertDB (data) {
    const character = new characterModel(data)
    try {
        await character.save()
        return true
    } catch (error) {
        outro(
            `Database insert failed: ${error}`
        )
        process.exit(0)
        return false
    }
}