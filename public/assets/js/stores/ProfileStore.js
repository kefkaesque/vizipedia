var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxConstants = require('../constants/FluxConstants');

var _ = require('underscore');

var profileData = {};
function loadData(data) {
  profileData = data;
}

var ProfileStore = _.extend({}, EventEmitter.prototype, {

  getData: function() {
    return profileData;
  },
  emitChange: function() {
    this.emit('change');
  },
  addChangeListener: function(callback) {
    this.on('change', callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
});

AppDispatcher.register(function(action) {
  var text;
  switch(action.actionType) {
    case FluxConstants.PROFILE_LOAD_DATA:
      loadData(action.data);
      break;
    default:
      // none
  }
  ProfileStore.emitChange();
});

module.exports = ProfileStore;
