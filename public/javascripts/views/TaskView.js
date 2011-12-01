namespace('Todo.views', {
  TaskView : Backbone.View.extend({
    tagName : 'li',
    render : function () {
      var html = JST['task']({description: this.model.get("description")});
      $(this.el).html(html);
      return this;
    }
  })
});
