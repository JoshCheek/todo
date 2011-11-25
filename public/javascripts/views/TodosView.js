namespace('Todo.views', {
  TodosView : Backbone.View.extend({
    tagName: 'ul',
    className: 'todo-list',
    events: {
      'keyup #new-todo' : 'createOnEnter'
    },

    createOnEnter : function (event) {
      if (event.keyCode === 13) {
        var inputValue = $(event.currentTarget).attr('value');
        this.collection.add({ description: inputValue });
        $('#new-todo').attr("value", '');
        $('.todo-list').append("<li>" + inputValue + "</li>");
      }
    }
  })
});
