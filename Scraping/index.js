import { validUrl, ScrapeAndSave } from './util.js'

// Get url from commad line
const url = process.argv.at(-1)

if (validUrl(url)) {
    console.log('Starting the scrape..')
    ScrapeAndSave(url)
} else {
    console.log('Not a valid url')
}


