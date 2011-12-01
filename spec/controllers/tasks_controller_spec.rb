require 'spec_helper'

describe TasksController do
  context "index" do
    it "returns all tasks" do
      get :index

      response.status.should == 200
    end

    it "retrieves all tasks" do
      tasks = [Task.new("description" => "foo"), Task.new("description" => "bar")]
      Task.should_receive(:all).and_return(tasks)

      get :index

      response.body.should == tasks.to_json
    end
  end

  context "create" do
    before :each do
      @attributes = {:description => "some description"}
      @task = Task.new(@attributes)
    end

    it "creates a task" do
      Task.should_receive(:create).with(@attributes)

      post :create, "description" => "some description"
    end

    it "sends json response" do
      Task.should_receive(:create).with(@attributes).and_return(@task)

      post :create, "description" => "some description"

      response.body.should == @task.to_json
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
