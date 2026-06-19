import ora from "ora"


export default async function addFlags (auth, kegs) {
    let total = kegs.length
    let starting = 0
    let spinner = ora({
        color: "yellow"
    }).start()

    for (let i = 0; i < total; i++) {
        starting++
        spinner.text = `Ajout des drapeaux : (${kegs[i].name}) ${starting}/${total}`
        const url = `https://business.untappd.com/api/v1/items/${kegs[i].itemId}`

        try {
            let response = await fetch (url, {
                method: "PUT",
                headers: {
                    "Authorization": auth,
                    "Content-type": "Application/json"
                },
                body: `{"item": {"name": "${kegs[i].name}"}}`
            })
        } catch (err) {
            console.log(err)
        }
    }

    spinner.stop()
}