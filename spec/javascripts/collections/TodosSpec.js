describe("Todos Collection", function () {
  beforeEach(function () {
    this.todos = new Todo.collections.Todos();
  });

  it("uses the Todo model", function () {
    expect(this.todos.model).toEqual(Todo.models.Todo);
  });

  it("url is 'tasks'", function () {
   expect(this.todos.url).toEqual("tasks");
  });
});
