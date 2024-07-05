let audio = document.querySelector('.audio');
let audioCurrentTime = document.querySelector('.audio-currenttime');
let currenttimeRange = document.querySelector('.currenttime-range');
let audioDuration = document.querySelector('.audio-duration');
let artistName = document.querySelector('marquee');
let artist = document.querySelector('.artist');
let undo = document.querySelector('.undo');
let redo = document.querySelector('.redo');
let playorpause = document.querySelector('.playorpause');
let next = document.querySelector('.next');
let prev = document.querySelector('.prev');
let volumeRange = document.querySelector('.volume-range');
let volumePercent = document.querySelector('.volume-percent');
let playlist = document.querySelector('.playlist');
let bars = document.querySelector('.bars');
let audioPlayer = document.querySelector('.audio-player');
let playlistCard = document.querySelector('.playlist-card');
let bool = false;
let mouseY;
let cur = 0;

playlist.onmousedown = e => {
    bool = true;
    mouseY = e.y;
}

playlist.onmousemove = e => {
    if(!bool) return;
//	if (e.y < mouseY) {
//		cur -= 8;
//	} else if (e.y > mouseY) {
//		cur += 8;
//	}
	
	if (e.y < mouseY && cur > -1024) {
		cur -= 8;
	} else if (e.y > mouseY && cur < 0) {
		cur += 8;
	}
	
    playlistCard.style.top = cur + 'px';
	mouseY = e.y;
}

window.onmouseup = () => {
    bool = false;
}



window.onmouseup = () => {
    bool = false;
}


playlist.ontouchstart = e => {
    bool = true;
    mouseY = e.changedTouches[0].clientY;
}

playlist.ontouchmove = e => {
    if(!bool) return;
    //	if (e.changedTouches[0].clientY < mouseY) {
//		cur -= 8;
//	} else if (e.changedTouches[0].clientY > mouseY) {
//		cur += 8;
//	}
	
	if (e.changedTouches[0].clientY < mouseY && cur > -1024) {
		cur -= 8;
	} else if (e.changedTouches[0].clientY > mouseY && cur < 0) {
		cur += 8;
	}
    playlistCard.style.top = cur + 'px';
	mouseY = e.changedTouches[0].clientY;
}

window.ontouchcancel = () => {
    bool = false;
}

//function bounding() {
//    let playlist_rect = playlist. 
//}

bars.onclick = () => {
    !playlist.classList.contains('playlist-open') ?
    playlist.classList.add('playlist-open'):
    playlist.classList.remove('playlist-open');
    !audioPlayer.classList.contains('player-position') ?
    audioPlayer.classList.add('player-position'):
    audioPlayer.classList.remove('player-position');
}

let songList =  [
    {
        songname : 'Alan Walker - Faded',
        song : 'song/faded.mp3',
        artistimage : 'img/alanwalker.webp'
    },
    {
        songname : 'Dua Lipa - New Rules',
        song : 'song/newrules.mp3',
        artistimage : 'img/dualipa.webp'
    },
    {
        songname : 'Eminem - Stan',
        song : 'song/stan.mp3',
        artistimage : 'img/eminem.jpg'
    },
    {
        songname : 'Marshmello - Happier',
        song : 'song/happier.mp3',
        artistimage : 'img/marshmello.jpg'
    },
    {
        songname : 'Miyagi - Medicine',
        song : 'song/medicine.mp3',
        artistimage : 'img/miyagi.jpg'
    },
    {
        songname : 'Alan Walker - Man On The Moon',
        song : 'song/manonthemoon.mp3',
        artistimage : 'img/benjamin.jpg'
    }
];

const album = document.querySelectorAll('.album');
const playlistSongName = document.querySelectorAll('.album > h3');
//tvayin u textayini vra chdnel
songList.forEach((song,index) => {
    playlistSongName[index].innerText = song.songname;
         album[index].onclick = () => {
             loadsong(songList[index]);
             audioPlay();
         }
})

let isPlaying = false;

function audioPlay() {
    isPlaying = true;
    audio.play();
    playorpause.className = 'fa fa-pause';
}

function audioPause() {
    isPlaying = false;
    audio.pause();
    playorpause.className = 'fa fa-play';
}

function loadsong(element) {
    audio.src = element.song;
    artistName.innerText = element.songname;
    artist.style.background = `url(${element.artistimage})`; 
}

let i = 0;
loadsong(songList[i]);
playorpause.onclick = () => !isPlaying ? audioPlay() : audioPause();
undo.onclick = () => audio.currentTime-=10;
redo.onclick = () => audio.currentTime+=10;


next.onclick = () => {
    i++;
    if(i > songList.length - 1) {
        i = 0
    }
    loadsong(songList[i]);
    audioPlay();
}

prev.onclick = () => {
    i--;
    if(i < 0) i = songList.length - 1;
    loadsong(songList[i]);
    audioPlay();
}

volumeRange.oninput = () => {
    audio.volume = volumeRange.value / 100;
    volumePercent.innerText = volumeRange.value + '%';
}

currenttimeRange.oninput = () => audio.currentTime = audio.duration * currenttimeRange.value /100

audio.ontimeupdate = () => {
    if(audio.currentTime == 0) {
        audio.currentTime = 0;
    }
    else {
        currenttimeRange.value = audio.currentTime * 100 / audio.duration;
    let curMin = Math.floor(audio.currentTime / 60);
    let curSec = Math.floor(audio.currentTime - curMin * 60);
    let durMin = Math.floor(audio.duration / 60);
    let durSec = Math.floor(audio.duration - durMin * 60);
    if(curMin < 10) {
        curMin = '0' + curMin
    }
    if(curSec < 10) {
        curSec = '0' + curSec
    } 
    if(durMin < 10) {
        durMin = '0' + durMin
    } 
    if(durSec < 10) {
        durSec = '0' + durSec
    }
    if(audio.currentTime > 0.0001) {
        audioCurrentTime.innerHTML = `${curMin}:${curSec}`;
        audioDuration.innerHTML = `${durMin}:${durSec}`
    }
    }
}







