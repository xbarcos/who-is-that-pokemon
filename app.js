var container = document.getElementById('container');
var divImage = document.getElementById('pokemon-image');
var divName = document.getElementById('pokemon-name');
var inputName = document.getElementById('input-name');

var random;
var pokemonObject = [];
var thisPokemon;

const fetchPokemon = () => {
    const pokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${ id }`;
    const pokemonPromises = [];
    for (let i = 1; i <= 151; i++) {
        pokemonPromises.push(fetch(pokemonUrl(i)).then(response => response.json()));
    }      
    
    Promise.all(pokemonPromises)
        .then(pokemons => {
            pokemonObject.push(...pokemons)
        })
}
fetchPokemon();

function getPokemonCard() {
    random = Math.floor(Math.random() * 151);
    let imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+ (random) +'.png';
    divImage.style = '-webkit-filter: brightness(0)';
    divImage.innerHTML = "<img src='"+ imageUrl +"'/>"
    
}
getPokemonCard();

function revealPokemon() {
    if (inputName.value.toLowerCase() == pokemonObject[random-1].name.toLowerCase()) {
        divImage.style = '-webkit-filter: brightness(1)';
        divName.innerHTML = pokemonObject[random-1].name.toUpperCase();
        alert('Ganhou');
    }
    else {
        alert('Perdeu :( \nO nome do pokemon é: '+ pokemonObject[random-1].name);        
        resetGame();       
    }
}

function resetTitle() {
    return divName.innerHTML = 'WHO IS THAT POKEMON??'
}

function resetGame() {
    getPokemonCard();
    resetTitle();
    inputName.value = '';
    divImage.style = '-webkit-filter: brightness(0)';
}
