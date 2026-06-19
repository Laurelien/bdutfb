import { PdfData, VerbosityLevel } from 'pdfdataextract'
import { readFileSync } from 'fs'
import ora from 'ora'
import capitalizeFirstLetter from './capitalizeFirstLetter.js'
import debauche from './debauche.js'
import isLimeBasilic from './isLimeBasilic.js'

export default async function kegs (file) {
    let spinner = ora({
        text: "Récupération des données du PDF",
        color: "yellow"
    }).start()
    const file_data = readFileSync(file)

    const regex = /(\d{6}\s)([A-Za-z,\s\d\-\._']*)\s([0-9]*(?:\.|,)?\d*∞\s*)(\d{2}L\s)([A-Za-z]*\s*)?\d*,?\d*\s?(\d*,00)\d\s*FUT\s*\dFUT\s(\d*,\d{2})/gmi

    let pdfData = ""

    // all options are optional
    await PdfData.extract(file_data, {
        password: null,
        pages: 3,
        sort: true,
        verbosity: VerbosityLevel.ERRORS,
        get: {
            pages: true,
            text: true,
            fingerprint: false,
            outline: false,
            metadata: false,
            info: false,
            permissions: false,
        },
    }).then((data) => {
        for (let i = 0; i < data.pages; i++) {
            pdfData += data.text[i]
        }
    })

    try {
        let output = []
        let matches;

        while ((matches = regex.exec(pdfData)) !== null) {
            if (matches.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            let beerName = await isLimeBasilic(matches[2])
            output.push({
                name: capitalizeFirstLetter(debauche(beerName)),
                volume: matches[6],
                price: matches[7]
            })
        }
        spinner.stop()
        return output
    } catch (err) {
        spinner.stop()
        console.log(err)
    }
}