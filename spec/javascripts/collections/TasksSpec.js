describe("Tasks Collection", function () {
  beforeEach(function () {
    this.tasks = new Todo.collections.Tasks();
  });

  it("uses the Task model", function () {
    expect(this.tasks.model).toEqual(Todo.models.Task);
  });

  it("url is 'tasks'", function () {
   expect(this.tasks.url).toEqual("tasks");
  });
});
