namespace('Todo.views', {
  TodosView : Backbone.View.extend({
    tagName: 'div',
    className: 'todo-list',
    events: {
      'keyup #new-todo' : 'createOnEnter',
    },

    initialize : function () {
      view = this;
      this.collection.bind("add", this.addTodo, this);
      _.bindAll(this, "addTodo");
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
      $('#new-todo').attr("value", '');
    },

    render : function () {
      this.collection.each(this.addTodo);
      return this;
    },

    addTodo: function (todo) {
      var view = new Todo.views.TodoView({ model: todo});
      var todoEl = view.render().el;
      $('.todos').prepend(todoEl);
    }
  })
});
