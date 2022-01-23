import * as formActions from './actions/formActions';

export const formReducer = (state, action) => {
    switch(action.type) {
        case formActions.SET_VALUE:
            return  {
                ...state, 
                [action.inputName]: {
                    ...state[action.inputName],
                    [action.field]: action.value
                }
            };
        case formActions.FULL_UPDATE_STATE:
            return {...state, ...action.newState};
        default:
            return state;
    }
}

export const registrationState = {
    name: {
        name: "name",
        type: "text",
        label: "Name",
        value: ""
    },
    email: {
        name: "email",
        type: "email",
        label: "Email",
        pattern: "[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z0-9]+",
        value: ""
    },
    password: {
        name: "password",
        type: "password",
        label: "Password",
        value: ""
    }
};

export const loginState = {
    email: {
        name: "email",
        type: "email",
        label: "Email",
        pattern: "[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z0-9]+",
        value: ""
    },
    password: {
        name: "password",
        type: "password",
        label: "Password",
        value: ""
    }
};
