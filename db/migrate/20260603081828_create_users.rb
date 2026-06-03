class CreateUsers < ActiveRecord::Migration[8.1]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :password, null: false
      t.datetime :last_login

      t.timestamps
    end
  end
end
