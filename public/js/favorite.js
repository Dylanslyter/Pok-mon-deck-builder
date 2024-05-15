document.addEventListener('DOMContentLoaded', function() {
    const favoriteButtons = document.querySelectorAll('.favorite-button');

    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const pokemonName = event.target.dataset.name; 
            const isFavoritesPage = window.location.pathname === '/favorite';

            if (isFavoritesPage) {
                removeFromFavorites(pokemonName);
            } else {
                addToFavorites(pokemonName);
            }
        });
    });
    function addToFavorites(pokemonName) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (!favorites.includes(pokemonName)) {
            favorites.push(pokemonName);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            alert(pokemonName + ' added to favorites!');
        } else {
            alert(pokemonName + ' is already in favorites!');
        }
    }
    function removeFromFavorites(pokemonName) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (favorites.includes(pokemonName)) {
            favorites = favorites.filter(name => name !== pokemonName);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            alert(pokemonName + ' removed from favorites!');
            window.location.reload();
        } else {
            alert(pokemonName + ' is not in favorites!');
        }
    }
});


