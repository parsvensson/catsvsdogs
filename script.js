// Wait for the DOM content to finish loading
document.addEventListener("DOMContentLoaded", async function() {
    // Get the video element
    const video = document.querySelector('#webcam');

    // Load the model
    const model = await tf.loadLayersModel('model/model.json');

    if (navigator.mediaDevices.getUserMedia) {
        // Define constraints for video
        const constraints = { video: true };

        // Get media with the video constraints
        navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            // Set video source to the stream from the webcam
            video.srcObject = stream;

            // Wait for the video to start playing
            video.onloadedmetadata = () => {
                video.play();

                // Run inference on the video
                setInterval(async () => {
                    // Convert the video frame to a tensor                  
                    const img = tf.browser.fromPixels(video);
                    const resizedImg = img.resizeNearestNeighbor([160, 160]).toFloat();
                    const normalizedImg = resizedImg.div(tf.scalar(127.5)).sub(tf.scalar(1));
                    const batchedImg = normalizedImg.expandDims(0);

                    // Make a prediction
                    const prediction = model.predict(batchedImg);

                    // Log the prediction
                    prediction.print();
                }, 1000);
            };
        })
        .catch((err) => {
            console.log(`Error: ${err}`);
        });
    }
});
