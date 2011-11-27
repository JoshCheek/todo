describe("TodosView", function () {
  beforeEach(function () {
    this.collection = new Backbone.Collection();
    this.view = new Todo.views.TodosView({collection: this.collection});
  });

  it("tagName is 'div'", function () {
    expect(this.view.tagName).toEqual('div');
  });

  it("className is 'todo-list'", function () {
    expect(this.view.className).toEqual('todo-list');
  });

  describe("events", function () {
    it("binds 'createOnEnter' to 'keyup #new-todo'", function () {
      expect(this.view.events['keyup #new-todo']).toEqual('createOnEnter');
    });

    it("adds todo when adding to collection", function () {
      setFixtures('<div class="todo-list"><ul class="todos"></ul></div>')

      this.collection.add({ description: "foo"});

      expect($('.todos').html()).toMatch("foo");
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

    it("clears the #new-todo field's value", function () {
      setFixtures('<input id="new-todo" value="foo" />')

      this.view.createOnEnter(this.mockEvent);

      expect($('#new-todo').attr("value")).toEqual("");
    });

    //it("appends to the el", function () {
    //  setFixtures('<div class="todo-list"></div>');

    //  this.view.createOnEnter(this.mockEvent);

    //  expect($('.todo-list').html()).toMatch("foo");
    //});

    it("does nothing if keycode isn't 13", function () {
      var mockEvent = {keyCode : 14};

      this.view.createOnEnter(mockEvent);

      expect(this.createStub).not.toHaveBeenCalled();
    });
  });

  describe("render", function () {
    beforeEach(function() {
      setFixtures('<div class="todo-list"><ul class="todos"></ul></div>')
      this.todoView = new Backbone.View();
      this.todoView.render = function() {
        this.el = document.createElement('li');
        return this;
      };
      this.todoRenderSpy = sinon.spy(this.todoView, "render");
      this.todoViewStub = sinon.stub(Todo.views, "TodoView")
        .returns(this.todoView);
      this.todo1 = new Backbone.Model({id:1});
      this.todo2 = new Backbone.Model({id:2});
      this.view.collection = new Backbone.Collection([
        this.todo1,
        this.todo2,
      ]);
      this.view.render();
    });

    afterEach(function() {
      Todo.views.TodoView.restore();
    });

    it("should create a Todo view for each todo item", function() {
      expect(this.todoViewStub)
        .toHaveBeenCalledTwice();
      expect(this.todoViewStub)
        .toHaveBeenCalledWith({model:this.todo1});
      expect(this.todoViewStub)
        .toHaveBeenCalledWith({model:this.todo2});
    });

    it("should render each Todo view", function() {
      expect(this.todoView.render).toHaveBeenCalledTwice();
    });

    it("appends the todo to the todo list", function() {
      expect($('.todos').children().length).toEqual(2);
    });
  });
});
