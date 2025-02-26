let timezone = "Asia/Kolkata"; // Default to India time (IST)
let isTimeDisplayed = false;

function setClock() {
    const now = new Date();
    const localTime = new Date(now.toLocaleString("en-US", { timeZone: timezone }));
    
    const seconds = localTime.getSeconds();
    const minutes = localTime.getMinutes();
    const hours = localTime.getHours();

    const secondDegrees = seconds * 6;
    const minuteDegrees = (minutes + seconds / 60) * 6;
    const hourDegrees = ((hours % 12) + minutes / 60) * 30;

    const secondHand = document.querySelector('.second-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const hourHand = document.querySelector('.hour-hand');

    secondHand.style.transition = 'none';
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;
    minuteHand.style.transition = 'transform 0.5s ease-out';
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
    hourHand.style.transition = 'transform 0.5s ease-out';
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;

    if (isTimeDisplayed) {
        const displayTime = document.getElementById('displayTime');
        const selectedTimezone = timezoneSelect.value;
        const timezoneDate = new Date(now.toLocaleString("en-US", { timeZone: selectedTimezone }));
        displayTime.innerText = `Current time in ${selectedTimezone.split('/')[1]}: ${timezoneDate.toLocaleTimeString()}`;
        displayTime.style.display = 'block';
    }
}

setInterval(setClock, 1000);
setClock();

const showTimeButton = document.getElementById('showTime');
const displayTime = document.getElementById('displayTime');
const timezoneSelect = document.getElementById('timezone');

timezoneSelect.value = "Asia/Kolkata";

function updateTimezone() {
    timezone = timezoneSelect.value;
    setClock();
    if (isTimeDisplayed) {
        const now = new Date();
        const timezoneDate = new Date(now.toLocaleString("en-US", { timeZone: timezone }));
        displayTime.innerText = `Current time in ${timezone.split('/')[1]}: ${timezoneDate.toLocaleTimeString()}`;
    }
}

showTimeButton.addEventListener('click', () => {
    isTimeDisplayed = !isTimeDisplayed;
    if (isTimeDisplayed) {
        setClock();
        showTimeButton.textContent = 'Hide Time';
    } else {
        displayTime.style.display = 'none';
        showTimeButton.textContent = 'Show Time';
    }
});

timezoneSelect.addEventListener('change', updateTimezone);
