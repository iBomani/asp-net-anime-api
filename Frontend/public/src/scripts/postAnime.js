
document.getElementById('anime-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const useImage = document.getElementById('default-checkbox').checked;
    const formData = new FormData();
    formData.append('title', document.getElementById('anime-title').value);
    formData.append('episodes', document.getElementById('anime-episodes').value);
    formData.append('status', document.getElementById('anime-status').value);
    formData.append('rating', document.getElementById('anime-rating').value);

    if (useImage) {
        const imageFile = document.getElementById('anime-image').files[0];
        if (imageFile) {
            formData.append('imagePath', imageFile);
        } 

        await fetch('https://localhost:7024/Animes/upload', {
            method: 'POST',
            body: formData
        });
    } else {
        await fetch('https://localhost:7024/Animes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: formData.get('title'),
                episodes: formData.get('episodes'),
                status: formData.get('status'),
                rating: formData.get('rating')
            })
        });
    }

    document.getElementById('anime-form').reset();
    window.location.reload();
});