function Stopwatch() {
  var [counter, seconds, minutes, interval] = [0, 0, 0, undefined];
  function updatetimer(elementtobeupdated) {
    counter++;
    seconds = Math.floor(counter % 60);
    minutes = Math.floor(counter / 60);
    seconds = seconds <= 9 ? "0" + seconds : seconds;
    minutes = minutes <= 9 ? "0" + minutes : minutes;
    elementtobeupdated.innerHTML = `${minutes}:${seconds}`;
  }
  return {
    starttimer: function (elementtobeupdated) {
      console.log("starttimer");
      if (interval) {
        clearInterval(interval);
        counter = 0;
      }
      interval = setInterval(() => updatetimer(elementtobeupdated), 1000);
    },
    stoptimer: function (elementtobeupdated) {
      console.log("stop timer");
      if (interval) {
        clearInterval(interval);
        counter = 0;
      }
    },
    resettimer: function (elementtobeupdated) {
      console.log("reset timer");
      this.stoptimer(elementtobeupdated);
      elementtobeupdated.innerHTML = `00:00`;
    },
  };
}
window.addEventListener("DOMContentLoaded", () => {
  const alldivs = document.getElementsByClassName("stopwatch");
  for (let i = 0; i < alldivs.length; i++) {
    const [stopbutton, startbutton, resetbutton] =
      alldivs[i].querySelectorAll("button");
    const instance = Stopwatch();
    stopbutton.disabled = true;
    resetbutton.disabled = true;
    const elementtobeupdated = alldivs[i].querySelectorAll(".timer")[0];

    startbutton.addEventListener("click", (e) => {
      console.log(elementtobeupdated);
      instance.starttimer(elementtobeupdated);
      startbutton.disabled = true;
      stopbutton.disabled = false;
      resetbutton.disabled = false;
    });
    stopbutton.addEventListener("click", (e) => {
      instance.stoptimer(elementtobeupdated);
      startbutton.disabled = false;
      stopbutton.disabled = true;
      resetbutton.disabled = false;
    });
    resetbutton.addEventListener("click", (e) => {
      instance.resettimer(elementtobeupdated);
      startbutton.disabled = false;
    });
  }
});
