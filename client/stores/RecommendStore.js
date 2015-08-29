var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FluxConstants = require('../constants/FluxConstants');
var assign = require('object-assign');

var rec = {};
function loadData(data) {
  rec.num = data;
}
function loadUserRec(data) {
  rec.userRec = data;
}
function loadState(data) {
  rec.state = data;
}
function loadAll(data) {
  rec.all = data;
}

var RecommendStore = assign({}, EventEmitter.prototype, {

  getData: function() {
    return rec;
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

AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.actionType) {
    case FluxConstants.USER_RECS:
      loadUserRec(action.data);
      break;
    case FluxConstants.GET_REC:
      loadData(action.data);
      break;
    case FluxConstants.MAKE_REC:
      rec.num++;
      rec.state = !rec.state;
      break;
    case FluxConstants.UN_REC:
      rec.num--;
      rec.state = !rec.state;
      break;
    case FluxConstants.STATE:
      loadState(action.data);
      break;
    case FluxConstants.GET_ALL:
      loadAll(action.data);
      break;
    default:
      // none
  }
  RecommendStore.emitChange();
});

module.exports = RecommendStore;
