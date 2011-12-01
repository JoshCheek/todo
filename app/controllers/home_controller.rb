class HomeController < ApplicationController
  def index
    @tasks = Task.all
  end
end
