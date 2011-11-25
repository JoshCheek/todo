require 'spec_helper'

describe TasksController do
  context "index" do
    it "responds to index" do
      Rails.logger.info("in index")
      get :index

      response.status.should == 200
    end

    it "retrieves all tasks" do
      Task.should_receive(:all)

      get :index

      assigns(:tasks)
    end
  end

  context "create" do
    it "creates a task" do
      attributes = {"description" => "some description"}
      Task.should_receive(:create).with({"description" => "some description"})

      post :create, :task => {"description" => "some description"}

    end
  end

  context "destroy" do
    it "destroys a task" do
      task = mock(Task, :id => 1)

      Task.should_receive(:find).with("1").and_return(task)
      task.should_receive(:destroy)

      delete :destroy, :id => "1"
    end
  end
end
