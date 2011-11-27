namespace('Todo.views', {
  TasksView : Backbone.View.extend({
    tagName: 'div',
    className: 'task-list',
    events: {
      'keyup #new-task' : 'createOnEnter',
    },

    initialize : function () {
      view = this;
      this.collection.bind("add", this.addTask, this);
      _.bindAll(this, "addTask");
    },

    createOnEnter : function (event) {
      if (this.enterKeyPressed(event.keyCode)) {
        var inputValue = $(event.currentTarget).attr('value');
        this.collection.create({ description: inputValue });
        this.clearInput();
      }
    },

    enterKeyPressed : function (keyCode) {
     return (keyCode === 13);
    },

    clearInput : function () {
      $('#new-task').attr("value", '');
    },

    render : function () {
      this.collection.each(this.addTask);
      return this;
    },

    addTask: function (task) {
      var view = new Todo.views.TaskView({ model: task});
      var taskEl = view.render().el;
      $('.tasks').prepend(taskEl);
    }
  })
});
