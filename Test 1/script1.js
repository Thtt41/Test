let stopwatches = [];  // Store individual stopwatch
let stopwatchCount = 3; // Number of stopwatches you want  (Changeable number)

function createStopwatch(id) {  // Create a new stopwatch - ID separates them
    let time = 0;  // Store time in seconds
    let intervalId = null;  // Store interval ID - Let user control timers
    let isPaused = false;  // Track whether stopwatch is paused or not

    const stopwatchDiv = document.createElement('div');  // Create element to contain code
    stopwatchDiv.className = 'stopwatch';  // Set CSS class
    stopwatchDiv.innerHTML = `  
        <div id="time-${id}">00:00</div>  
        <div class="controls">  
            <button onclick="start(${id})">Start</button>  
            <button onclick="pause(${id})">${isPaused ? 'Resume' : 'Pause'}</button>  
            <button onclick="stop(${id})">Stop</button>  
        </div>  
    `;  // HTML for stopwatch, div to display time in MM:SS format, 
    document.getElementById('stopwatches').appendChild(stopwatchDiv);  // Make stopwatch visible on page

    function updateDisplay() {  // Display time
        const minutes = Math.floor(time / 60);  
        const seconds = time % 60;  
        document.getElementById(`time-${id}`).innerText =   // Update value
            String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');  // Format value
    }  

    function start() {  
        if (!intervalId && !isPaused) {  
            intervalId = setInterval(() => {  
                time++;  // Start time is isn't paused
                updateDisplay();  // Refresh display
            }, 1000);  // Seconds counter
        }  
    }  

    function pause() {  
        if (intervalId) {  
            clearInterval(intervalId);  
            intervalId = null;  
            isPaused = true; // Set paused state  
        } else {  
            isPaused = false; // Reset paused state  
            start(); // Resume the timer  
        }  
        updatePauseButtonText();  
    }  

    function stop() {  
        if (intervalId) {  
            clearInterval(intervalId);  
            intervalId = null;  // Clear interval id
        }
        time = 0;  // Reset time to 00:00
        isPaused = false;  // Reset paused
        updateDisplay();  // Refresh display
        updatePauseButtonText();  // Refresh button
    }  

    function updatePauseButtonText() {  
        const pauseButton = stopwatchDiv.querySelector('.controls button:nth-child(2)');  
        pauseButton.innerText = isPaused ? 'Resume' : 'Pause';  // Update button text depends on state
    }  

    return { start, pause, stop };  // Gives each stopwatch its own buttons
}  

function stop(id) {
    stopwatches[id].stop(); // Call stop
}


for (let i = 0; i < stopwatchCount; i++) {  
    stopwatches.push(createStopwatch(i));  // Create custom amount of stopwatch using above code
}  

function start(id) {  
    stopwatches[id].start();  // Call start
}  

function pause(id) {  
    stopwatches[id].pause();  // Call pause - resume
}  

function stopAll() {  
    stopwatches.forEach(stopwatch => stopwatch.stop());  // Call stop on all stopwatches array
}