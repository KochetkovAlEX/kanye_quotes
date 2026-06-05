require "test_helper"

class QuotesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create(name: "user", password: "password", password_confirmation: "password")
    @quote = @user.quotes.create(quote_text: "Existing quote")
  end


  test "should redirect index when not logged in" do
    get root_path
    assert_redirected_to login_path
  end

  test "shows quotes if logged in" do
    post login_path, params: { name: "user", password: "password" }
    get root_path
    assert_response :success
    assert_match "Existing quote", response.body
  end

  test "login is needed to create a quote" do
    assert_no_difference "Quote.count" do
      post quotes_path, params: { quote: { quote_text: "New quote" } }
    end
    assert_redirected_to login_path
  end

  test "login is needed to delete quote" do
    assert_no_difference "Quote.count" do
      delete quote_path(@quote)
    end
    assert_redirected_to login_path
  end

  test "deleting quote" do
    post login_path, params: { name: "user", password: "password" }
    assert_difference "Quote.count", -1 do
      delete quote_path(@quote)
    end
    assert_response :no_content
  end

  test "can not delete other quote" do
    other_user = User.create(name: "other", password: "password", password_confirmation: "password")
    other_quote = other_user.quotes.create(quote_text: "Other quote")
    post login_path, params: { name: "user", password: "password" }
    assert_no_difference "Quote.count" do
      delete quote_path(other_quote)
    end
    # current_user.quotes.find won't find other quote
    assert_response :not_found
  end
end
