# Parse-UI

Parse-UI is a simple model-driven UI for Parse.com. With it you can build CRUD apps for Parse.com without code.


## ToDo App

1- Download or fork the Parse-UI project on GitHub.
2- Change the Parse.com application key (at the beginning of "parse-ui.js").
3- Load the index.html page in your browser.


## Addressbook App

1- In index.html, change the script file "uim-todo.js" to "uim-contacts.js".
2- Refresh the page in your browser.


## Any other App

Because the UI is defined outside of the code, changing the model changes the app. That's the beauty of MDA (model driven architecture).
Make a new ui-model and you will get the app you need without changing any code in the app.


## UI-models

The UI-model for a ToDo App looks like the following:

```javascript
{
  id: 'todo',
  title: 'To Do',
  singular: 'task',
  plural: 'tasks',
  fields:[
    {
      id: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      inList: true
    },
    {
      id: 'duedate', 
      type: 'date', 
      label: 'Due Date', 
      inList: true
    },
    {
      id: 'complete', 
      type: 'boolean', 
      label: 'Complete', 
      inList: true
    },
    {
      id: 'category', 
      type: 'list', 
      label: 'Category',
      list: [
          {id: 'work', text: 'Work'},
          {id: 'fun', text: 'Fun'},
          {id: 'misc', text: 'Misc.'},
          {id: 'others', text: 'Others'}
      ], 
      inList: true
    },
    {
      id: 'description', 
      type: 'text', 
      label: 'Description', 
      height: 5
    }
  ]
}
```

For each field, the attributes are:
* id: name of the object column as specified in Parse.com.
* label: name of the field as displayed in the UI.
* type: field type, possible values are: 'text', 'boolean', 'date', 'list'.
* required: specifies if the field value is required.
* inList: specifies if the field is shown as a colum in the list view.
* list: for fields of type 'list', used to specify the values possible values. It's an array of tuples {id, text}.


## Dependencies

Parse-UI uses jQuery and Bootstrap.


## License

Copyright (c) 2016 Olivier Giulieri.

Parse-UI is released under the [MIT License](https://opensource.org/licenses/MIT).

