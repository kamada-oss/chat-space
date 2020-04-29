class User < ApplicationRecord
  has_many :groups, through: :members
    has_many :members
  has_many :messages

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
         
  validates :nickname, presence: true
end