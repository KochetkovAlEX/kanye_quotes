// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

function updateQuote(){
  const quoteElement = document.querySelector('.quote');

  fetch('https://api.kanye.rest')
  .then((res)=>{return res.json(res)})
  .then((res)=>{quoteElement.textContent = res.quote});
}

const button = document.querySelector('.header\_\_btn');
button.addEventListener('click', updateQuote)


// Функция для отправки цитаты на сервер
function saveQuote() {
  const currentQuote = document.querySelector('.quote').textContent.trim();

  fetch('/quotes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Rails требует CSRF-токен для безопасности, его берем из head страницы
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
    },
    body: JSON.stringify({ text: currentQuote })
  })
  .then(res => res.json())
  .then(data => {
    if (data.id) {
      // Если сохранилось в БД, добавляем в список на экране
      const li = document.createElement('li');
      li.setAttribute('data-id', data.id);
      li.innerHTML = `${currentQuote} <button class="delete-btn">Удалить</button>`;
      document.getElementById('quotes-list').appendChild(li);
    }
  });
}

document.querySelector('.save-btn').addEventListener('click', saveQuote);


document.getElementById('quotes-list').addEventListener('click', function(e) {
  if (e.target.classList.contains('delete-btn')) {
    const li = e.target.parentElement;
    const quoteId = li.getAttribute('data-id');

    fetch(`/quotes/${quoteId}`, {
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
      }
    })
    .then(() => li.remove()); // Удаляем из DOM
  }
});