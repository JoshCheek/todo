describe("TodoView", function () {
  beforeEach(function () {
    var model = new Backbone.Model({description: "do this thing"});

    this.view = new Todo.views.TodoView({model: model});
  });

  it("tagName is 'li'", function () {
    expect(this.view.tagName).toEqual('li');
  });
  it("renders the view for a model", function () {

    var el = this.view.render().el;

    expect($(el).html()).toMatch("do this thing");
  });
});
