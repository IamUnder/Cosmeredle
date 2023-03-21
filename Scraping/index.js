// Imports
import { intro, outro, text, select, confirm } from '@clack/prompts'
import colors from 'picocolors'
//import { trytm } from '@bdsqqq/try'
import { validUrl, ScrapeAndSave } from './util.js'

intro(
    colors.inverse(`Scripinting cosmeredle by ${colors.cyan('@IamUnder')}`)
)

const url = await text({
    message: colors.cyan('Enter the url to scrape'),
    placeholder: 'https://coppermind.net/wiki/vin'
})

if (!validUrl(url)) {
    outro(
        colors.red('Error: Not a valid url, please try again')
    )
    process.exit(1)
} 

console.log('Starting the scrape..')
ScrapeAndSave(url)

