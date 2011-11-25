namespace("Todo.collections", {
 Todos : Backbone.Collection.extend({
   model: Todo.models.Todo,
   url: "tasks"
 })
});
