document.addEventListener('DOMContentLoaded', () => {
    fetchAnimes();
    const animeContainer = document.getElementsByClassName('anime-list-content')[0];
    const searchInput = document.getElementById('search-input');

    searchInput.addEventListener('input', () => {
        const searchValue = searchInput.value.toLowerCase();
        fetchAnimes(searchValue);
    });


    function fetchAnimes(searchValue = '') {
        const url = searchValue ? `https://localhost:7024/Animes?search=${encodeURIComponent(searchValue)}` : 'https://localhost:7024/Animes';

        fetch(url)
        .then(response => response.json())
        .then(animes => {
            animeContainer.innerHTML = '';
            animes.forEach(anime => {
                displayAnime(anime);
            })
        })
        .catch(error => console.error('Error fetching animes:', error));
    }
    function displayAnime(anime) {
            const animeCard = document.createElement('div');
            animeCard.classList.add('bg-white', 'rounded-xl', 'shadow-lg', 'overflow-hidden', 'transform', 'hover:scale-105', 'transition', 'm-4');
            animeCard.dataset.id = anime.id;

            image = getImage(anime);

            animeCard.innerHTML = `
                <img src="${image}" alt="Anime Poster" class="w-full h-48 object-cover">
                <div class="p-4">
                <h2 class="text-xl font-semibold text-gray-800">${anime.title}</h2>
                <p class="text-gray-600 text-sm">Status: ${anime.status}</p>
                <p class="text-gray-600 text-sm">${"⭐".repeat(anime.rating)} - 10/${anime.rating}</p>
                <div class="mt-4 flex justify-between items-center">
                    <span class="text-teal-500 font-bold">Episodes: ${anime.episodes}</span>
                    <div class="flex space-x-4">
                        <button class="text-indigo-500 hover:text-indigo-700 text-2xl" id="show-edit-modal-btn">
                            <i class="fa fa-pencil" style="pointer-events: none;"></i>
                        </button>
                        <button class="text-red-500 hover:text-red-700 text-2xl" id="delete-anime-btn">
                            <i class="fa fa-trash" style="pointer-events: none;"></i>
                        </button>
                       
                    </div>
                </div>
                </div>
                
                `
                animeContainer.appendChild(animeCard);
                const deleteButton = animeCard.querySelector('#delete-anime-btn');
                deleteButton.addEventListener('click', () => deleteAnime(animeContainer, animeCard, anime.id));

        };
});

function getImage(anime) {
    if (anime.imagePath) {
        return `https://localhost:7024/Animes/image/${anime.imagePath}`;
    } else {
        return 'https://via.placeholder.com/300x400';
    }
}
