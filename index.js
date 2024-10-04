let timezone = "UTC"; // Default timezone

function setClock() {
    const now = new Date();

    // Get the time based on the selected timezone
    const localTime = new Date(now.toLocaleString("en-US", { timeZone: timezone }));

    const seconds = localTime.getSeconds();
    const minutes = localTime.getMinutes();
    const hours = localTime.getHours();

    // Calculate degrees for the hands
    const secondDegrees = seconds * 6; // 6 degrees per second
    const minuteDegrees = (minutes + seconds / 60) * 6; // 6 degrees per minute
    const hourDegrees = ((hours % 12) + minutes / 60) * 30; // 30 degrees per hour

    const secondHand = document.querySelector('.second');
    const minuteHand = document.querySelector('.minute');
    const hourHand = document.querySelector('.hour');

    // Set the rotation for the hands
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

// Update the clock every second
setInterval(setClock, 1000);
setClock();

// Time display logic
const showTimeButton = document.getElementById('showTime');
const displayTime = document.getElementById('displayTime');
const timezoneSelect = document.getElementById('timezone');

// Function to update timezone and clock
function updateTimezone() {
    timezone = timezoneSelect.value; // Update timezone based on selection
    setClock(); // Set clock to reflect the selected timezone immediately
}

showTimeButton.addEventListener('click', function() {
    const selectedTimezone = timezoneSelect.value;
    const now = new Date();
    
    // Display the current time in the selected timezone
    const timezoneDate = new Date(now.toLocaleString("en-US", { timeZone: selectedTimezone }));
    displayTime.innerText = `Current time in ${selectedTimezone}: ${timezoneDate.toLocaleTimeString()}`;
    displayTime.style.display = 'block';
    updateTimezone(); // Update the timezone when button is clicked
});

// Update the timezone when the dropdown changes
timezoneSelect.addEventListener('change', updateTimezone);
