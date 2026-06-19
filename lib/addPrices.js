export default async function addPrices (kegs) {
    let kegsLength = kegs.length
    for (let i = 0; i < kegsLength; i++) {
        let price = parseInt(kegs[i].price, 10)
        let volume = parseInt(kegs[i].volume, 10)
        let priceLitter = price / volume

        if (priceLitter <= 3) {
            kegs[i].demi = 3
            kegs[i].pinte = 5.5
        } else if (priceLitter > 3 && priceLitter < 4) {
            kegs[i].demi = 4
            kegs[i].pinte = 7.5
        } else if (priceLitter > 4 && priceLitter < 4.5) {
            kegs[i].demi = 4.5
            kegs[i].pinte = 8.5
        } else if (priceLitter > 4.5 && priceLitter < 5) {
            kegs[i].demi = 5
            kegs[i].pinte = 9
        } else if (priceLitter > 5 && priceLitter < 5.5) {
            kegs[i].demi = 5.5
            kegs[i].pinte = 10
        } else if (priceLitter > 5.5) {
            kegs[i].demi = 6
            kegs[i].pinte = 11
        }
    }
}