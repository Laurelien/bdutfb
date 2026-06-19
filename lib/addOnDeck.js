import ora from "ora"

const OnDeckSection = "205701"

export default async function addOnDeck (auth, kegs) {
    let total = kegs.length
    let starting = 0
    let spinner = ora({
        color: "yellow"
    }).start()
    const url = `https://business.untappd.com/api/v1/sections/${OnDeckSection}/items`
    for (let i = 0; i < total; i++) {
        if (!kegs[i].untappd_id) continue
        starting++
        spinner.text = `Ajout des références On Deck (${kegs[i].name}) : ${starting}/${total}`
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": auth,
                "Content-Type": "application/json"
            },
            body: `{"untappd_id": ${kegs[i].untappd_id}}`
        })

        const item = await response.json()

        kegs[i].itemId = item.item.id

        // console.log(item)

        const addDemi = await fetch(`https://business.untappd.com/api/v1/items/${item.item.id}/containers`, {
            method: "POST",
            headers: {
                "Authorization": auth,
                "Content-type": "Application/json"
            },
            body: `{ "container": { "container_size_id": 478, "price": ${kegs[i].demi} } }`
        })
        const addPinte = await fetch(`https://business.untappd.com/api/v1/items/${item.item.id}/containers`, {
            method: "POST",
            headers: {
                "Authorization": auth,
                "Content-type": "Application/json"
            },
            body: `{ "container": { "container_size_id": 644, "price": ${kegs[i].pinte} } }`
        })

        Promise.all([addDemi, addPinte]).then((values) => {
            // console.log(values)
        })
        .catch((err) => {
            console.log("ERREUR", err)
        })
    }
    spinner.stop()
}