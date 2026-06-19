import ora from "ora"

export default async function getBeerIds (auth, kegs) {
    let total = kegs.length
    let starting = 0
    let spinner = ora({
        color: "yellow"
    }).start()
    const url = "http://business.untappd.com/api/v1/items/search?q="
    for(let i = 0 ; i < kegs.length ; i++) {
        starting++
        spinner.text = `Récupération des id (${kegs[i].name}): ${starting}/${total}`
        const response = await fetch(`${url}/${kegs[i].name}`, {
            headers: {
                "Authorization": auth
            }
        })
        const data = await response.json();
        if(response.ok) {
            if (data.items.length === 0) continue
            kegs[i].name = data.items[0].original_name
            kegs[i].untappd_id = data.items[0].untappd_id
            // Récupération de la localisation au passage
            kegs[i].country = data.items[0].brewery_country
        }
    }
    spinner.stop()
    return kegs;
}
