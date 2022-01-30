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
        placeholder: "Enter your name",
        value: ""
    },
    birthday: {
        name: "birthday",
        type: "date",
        label: "Birthday",
        placeholder: "Enter your birhday",
        value: ""
    },
    email: {
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "Enter your email address",
        value: ""
    },
    password: {
        name: "password",
        type: "password",
        label: "Password",
        placeholder: "Enter your password",
        value: ""
    }
};

export const loginState = {
    email: {
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "Enter your email address",
        value: ""
    },
    password: {
        name: "password",
        type: "password",
        label: "Password",
        placeholder: "Enter your password",
        value: ""
    }
};

export const editProfileState = {
    name: {
        name: "name",
        type: "text",
        label: "Name",
        placeholder: "Enter your name",
        value: "",
        disabled: true
    },
    birthday: {
        name: "birthday",
        type: "date",
        label: "Birthday",
        placeholder: "Enter your birthday",
        value: "",
        disabled: true
    },
    email: {
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "Enter your email address",
        value: "",
        disabled: true
    },
    bio: {
        name: "bio",
        type: "text",
        label: "Biography",
        placeholder: "Enter your bio",
        value: "",
        disabled: true
    }
}


// password: {
//     name: "password",
//     type: "password",
//     label: "Password",
//     placeholder: "Enter your password",
//     value: "",
//     disabled: true
// },