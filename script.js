// Stopwatch variables
let startTime = 0;
let currentTime = 0;
let timerId = null;
let isRunning = false;

// Get DOM elements
const timeDisplay = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapList = document.getElementById('laps');

// Convert milliseconds to readable time format (HH:MM:SS.CC)
function formatTime(milliseconds) {
    const centiseconds = Math.floor((milliseconds % 1000) / 10);
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    
    // Add leading zeros for single digits
    const pad = (num) => num < 10 ? '0' + num : num;
    
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`;
}

// Update the display with current time
function updateTimeDisplay() {
    timeDisplay.textContent = formatTime(currentTime);
}

// Start the stopwatch
function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - currentTime; // Account for paused time
        
        timerId = setInterval(() => {
            currentTime = Date.now() - startTime;
            updateTimeDisplay();
        }, 10); // Update every 10ms for smooth display
    }
}

// Pause the stopwatch
function pauseStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerId);
    }
}

// Reset everything to initial state
function resetStopwatch() {
    isRunning = false;
    clearInterval(timerId);
    currentTime = 0;
    updateTimeDisplay();
    
    // Clear lap times
    lapList.innerHTML = '';
}

// Record a lap time
function recordLap() {
    if (isRunning) {
        const lapItem = document.createElement('li');
        lapItem.textContent = formatTime(currentTime);
        lapList.appendChild(lapItem);
    }
}

// Add event listeners
startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);

// Initialize display
updateTimeDisplay(); 


