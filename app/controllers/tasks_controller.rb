class TasksController < ApplicationController

  def index
    @tasks = Task.all
  end

  def create
    task = Task.create(:description => params["description"])
    render :json => task
  end

  def destroy
    task = Task.find(params[:id])
    task.destroy
    render :nothing => true
  end
end
