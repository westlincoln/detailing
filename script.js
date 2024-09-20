const stars = document.querySelectorAll('.star');
const vehicleTypeSelect = document.getElementById('vehicle-type');
const serviceTypeSelect = document.getElementById('service-type');
const priceRangeElement = document.getElementById('price-range');

let selectedDirtiness = 1; // Default to 1 star

// Update the selected star rating
stars.forEach(star => {
    star.addEventListener('click', () => {
        stars.forEach(s => s.classList.remove('selected'));
        star.classList.add('selected');
        selectedDirtiness = parseInt(star.getAttribute('data-value'));
        updatePriceEstimate();
    });
});

// Update price estimate based on user inputs
function updatePriceEstimate() {
    const vehicleType = vehicleTypeSelect.value;
    const serviceType = serviceTypeSelect.value;

    if (!vehicleType || !serviceType) {
        priceRangeElement.textContent = "$0";
        return;
    }

    let basePriceMin = 0;
    let basePriceMax = 0;

    // Determine base price based on vehicle type and service
    if (serviceType === 'interior') {
        if (vehicleType === 'car') {
            basePriceMin = 50;
            basePriceMax = 70;
        } else if (vehicleType === 'suv' || vehicleType === 'truck') {
            basePriceMin = 70;
            basePriceMax = 90;
        }
    } else if (serviceType === 'exterior') {
        if (vehicleType === 'car') {
            basePriceMin = 30;
            basePriceMax = 50;
        } else if (vehicleType === 'suv' || vehicleType === 'truck') {
            basePriceMin = 40;
            basePriceMax = 60;
        }
    } else if (serviceType === 'both') {
        if (vehicleType === 'car') {
            basePriceMin = 70;
            basePriceMax = 90;
        } else if (vehicleType === 'suv' || vehicleType === 'truck') {
            basePriceMin = 110;
            basePriceMax = 130;
        }
    }

    // Add extra cost based on dirtiness level
    const extraCost = (selectedDirtiness - 1) * 10;
    const estimatedMin = basePriceMin + extraCost;
    const estimatedMax = basePriceMax + extraCost;

    // Update the price range display
    priceRangeElement.textContent = `$${estimatedMin} - $${estimatedMax}`;
}

// Add event listeners to dropdowns
vehicleTypeSelect.addEventListener('change', updatePriceEstimate);
serviceTypeSelect.addEventListener('change', updatePriceEstimate);


document.getElementById('book-now').addEventListener('click', () => {
    // Redirect to booking page or open a booking modal
    window.location.href = '/detailing/booking/booking.html'; // Replace with the actual booking page URL
});


document.querySelector('#reviews-box').addEventListener('click', () => {
    // Redirect to reviews page
    window.location.href = '/detailing/reviews/reviews.html'; // Replace with the actual reviews page URL
});

