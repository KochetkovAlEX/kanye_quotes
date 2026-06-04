class UsersController < ApplicationController
    def new
      @user = User.new # Переменная для формы регистрации
    end
  
    def create
      @user = User.new(user_params)
      if @user.save
        session[:user_id] = @user.id # Сразу авторизуем после регистрации
        redirect_to root_path, notice: "Аккаунт успешно создан!"
      else
        # Если регистрация не удалась, возвращаем на ту же общую страницу
        render :new, status: :unprocessable_entity
      end
    end
  
    # 3. Обработка ВХОДА (Кнопка "Войти")
    def login_process
      user = User.find_by(email: params[:email])
  
      if user && user.authenticate(params[:password])
        session[:user_id] = user.id
        redirect_to root_path, notice: "Вы успешно вошли в аккаунт!"
      else
        # Чтобы форма регистрации не упала при перезагрузке страницы с ошибкой,
        # нам нужно заново создать пустой объект @user
        @user = User.new 
        flash.now[:alert] = "Неверный email или пароль."
        render :new, status: :unprocessable_entity
      end
    end
  
    # 4. Обработка ВЫХОДА
    def logout
      session[:user_id] = nil
      redirect_to auth_path, notice: "Вы вышли из системы."
    end
  
    private
  
    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end
  end