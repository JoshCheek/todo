class TasksController < ApplicationController

  def index
    @tasks = Task.all
  end

  def create
    puts params["task"]
    Task.create(params["task"])
    redirect_to tasks_path
  end

  def destroy
    task = Task.find(1)
    task.destroy
    render :nothing => true
  end
end
