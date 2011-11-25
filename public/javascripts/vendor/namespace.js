//  Add an object to the given namespace
//  Example
//
// namespace('Todo.views', {
//   person: function() {
//     ...
//   },
//   address: function() {
//     ...
//   }
// });

function namespace(package, obj) {
        var current = window,
            names = package.split('.'),
            name;

        while(name = names.shift()) {
                current[name] = current[name] || {};
                current = current[name];
        }

        _.extend(current, obj);
}
