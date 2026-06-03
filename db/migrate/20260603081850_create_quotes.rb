class CreateQuotes < ActiveRecord::Migration[8.1]
  def change
    create_table :quotes do |t|
      t.references :user, null: false, foreign_key: { on_delete: :cascade }
      t.text :quote_text, null: false

      t.timestamps
    end
  end
end
