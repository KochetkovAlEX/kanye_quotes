require "test_helper"

class SessionControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create(name: "user", password: "password", password_confirmation: "password")
  end

  test "login check" do
    get login_path
    assert_response :success
  end

  test "valid login creates session" do
    post login_path, params: { name: "user", password: "password" }
    assert_redirected_to root_path
    follow_redirect!
    assert_response :success
    assert_equal @user.id, session[:user_id]
  end

  test "invalid login does not create session" do
    post login_path, params: { name: "user", password: "wrong" }
    assert_response :unprocessable_entity
    assert_nil session[:user_id]
  end

  test "logout destroys session" do
    post login_path, params: { name: "user", password: "password" }
    assert_not_nil session[:user_id]
    delete logout_path
    assert_redirected_to login_path
    assert_nil session[:user_id]
  end
end
