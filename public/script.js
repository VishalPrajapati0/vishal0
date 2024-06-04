
// document.getElementById('upload-form').addEventListener('submit', async (e) => {
//     e.preventDefault();
  
//     const title = document.getElementById('title').value;
//     const url = document.getElementById('url').value;
  
//     const response = await fetch('http://localhost:3000/videos', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ title, url }),
//     });
  
//     if (response.ok) {
//       loadVideos();
//     }
//   });
  
//   async function loadVideos() {
//     const response = await fetch('http://localhost:3000/videos');
//     const videos = await response.json();
  
//     const videoContainer = document.getElementById('video-container');
//     videoContainer.innerHTML = '';
  
//     videos.forEach(video => {
//       const videoElement = document.createElement('video');
//       videoElement.src = video.url;
//       videoElement.controls = true;
  
//       const titleElement = document.createElement('h2');
//       titleElement.innerText = video.title;
  
//       videoContainer.appendChild(titleElement);
//       videoContainer.appendChild(videoElement);
//     });
//   }
  
//   loadVideos();
  

document.getElementById('upload-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;

    const response = await fetch('http://localhost:3000/videos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, url }),
    });

    if (response.ok) {
        loadVideos();
    }
});

async function loadVideos() {
    const response = await fetch('http://localhost:3000/videos');
    const videos = await response.json();

    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = '';

    videos.forEach(video => {
        const videoElement = document.createElement('video');
        videoElement.src = video.url;
        videoElement.controls = true;

        // Add click event listener to select video for Layout 1
        videoElement.addEventListener('click', () => selectLayout(video.id, 'Layout 1'));

        const titleElement = document.createElement('h2');
        titleElement.innerText = video.title;

        const videoWrapper = document.createElement('div');
        videoWrapper.appendChild(titleElement);
        videoWrapper.appendChild(videoElement);

        videoContainer.appendChild(videoWrapper);
    });

    loadSelectedLayouts();
}



let selectedVideos = {};

// Load selected videos from local storage
if (localStorage.getItem('selectedVideos')) {
    selectedVideos = JSON.parse(localStorage.getItem('selectedVideos'));
    updateSelectedVideosContainer();
}

async function selectLayout(videoId, layout) {
    // Toggle selection
    if (selectedVideos[videoId]) {
        delete selectedVideos[videoId];
    } else {
        selectedVideos[videoId] = layout;
    }

    // Update local storage
    localStorage.setItem('selectedVideos', JSON.stringify(selectedVideos));

    // Update the layout containers
    updateSelectedVideosContainer();
    loadSelectedLayouts();
}

function updateSelectedVideosContainer() {
    const selectedVideosContainer = document.getElementById('selected-videos-container');
    selectedVideosContainer.innerHTML = '';

    Object.entries(selectedVideos).forEach(([id, layout]) => {
        const videoContainer = document.createElement('div');
        videoContainer.id = `layout-${layout}-${id}`;
        selectedVideosContainer.appendChild(videoContainer);
        loadVideo(id, videoContainer);
    });
}

async function loadVideo(videoId, container) {
    const response = await fetch(`http://localhost:3000/videos/${videoId}`);
    const video = await response.json();

    const selectedVideoElement = document.createElement('video');
    selectedVideoElement.src = video.url;
    selectedVideoElement.controls = true;
    selectedVideoElement.autoplay = true; // Autoplay the video

    container.innerHTML = ''; // Clear previous video
    container.appendChild(selectedVideoElement);
}




loadVideos();

document.addEventListener('DOMContentLoaded', () => {
    // Load selected videos from local storage
    if (localStorage.getItem('selectedVideos')) {
        selectedVideos = JSON.parse(localStorage.getItem('selectedVideos'));
        updateSelectedVideosContainer();
    }

    // Add click event listener to each layout
    Object.keys(selectedVideos).forEach((videoId) => {
        const layoutId = selectedVideos[videoId];
        const layout = document.getElementById(layoutId);
        layout.addEventListener('click', () => playSelectedVideo(videoId));
    });
});

async function playSelectedVideo(videoId) {
    const container = document.getElementById('play-box-container');
    const response = await fetch(`http://localhost:3000/videos/${videoId}`);
    const video = await response.json();

    container.innerHTML = ''; // Clear previous video
    const selectedVideoElement = document.createElement('video');
    selectedVideoElement.src = video.url;
    selectedVideoElement.controls = true;
    selectedVideoElement.autoplay = true; // Autoplay the video
    container.appendChild(selectedVideoElement);
}

document.getElementById('upload-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;

    try {
        const response = await fetch('http://192.168.1.68:3000/videos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, url }),
        });

        if (response.ok) {
            // Video uploaded successfully
            console.log('Video uploaded successfully');

            // Display the uploaded video
            const videoData = await response.json();
            const videoContainer = document.getElementById('video-container');
            videoContainer.innerHTML = `
                <video width="320" height="240" controls>
                    <source src="${videoData.url}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
        } else {
            // Handle error response
            console.error('Failed to upload video');
        }
    } catch (error) {
        // Handle network or other errors
        console.error('An error occurred:', error);
    }
});


//
