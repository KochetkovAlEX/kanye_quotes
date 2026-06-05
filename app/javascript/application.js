// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

function updateQuote(){
  const quoteElement = document.querySelector('.quote');

  fetch('https://api.kanye.rest')
  .then((res)=>{return res.json(res)})
  .then((res)=>{
    if (res.quote) {
      quoteElement.textContent = res.quote;
      localStorage.setItem('lastQuote', res.quote); // Сохраняем новую цитату в localStorage (при обновлении страницы)
    }
  });
}

// Восстановление последней цитаты 
function restoreQuote() {
  const quoteEl = document.querySelector('.quote');
  if (!quoteEl) return;
  const saved = localStorage.getItem('lastQuote');
  if (saved) quoteEl.textContent = saved;
}

document.addEventListener('DOMContentLoaded', restoreQuote);
document.addEventListener('turbo:load', restoreQuote);

const button = document.querySelector('.header\_\_btn');
button.addEventListener('click', updateQuote)


// Функция для отправки цитаты на сервер
function saveQuote() {
  const currentQuote = document.querySelector('.quote').textContent.trim();

  // Проверка: есть ли уже такая цитата в списке сохранённых
  const quotesList = document.getElementById('quotes-list');
  if (quotesList) {
    const existingItems = Array.from(quotesList.querySelectorAll('li'));
    const alreadySaved = existingItems.some(li => li.firstChild.textContent.trim() === currentQuote);
    if (alreadySaved) {
      showMessage('Эта цитата уже сохранена', true);
      return;
    }
  }

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
      showMessage('Цитата сохранена', false);
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

// Валидация пароля при регистрации
function validatePassword() {
  const form = document.getElementById('signup-form');
  if (!form) return;

  const password = document.getElementById('user_password');
  const confirm = document.getElementById('user_password_confirmation');
  const errorDiv = document.getElementById('password-error-message');
  if (!password || !confirm || !errorDiv) return;

  function check() {
    if (password.value.length > 0 && password.value.length < 8) {
      errorDiv.textContent = 'Пароль должен быть не менее 8 символов';
    } else if (confirm.value.length > 0 && password.value !== confirm.value) {
      errorDiv.textContent = 'Пароли не совпадают';
    } else {
      errorDiv.textContent = '';
    }
  }

  password.addEventListener('input', check);
  confirm.addEventListener('input', check);
  form.addEventListener('submit', (e) => {
    if (password.value.length < 8 || password.value !== confirm.value) {
      e.preventDefault();
      check();
    }
  });
}

document.addEventListener('DOMContentLoaded', validatePassword);
document.addEventListener('turbo:load', validatePassword);


function showMessage(text, isError = true) {
  const notif = document.getElementById('notification');
  if (!notif) return;
  notif.textContent = text;
  notif.style.backgroundColor = isError ? '#d9534f' : '#5cb85c';
  notif.style.opacity = '1';
  setTimeout(() => {
    notif.style.opacity = '0';
  }, 2000);
}

function loadSavedQuotes() {
  const quotesList = document.getElementById('quotes-list');
  if (!quotesList) return;

  fetch('/quotes', {
    headers: { 'Accept': 'application/json' }
  })
  .then(res => res.json())
  .then(quotes => {
    quotesList.innerHTML = ''; // очищаем
    quotes.forEach(quote => {
      const li = document.createElement('li');
      li.setAttribute('data-id', quote.id);
      li.innerHTML = `${quote.text} <button class="delete-btn">Удалить</button>`;
      quotesList.appendChild(li);
    });
  })
  .catch(err => console.error("Ошибка загрузки списка:", err));
}

// Вызываем при загрузке страницы и при переходах Turbo
document.addEventListener('DOMContentLoaded', loadSavedQuotes);
document.addEventListener('turbo:load', loadSavedQuotes);