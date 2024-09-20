document.addEventListener("DOMContentLoaded", function () {
    // Get the close button element
    const closeBtn = document.getElementById("close-notification");

    // Add an event listener to the close button
    closeBtn.addEventListener("click", function () {
        // Hide the notification
        const notification = document.getElementById("notification");
        notification.style.display = "none";
    });

    // Add an event listener to the booking form
    document.getElementById("booking-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get form data
        const firstName = document.getElementById("first-name").value;
        const lastName = document.getElementById("last-name").value;
        const email = document.getElementById("email").value;
        const phoneNumber = document.getElementById("phoneNumber").value;
        const carBrand = document.getElementById("car-brand").value;
        const carModel = document.getElementById("car-model").value;
        const carYear = document.getElementById("car-year").value;
        const vehicleType = document.getElementById("vehicle-type").value;
        const serviceType = document.getElementById("service-type").value;

        // Get the dirtiness rating
        let dirtiness = 0;
        document.querySelectorAll("#star-rating .star").forEach((star) => {
            if (star.classList.contains("selected")) {
                dirtiness = star.getAttribute("data-value");
            }
        });

        // Construct the message to send to Discord
        const message = `**New Booking:**\n
        **Name:** ${firstName} ${lastName}\n
        **Email:** ${email}\n
        **Phone:** ${phoneNumber}\n
        **Car:** ${carBrand} ${carModel} (${carYear})\n
        **Vehicle Type:** ${vehicleType}\n
        **Service Type:** ${serviceType}\n
        **Dirtiness:** ${dirtiness} star(s)`;

        // yo homies, pwease dont spam my webhook 
        const webhookURL = "https://discord.com/api/webhooks/1286148327980666900/LGWdVFpcykWXda8YA-cQ_DmjzvLSufpxnF4679VkqIC206hg5KSn1LRxU3HeL2iBlsc0";

        // Send the data to Discord
        fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: message
            })
        })
        .then(response => {
            if (response.ok) {
                // Redirect to the confirmation page
                window.location.href = "./conformation.html"; // Replace with the actual path to your confirmation page
            } else {
                alert('Failed to send booking information.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while sending booking information.');
        });
    });
});

// Add event listeners to stars for selecting dirtiness
document.querySelectorAll("#star-rating .star").forEach((star) => {
    star.addEventListener("click", function () {
        document.querySelectorAll("#star-rating .star").forEach(s => s.classList.remove("selected"));
        this.classList.add("selected");
    });
});
