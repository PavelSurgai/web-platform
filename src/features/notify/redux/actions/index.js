const actionTypes = {
  ADD_NOTIFY: 'notify/ADD_NOTIFY',
  DELETE_NOTIFY: 'notify/DELETE_NOTIFY',
};

function addNotify(text, type = 'default', needClose = true) {
  return async dispatch => {
    const id = new Date().toISOString();
    const notifycation = { text, type, id, needClose };
    dispatch({ type: actionTypes.ADD_NOTIFY, payload: notifycation });
  };
}

function deleteNotify(id) {
  return async dispatch => {
    dispatch({ type: actionTypes.DELETE_NOTIFY, payload: id });
  };
}

export {
  actionTypes,
  addNotify,
  deleteNotify,
};
