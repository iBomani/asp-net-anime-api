document.addEventListener('DOMContentLoaded', () => {

    const animeContainer = document.getElementsByClassName('anime-list-content')[0];

    fetch("https://localhost:7024/Animes")
    .then(response => response.json())
    .then(animes => {
        animes.forEach(anime => {
            console.log(anime);

            const animeCard = document.createElement('div');
            animeCard.classList.add('bg-white', 'rounded-xl', 'shadow-lg', 'overflow-hidden', 'transform', 'hover:scale-105', 'transition', 'm-4');
            animeCard.dataset.id = anime.id;

            image = getImage(anime);

            animeCard.innerHTML = `
                <img src="${image}" alt="Anime Poster" class="w-full h-48 object-cover">
                <div class="p-4">
                <h2 class="text-xl font-semibold text-gray-800">${anime.title}</h2>
                <p class="text-gray-600 text-sm">Status: ${anime.status}</p>
                <div class="mt-4 flex justify-between items-center">
                    <span class="text-teal-500 font-bold">Episodes: ${anime.episodes}</span>
                    <button class="text-indigo-500 hover:text-indigo-700" id="show-edit-modal-btn">Edit</button>
                </div>
                </div>
            `

            animeContainer.appendChild(animeCard);

        });
    })
    .catch(error => console.error('Error fetching animes:', error));
});

function getImage(anime) {
    if (anime.imagePath) {
        return `https://localhost:7024/Animes/image/${anime.imagePath}`;
    } else {
        return 'https://via.placeholder.com/300x400';
    }
}
