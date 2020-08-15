
const app = () => {
    // Audio file
    const song = document.querySelector(".song");
    //Play button
    const play = document.querySelector(".play");
    // SVG and the cirle
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");
    // sounds
    const sounds = document.querySelectorAll(".sound-picker button");
    // time display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button')
    // get the length of the outline
    const outlineLength = outline.getTotalLength();
    // duration of music after time
    let fakeDuration = 600;

    // move progress bar
    outline.style.strokeDashoffset = outlineLength;
    outline.style.strokeDasharray = outlineLength;
    

    // change type of sound
    sounds.forEach(option => {
        option.addEventListener('click', function() {
            console.log('click')
            song.src = this.getAttribute("data-sound");
            video.src = this.getAttribute("data-video");
            checkPlaying(song);
        });
    });

    // play sound
    play.addEventListener("click", () => {
        checkPlaying(song)
    })

    // select sound for each button by looping through
    timeSelect.forEach( option => {
        option.addEventListener('click', function(){
            // update time playing
            fakeDuration = this.getAttribute('data-time');
            console.log('clicked')
            // update the text below play
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`
        })
    })



    // stop and play sounds
    const checkPlaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = "./svg/pause.svg";
        } 
        else {
            song.pause();
            video.pause();
            play.src = "./svg/play.svg";
        }
    }

    song.ontimeupdate = () => {
    //when song runs, this runs (i.e. on play click) and tracks the time.
    let currentTime = song.currentTime;
    // find elapsed by taking the full song time - minus current time
    let elapsed = fakeDuration - currentTime;
    // get the seconds and minutes for the text. Find time elapsed and stops it getting over 60
    let seconds = Math.floor(elapsed % 60);
    // get the seconds and minutes for the text. 60 divided by 60 = 1 minute. Math.floor for exact time rounded
    let minutes = Math.floor(elapsed / 60);
    //animate the circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    timeDisplay.textContent = `${minutes}:${seconds}`

    if (currentTime >= fakeDuration) {
        song.pause();
        song.currentTime = 0;
        play.src = './svg/play.svg';
        video.pause();
    }
    }
}

app();