const typeButtons = document.querySelectorAll(".type-btn");

typeButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    typeButtons.forEach(function (b) {
      b.classList.remove("active");
    });
    btn.classList.add("active");
  });
});

const regionButtons = document.querySelectorAll(".region-btn");

regionButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    regionButtons.forEach(function (b) {
      b.classList.remove("active");
    });
    btn.classList.add("active");
  });
});

const API_KEY = "bdb84ea176f341e6884d077c534a35f0";

const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", function () {
  const ingredient = document.getElementById("ingredient-input").value;

  if (ingredient === "") {
    alert("Skriv in minst en ingrediens!");
    return;
  }

  const activeType = document.querySelector(".type-btn.active");
  const type = activeType ? activeType.textContent : "";

  let mealType = "main course";
  if (type === "Efterrätt") {
    mealType = "dessert";
  }

  const activeRegion = document.querySelector(".region-btn.active");
  const region = activeRegion ? activeRegion.textContent : "";

  let cuisine = "";
  if (region === "Europeisk") {
    cuisine = "European";
  } else if (region === "Asiatisk") {
    cuisine = "Asian";
  } else if (region === "Afrikansk") {
    cuisine = "African";
  }

  const url =
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
    API_KEY +
    "&includeIngredients=" +
    ingredient +
    "&type=" +
    mealType +
    "&cuisine=" +
    cuisine +
    "&number=10";

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      visaResultat(data.results);
    })
    .catch(function () {
      alert("Något gick fel. Försök igen!");
    });
});

function visaResultat(recipes) {
  const resultatDiv = document.getElementById("resultat");
 resultatDiv.style.display = "flex";
 resultatDiv.scrollIntoView({ behavior: 'smooth' });
  resultatDiv.innerHTML = "";

  if (recipes.length === 0) {
    resultatDiv.innerHTML =
      "<p>Inga recept hittades. Prova andra ingredienser!</p>";
    return;
  }

  recipes.forEach(function(recipe) {
  const link = document.createElement('a');
  link.href = 'detail.html?id=' + recipe.id;

  const kort = document.createElement('div');
  kort.className = 'recept-kort';

  const img = document.createElement('img');
  img.src = recipe.image;
  img.alt = recipe.title;

  const titel = document.createElement('h3');
  titel.textContent = recipe.title;

  kort.appendChild(img);
  kort.appendChild(titel);
  link.appendChild(kort);
  resultatDiv.appendChild(link);
});
}
