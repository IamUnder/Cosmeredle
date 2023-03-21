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
        message: 'Select the values you want to change',
        options:Object.entries(data).map(([key, value]) => ({
            value: key,
            label: `${key.padEnd(12,' ')}  ·  ${value}`
        })),
        required: false,
    })
    checkCancel(changeData)
    
    if(changeData.length != 0) {
        
        for (let index = 0; index < changeData.length; index++) {

            if (typeof(data[changeData[index]]) == 'object') {
                // Array
                let newData = await text({
                    message: data[changeData[index]].join(),
                    initialValue: data[changeData[index]].join()
                })
                data[changeData[index]] = newData.split(',')
            } else {
                // Not an array
                data[changeData[index]] = await text({
                    message: `Current data: [${data[changeData[index]]}]`,
                    initialValue: data[changeData[index]]
                })
            }

        }

    } 

    toChange = !await confirm({
        message: `Is the data correct? \n ${JSON.stringify(data, null, "\t")}`,
    });

} while (toChange);

console.log('TODO: DATABASE');
