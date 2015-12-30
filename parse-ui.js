/*! ***************************************************************************
 *
 * Parse-UI
 *
 * Model-driven UI for Parse.com.
 *
 * https://github.com/evoluteur/Parse-UI
 * Copyright (c) 2015, Olivier Giulieri
 *
 *************************************************************************** */

// replace the place holders below with your Parse.com Spplication ID and Javascript Key
Parse.initialize("APPLICATION_ID", "JAVASCRIPT_KEY");

var curObject,
    curObjectList,
    objectClass = Parse.Object.extend(uim.id);

function htmlInput(id, type){
  return '<input id="'+id+'" type="'+type+'" class="form-control">';
}

function htmlField(f){
  if(f.type==='boolean'){
    return '<input id="'+f.id+'" type="checkbox">';
  }else if(f.type==='text' && f.height>1){
    return '<textarea id="'+f.id+'" rows="'+f.height+'" class="form-control"></textarea>';
  }else if(f.type==='list'){
    return '<select id="'+f.id+'" class="form-control"><option/>'+
    f.list.map(function(i){
      return '<option value="'+i.id+'">'+i.text+'</option>';
    }).join('')+'</select>';
  }
  return htmlInput(f.id, f.type);
}

function listLookups(){
  uim.fields.forEach(function(f){
    if(f.type==='list'){
      f.hList={};
      f.list.forEach(function(i){
        f.hList[i.id]=i.text;
      });
    }
  });
}

function viewList(){
  var query = new Parse.Query(objectClass);
  clean();
  showLoading(true);
  query.find({
    success: function(results) {
      curObjectList = results;
      var h;
      if(results.length){
        var columns=uim.fields.filter(function(f){
          return f.inList;
        });
        if(columns.length<1){
          columns=uim.fields;
        }
        h='<table class="table"><tr>';
        columns.forEach(function(f){
          h+='<th>'+f.label+'</th>';
        });
        h+='</tr>';
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          h+='<tr>';
          columns.forEach(function(f, idx){
            var v=object.get(f.id);
            if(f.type==='date' && v){
              v=v.toISOString();
              v=v.substring(5, 7)+'/'+v.substring(8, 10)+'/'+v.substring(0, 4);
            }else if(f.type==='boolean'){
              v=v?'<i class="glyphicon glyphicon-ok"></i>':'';
            }else if(f.type==='list'){
              if(v){
                v=f.hList[v];
              }
            }else{
              v=v?v:'';
            }
            if(idx>0){
              h+='<td>'+v+'</td>';
            }else{
              h+='<td><a href="javascript:showItem(\''+object.id+'\')">'+v+'</a></td>';
            }
          });
          h+='</tr>';
        }
        h+='</table>';
      }else{
        h='';
        showMsg('info', 'No '+uim.plural+' found.');
      }
      $('#m-delete').hide();
      $('#evol').html(h);
      showLoading(false);
    },
    error: showError
  });
}

function viewEdit(){
  clean();
  cId=null;
  var h='<table class="edit-form">';
  uim.fields.forEach(function(f){
    h+='<tr><th class="col1">'+f.label+'</th><td class="col2">'+htmlField(f)+'</td></tr>';
  });
  h+='<tr><td></td><td><button class="btn btn-primary">Save</button><button class="btn btn-secondary">Cancel</button></td></tr>';
  h+='</table>';
  $('#evol').html(h);
}

function showItem(id){
  showLoading(true);
  $('#m-delete').show();
  viewEdit();
  var query = new Parse.Query(objectClass);
  query.get(id, {
    success: function(d) {
      curObject=d;
      setData(d);
      $('#m-delete').show();
      showLoading(false);
    },
    error: showError
  });
}

function saveItem(){
  if(!curObject){ // insert
    curObject = new objectClass();
    curObject.save(getData(), {
      success: function(d) {
        curObject=d;
        showMsg('success', 'New '+uim.singular+' was saved.');
        $('#m-delete').show();
      },
      error: showError
    });
  }else{ // update
    curObject.set(getData()).save({
      success: function(d){
        curObject=d;
        showMsg('success', capitalize(uim.singular)+' was updated.');
      },
      error: showError
    });
  }
}

function deleteItem(){
  curObject.destroy({
    success: function(d){
      viewList();
      showMsg('success', capitalize(uim.singular)+' was deleted.');
    },
    error: showError
  });
}

function getFields(){
  return $('.edit-form .form-control, .edit-form input').toArray();
}

function getData(){
  var d={};
  getFields().forEach(function(e){
    var v=e.value;
    if(e.type==='date'){
      d[e.id]=v?new Date(v):null;
    }else if(e.type==='checkbox'){
      d[e.id]=e.checked?true:false;
    }else{
      d[e.id]=v;
    }
  });
  return d;
}

function setData(od){
  getFields().forEach(function(e){
    var v=od.get(e.id);
    if(e.type==='date'){
      e.valueAsDate=v;
    }else if(e.type==='checkbox'){
      e.checked=v;
    }else{
      e.value=v?v:'';
    }
  });
}

function showMsg(type, msg){
  if(type && msg){
    $('#msg').attr('class', 'alert alert-'+type).html(msg).fadeIn();
  }else{
    $('#msg').hide();
  }
}

function showError(m, error) {
  showLoading(false);
  showMsg('error', 'Error: ' + error.code + ' ' + error.message);
}

function clean(){
  showMsg();
  curObject=null;
}

function capitalize(word){
    if(word && word.length>0){
        return word.substring(0, 1).toUpperCase() + word.substring(1);
    }
    return '';
}

function showLoading(visible){
  $('.hourglass')[visible?'show':'hide']();
}

$( document ).ready(function() {
  $('#evol')
    .on('click', '.btn-primary', saveItem)
    .on('click', '.btn-secondary', viewList);
  $('.toolbar')
    .on('click', '#m-list', viewList)
    .on('click', '#m-new', viewEdit)
    .on('click', '#m-delete', deleteItem);

  listLookups();
  viewList();
});
