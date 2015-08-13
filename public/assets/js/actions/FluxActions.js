var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var FluxConstants = require('../constants/FluxConstants.js');

var FluxActions = {

  getArticle: function(data) {
    AppDispatcher.dispatch({
      actionType: FluxConstants.VIZI_SEARCH,
      data: data
    });
  }


}

module.exports = FluxActions;
