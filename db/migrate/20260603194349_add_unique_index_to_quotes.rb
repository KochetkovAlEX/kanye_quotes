class AddUniqueIndexToQuotes < ActiveRecord::Migration[8.1]
  def change
    # Уникальность для пары user_id и quote_text
    add_index :quotes, [:user_id, :quote_text], unique: true
  end
end
