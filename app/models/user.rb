class User < ApplicationRecord
  has_many :quotes, dependent: :destroy
  has_secure_password
  validates :name, presence: true, uniqueness: true
  validates :password, length: { minimum: 8 }, allow_nil: true
end
