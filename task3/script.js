/* -------------------------------------- */
/* IMAGE CAROUSEL */
/* -------------------------------------- */

let index = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(i) {
  slides.forEach(s => s.classList.remove("active"));
  dots.forEach(d => d.classList.remove("active"));

  slides[i].classList.add("active");
  dots[i].classList.add("active");
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
}

document.querySelector(".next").addEventListener("click", nextSlide);
document.querySelector(".prev").addEventListener("click", prevSlide);

// Dot navigation
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    index = i;
    showSlide(i);
  });
});

// Auto slide every 3 seconds
setInterval(nextSlide, 3000);


/* -------------------------------------- */
/* WEATHER API */
/* -------------------------------------- */

const apiURL = "https://api.weatherapi.com/v1/current.json?key=9b3b7ab77f1c4e0f94e153526242601&q=";

const btn = document.getElementById("searchBtn");
const result = document.getElementById("result");

btn.addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();

  if (!city) {
    result.innerHTML = "<p>Please enter a city name!</p>";
    return;
  }

  fetch(apiURL + city)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        result.innerHTML = `<p style='color:red;'>City not found!</p>`;
        return;
      }

      result.innerHTML = `
        <h3>${data.location.name}</h3>
        <p>Temperature: ${data.current.temp_c}°C</p>
        <p>Condition: ${data.current.condition.text}</p>
        <img src="${data.current.condition.icon}">
      `;
    })
    .catch(() => {
      result.innerHTML = "<p>Error fetching weather data.</p>";
    });
});
