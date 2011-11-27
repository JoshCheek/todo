describe("TasksView", function () {
  beforeEach(function () {
    this.collection = new Backbone.Collection();
    this.view = new Todo.views.TasksView({collection: this.collection});
  });

  it("tagName is 'div'", function () {
    expect(this.view.tagName).toEqual('div');
  });

  it("className is 'task-list'", function () {
    expect(this.view.className).toEqual('task-list');
  });

  describe("events", function () {
    it("binds 'createOnEnter' to 'keyup #new-task'", function () {
      expect(this.view.events['keyup #new-task']).toEqual('createOnEnter');
    });

    it("adds task when adding to collection", function () {
      setFixtures('<div class="task-list"><ul class="tasks"></ul></div>')

      this.collection.add({ description: "foo"});

      expect($('.tasks').html()).toMatch("foo");
    });
  });

  describe("createOnEnter", function () {
    beforeEach(function () {
      this.createStub = sinon.stub(this.collection, "create");

      this.input = document.createElement('input');
      this.input.value = "foo";

      this.mockEvent = {
        keyCode : 13,
        currentTarget: this.input
      }
    });

    afterEach(function () {
      this.collection.create.restore();
    });

    it("creates a model in the collection", function () {
      this.view.createOnEnter(this.mockEvent);

      expect(this.createStub).toHaveBeenCalledWith({ description: "foo"});
    });

    it("clears the #new-task field's value", function () {
      setFixtures('<input id="new-task" value="foo" />')

      this.view.createOnEnter(this.mockEvent);

      expect($('#new-task').attr("value")).toEqual("");
    });

    it("does nothing if keycode isn't 13", function () {
      var mockEvent = {keyCode : 14};

      this.view.createOnEnter(mockEvent);

      expect(this.createStub).not.toHaveBeenCalled();
    });
  });

  describe("render", function () {
    beforeEach(function() {
      setFixtures('<div class="task-list"><ul class="tasks"></ul></div>')
      this.taskView = new Backbone.View();
      this.taskView.render = function() {
        this.el = document.createElement('li');
        return this;
      };
      this.taskRenderSpy = sinon.spy(this.taskView, "render");
      this.taskViewStub = sinon.stub(Todo.views, "TaskView")
        .returns(this.taskView);
      this.task1 = new Backbone.Model({id:1});
      this.task2 = new Backbone.Model({id:2});
      this.view.collection = new Backbone.Collection([
        this.task1,
        this.task2,
      ]);
      this.view.render();
    });

    afterEach(function() {
      Todo.views.TaskView.restore();
    });

    it("should create a Task view for each task item", function() {
      expect(this.taskViewStub)
        .toHaveBeenCalledTwice();
      expect(this.taskViewStub)
        .toHaveBeenCalledWith({model:this.task1});
      expect(this.taskViewStub)
        .toHaveBeenCalledWith({model:this.task2});
    });

    it("should render each Task view", function() {
      expect(this.taskView.render).toHaveBeenCalledTwice();
    });

    it("appends the task to the task list", function() {
      expect($('.tasks').children().length).toEqual(2);
    });
  });
});
