var song = new Audio;
var isStopped = true;
var currentSong = 0;
var playlist = ["https://www.jq22.com/newjs/bensound-summer.mp3"];
var playlistVisible = false;

function skip(to) {
    if (to == 'prev') {
        stop();
        currentSong = (--currentSong)%playlist.length;
        if (currentSong < 0) {
            currentSong += playlist.length;
        }
        playpause();
    }
    else if (to == 'next') {
        stop();
        currentSong = (++currentSong)%playlist.length;
        playpause();
    }
}

function playpause() {
    if (!song.paused) {
        song.pause();
        document.getElementById("glow").classList.add("disable-animation");
    }
    else {
        if (isStopped) {
            song.src = playlist[currentSong];
        }
        song.play();
        songFile = playlist[currentSong].split("/");
        songName = document.getElementById("songName");
        songName.innerHTML = songFile[songFile.length - 1];
        document.getElementById("glow").classList.remove("disable-animation");
        isStopped = false;
    }
}

function stop() {
    song.pause();
    document.getElementById("glow").classList.add("disable-animation");
    song.currentTime = 0;
    document.getElementById("seek").value = 0;
    isStopped = true;
    document.getElementById("songName").innerHTML = "Coding and Stuff";
}

function setPos(pos) {
    song.currentTime = pos;
}

function mute() {
    if (song.muted) {
        song.muted = false;
        document.getElementById('mute').className = "fa fa-volume-up";
    }
    else {
        song.muted = true;
        document.getElementById('mute').className = "fa fa-volume-off";
    }
}

function setVolume(volume) {
    song.volume = volume;
}

function togglePlaylist() {
    if (playlistVisible) {
        document.getElementById('playlist').className = "hide";
        document.getElementById('player').className = "";
        playlistVisible = false;
    }
    else {
        document.getElementById('player').className = "hide";
        document.getElementById('playlist').className = "";
        playlistVisible = true;
    }
}

function addList() {
    sourceUrl = document.getElementById('sourceUrl').value;
    sourceUrl.split(",").forEach((file) => {
        fileUrl = file.trim();
        if (fileUrl != "" && playlist.indexOf(fileUrl) == -1) {
            parent = document.getElementById('list');
            listItem = document.createElement('div');
            listItem.setAttribute('class','list-item');

            wrapper = document.createElement('div');
            wrapper.setAttribute('class','wrap-text');

            span = document.createElement('span');
            span.innerHTML = fileUrl;

            wrapper.appendChild(span);
            listItem.appendChild(wrapper);

            btn = document.createElement('button');
            btn.setAttribute('onclick','removeList(this)');
            btn.innerHTML = '×';

            listItem.appendChild(btn);
            parent.appendChild(listItem);
            playlist.push(fileUrl);
            document.getElementById('sourceUrl').value = '';
        }
    });
}

function removeList(item) {
    index = playlist.indexOf(item.parentElement.firstChild.innerText);
    if (index != -1){
        playlist.splice(index,1);
        item.parentElement.remove();
    }
}

song.addEventListener('error', function(){
    stop();
    document.getElementById("songName").innerHTML = "Error Loading Audio";
});

song.addEventListener('timeupdate', function() {
    curtime = parseInt(song.currentTime,10);
    document.getElementById('seek').max = song.duration;
    document.getElementById('seek').value = curtime;
});

song.addEventListener("ended", function() {
    song.pause();
    song.currentTime = 0;
    document.getElementById('seek').value = 0;
    if ((currentSong + 1) >= playlist.length) {
        currentSong = 0;
    }
    else {
        currentSong++;
    }
    stop();
    song.src = playlist[currentSong];
    playpause();
});

var input = document.getElementById("sourceUrl");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addList();
    }
});
