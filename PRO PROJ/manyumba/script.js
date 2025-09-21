// ===============================
// Toggle Hamburger Menu 
// ===============================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
  });
}

// ===============================
// Search Functionality (Homepage only)
// ===============================
const searchBar = document.getElementById("searchBar");
const cards = document.querySelectorAll(".card");

if (searchBar) {
  searchBar.addEventListener("input", () => {
    const query = searchBar.value.toLowerCase();

    cards.forEach(card => {
      const location = (card.getAttribute("data-location") || "").toLowerCase();
      const price = card.getAttribute("data-price") || "";

      if (query && (location.includes(query) || price.includes(query))) {
        card.classList.add("highlight");
        card.classList.remove("dim");
      } else if (query) {
        card.classList.remove("highlight");
        card.classList.add("dim");
      } else {
        // Reset when search bar is empty
        card.classList.remove("highlight", "dim");
      }
    });
  });
}

// ===============================
// Filter Listings by Location & Price (Listings page only)
// ===============================
const locationFilter = document.getElementById("locationFilter");
const priceFilter = document.getElementById("priceFilter");

function filterListings() {
  const selectedLocation = locationFilter.value.toLowerCase();
  const selectedPrice = priceFilter.value;

  cards.forEach(card => {
    const location = (card.getAttribute("data-location") || "").toLowerCase();
    const price = parseInt(card.getAttribute("data-price"), 10);

    let locationMatch =
      selectedLocation === "all" || location === selectedLocation;

    let priceMatch = false;
    if (selectedPrice === "all") priceMatch = true;
    else if (selectedPrice === "low" && price < 1500) priceMatch = true;
    else if (selectedPrice === "mid" && price >= 1500 && price <= 1800) priceMatch = true;
    else if (selectedPrice === "high" && price > 1800) priceMatch = true;

    if (locationMatch && priceMatch) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

if (locationFilter && priceFilter) {
  locationFilter.addEventListener("change", filterListings);
  priceFilter.addEventListener("change", filterListings);
}

// ===============================
// Fake Contact Form Submission with Styled Popup
// ===============================
const contactForm = document.getElementById("contactForm");
const successPopup = document.getElementById("successPopup");

if (contactForm && successPopup) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // stop page refresh

    // Show styled popup
    successPopup.style.display = "block";

    // Clear form
    contactForm.reset();

    // Hide popup automatically after 3 seconds
    setTimeout(() => {
      successPopup.style.display = "none";
    }, 3000);
  });
}
// Handle review form submission
document.addEventListener("DOMContentLoaded", () => {
  const reviewForm = document.getElementById("reviewForm");
  const reviewsSection = document.querySelector(".reviews-section");

  if (reviewForm) {
    reviewForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const rating = parseInt(document.getElementById("rating").value);
      const comment = document.getElementById("comment").value;

      // Create review card
      const reviewCard = document.createElement("div");
      reviewCard.classList.add("review-card");

      // Name
      const reviewerName = document.createElement("h3");
      reviewerName.textContent = name;

      // Stars (using Font Awesome)
      const stars = document.createElement("p");
      stars.classList.add("stars");

      for (let i = 1; i <= 5; i++) {
        const star = document.createElement("i");
        if (i <= rating) {
          star.className = "fa-solid fa-star"; // filled star
        } else {
          star.className = "fa-regular fa-star"; // empty star
        }
        stars.appendChild(star);
      }

      // Comment
      const reviewComment = document.createElement("p");
      reviewComment.textContent = `"${comment}"`;

      // Append to card
      reviewCard.appendChild(reviewerName);
      reviewCard.appendChild(stars);
      reviewCard.appendChild(reviewComment);

      // Add new review to section
      reviewsSection.appendChild(reviewCard);

      // Reset form
      reviewForm.reset();
    });
  }
});
