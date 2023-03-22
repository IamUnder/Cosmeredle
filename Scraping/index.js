// Imports
import { intro, outro, text, multiselect, confirm } from '@clack/prompts'
import colors from 'picocolors'
import { trytm } from '@bdsqqq/try'
import { validUrl, ScrapeAndSave, checkCancel } from './util.js'

intro(
    colors.inverse(`Scripinting cosmeredle by ${colors.cyan('@IamUnder')}`)
)

var url = await text({
    message: colors.cyan('Enter the url to scrape'),
    placeholder: 'https://coppermind.net/wiki/vin'
})
checkCancel(url)

if (!validUrl(url)) {
    url = 'https://coppermind.net/wiki/vin'
    // outro(
    //     colors.red('Error: Not a valid url, please try again')
    // )
    //process.exit(1)
} 

var data = await ScrapeAndSave(url)

var toChange = true

do {
    var changeData = await multiselect({
        message: 'Select the values you want to change (If they are correct, select only the last option)',
        options: [
            { value: 'Name', label: `${'Name'.padEnd(12,' ')}  ·  ${data['Name']}` },
            { value: 'Img', label: `${'Img'.padEnd(12,' ')}  ·  ${data['Img']}` },
            { value: 'ImgAutor', label: `${'ImgAutor'.padEnd(12,' ')}  ·  ${data['ImgAutor']}` },
            { value: 'Gender', label: `${'Gender'.padEnd(12,' ')}  ·  ${data['Gender']}` },
            { value: 'Nationality', label: `${'Nationality'.padEnd(12,' ')}  ·  ${data['Nationality']}` },
            { value: 'World', label: `${'World'.padEnd(12,' ')}  ·  ${data['World']}` },
            { value: 'Abilities', label: `${'Abilities'.padEnd(12,' ')}  ·  ${data['Abilities']}` },
            { value: 'State', label: `${'State'.padEnd(12,' ')}  ·  ${data['State']}` },
            { value: 'FeaturedIn', label: `${'FeaturedIn'.padEnd(12,' ')}  ·  ${data['FeaturedIn']}` },
            { value: 'Continue', label: 'Are the values correct?', hint: 'Mark only this' },

        ],
        required: false,
    })
    checkCancel(changeData)
    
    if(changeData[0] != 'Continue') {
        
        // error handling
        let arrayIndex = changeData.indexOf('Continue')
        if (arrayIndex >= 0) {
            changeData.splice(arrayIndex, 1);
        }

        for (let index = 0; index < changeData.length; index++) {

            if (typeof(data[changeData[index]]) == 'object') {
                // Array
                let newData = await text({
                    message: `[${changeData[index]}] Current data: [${data[changeData[index]].join()}]`,
                    initialValue: data[changeData[index]].join()
                })
                data[changeData[index]] = newData.split(',')
            } else {
                // Not an array
                data[changeData[index]] = await text({
                    message: `[${changeData[index]}] Current data: [${data[changeData[index]]}]`,
                    initialValue: data[changeData[index]]
                })
            }
        }

    } else {
        // We check to get out
        toChange = false
    }

} while (toChange);

console.log('TODO: DATABASE');
console.log('https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/')
