/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/ajax.js":
/*!******************************!*\
  !*** ./resources/js/ajax.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

document.addEventListener('DOMContentLoaded', function () {
  $(document).on('click', '.create-modal', function () {
    $('#create').modal('show');
    $('.form-horizontal').show();
    $('.modal-title').text('Crear nuevo Post');
  });
  $("#add").click(function () {
    $.ajax({
      type: 'POST',
      url: 'addPost',
      data: {
        '_token': $('input[name=_token]').val(),
        'title': $('input[name=title]').val(),
        'body': $('input[name=body]').val()
      },
      success: function success(data) {
        if (data.errors) {
          $('.error').removeClass('hidden');
          $('.error').text(data.errors.title);
          $('.error').text(data.errors.body);
        } else {
          $('.error').remove();
          $('#table').append("<tr class='post" + data.id + "'>" + "<td>" + data.id + "</td>" + "<td>" + data.title + "</td>" + "<td>" + data.body + "</td>" + "<td>" + data.created_at + "</td>" + "<td><button class='show-modal btn btn-info btn-sm' data-id='" + data.id + "' data-title='" + data.title + "' data-body='" + data.body + "'><span class='fa fa-eye'></span></button> <button class='edit-modal btn btn-warning btn-sm' data-id='" + data.id + "' data-title='" + data.title + "' data-body='" + data.body + "'><span class='glyphicon glyphicon-pencil'></span></button> <button class='delete-modal btn btn-danger btn-sm' data-id='" + data.id + "' data-title='" + data.title + "' data-body='" + data.body + "'><span class='glyphicon glyphicon-trash'></span></button></td>" + "</tr>");
        }
      }
    });
    $('#title').val('');
    $('#body').val('');
  }); // Función con formulario para editar

  $(document).on('click', '.edit-modal', function () {
    $('#footer_action_button').text(" Editar Post");
    $('#footer_action_button').addClass('glyphicon-check');
    $('#footer_action_button').removeClass('glyphicon-trash');
    $('.actionBtn').addClass('btn-success');
    $('.actionBtn').removeClass('btn-danger');
    $('.actionBtn').addClass('edit');
    $('.modal-title').text('Editar!');
    $('.deleteContent').hide();
    $('.form-horizontal').show();
    $('#fid').val($(this).data('id'));
    $('#t').val($(this).data('title'));
    $('#b').val($(this).data('body'));
    $('#myModal').modal('show');
  });
  $('.modal-footer').on('click', '.edit', function () {
    $.ajax({
      type: 'POST',
      url: 'editPost',
      data: {
        '_token': $('input[name=_token]').val(),
        'id': $("#fid").val(),
        'title': $('#t').val(),
        'body': $('#b').val()
      },
      success: function success(data) {
        $('.post' + data.id).replaceWith(" " + "<tr class='post" + data.id + "'>" + "<td>" + data.id + "</td>" + "<td>" + data.title + "</td>" + "<td>" + data.body + "</td>" + "<td>" + data.created_at + "</td>" + "<td><button class='show-modal btn btn-info btn-sm' data-id='" + data.id + "' data-title='" + data.title + "' data-body='" + data.body + "'><span class='fa fa-eye'></span></button> <button class='edit-modal btn btn-warning btn-sm' data-id='" + data.id + "' data-title='" + data.title + "' data-body='" + data.body + "'><span class='glyphicon glyphicon-pencil'></span></button> <button class='delete-modal btn btn-danger btn-sm' data-id='" + data.id + "' data-title='" + data.title + "' data-body='" + data.body + "'><span class='glyphicon glyphicon-trash'></span></button></td>" + "</tr>");
      }
    });
  }); // Función con formulario para borrar

  $(document).on('click', '.delete-modal', function () {
    $('#footer_action_button').text(" Eliminar");
    $('#footer_action_button').removeClass('glyphicon-check');
    $('#footer_action_button').addClass('glyphicon-trash');
    $('.actionBtn').removeClass('btn-success');
    $('.actionBtn').addClass('btn-danger');
    $('.actionBtn').addClass('delete');
    $('.modal-title').text('Eliminar Post');
    $('.id').text($(this).data('id'));
    $('.deleteContent').show();
    $('.form-horizontal').hide();
    $('.title').html($(this).data('title'));
    $('#myModal').modal('show');
  });
  $('.modal-footer').on('click', '.delete', function () {
    $.ajax({
      type: 'POST',
      url: 'deletePost',
      data: {
        '_token': $('input[name=_token]').val(),
        'id': $('.id').text()
      },
      success: function success(data) {
        $('.post' + $('.id').text()).remove();
      }
    });
  }); /// Función para mostrar un modal con la info del ítem.

  $(document).on('click', '.show-modal', function () {
    $('#show').modal('show');
    $('#i').text($(this).data('id'));
    $('#ti').text($(this).data('title'));
    $('#by').text($(this).data('body'));
    $('.modal-title').text('Información del Post.');
  });
});

/***/ }),

/***/ 1:
/*!************************************!*\
  !*** multi ./resources/js/ajax.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/usuario/Sites/clientes/resources/js/ajax.js */"./resources/js/ajax.js");


/***/ })

/******/ });