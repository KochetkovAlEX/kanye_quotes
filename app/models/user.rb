class User < ApplicationRecord
    has_many :quotes, dependent: :destroy
    
end
