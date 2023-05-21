document.addEventListener("DOMContentLoaded", function() {
    // Get the video element
    const video = document.querySelector('#webcam');

    if (navigator.mediaDevices.getUserMedia) {
        // Define constraints for video
        const constraints = { video: true };

        // Get media with the video constraints
        navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            // Set video source to the stream from the webcam
            video.srcObject = stream;
        })
        .catch((err) => {
            console.log(`Error: ${err}`);
        });
    }
});
