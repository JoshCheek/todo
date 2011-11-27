namespace('Todo.views', {
  TaskView : Backbone.View.extend({
    tagName : 'li',
    render : function () {
      $(this.el).html(this.model.get("description"));
      return this;
    }
  })
});
