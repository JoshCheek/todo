namespace('Todo.views', {
  TodosView : Backbone.View.extend({
    tagName: 'ul',
    className: 'todo-list',
    events: {
      'keyup #new-todo' : 'createOnEnter',
    },

    //initialize : function () {
    //  this.collection.bind("add", this.render, this);
    //},
    initialize : function () {
      _.bindAll(this, "addTodo");
    },

    createOnEnter : function (event) {
      if (event.keyCode === 13) {
        var inputValue = $(event.currentTarget).attr('value');
        this.collection.create({ description: inputValue });
        $('#new-todo').attr("value", '');
        $('.todo-list').append("<li>" + inputValue + "</li>");
        view = this;
      }
    },

    render : function () {
      this.collection.each(this.addTodo);
    },

    addTodo: function (todo) {
      var view = new Todo.views.TodoView({ model: todo});
      var todoEl = view.render().el;
      $(this.el).append(todoEl);
    }
  })
});
