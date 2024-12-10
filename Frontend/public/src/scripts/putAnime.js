
async function handleAnimeFormSubmit(event) {
    event.preventDefault(); 
    console.log('PUT request received');

    const form = event.target;
    const animeId = form.dataset.id;
    const formData = new FormData(form);

    let imgPath = '';

    try {
        const response = await fetchAnimeById(animeId);
        imgPath = response.imagePath;
    } catch (error) {
        console.error(`Error fetching anime by ID (${animeId}):`, error);
        return;
    }

    try {
        const putResponse = await fetch(`https://localhost:7024/Animes/${animeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: animeId,
                title: formData.get('title'),
                episodes: formData.get('episodes'),
                status: formData.get('status'),
                rating: formData.get('rating'),
                imagePath: imgPath,
            }),
        });

        if (!putResponse.ok) {
            throw new Error(`Failed to update anime. Status: ${putResponse.status}, ${putResponse.statusText}`);
        }

        console.log(`Anime updated successfully with ID: ${animeId}`);
    } catch (error) {
        console.error('Error sending PUT request:', error);
    }

    form.reset();
    window.location.reload(); 
}

    async function fetchAnimeById(animeId) {
        const url = `https://localhost:7024/Animes/${animeId}`;
        try {
            const response = await fetch(url);
            if (response.ok) {
                return await response.json(); 
            }
            throw new Error(`Failed to fetch anime by ID (${animeId}): ${response.status} ${response.statusText}`);
        } catch (error) {
            console.error('Error fetching anime by ID:', error);
            throw error; 
        }
    }
