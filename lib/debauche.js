// Remplace les "..." par "é", en espérant qu'il n'y ait pas d'autres soucis avec d'autres accents
export default function debauche (str) {
    return str.replace(/\.\.\./g, 'é')
}