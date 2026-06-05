// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

// ========== Функции для работы с цитатами ==========
function updateQuote() {
  const quoteElement = document.querySelector('.quote');
  if (!quoteElement) return;

  fetch('https://api.kanye.rest')
    .then(res => res.json())
    .then(res => {
      if (res.quote) quoteElement.textContent = res.quote;
    })
    .catch(err => console.error("Ошибка загрузки цитаты:", err));
}

// Кнопка "Ещё цитата" — только если она есть на странице
const moreQuoteBtn = document.querySelector('.header__btn');
if (moreQuoteBtn) {
  moreQuoteBtn.addEventListener('click', updateQuote);
}

// ========== Сохранение цитаты ==========
function saveQuote() {
  const quoteElement = document.querySelector('.quote');
  if (!quoteElement) return;
  
  const currentQuote = quoteElement.textContent.trim();
  if (!currentQuote) return;

  fetch('/quotes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
    },
    body: JSON.stringify({ text: currentQuote })
  })
    .then(res => res.json())
    .then(data => {
      if (data.id) {
        const li = document.createElement('li');
        li.setAttribute('data-id', data.id);
        li.innerHTML = `${currentQuote} <button class="delete-btn">Удалить</button>`;
        const quotesList = document.getElementById('quotes-list');
        if (quotesList) quotesList.appendChild(li);
      }
    })
    .catch(err => console.error("Ошибка сохранения цитаты:", err));
}

const saveBtn = document.querySelector('.save-btn');
if (saveBtn) {
  saveBtn.addEventListener('click', saveQuote);
}

// ========== Удаление цитаты ==========
const quotesList = document.getElementById('quotes-list');
if (quotesList) {
  quotesList.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
      const li = e.target.parentElement;
      const quoteId = li.getAttribute('data-id');
      if (!quoteId) return;

      fetch(`/quotes/${quoteId}`, {
        method: 'DELETE',
        headers: {
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
        }
      })
        .then(() => li.remove())
        .catch(err => console.error("Ошибка удаления:", err));
    }
  });
}

// ========== Валидация пароля на странице регистрации ==========
function setupValidation() {
  const form = document.getElementById("signup-form");
  if (!form) return;

  const pass = document.getElementById("user_password");
  const conf = document.getElementById("user_password_confirmation");
  const err = document.getElementById("password-error-message");
  if (!pass || !conf || !err) return;

  function validate() {
    if (pass.value.length > 0 && pass.value.length < 8) {
      err.textContent = "Пароль должен содержать не менее 8 символов";
    } else if (conf.value.length > 0 && pass.value !== conf.value) {
      err.textContent = "Пароли не совпадают";
    } else {
      err.textContent = "";
    }
  }

  // Убираем старые слушатели (если были), чтобы не дублировать
  pass.removeEventListener("input", validate);
  conf.removeEventListener("input", validate);
  form.removeEventListener("submit", validate);

  pass.addEventListener("input", validate);
  conf.addEventListener("input", validate);
  form.addEventListener("submit", (e) => {
    if (pass.value.length < 8 || pass.value !== conf.value) {
      e.preventDefault();
      validate();
    }
  });
}

// Запуск валидации при загрузке страницы и при переходах Turbo
document.addEventListener("turbo:load", setupValidation);
document.addEventListener("DOMContentLoaded", setupValidation);