
const fetchPokemonOne = (random) => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    // pokeName = pokeName;
    const url =  (typeof random === 'undefined')?`https://pokeapi.co/api/v2/pokemon/${pokeName}`:`https://pokeapi.co/api/v2/pokemon/${random}`
    console.log(url);
    fetch(url).then((res) => {
        if (res.status != "200") {
          console.log("La peticion trono ");
            console.log(res);
            pokeImage("https://i0.wp.com/pokemonnewscenter.com.br/wp-content/uploads/2014/03/pokemon-red-blue-yellow-missingno-tutorial1.jpg?resize=695%2C380&ssl=1")
            // te quedas con remanantes de informacion checar como podrias eliminarlo de una manera izi
        }
        else {
            return res.json();
        }
    }).then( async (data) => {
        if (data) {
            console.log(data);
            // resetcard()
            namePokemon(data)
            pokeImage(data);
            const { stats, types, abilities, id, name, weight, height, species} = data ;
            statusFormater(stats);
            typePokemon(types);
            fetchEvolutiondata(species);
            // abilitiesPokemon(abilities);
            await descriptionPokemon(name);
            otherStats(weight,height)
            
        }
    })
}

const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

const randomPokemon = () => {
  const randomNum = Math.floor(Math.random() * 900);
  console.log(randomNum);
  fetchPokemonOne(randomNum);
}

const pokeImage = async (data) => {
  console.log(typeof(data));
  const pokePhoto = document.getElementById("pokeImg");

  if(typeof(data) == 'string') return pokePhoto.src = data

  let url = `https://play.pokemonshowdown.com/sprites/bwani/${data.name}.gif`

  const corsAnywhere = 'https://cors-anywhere.herokuapp.com/'; 
  fetch(corsAnywhere + url, {
      method: 'GET',
      headers: new Headers({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
      }),
  })
      .then((response) => {
        response.status!=200 ?pokePhoto.src = data.sprites.front_default: pokePhoto.src = url;

      })
      .catch((err) => console.log(err));
}

const statusFormater = (stats) => {
  const statspoke = document.getElementById("statsPokemon");
  statspoke.innerHTML = 'Statistics'
    statsShow = [];
    templateStats={
        hp:0,
        attack:0,
        defense:0,
        specialAttack:0,
        specialDefense:0,
        speed:0
    }
    stats.forEach(element => {
        templateStats[element.stat.name]=element.base_stat
    });
    tableTemplate = `
    <table class="table table-borderless">
    <tbody>
      <tr>
        <td>HP</td>
        <td>${templateStats.hp}</td>
      </tr>
      <tr>
        <td>Attack</td>
        <td>${templateStats.attack}</td>
      </tr>
      <tr>
        <td>Defense</td>
        <td>${templateStats.defense}</td>
      </tr>
      <tr>
        <td>Special Attack</td>
        <td>${templateStats.specialAttack}</td>
      </tr>
      <tr>
        <td>Special Defense</td>
        <td>${templateStats.specialDefense}</td>
      </tr>
      <tr>
        <td>Speed</td>
        <td>${templateStats.speed}</td>
      </tr>
     
    </tbody>
  </table>
    `
    
    statspoke.innerHTML = tableTemplate;
  

}

const typePokemon = (data) => {
    console.log(data.values)
    const parentElement = document.getElementById('types');
    parentElement.innerHTML = '<p>Types</p>'

    let typeTemplate
    Object.entries(data).forEach(([key, value]) => {
        typeTemplate = document.createElement('div');
        typeTemplate.classList.add('row','col','rounded-3', 'mt-1', 'm-0' ,'mb-3');
	      typeTemplate.style.backgroundColor = colors[value.type.name];
        parentElement.insertAdjacentElement("beforeend", typeTemplate);
        typeTemplate.innerHTML = `<p class="m-0 p-0 "> ${value.type.name}</p>`;

    });
}


const namePokemon = (data) => {
    
    const number = document.getElementById("numberPokemon");
    number.textContent = data.id;
    const name = document.getElementById("namePokemon");
    name.textContent = data.name;
  

}

