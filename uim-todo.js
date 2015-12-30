// UI-model for a ToDo application

uim={
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
};
