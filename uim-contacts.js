// UI-model for an Addressbook application

var uim = {
  id: 'contact',
  title: 'Addressbook',
  singular: 'contact',
  plural: 'contacts',
  fields:[
    {
      id: 'lastname', 
      type: 'lastname', 
      label: 'Lastname', 
      required: true,
      inList: true
    },
    {
      id: 'firstname',
      label: 'Firstname',
      type: 'text',
      inList: true
    },
    {
      id: 'title', 
      type: 'text', 
      label: 'Job Title', 
      inList: true
    },
    {
      id: 'company', 
      type: 'text', 
      label: 'Company', 
      inList: true
    },
    {
      id: 'type', 
      type: 'list', 
      label: 'Type',
      list: [
          {id: 'cfriend', text: 'Close Friend'},
          {id: 'friend', text: 'Friend'},
          {id: 'acq', text: 'Acquaintance'},
          {id: 'class', text: 'Classmate'},
          {id: 'work', text: 'Collegue'},
          {id: 'bus', text: 'Business Contact'},
          {id: 'others', text: 'Others'}
      ], 
      inList: true
    },
    {
      id: 'phone', 
      type: 'text', 
      label: 'Phone'
    },
    {
      id: 'email', 
      type: 'text', 
      label: 'email'
    },
    {
      id: 'notes', 
      type: 'text', 
      label: 'Notes', 
      height: 5
    }
  ]
};
