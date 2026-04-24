const API_KEY = 'bdb84ea176f341e6884d077c534a35f0';

const params = new URLSearchParams(window.location.search);
const receptId = params.get('id');

const detaljDiv = document.getElementById('recept-detalj');

fetch('https://api.spoonacular.com/recipes/' + receptId + '/information?apiKey=' + API_KEY)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    visaDetalj(data);
  })
  .catch(function() {
    detaljDiv.innerHTML = '<p>Något gick fel. Försök igen!</p>';
  });

function visaDetalj(recept) {
  let ingredienser = '';
  recept.extendedIngredients.forEach(function(ing) {
    ingredienser += '<li>' + ing.original + '</li>';
  });

  const instruktioner = recept.instructions
    ? recept.instructions.replace(/<[^>]*>/g, '')
    : 'Inga instruktioner tillgängliga.';

  detaljDiv.innerHTML =
    '<img src="' + recept.image + '" alt="' + recept.title + '">' +
    '<h1>' + recept.title + '</h1>' +
    '<p>⏱ Tid: ' + recept.readyInMinutes + ' minuter</p>' +
    '<p>🍽 Portioner: ' + recept.servings + '</p>' +
    '<h2>Ingredienser</h2>' +
    '<ul>' + ingredienser + '</ul>' +
    '<h2>Instruktioner</h2>' +
    '<p>' + instruktioner + '</p>';
}