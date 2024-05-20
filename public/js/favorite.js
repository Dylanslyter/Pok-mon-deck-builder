const pokemonlist = document.querySelector('#pokemon-list');
// const favoriteList = document.querySelector('#favorite-list');
document.querySelector('#searchInput').addEventListener('keyup', fuzzySearch);

if (pokemonlist){
    pokemonlist.addEventListener('click', async (e) => {
        if (!e.target.matches('a')) {
          return;
        }
        const favorite = e.target;
        const data = {
          pokemonId: favorite.dataset.id,
          pokemonName: favorite.dataset.name
        };
        console.log(data);
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
          console.log(favorite)

          if (favorite.dataset.favorited === 'false') {
            favorite.style = 'color: yellow';
            favorite.dataset.favorited = 'true';
          } else {
            favorite.style = '';
            favorite.dataset.favorited = 'false';
          }
        }
      });
};

function fuzzySearch(){
    let input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toLowerCase();
    ul = document.getElementById('pokemon-list');
    li = ul.getElementsByTagName('li');

    for (i = 0; i < li.length; i++){
        a = li[i].getElementsByTagName('a')[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toLowerCase().indexOf(filter) > -1){
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}

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
//             HTML += `<li>${p.pokemonName}</li>`
//         })
//         favoriteList.innerHTML = HTML
//       }
// };
