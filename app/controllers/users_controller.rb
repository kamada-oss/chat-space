class UsersController < ApplicationController
  def edit
  end

  def update
    if current_user.update(user_pramas)
      redirect_to root_path
    else
      render :edit
    end
  end

  def destroy
    
  end


  private
    def user_pramas
      params.require(:user).permit(:nickname, :email)
    end
end
