class User < ApplicationRecord
  has_many :groups, through: :members
    has_many :members
  has_many :messages

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
         
  validates :nickname, presence: true


  def self.search(input, id)
    return nil if input == ""
    User.where(['nickname LIKE ?', "%#{input}%"] ).where.not(id: id).limit(10)
  end
end
