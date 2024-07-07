const API_URL = 'https://mindicador.cl/api'
const selectContainer = document.getElementById('myCoins')

let fetchCoins = async (url) => {
    const dataJason = await fetch(url)
    const coinsData = await dataJason.jason()
} 

const rainderCoins = (coins, container) => {

}

fetchCoins(API_URL)