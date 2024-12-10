// add modal
const modal = document.getElementsByClassName('modal');
const showButton = document.getElementById('show-modal-btn');
const closeButton = document.getElementById('close-modal-btn');
console.log("yo");

showButton.addEventListener('click', () => {
    Array.from(modal).forEach((modal) => {
        modal.classList.remove('hidden');
    });
});

closeButton.addEventListener('click', () => {
    Array.from(modal).forEach((modal) => {
        modal.classList.add('hidden');
    });
});

// edit modal
document.addEventListener('DOMContentLoaded', () => {
    const animeContainer = document.getElementsByClassName('anime-list-content')[0];
    const blur = document.getElementById('blur');

    animeContainer.addEventListener('click', async (event) => {
        if (event.target && event.target.id === 'show-edit-modal-btn') {
            const animeCard = event.target.closest('.anime-list-content > div');

            if (!animeCard) {
                console.error('Anime card not found');
                return;
            }

            const animeId = animeCard.dataset.id;

            try {
                const response = await fetchAnimeById(animeId);
                console.log(response);
                const editModal = document.getElementsByClassName('edit-modal')[0];
                editModal.classList.remove('hidden');
                generateEditModal(response);
                blur.classList.remove('hidden');
            } catch (error) {
                console.error('Error fetching anime by ID:', error);
            }
        }
    });

    document.addEventListener('click', (event) => {
        if (event.target && event.target.id === 'close-edit-modal-btn') {
            const editModal = document.getElementsByClassName('edit-modal');
            Array.from(editModal).forEach((modal) => {
                modal.classList.add('hidden');
            });
            blur.classList.add('hidden');
        }
    });
    
});

async function fetchAnimeById(animeId) {
    const url = `https://localhost:7024/Animes/${animeId}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            return await response.json(); 
        }
        throw new Error(`Failed to fetch anime: ${response.statusText}`);
    } catch (error) {
        console.error('Error fetching anime by ID:', error);
        throw error;
    }
}

function generateEditModal(animeData) {
    const editModal = document.getElementsByClassName('edit-modal')[0];
    console.log("teszt");
    editModal.innerHTML = `
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
          <button class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none transition bg-transparent text-black rounded-full w-8 h-8 flex items-center justify-center border border-gray-300" id="close-edit-modal-btn">✕</button>
          <h2 class="text-3xl font-semibold text-center mb-6">Edit Anime</h2>
          <form id="anime-form-put">
              <div class="space-y-4">

                  <label for="anime-title" class="block text-gray-700 font-semibold">Title</label>
                  <input type="text" id="anime-title" name="title" class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value="${animeData.title}" required>

                  <label for="anime-episodes" class="block text-gray-700 font-semibold">Episodes</label>
                  <input type="number" id="anime-episodes" name="episodes" class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value="${animeData.episodes}" required>

                  <label for="anime-status" class="block text-gray-700 font-semibold">Status</label>
                  <select id="anime-status" name="status" class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    <option value="Planned to watch" ${animeData.status === 'Planned to watch' ? 'selected' : ''}>Planned to watch</option>
                    <option value="Completed" ${animeData.status === 'Completed' ? 'selected' : ''}>Completed</option>
                    <option value="Watching" ${animeData.status === 'Watching' ? 'selected' : ''}>Watching</option>
                    <option value="On-Hold" ${animeData.status === 'On-Hold' ? 'selected' : ''}>On-Hold</option>
                    <option value="Dropped" ${animeData.status === 'Dropped' ? 'selected' : ''}>Dropped</option>
                </select>

                  <label for="anime-rating" class="block text-gray-700 font-semibold">My Rating</label>
                  <input type="number" id="anime-rating" name="rating" class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" min="1" max="10" value="${animeData.rating}" required>
                  
              </div>

              <div class="mt-6 flex justify-end space-x-4">
                  <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" id="edit-submit">
                      Edit Anime
                  </button>
              </div>
          </form>
      </div>
    `

   
    const form = document.getElementById('anime-form-put');
    form.dataset.id = animeData.id;
    form.addEventListener('submit', handleAnimeFormSubmit);
}
