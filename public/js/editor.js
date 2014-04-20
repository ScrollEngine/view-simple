var Editor = function(scroll) {
  this.scroll = scroll;

  // set up the ace editor
  ace.config.set("basePath", "/js/lib/ace");
  this.editor = ace.edit('raw');
  this.editor.setTheme("ace/theme/dreamweaver");
  this.editor.getSession().setMode("ace/mode/markdown");
  this.editor.getSession().setUseWrapMode(true);
  this.editor.setShowPrintMargin(false);
  this.editor.renderer.setShowGutter(false);

  // keep track of the toolbar buttons
  this.btnSave = $('.toolbar #save');
  this.btnDelete = $('.toolbar #delete');

  // keep track of a few elements
  this.title = $('[name=title]');
  this.preview = $('#preview');

  // bind some events
  this.editor.getSession().on('change', $.proxy(this.refresh, this));
  this.btnSave.click($.proxy(this.save, this));
  this.btnDelete.click($.proxy(this.delete, this));
};

Editor.prototype.refresh = function() {
  this.preview.html(marked(this.editor.getValue()));
  this.btnSave.removeClass('good').addClass('warning');
};

Editor.prototype.save = function(evt) {
  var options = {
    url: '/scroll',
    type: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: {
      title: this.title.val(),
      body: this.editor.getValue()
    },
    success: $.proxy(this.saved, this),
    error: $.proxy(function(xhr, errorType, error) {
      this.error(this.btnSave, error);
    }, this)
  };

  if(this.scroll.hasOwnProperty('id')) {
    options.type = 'PUT';
    options.url += '/' + this.scroll.id;
  } else {
    options.data.type = this.scroll.type;
    options.data.slug = this.scroll.slug;
  }

  options.data = JSON.stringify(options.data);

  $.ajax(options);

  evt.preventDefault();
  return false;
};

Editor.prototype.delete = function(evt) {
  if(!this.scroll.hasOwnProperty('id')) {
    return;
  }

  $.ajax({
    url: '/scroll/' + this.scroll.id,
    type: 'DELETE',
    contentType: false,
    dataType: 'json',
    success: $.proxy(this.deleted, this),
    error: $.proxy(function(xhr, errorType, error) {
      this.error(this.btnDelete, error);
    }, this)
  });

  evt.preventDefault();
  return false;
};

Editor.prototype.saved = function(res) {
  this.btnSave.removeClass('warning').addClass('good');
};

Editor.prototype.deleted = function(res) {
  window.location.replace('/');
};

Editor.prototype.error = function(button, error) {
  button.removeClass().addClass('bad');
  console.log(error);
};
