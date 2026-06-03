class Quote < ApplicationRecord
  belongs_to :user

  validates :text_quote, uniqueness: {
    scope: :user_id,
    message: "вы уже сохраняли эту фразу ранее"
  }
end
