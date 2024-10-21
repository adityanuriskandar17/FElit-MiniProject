Rails.application.routes.draw do
  root to: 'login#index' 
  get '/insurance_products', to: 'insurance_products#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
