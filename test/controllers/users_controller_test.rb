require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  test "must show sign up form" do
    get signup_path
    assert_response :success
  end

  test "valid sign up creates user and logs in to the system" do
    assert_difference "User.count", 1 do
      post signup_path, params: { user: { name: "newuser", password: "password", password_confirmation: "password" } }
    end
    assert_redirected_to root_path
    follow_redirect!
    assert_response :success
    assert_not_nil session[:user_id]
  end

  test "invalid sign up does not create user" do
    assert_no_difference "User.count" do
      post signup_path, params: { user: { name: "", password: "pass", password_confirmation: "pass" } }
    end
    assert_response :unprocessable_entity
    assert_nil session[:user_id]
  end
end
