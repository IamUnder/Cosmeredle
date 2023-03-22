//Imports
import * as cheerio from 'cheerio'
import fetch from 'node-fetch'
import {cancel, isCancel} from '@clack/prompts'

import { logError, logInfo, logSuccess } from './log.js'

export function validUrl(url) {
    try {
        new URL(url)
        return true
    } catch (error) {
        return false
    }
}

async function scrape(url) {
    const res = await fetch(url)
    const html = await res.text()
    return cheerio.load(html)
}

export async function ScrapeAndSave(url) {
    const start = performance.now()

    try {
        const $ = await scrape(url)
        const data = await getData($)
        return data
    } catch (error) {
        outro(
            logError(`Error Scraping`),
            logError(error)
        )
    } 
}

async function getData($) {
    
    var $character = $('table#Character tr').get().map(function(row) {
        var id = $(row).find('th').get().map(function(cell) {
            return $(cell).text().replace("\n", "");
        });
        var value = $(row).find('td a').get().map(function(cell) {
            return $(cell).text().replace("\n", "")
        });
        return {
            [id]: value
        }
    });
    
    // Generate the object
    var character = {}
    // Get the name
    character['Name'] = $('#Character th.title').text().replace("\n", "")
    // Picture
    character['Img'] = 'https://coppermind.net' + $('#Character img').attr('src')
    character['ImgAutor'] = $('#Character .attribution').text().replace("by  ", "")
    // Other data
    $character = $character.map(element => {
        let clave = Object.keys(element)
        switch (clave[0]) {
            case 'Nationality':
            case 'Ethnicity':
                character['Nationality'] = element[clave][0]
                break; 
            case 'World':
                character[clave[0]] = element[clave][0]
                break;
            case 'Abilities':
                character[clave[0]] = element[clave]
                break;
            case 'Featured In':
                character['FeaturedIn'] = element[clave]
                break;
            case 'Died':
                character['State'] = 'Died'
            default:
                break;
        }
    })


    return character
}

export function checkCancel(value){
    if (isCancel(value)) {
        cancel('Operation cancelled.');
        process.exit(0);
      }
}