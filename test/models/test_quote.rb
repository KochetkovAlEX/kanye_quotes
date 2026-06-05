require "test_helper"

class QuoteTest < ActiveSupport::TestCase
  def setup
    @user = User.create(name: "user", password: "password", password_confirmation: "password")
    @quote = @user.quotes.build(quote_text: "Quote text")
  end

  test "quote must be valid" do
    assert @quote.valid?
  end

  test "quote must belong to user" do
    assert_respond_to @quote, :user
    @quote.user = nil
    assert_not @quote.valid?
  end

  test "quote text must be unique within one user" do
    @quote.save
    duplicate = @user.quotes.build(quote_text: "Quote text")
    assert_not duplicate.valid?
  end
end
