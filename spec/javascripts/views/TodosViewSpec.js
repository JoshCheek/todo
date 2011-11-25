describe("TodosView", function () {
  beforeEach(function () {
    var collection = new Backbone.Collection();
    this.view = new Todo.views.TodosView({collection: collection});
  });

  it("tagName is 'ul'", function () {
    expect(this.view.tagName).toEqual('ul');
  });

  it("className is 'todo-list'", function () {
    expect(this.view.className).toEqual('todo-list');
  });

  describe("events", function () {
      var expectedEvents = [
        {event: 'keyup #new-todo', value: 'createOnEnter'}
      ];

      _.each(expectedEvents, function (event) {
          it("binds " + event.value + " to " + event.event, function () {
            expect(this.view.events[event.event]).toEqual(event.value);
          });
        },
      this);

  });

  describe("createOnEnter", function () {
    beforeEach(function () {
      var collection = new Backbone.Collection();
      this.view = new Todo.views.TodosView({collection: collection});

      this.input = document.createElement('input');
      this.input.value = "foo";

      this.mockEvent = {
        keyCode : 13,
        currentTarget: this.input
      }
    });

    it("adds a model to the collection", function () {

      this.view.createOnEnter(this.mockEvent);

      expect(this.view.collection.length).toEqual(1);

    });

    it("uses the currentTarget's value", function () {
      this.input.value = "some description";

      this.view.createOnEnter(this.mockEvent);

      var model = this.view.collection.first();

      expect(model.get("description")).toEqual("some description");
    });

    it("does nothing if keycode isn't 13", function () {
      var mockEvent = {keyCode : 14};

      this.view.createOnEnter(mockEvent);

      expect(this.view.collection.length).toEqual(0);
    });

    it("clears the #new-todo field's value", function () {
      setFixtures('<input id="new-todo" value="foo" />')

      this.view.createOnEnter(this.mockEvent);

      expect($('#new-todo').attr("value")).toEqual("");
    });

    it("appends to the el", function () {
      setFixtures('<div class="todo-list"></div>');

      this.view.createOnEnter(this.mockEvent);

      expect($('.todo-list').html()).toMatch("foo");
    });
  });
});
