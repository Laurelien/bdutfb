export default async function getCountryToEmoji (country) {

    const countries = {
        "France": "🇫🇷",
        "Spain": "🇪🇸",
        "Germany": "🇩🇪",
        "England": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        "Canada": "🇨🇦",
        "Austria": "🇦🇹",
        "Bulgaria": "🇧🇬",
        "Denmark": "🇩🇰",
        "United States": "🇺🇸",
        "Italy": "🇮🇹",
        "Belgium": "🇧🇪",
        "Latvia": "🇱🇻",
        "Sweden": "🇸🇪",
        "Ireland": "🇮🇪",
        "Poland": "🇵🇱",
        "Romania": "🇷🇴"
    }

    return countries[country] || null
}