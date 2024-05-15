document.addEventListener('DOMContentLoaded', function() {
    // Fetch favorites data from the backend API
    fetchFavoritesData();

    function fetchFavoritesData() {
        fetch('/api/favorites')
            .then(response => response.json())
            .then(data => {
                // Render the favorites page with the fetched favorites data
                renderFavoritesPage(data.favorites);
            })
            .catch(error => {
                console.error('Error fetching favorites:', error);
            });
    }

    function renderFavoritesPage(favorites) {
        const favoritesContainer = document.querySelector('.favorites-container');

        // Clear existing content
        favoritesContainer.innerHTML = '';

        if (favorites.length > 0) {
            // If favorites exist, render them in a list
            const ul = document.createElement('ul');
            favorites.forEach(favorite => {
                const li = document.createElement('li');
                li.textContent = favorite;
                ul.appendChild(li);
            });
            favoritesContainer.appendChild(ul);
        } else {
            // If no favorites exist, display a message
            const p = document.createElement('p');
            p.textContent = 'No favorites added yet.';
            favoritesContainer.appendChild(p);
        }
    }

    // Add event listeners to favorite buttons
    const favoriteButtons = document.querySelectorAll('.favorite-button');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const pokemonName = event.target.dataset.name; 
            const isFavoritesPage = window.location.pathname === '/favorites';

            if (isFavoritesPage) {
                removeFromFavorites(pokemonName);
            } else {
                addToFavorites(pokemonName);
            }
        });
    });

    function addToFavorites(pokemonName) {
        fetch('/api/addFavorite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: pokemonName })
        })
        .then(response => {
            if (response.ok) {
                // Refresh favorites data and re-render page
                fetchFavoritesData();
                alert(pokemonName + ' added to favorites!');
            } else {
                alert('Failed to add ' + pokemonName + ' to favorites.');
            }
        })
        .catch(error => {
            console.error('Error adding to favorites:', error);
        });
    }

    function removeFromFavorites(pokemonName) {
        fetch('/api/removeFavorite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: pokemonName })
        })
        .then(response => {
            if (response.ok) {
                // Refresh favorites data and re-render page
                fetchFavoritesData();
                alert(pokemonName + ' removed from favorites!');
            } else {
                alert('Failed to remove ' + pokemonName + ' from favorites.');
            }
        })
        .catch(error => {
            console.error('Error removing from favorites:', error);
        });
    }
});




