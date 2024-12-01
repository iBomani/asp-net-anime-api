document.getElementById('anime-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', document.getElementById('anime-title').value);
    formData.append('episodes', document.getElementById('anime-episodes').value);
    formData.append('status', document.getElementById('anime-status').value);
    formData.append('rating', document.getElementById('anime-rating').value);
    
    const imageFile = document.getElementById('anime-image').files[0];
    if (imageFile) {
        formData.append('imageFile', imageFile);
    }

    const response = await fetch('https://localhost:7024/Animes/upload', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        alert('Anime added successfully!');
        document.getElementById('anime-form').reset();
    } else {
        alert('Failed to add anime');
    }

});