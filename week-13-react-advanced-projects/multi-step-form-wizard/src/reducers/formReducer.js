// Starting point: reducers/formReducer.js
export const initialState = {
  fields: {
    name: "",
    email: "",
    phone: "",
    isSubscribe: false,
    contactMethod: "",
    message: "",
  },
  errors: {},
  touched: {},
  currentStep: 1,
  isFormReady: false,
};

export function formReducer(state, action) {
  switch (action.type) {
    case "update": {
      const { field, value } = action;
      return {
        ...state,
        fields: { ...state.fields, [field]: value },
      };
    }

    case "touch": {
      const { field } = action;
      return {
        ...state,
        touched: { ...state.touched, [field]: true },
      };
    }

    case "validateField": {
      const { field, error } = action;
      return {
        ...state,
        errors: { ...state.errors, [field]: error },
      };
    }

    case "next": {
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };
    }

    case "back": {
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };
    }

    case "ready": {
      return {
        ...state,
        isFormReady: true,
      };
    }

    case "error": {
      return {
        ...state,
        isFormReady: false,
        errors: action.payload,
      };
    }

    case "reset": {
      return initialState;
    }

    default:
      return state;
  }
}
