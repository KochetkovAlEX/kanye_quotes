class Quote < ApplicationRecord
  belongs_to :user

  validates :quote_text, uniqueness: {
    scope: :user_id,
    message: "вы уже сохраняли эту фразу ранее"
  }
end
