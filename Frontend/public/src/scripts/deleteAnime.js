async function deleteAnime(animeContainer, animeCard, animeId) {
    try {
        const deleteResponse = await fetch(`https://localhost:7024/Animes/${animeId}`, {
            method: 'DELETE',
        });

        if (!deleteResponse.ok) {
            throw new Error(`Failed to delete anime. Status: ${deleteResponse.status}, ${deleteResponse.statusText}`);
        }

        console.log(`Anime deleted successfully with ID: ${animeId}`);
        animeContainer.removeChild(animeCard);
    } catch (error) {
        console.error('Error deleting anime:', error);
    }
};