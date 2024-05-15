document.addEventListener('DOMContentLoaded', () => {
    const favoriteButtons = document.querySelectorAll('.favorite-button');
  
    favoriteButtons.forEach(button => {
      button.addEventListener('click', handleFavoriteClick);
    });
  });
  
  function handleFavoriteClick(event) {
    event.preventDefault();
    const pokemonName = event.target.dataset.name;
    const isFavoritesPage = window.location.pathname === '/favorite';
  
    if (isFavoritesPage) {
      removeFromFavorites(pokemonName);
    } else {
      addToFavorites(pokemonName);
    }
  }


//needs to write to .json file instead of local storage
  function getFavoritesFromStorage() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  }
//needs to write to .json file instead of local storage
  function saveFavoritesToStorage(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
  
  function addToFavorites(pokemonName) {
    const favorites = getFavoritesFromStorage();
    if (!favorites.includes(pokemonName)) {
      favorites.push(pokemonName);
      saveFavoritesToStorage(favorites);
      alert(`${pokemonName} added to favorites!`);
    } else {
      alert(`${pokemonName} is already in favorites!`);
    }
  }
  
  function removeFromFavorites(pokemonName) {
    const favorites = getFavoritesFromStorage();
    if (favorites.includes(pokemonName)) {
      favorites = favorites.filter(name => name!== pokemonName);
      saveFavoritesToStorage(favorites);
      alert(`${pokemonName} removed from favorites!`);
      window.location.reload();
    } else {
      alert(`${pokemonName} is not in favorites!`);
    }
  }


