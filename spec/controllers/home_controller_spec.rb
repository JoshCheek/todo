require 'spec_helper'

describe HomeController do
  context "index" do
    it "assigns tasks" do
      Task.should_receive(:all)

      get :index

      assigns(:tasks)
    end

    it "renders index" do
      get :index

      response.should render_template(:index)
    end
  end
end
