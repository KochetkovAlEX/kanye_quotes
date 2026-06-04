class QuotesController < ApplicationController
  before_action :require_login

  def index
    # Инкапсулируем логику: берем цитаты текущего пользователя
    # Для начала можно написать просто Quote.all, если юзеров еще нет
    @quotes = Quote.all 
  end
end