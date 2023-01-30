const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: 'a174b03e199a4e2fb9d14edb7aa6032b',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke Api
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
        joke = `${data.setup} ... ${data.delivery}`;    
    } else {
        joke = data.joke;
    }
    // Text-to-Speech
    tellMe(joke);
    // Disable Button
    toggleButton();
    } catch (err) {
        // Catch Errors Here
        console.log('Whoops', err)
    }
} 

// Event Listeners 
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);

