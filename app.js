const hamburger = document.getElementById('hamburger');
const sidePanel = document.getElementById('side-panel');
const closeBtn = document.getElementById('close-btn');

hamburger.addEventListener('click', function() {
  sidePanel.classList.toggle('open');
});

closeBtn.addEventListener('click', function() {
  sidePanel.classList.remove('open');
});