class SessionsController < ApplicationController
    def new
    end

    def create
      user = User.find_by(name: params[:name])

      # метод authenticate сверяет хэш пароля (работает благодаря bcrypt в модели)
      if user && user.authenticate(params[:password])
        session[:user_id] = user.id # Записываем ID пользователя в куки браузера
        redirect_to root_path, notice: "Вы успешно вошли в систему!"
      else
        # Если данные неверны, показываем форму входа заново
        flash.now[:alert] = "Неверное имя или пароль."
        render :new, status: :unprocessable_entity
      end
    end

    def logout
      session[:user_id] = nil # Очищаем куки
      redirect_to login_path, notice: "Вы вышли из аккаунта."
    end
end
