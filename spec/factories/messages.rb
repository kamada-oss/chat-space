FactoryBot.define do

  factory :message do
    text              {Faker::Lorem.sentence}
    image             {Rack::Test::UploadedFile.new(File.join(Rails.root, "/public/images/test_image.jpg"))}
    user
    group
  end

end