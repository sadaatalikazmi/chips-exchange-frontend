import { PURGE } from "redux-persist";

let initialState = {
 isActive: false,
}

const Sidebar = (state = initialState, { type, payload }) => {
  switch (type) {

    case 'ACTIVE':
      return {
        ...state,
        isActive: payload,
      };

    default:
      return state;
  }
};

export default Sidebar;