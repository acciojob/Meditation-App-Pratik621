const app = document.getElementById("app");
const song = document.querySelector(".song");
const playBtn = document.querySelector(".play");
const video = document.querySelector("video");
const timeDisplay = document.querySelector(".time-display");
const soundPicker = document.querySelectorAll(".sound-picker button");
const timeSelect = document.querySelectorAll("#time-select button");

let fakeDuration = 600; // default 10 mins

// Play / Pause
playBtn.addEventListener("click", () => {
    if (song.paused) {
        song.play();
        video.play();
        playBtn.textContent = "⏸";
    } else {
        song.pause();
        video.pause();
        playBtn.textContent = "▶";
    }
});

// Change sounds and videos
soundPicker.forEach(button => {
    button.addEventListener("click", function () {
        song.src = this.getAttribute("data-sound");
        video.src = this.getAttribute("data-video");
        song.play();
        video.play();
        playBtn.textContent = "⏸";
    });
});

// Time selection
timeSelect.forEach(button => {
    button.addEventListener("click", function () {
        fakeDuration = this.getAttribute("data-time");
        timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${fakeDuration % 60}`;
    });
});

// Countdown
song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let remaining = fakeDuration - currentTime;

    let minutes = Math.floor(remaining / 60);
    let seconds = Math.floor(remaining % 60);

    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= fakeDuration) {
        song.pause();
        video.pause();
        song.currentTime = 0;
        playBtn.textContent = "▶";
    }
};
