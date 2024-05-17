const pokemonlist = document.querySelector('#pokemon-list');
pokemonlist.addEventListener('click', async (e) => {
    if (!e.target.matches('span')){
        return;
    }
    const favorite = e.target;
    const data = {
        pokemonId: favorite.dataset.id
    };
    const response = await fetch('/api/favorite', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok){
        console.log(await response.json())
        if (favorite.dataset.favorited === 'false'){
            favorite.style = 'color: yellow';
            favorite.dataset.favorited = 'true'
        } else {
            favorite.style = '';
            favorite.dataset.favorited = 'false'

        }
    }
})