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
  isFormReady: false,
  currentStep: 0,
};

export const formReducer = (state, action) => {
  switch (action.type) {
    case "load": {
      return { ...action.payload };
    }
    case "update":
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.payload.field]: action.payload.value,
        },
      };

    case "touch":
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.payload.field]: true,
        },
      };

    case "validateField":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.field]: action.payload.error,
        },
      };

    case "error":
      return {
        ...state,
        isFormReady: false,
        errors: action.payload.errors,
      };

    case "ready":
      return { ...state, isFormReady: true };

    case "nextStep":
      return { ...state, currentStep: state.currentStep + 1 };

    case "prevStep":
      return { ...state, currentStep: state.currentStep - 1 };

    case "reset":
      return initialState;

    default:
      return state;
  }
};