const fetchEvolutiondata = async(data) => {
  try {
    const responseSpecies = await fetch(data.url);
    const dataSpecies = await responseSpecies.json();

    const responseEvolutionTree = await fetch(dataSpecies.evolution_chain.url);
    const dataEvolutionTree = await responseEvolutionTree.json();
    console.log(dataEvolutionTree)
    formatEvolutions(dataEvolutionTree);
  } catch (err) {
    console.log(err);
  }
};
// document.getElementById("imgEvoI").src = `https://play.pokemonshowdown.com/sprites/bwani/${data.name}.gif`
// document.getElementById("nameEvoI").innerHTML = data.name

const formatEvolutions = (data) => {
  const evolutioninfo = []
  console.log(Object.keys(data.chain.species.name))
  document.getElementById("imgEvoI").src = `https://play.pokemonshowdown.com/sprites/bwani/${data.chain.species.name}.gif`
  document.getElementById("nameEvoI").innerHTML = data.chain.species.name


  for (let key in data.chain){
    // console.log(key); 
    if(key == 'evolves_to'){
      console.log('dento del if en el for');
      // console.log(data.chain[key])
      if(data.chain[key].length != 0){
        evolutioninfo.push(data.chain[key][0].species.name)
       console.log(data.chain[key][0][key][0].species.name)

      
        if(data.chain[key][0][key][0].evolves_to.length == 0){
          evolutioninfo.push(data.chain[key][0][key][0].species.name) 
          break   
        }
  
      
      }

    }

  }
  console.log(evolutioninfo);
  console.log(evolutioninfo[0]);
  console.log(evolutioninfo[1]);
  
  document.getElementById("imgEvoII").src = `https://play.pokemonshowdown.com/sprites/bwani/${evolutioninfo[0]}.gif`
  document.getElementById("nameEvoII").innerHTML = evolutioninfo[0]
  if(evolutioninfo.length==2){
    document.getElementById("imgEvoIII").src = `https://play.pokemonshowdown.com/sprites/bwani/${evolutioninfo[1]}.gif`
    document.getElementById("nameEvoIII").innerHTML = evolutioninfo[1]
  }
}

const fetchEvolutionImgPokemon = async(data) => {
    try {
      const datosFinales = []
      let urls=[]
      listPokemon.forEach(element => {
          
        urls.push(`https://pokeapi.co/api/v2/pokemon/${element}`)
      });
  
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
      const data = await response.json();
  
      const posts = await Promise.all(
        urls.map(async (item) => {
          const response = await fetch(item);
          const data = await response.json();
          datosFinales.push({name:data.name,
                              types:data.types,
                              order:data.order,
                              img:data.sprites.front_default})
        }
        ),
      );  
  
      console.log(datosFinales[0])
      console.log(datosFinales.length)
      rendercards(datosFinales);
    } catch (err) {
      console.log(err);
    }
  
    
  
  };


const   descriptionPokemon = async(name) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
    const data = await response.json();
    descriptionNode = document.getElementById('descriptionPokemon');
    descriptionNode.innerHTML = `<p class="m-0"> ${data.flavor_text_entries[0].flavor_text}</p>`;

}
const   otherStats = (weight,height) => {
  weightPokemon = document.getElementById('weightPokemon');
  weightPokemon.innerHTML = `<label for="weight">Weight</label><br>${weight}`;
  heightPokemon = document.getElementById('heightPokemon');
  heightPokemon.innerHTML = `<label for="weight">Height</label><br>${height}`;
}

const abilitiesPokemon = (data) => {
  console.log(data)
  const parentElement = document.getElementById('abilities');
  // parentElement.innerHTML = '<p>Types</p>'

//   tableTemplate = `
//   <table class="table table-borderless">
//   <tbody>
//   <thead>
//     <tr>
//       <th scope="col"></th>
//     </tr>
//   </thead>
//     <tr>
//       <td>HP</td>
//       <td>${templateStats.hp}</td>
//     </tr>
//     <tr>
//       <td>Attack</td>
//       <td>${templateStats.attack}</td>
//     </tr>
//     <tr>
//       <td>Defense</td>
//       <td>${templateStats.defense}</td>
//     </tr>
//   </tbody>
// </table>
//   `
//   let typeTemplate
  Object.entries(data).forEach(([key, value]) => {
      tbody = document.createElement('tbody');
      tr = document.createElement('tr');
      typeTemplate.classList.add('row','col','rounded-3', 'mt-1', 'm-0', 'type');
      
      parentElement.insertAdjacentElement("beforeend", typeTemplate);
      typeTemplate.innerHTML = `<p class="m-0"> ${value.type.name}</p>`;
  });
}
