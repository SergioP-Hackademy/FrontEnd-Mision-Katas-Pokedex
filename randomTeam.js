const randomTeam = () => {
    let arrayTest = Array.from({ length: 6 });
    arrayTest = arrayTest.map((num) => Math.floor(Math.random() * 900));
    console.log(arrayTest);
    fetchPokemon(arrayTest);
}




const fetchPokemon = async (listPokemon) => {
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


// const fetchPokesmon = async (listPokemon) => {
//     teampokemon = [];

//     for await (const variable of listPokemon) {
//         const url = `https://pokeapi.co/api/v2/pokemon/${variable}`;
//         fetch(url).then((res) => {
//             if (res.status != "200") {
//              console.log("La peticion trono "); 
//             }
//             else {
//                 return res.json();
//             }
//         }).then( (data) => {
//             if (data) {
//                 // console.log(data); 
//                 let dataOnePokemon = {
//                   name:data.name,
//                   types:data.types,
//                   order:data.order,
//                   img:data.sprites.front_default
//                 }
//                   teampokemon.push(dataOnePokemon) 
                  
//             }
//         })  


//     }
//     console.log(teampokemon)
//     console.log(teampokemon.length)
//     rendercards(teampokemon);
// }

const rendercards =  (data)=>{
// console.log(data)
// const templatecard = `<div class="card m-3" style="width: 18rem;">
//                     <img src="assets/emptycart.png" class="card-img-top" alt="..." id="pokemonimg1">
//                     <div class="card-body">
//                       <h5 class="card-title">${data.name}</h5>
//                     </div>
//                     <ul class="list-group list-group-flush">
//                       <li class="list-group-item">${data.types}</li>
//                       <li class="list-group-item">${data.order}</li>
//                     </ul>
//                     <div class="card-body">
//                       <a href="#" class="card-link">More Info</a>
//                     </div>
//                   </div>`


const parentElement = document.getElementById('row1');
// console.log(data);

data.forEach(data => {
  console.log(data);
    cart= document.createElement('div');
    cart.classList.add('card', 'm-3' );
    cart.style.width= "18rem"
    parentElement.insertAdjacentElement("afterbegin", cart);

    imgcard = document.createElement('img');
    imgcard.classList.add('img-fluid', 'p-0' ,'card-img-top','img-thumbnail');
    imgcard.src = data.img
    cart.insertAdjacentElement("beforeend", imgcard);

    cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardBody.innerHTML =`<h5 class="card-title">${data.name}</h5>`
    imgcard.insertAdjacentElement("afterend", cardBody);

    ulcard = document.createElement('ul');
    ulcard.classList.add('list-group', 'list-group-flush');
    ulcard.innerHTML =`<li class="list-group-item">${data.types}</li>
    <li class="list-group-item">${data.order}</li>`
    cardBody.insertAdjacentElement("afterend", ulcard);

});

// data.forEach(([key, value]) => {
//   console.log(key, value);
    // cart= document.createElement('div');
    // cart.classList.add('card', 'm-3');
    // parentElement.insertAdjacentElement("afterbegin", cart);
    // console.log(parentElement);

    // imgcard = document.createElement('img');
    // imgcard.classList.add('card-img-top');
    // cart.insertAdjacentElement("afterend", imgcard);

    // cardBody = document.createElement('div');
    // cardBody.classList.add('card-body');
    // cardBody.innerHTML =`<h5 class="card-title">hola</h5>`
    // imgcard.insertAdjacentElement("afterend", cardBody);

    // ulcard = document.createElement('div');
    // ulcard.classList.add('card-body');
    // ulcard.innerHTML =`<li class="list-group-item">hola</li>
    // <li class="list-group-item">hola</li>`
    // cardBody.insertAdjacentElement("afterend", ulcard);

// });

}

const ocultar = (id) => {
  randomTeam();
  const elemento = document.getElementById(id);
  elemento.style.display = "none";
  document.getElementById('cardsTeam').style.visibility = "visible"; // show
  // document.getElementById('cardsTeam').style.visibility = "hidden"; // hide
  
}

const pokeImage = async (data) => {
  console.log(typeof(data));
  const pokePhoto = document.getElementById("pokeImg");

  if(typeof(data) == 'string') return v

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
