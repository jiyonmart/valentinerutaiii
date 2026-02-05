var songs = [
  { title: "Lorem ipsum dolor sit amet", src: "music/song1.mp3" },
  { title: "Second Song", src: "music/song2.mp3" },
  { title: "Third Song", src: "music/song3.mp3" }
];

var index = 0;
var audio = document.getElementById("audio");
var title = document.getElementById("title");
var progress = document.getElementById("progress");
var volume = document.getElementById("volume");
var current = document.getElementById("current");
var duration = document.getElementById("duration");
var icon = document.getElementById("icon");
var playBtn = document.querySelector(".play-btn");

volume.value = 0.5;
audio.volume = 0.5;

loadSong();

function loadSong() {
  audio.src = songs[index].src;
  title.innerText = songs[index].title;
}

function playPause() {
  if (audio.paused) {
    audio.play();
    icon.innerText = "⏸";
    playBtn.classList.add("playing");
  } else {
    audio.pause();
    icon.innerText = "▶";
    playBtn.classList.remove("playing");
  }
}

function next() {
  index++;
  if (index >= songs.length) index = 0;
  loadSong();
  audio.play();
  icon.innerText = "⏸";
  playBtn.classList.add("playing");
}

function prev() {
  index--;
  if (index < 0) index = songs.length - 1;
  loadSong();
  audio.play();
  icon.innerText = "⏸";
  playBtn.classList.add("playing");
}

audio.ontimeupdate = function () {
  progress.max = audio.duration;
  progress.value = audio.currentTime;

  current.innerText = format(audio.currentTime);
  duration.innerText = format(audio.duration);
};

progress.oninput = function () {
  audio.currentTime = progress.value;
};

volume.oninput = function () {
  audio.volume = volume.value;
};

audio.onended = function () {
  next();
};

function format(time) {
  if (isNaN(time)) return "0:00";
  var min = Math.floor(time / 60);
  var sec = Math.floor(time % 60);
  if (sec < 10) sec = "0" + sec;
  return min + ":" + sec;
}
