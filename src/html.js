(function(FileBrowser, win, doc){

  FileBrowser.Html = function(browser){
    this.browser = browser;
  };
  FileBrowser.Html.prototype = {
    createBrowser: function(){
      var
        options = this.browser.options,
        container = utils.createElement([
          'div', { classname: options.container_class }
        ], FileBrowser.Html.browser),
        elements = {
          container: container,
          drag_handle: container.querySelector('.fb-header'),
          grd_preview: container.querySelector('#fb-thumb'),
          folder_tree: container.querySelector('#fb-tree'),
          folder_tree_root: container.querySelector('#fb-tree-folder-root'),
          folder_root_desc: container.querySelector('#folder-root-desc'),
          upload_input: container.querySelector('#upload-input'),
          btn_upload_choose: container.querySelector('#btn-upload-choose'),
          btn_new_folder: container.querySelector('#btn-new-folder'),
          btn_del_folder: container.querySelector('#btn-del-folder'),
          btn_del_file: container.querySelector('#btn-del-file'),
          btn_upload_file: container.querySelector('#btn-upload-send'),
          btn_editor: container.querySelector('#btn-editor'),
          images_list: container.querySelector('#upload-thumb'),
          grd_msg: container.querySelector('.fb-message'),
          grd_drag: container.querySelector('.fb-header'),
          grd_resize: container.querySelector('.fb-footer'),
          desc_btn_del_file: container.querySelector('#btn-del-file span'),
          desc_btn_editor: container.querySelector('#btn-editor span'),
          btn_close_grd: container.querySelector('.fb-header button')
        }
      ;
      //add elements to FileBrowser.elements
      for(var el in elements){
        FileBrowser.elements[el] = elements[el];
      }
      container.style.zIndex = this.browser.maxZIndex + 10;
      container.style.display = 'none';
      doc.body.appendChild(container);
      return container;
    },
    createAlert: function(){
      var
        options = this.browser.options,
        overlay = doc.createElement('div'),
        container = utils.createElement([
          'div', { classname: options.alert_container_class }
        ], FileBrowser.Html.alert),
        elements = {
          alert_overlay: overlay,
          alert_container: container,
          alert_title: container.querySelector('.fb-title'),
          alert_text: container.querySelector('.fb-text'),
          alert_input: container.querySelector('input[type="text"]'),
          alert_icon_error: container.querySelector('.fb-icon.fb-error'),
          alert_icon_warning: container.querySelector('.fb-icon.fb-warning'),
          alert_icon_info: container.querySelector('.fb-icon.fb-info'),
          alert_icon_success: container.querySelector('.fb-icon.fb-success'),
          alert_elem_error: container.querySelector('.fb-error-container'),
          alert_error_text: container.querySelector('.fb-error-text'),
          alert_ok: container.querySelector('button.ok'),
          alert_cancel: container.querySelector('button.cancel')
        }
      ;
      //add elements to FileBrowser.elements
      for(var el in elements){
        FileBrowser.elements[el] = elements[el];
      }
      
      overlay.className = options.alert_overlay_class;
      overlay.style.zIndex = this.browser.maxZIndex + 11;
      container.style.zIndex = this.browser.maxZIndex + 12;
      container.style.display = 'none';
      doc.body.appendChild(overlay);
      doc.body.appendChild(container);
      
      return container;
    }
  };
  
  FileBrowser.Html.browser = [
    '<div class="fb-header unselectable">',
      '<span>Gerenciador de Imagens</span>',
      '<button>&times;</button>',
    '</div>',
    '<h5 class="fb-message"></h5>',
    '<div class="fb-toolbar">',
      '<div class="fb-toolbar-items">',
        '<button id="btn-upload-choose" class="button-filebrowser">',
          '<i class="brankic-attachment"></i>',
          '<span>Escolha</span>',
        '</button>',
        '<button class="button-filebrowser hidden" id="btn-upload-send">',
          '<i class="brankic-upload"></i>',
          '<span>Envie</span>',
        '</button>',
        '<button class="button-filebrowser hidden" id="btn-del-file">',
          '<i class="brankic-trashcan"></i>',
          '<span>Remover Arquivo</span>',
        '</button>',
        '<button class="button-filebrowser" id="btn-new-folder">',
          '<i class="icomoon-folder-plus"></i>',
          '<span>Nova Pasta</span>',
        '</button>',
        '<button class="button-filebrowser" id="btn-del-folder" ',
          'style="display:none">',
          '<i class="icomoon-folder-minus"></i>',
          '<span>Remover Pasta</span>',
        '</button>',
        '<button class="button-filebrowser hidden" id="btn-editor">',
          '<i class="brankic-edit"></i>',
          '<span>Enviar para o Editor</span>',
        '</button>',
      '</div>',
    '</div>',
    '<div class="fb-body clearfix">',
      '<div class="fb-tree-container">',
        '<ol id="fb-tree">',
          '<li id="fb-tree-folder-root" class="active open">',
            '<a>',
              '<i class="icomoon-folder"></i>',
              '<span id="folder-root-desc">Pasta Principal</span>',
            '</a>',
          '</li>',
        '</ol>',
      '</div>',
      '<div id="" class="fb-thumb-container">',
        '<ul id="fb-thumb" class="fb-thumb"></ul>',
        //<!-- "js-fileapi-wrapper" -- required class -->
        '<div class="js-fileapi-wrapper">',
          '<input id="upload-input" class="input-file" name="files" ',
            'type="file" multiple />',
        '</div>',
        '<ul id="upload-thumb" class="fb-upload-thumb" ',
          'data-label="Prévia do Envio"></ul>',
      '</div>',
    '</div>',
    '<div class="fb-footer">',
      '<span></span><span></span>',
    '</div>'
  ].join('');
  FileBrowser.Html.alert = [
    '<div class="fb-icon fb-error" style="display:none;">',
      '<span class="fb-x-mark">',
      '<span class="fb-line fb-left"></span>',
      '<span class="fb-line fb-right"></span>',
      '</span>',
    '</div>',
    '<div class="fb-icon fb-warning" style="display:none;">',
      '<span class="fb-body"></span>',
      '<span class="fb-dot"></span>',
    '</div>',
    '<div class="fb-icon fb-info" style="display:none;"></div>',
    '<h2 class="fb-title"></h2>',
    '<div class="fb-text"></div>',
    '<fieldset><input type="text" style="display:none;"></fieldset>',
    '<div class="fb-error-container">',
      '<div class="icon">!</div>',
      '<div class="fb-error-text"></div>',
    '</div>',
    '<div class="fb-button-container">',
      '<button class="button-filebrowser cancel">Cancelar</button>',
      '<button class="button-filebrowser ok">OK</button>',
    '</div>'
  ].join('');
})(FileBrowser, win, doc);
