async function loadQuotes() {
  const response = await fetch("../quotes.json");
  const data = await response.json();
  return data.quotes;
}

// shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

loadQuotes().then(quotes => {
  const quoteContainer = document.getElementById('quoteContainer');
  const slider = document.getElementById('quote-slider');
  // shuffle before display
  const shuffled = shuffle(quotes);
  // create quote cards
  shuffled.forEach((q, i) => {
    const card = document.createElement('div');
    card.classList.add('quote-card');
    if (i === 0) {
      card.classList.add('active');
    }
    card.innerHTML = `<p>${q.text}</p>`;
    quoteContainer.appendChild(card);
  });

  // quote slider
  const cards = document.querySelectorAll('.quote-card');
  let index = 0;

  function showQuote(i) {
    cards.forEach(card => card.classList.remove('active'));
    cards[i].classList.add('active');
  }

  function nextQuote() {
    index = (index + 1) % cards.length;
    showQuote(index);
  }

  function prevQuote() {
    index = (index - 1 + cards.length) % cards.length;
    showQuote(index);
  }

  // quote slider buttons
  document.getElementById('nextQuote').addEventListener('click', () => {
    nextQuote();
    resetTimer();
  });
  
  document.getElementById('prevQuote').addEventListener('click', () => {
    prevQuote();
    resetTimer();
  });

  let autoSlide = setInterval(nextQuote, 30000); // 30 second auto slide

  function resetTimer() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextQuote, 30000);
  }

  showQuote(0);
});