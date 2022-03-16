// console.log("Hola explorers");=
const fetchPokemon = () => {
    const url = `https://pokeapi.co/api/v2/pokemon/${document.getElementById("pokeName").value}`;
    fetch(url).then((res)=>{
        return res.json();
    }).then((data)=>{
        console.log(data);
        let pokeImg = data.sprites.front_default;
        console.log(pokeImg); 
        pokeImg(pokeImg)
    })
};
// fetchPokemon();

const pokeImg = (url)=>{
    const pokeImg = document.getElementById('pokeImg')
    pokeImg.src = url
}
// pokeImg('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png');

const imprimir = ()=>{
    const pokeName = document.getElementById("pokeName")
    let pokeimput = pokeName.value;
    console.log("Hola", pokeimput);
}