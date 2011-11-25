describe("TodoView", function () {
  xit("renders the view for a model", function () {
    var model = new Backbone.Model({description: "do this thing"});

    var view = new Todo.views.TodoView({model: model});

    expect(view.render()).toMatch("do this thing");
  });
});
