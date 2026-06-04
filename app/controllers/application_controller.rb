class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  # Changes to the importmap will invalidate the etag for HTML responses
  stale_when_importmap_changes

  def require_login
    unless current_user
      redirect_to auth_path, alert: "Сначала необходимо войти в аккаунт!"
    end
  end

  # Хелпер для поиска текущего пользователя по сессии
  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end
  
  # Делаем метод доступным во вьюхах
  helper_method :current_user
end
