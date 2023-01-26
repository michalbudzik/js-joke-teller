const videoElement = document.getElementById('video');
const buttonContainerStart = document.getElementById('button-container-start');
const buttonContainerShare = document.getElementById('button-container-share');
const buttonStart = document.getElementById('button-start');
const buttonShare = document.getElementById('button-share');

// Prompt to select media stream, pass to video element, then play
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
            buttonContainerStart.hidden = false;
            buttonContainerShare.hidden = true;
        }
    } catch (error) {
        // Catch error here
        console.log('Sorry, error:', error);
    }
}

// Start screen sharing on click
buttonShare.addEventListener('click', selectMediaStream);

// Start Picture in Picture on click
buttonStart.addEventListener('click', async () => {
    // Disable button when clicked
    buttonContainerStart.hidden = true;
    // Start Picture In Picture
    if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
    } else {
        await videoElement.requestPictureInPicture();
    }
});

// Reset buttons and video when Picture In Picture is closed 
videoElement.addEventListener("leavepictureinpicture", () => {
    videoElement.pause();
    videoElement.removeAttribute('src');
    if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      }
    buttonContainerStart.hidden = true;
    buttonContainerShare.hidden = false;
});