namespace('Todo.views', {
  TodoView : Backbone.View.extend({
    render : function () {
      $(this.el).html('<li>' + this.model.get("description") + '</li>');
      return this;
    }
  })
});
