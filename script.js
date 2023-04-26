// const taskList = [ // task list array, all timing is in mins
//     { task: "Pomodoro 1 - Paper 1 Questions", duration: 25 },
//     { task: "Short Break", duration: 10 },
//     { task: "Pomodoro 2 - Paper 1 Questions", duration: 25 },
//     { task: "Short Break", duration: 10 },
//     { task: "Pomodoro 3 - Paper 1 Questions", duration: 25 },
//     { task: "Long Break (Lunch)", duration: 55 },
//     { task: "Pomodoro 4 - Paper 2", duration: 60 },
//     { task: "Short Break", duration: 15 },
//     { task: "Pomodoro 5 - Paper 3", duration: 60 },
//     { task: "Short Break", duration: 15 },
//     { task: "Pomodoro 6 - Paper 1 Questions", duration: 25 },
//     { task: "Short Break", duration: 10 },
//     { task: "Pomodoro 7 - Paper 1 Questions", duration: 25 },
//     { task: "Short Break", duration: 10 },
//     { task: "Pomodoro 8 - Review", duration: 25 },
//     { task: "Personal Time", duration: 25 },
//   ];
  
const taskList = [
  { task: "Pomodoro 1 - Paper 1 Questions - Focus on answering 10 paper 1 questions with no distractions", duration: 25 },
  { task: "Short Break - Take a 10-minute break to rest, stretch, or grab a snack", duration: 10 },
  { task: "Pomodoro 2 - Paper 1 Questions - Focus on answering another 10 paper 1 questions with no distractions", duration: 25 },
  { task: "Short Break - Take a 10-minute break to rest, stretch, or do something you enjoy", duration: 10 },
  { task: "Pomodoro 3 - Paper 1 Questions - Focus on answering another 10 paper 1 questions with no distractions", duration: 25 },
  { task: "Short Break - Take a 15-minute break to rest, stretch, or do something you enjoy", duration: 15 },
  { task: "Pomodoro 4 - Revision/Paper 3 Questions - Focus on answering as many questions as possible within the hour, with no distractions", duration: 60 },
  { task: "Short Break - Take a 10-minute break to rest, stretch, or do something you enjoy", duration: 10 },
  { task: "Pomodoro 5 - Revision/Paper 3 Questions - Focus on answering as many questions as possible within the 30 minutes, with no distractions", duration: 30 },
  { task: "Personal Time - Use this time to watch a show or YouTube video, relax, or do something you enjoy", duration: 30 },
];

  //index 1
  let taskIndex = 0;
  let startTime;
  let timerId;

  //shows element
  function displayTask(task) {
    const taskElem = document.getElementById("task");
    taskElem.textContent = task.task;
  }
  
  //calculates duration
  function getDuration(task) {
    return task.duration * 60;
  }
  
  //starts timer + necessary filler to make it look like a timer
  function startTimer(duration, timerElem) {
    startTime = Date.now();
    clearInterval(timerId);
    timerId = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      const remainingSeconds = duration - elapsedSeconds;
      const minutes = Math.floor(remainingSeconds / 60);
      const seconds = remainingSeconds % 60;
      const timeString =
        minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
      timerElem.textContent = timeString;
      if (remainingSeconds <= 0) {
        clearInterval(timerId);
        displayNextTask();
      }
    }, 1000);
  }
  
  //shows clock in the corner of real time
  function displayClock() {
    const clock = document.getElementById("clock");
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const amOrPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const time = hours + ":" + minutes + ":" + seconds + " " + amOrPm;
    clock.textContent = time;
  }
  
      
      //when skip pressed or time elapsed it goes to next task
      function displayNextTask() {
        playBeep()
        taskIndex++;
        if (taskIndex < taskList.length) {
          displayTask(taskList[taskIndex]);
          startTimer(getDuration(taskList[taskIndex]), document.getElementById("timer"));
        } else {
          displayTask({ task: "🎉 You're done! 🎉", duration: 0 });
          document.getElementById("timer").textContent = "00:00";
          document.body.style.backgroundColor = "#0f0";
        }
      }
      
      // called in the end, skip button, with green feedback styling
      function init() {
        playBeep()
        displayTask(taskList[0]);
        startTimer(getDuration(taskList[0]), document.getElementById("timer"));
        setInterval(displayClock, 1000);
      
        const skipBtn = document.getElementById("skip-btn");
        skipBtn.addEventListener("click", () => {
          playBeep()
          clearInterval(timerId);
          displayNextTask();
          document.body.style.backgroundColor = "#06b33a";
          setTimeout(() => {
            document.body.style.backgroundColor = "#000";
          }, 500);
        });
      }
    

    function toggleFullScreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen(); 
        }
      }
    }

    function playBeep() {
      const audio = new Audio('sound-effect.mp3');
      audio.play();
    }
    
    function reloadPage() {
      // window.location.href = window.location.href;
      window.location.href = "index.html";
    }
    
    
    function hide() {
      const about = document.getElementById("about");
      about.style.display = "none";
    }

    function loadMain() {
      window.location.href = "main.html";
    }

    function loadTips() {
      window.location.href = "tips.html";
    }
    
      init();
      