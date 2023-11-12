export function tasksReducer(state, action){
  switch (action.type) {
    case 'add': {
      console.log(state, action);
      break;
    }
    case 'remove': {
      console.log(state, action);
      break;
    }
    case 'edit': {
      console.log(state, action);
      break;
    }
    default: break;
  }
}
