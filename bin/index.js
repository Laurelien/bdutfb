#! /usr/bin/env node

import { InvalidOptionArgumentError, program } from "commander"
import chalk from "chalk"
import ora from "ora"
import factureToJson from "../lib/factureToJson.js"
import isPdf from "../lib/isPdf.js"
import getBeerIds from "../lib/getBeerIds.js"
import addPrices from "../lib/addPrices.js"
import getCountryToEmoji from "../lib/getCountryToEmoji.js"
import addOnDeck from "../lib/addOnDeck.js"
import addFlags from "../lib/addFlags.js"
import 'dotenv/config'

const API_KEY = process.env.API_KEY
const auth = process.env.AUTH
const url = process.env.URL
const onDeckId = process.env.ONDECKID

const spinner = {
    readingFile: {
        color: "yellow",
        text: "Lecture du fichier",
        data: ""
    },
    addOnDeck: {
        color: "yellow",
        text: "Ajout des référence On Deck",
        data: ""
    }
}

let loading = ora()

program
  .command('file <filePath>')
  .description('Process a file')
  .action(async (filePath) => {
    loading.color = spinner.readingFile.color
    loading.text = spinner.readingFile.text
    loading.start()
    try {
        console.clear()
        let kegs

        // First we need to make sure it's a pdf
        if (isPdf(filePath)) {
            loading.stop()
            console.log(chalk.green(`√ Ok, ${filePath} est bien un fichier PDF`))

            await factureToJson(filePath).then((data) => {
                kegs = data
                console.log(chalk.green('√ Fûts récupérés'))
            })

            // On va aussi maintenant ajouter aux kegs les prix en fonction du volume et du prix unitaire
            await addPrices(kegs).then(() => {
                console.log(chalk.green('√ Prix calculés !'))
            })
            // console.log(kegs)

            // Now we can make business with utfdb
            console.log(chalk.yellow(`# Connexion à Untappd`))
            // On ajoute maintenant on deck les fûts de la facture
            // Avant, on fait une recherche référence par référence, on récupère l'id Untapdd qu'on ajout au tableau d'objet
            // Et on pousse id par id avec prix du demi et pinte on deck
            // On travail aussi la location
            await getBeerIds(auth, kegs).then((res) => {
                console.log(chalk.green(`√ Les ID et drapeaux ont été récupérés`))
                console.log(chalk.yellow(`# On ajoute les références On Deck`))
            })

            // Maintenant on ajoute les drapeaux
            for (let i = 0; i < kegs.length; i++) {
                let countryFlag = await getCountryToEmoji(kegs[i].country)
                kegs[i].name = kegs[i].name + " " + countryFlag
            }

            // Ok, maintenant qu'on à tous les ID, on peut les ajouter On Deck
            await addOnDeck(auth, kegs).then(() => {
                console.log(chalk.green('√ Références bien ajoutées On Deck'))
                console.log(chalk.yellow('# On ajoute les drapeaux en fin de nom'))
            })

            // Et enfin, on ajoute les drapeaux
            await addFlags(auth, kegs).then(() => {
                console.log(chalk.green('√ Drapeaux bien ajoutés'))
            })
        } else {
            console.error(chalk.red(`X ${filePath} is not a pdf file`))
        }
    } catch (err) {
        console.log(chalk.red(err))
    }
})

program.parse()