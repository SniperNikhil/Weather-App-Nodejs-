function clearCookie(cookieName) {
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function getLocationAndStore() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            document.cookie = "latitude=" + latitude;
            document.cookie = "longitude=" + longitude;
            console.log("Latitude: " + latitude + ", Longitude: " + longitude);
            // After getting location, convert timestamps
            convert();
        }, function(error) {
            console.log("Error getting geolocation:", error);
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

// Call getLocationAndStore when the window loads
window.onload = function() {
    clearCookie('latitude');
    clearCookie('longitude');
    getLocationAndStore();
};

function convert() {
    // Get the timestamp value from the label
    const timestamp = document.getElementById('time').textContent;
    const timestamp1 = document.getElementById('sunrise').textContent;
    const timestamp2 = document.getElementById('sunset').textContent;

    // Convert the timestamp to a human-readable time
    const formattedTime = formatTime(timestamp);
    const formattedTime1 = formatTime(timestamp1);
    const formattedTime2 = formatTime(timestamp2);

    // Update the content of the label with the formatted time
    document.getElementById('time').textContent = formattedTime;
    document.getElementById('sunrise').textContent = formattedTime1;
    document.getElementById('sunset').textContent = formattedTime2;
}

// Function to format timestamp to human-readable time
function formatTime(timestamp) {
    const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
    const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    return date.toLocaleTimeString('en-US', options);
}
