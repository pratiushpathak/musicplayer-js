const musicContainer=document.getElementById('music-container');
const playBtn=document.getElementById('play');
const prevBtn=document.getElementById('prev');
const nextBtn=document.getElementById('next');

const audio=document.getElementById('audio');
const progress=document.getElementById('progress');
const progresContainer=document.getElementById('progress-container');
const title=document.getElementById('title');
const cover=document.getElementById('cover');
//song titles
const songs=['1','2','3']

//keep track of song
let songIndex=1;

//initially load song details into dom
loadsong(songs[songIndex]);

//update song details
function loadsong(song)
{
  title.innerText=song;
  audio.src=`music/${song}.mp3`;
  cover.src=`images/${song}.jpg`
}
//play song
function playSong()
{
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play()
}
//pause song

function pauseSong()
{
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause()
}
//previous song
function prevSong()
{
  songIndex--;
  if(songIndex<0)
  {
    songIndex=songs.length-1;

  }
  loadsong(songs[songIndex]);
  playSong();
}


//next song
function nextSong()
{
  songIndex++;
  if(songIndex>songs.length-1)
  {
    songIndex=0;

  }
  loadsong(songs[songIndex]);
  playSong();
}

//update progress bar
function updateProgress(e)
{
  const {duration,currentTime}=e.srcElement;
  const progressPercent=(currentTime /duration)*100;
  // console.log(duration,currentTime);
  // console.log(progressPercent);
  progress.style.width=`${progressPercent}%`
}
// set progress bar
function setProgress(e)
{
  const width=this.clientWidth;
  // 
  const clickX=e.offsetX;
  const duration=audio.duration;
  audio.currentTime=(clickX/width)*duration;
}


//event listeners
playBtn.addEventListener('click',()=>{
  const isPlaying=musicContainer.classList.contains('play');
  if(isPlaying)
  {
    pauseSong()
  }
  else
  {
    playSong()
  }

})
//change song

prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);

//time /song update
audio.addEventListener('timeupdate',updateProgress)

//click on progress bar
progresContainer.addEventListener('click',setProgress);

//song ends 
audio.addEventListener('ended',nextSong);