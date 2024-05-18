const pokemonlist = document.querySelector('#pokemon-list');



if (pokemonlist){
    pokemonlist.addEventListener('click', async (e) => {
        if (!e.target.matches('span')) {
          return;
        }
        const favorite = e.target;
        console.log(favorite)
        const data = {
          pokemonId: favorite.dataset.name,
        };
        const response = await fetch('/api/favorite', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
          
        }) .catch((err)=>{
          console.log(err)
        })
        console.log(response)
        if (response.ok) {
          console.log(await response.json());
          if (favorite.dataset.favorited === 'false') {
            favorite.style = 'color: yellow';
            favorite.dataset.favorited = 'true';
          } else {
            favorite.style = '';
            favorite.dataset.favorited = 'false';
          }
        }
      });
}

// moved to homecontroller
// async function populateFavorites() {
//     const response = await fetch('/api/favorite', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }) .catch((err)=>{
//         console.log(err)
//       })
//       console.log(response)
//       if (response.ok) {
//         let HTML = ""
//         let data = await response.json()
//         data.pokemonFavorites.forEach((p) => {
//             p.pokemonId
//         })
//       }
// };


// window.onload = (event) => { 
//     populateFavorites()
//     console.log("page is fully loaded");
//   };
