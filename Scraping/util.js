//Imports
import * as cheerio from 'cheerio'
import fetch from 'node-fetch'

export function validUrl(url) {
    try {
        new URL(url)
        return true
    } catch (error) {
        return false
    }
}

export function ScrapeAndSave(url) {



}