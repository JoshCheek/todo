describe("TaskView", function () {
  beforeEach(function () {
    JST = {task: function() {}};
    var model = new Backbone.Model({description: "do this thing"});

    this.view = new Todo.views.TaskView({model: model});
  });

  it("tagName is 'li'", function () {
    expect(this.view.tagName).toEqual('li');
  });

  it("renders the template", function () {
    var templateSpy = sinon.spy(JST, "task");
    el = this.view.render();

    expect(templateSpy).toHaveBeenCalled();
  });
});
