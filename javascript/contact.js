const form = document.getElementById('contact-form');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('form-name').value;

  form.innerHTML = '<p>Tack ' + name + '! Vi återkommer så snart som möjligt 😊</p>';
});
