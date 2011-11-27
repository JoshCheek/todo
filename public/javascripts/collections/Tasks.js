namespace("Todo.collections", {
 Tasks : Backbone.Collection.extend({
   model: Todo.models.Task,
   url: "tasks"
 })
});
