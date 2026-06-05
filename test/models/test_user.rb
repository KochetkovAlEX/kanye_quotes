require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(name: "user", password: "password", password_confirmation: "password")
  end

  test "user must be valid" do
    assert @user.valid?
  end

  test "name must exist" do
    @user.name = "   "
    assert_not @user.valid?
  end

  test "name must be unique" do
    duplicate_user = @user.dup
    @user.save
    assert_not duplicate_user.valid?
  end

  test "password must exist" do
    @user.password = @user.password_confirmation = " " * 6
    assert_not @user.valid?
  end

  test "password must has at least 6 characters" do
    @user.password = @user.password_confirmation = "a" * 5
    assert_not @user.valid?
  end

  test "has_secure_password works correct" do
    @user.save
    assert_not_nil @user.password_digest
    assert @user.authenticate("password")
    assert_not @user.authenticate("wrong")
  end

  test "user has many quotes" do
    assert_respond_to @user, :quotes
  end
end
