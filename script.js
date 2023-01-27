const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// Toggle button's disabled state
function toggleButton() {
    button.disabled = !button.disabled;
} 

// Pass joke text to Speech API
function tellJoke(joke) {
    VoiceRSS.speech({
        key: '3c6553f5571f4145841f7e6bff75fd7b',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API
async function getJokes() {
    let joke = '';   
    const apiURL = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Call text to speech API
        tellJoke(joke);
        // Toggle button's state
        toggleButton();
    } catch (error) {
        // Catch Errors Here
        console.log('Sorry,', error);
    }
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);