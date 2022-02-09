import { fireEvent, render, screen } from '@testing-library/react';
import Registration from '../Registration';
import UserContext from '../../../context/UserContext';
import { BrowserRouter } from 'react-router-dom';
import 'react-router-dom';
import { registrationState } from '../../../reducer/formReducer';
import { authenticateUser, getAuthStateAndProps } from "../../../events/Authenticate";


const mockUserContext = {
    name: "",
    isAuth: false,
    accessToken: '',
    refreshToken: ''
}

const mockNavigate = jest.fn();     // this is returned from useNavigate(); check if this is called.
const mockSubmit = jest.fn();


jest.mock('react-router-dom', () => {       // mocking the useNavigate function
    const originalModule = jest.requireActual('react-router-dom');
    return {
        ...originalModule,
        useNavigate: () => mockNavigate
    }
});

jest.mock('../../../events/Authenticate.js', () => {
    const originalModules = jest.requireActual('../../../events/Authenticate.js')
    return {
        ...originalModules,
        getAuthStateAndProps: () => mockSubmit
    };
})


const MockRegistration = () => {
    return(
        <BrowserRouter>
            <UserContext.Provider value={{mockUserContext}}>
                <Registration/>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

const getBackBtnElement = () => {
    render(<MockRegistration/>);
    return screen.getByText("arrow_back");      // This is a ligature for Material Icons.
}

const getInputElement = placeholderText => {
    render(<MockRegistration/>);
    return screen.getByPlaceholderText(placeholderText);
}

describe("Registration: Back button", () => {
    it("should have a back button", () => {
        const backBtnElement = getBackBtnElement();
        expect(backBtnElement).toBeInTheDocument();
    });

    it("should go back when clicked", () => {
        const backBtnElement = getBackBtnElement();
        fireEvent.click(backBtnElement);
        expect(mockNavigate).toBeCalled();
    });
});

describe("Registration: Checking for fields", () => {
    it("should have a field for the name", () => {
        const inputElement = getInputElement(registrationState.name.placeholder);
        expect(inputElement).toBeInTheDocument();
    });

    it("should have a field for the birthday", () => {
        const inputElement = getInputElement(registrationState.birthday.placeholder);
        expect(inputElement).toBeInTheDocument();
    });

    it("should have a field for the email", () => {
        const inputElement = getInputElement(registrationState.email.placeholder);
        expect(inputElement).toBeInTheDocument();
    });

    it("should have a field for the password", () => {
        const inputElement = getInputElement(registrationState.password.placeholder);
        expect(inputElement).toBeInTheDocument();
    });
});

describe("Registration: Entering inputs", () => {
    it("should change the value for the name field", () => {
        const inputElement = getInputElement(registrationState.name.placeholder);
        fireEvent.change(inputElement, {target: {value: "User 1"}});
        expect(inputElement.value).toBe("User 1");
    });

    it("should change the value for the birthday field", () => {
        const inputElement = getInputElement(registrationState.birthday.placeholder);
        fireEvent.change(inputElement, {target: {value: "2020-01-01"}});    // use this format specifically.
        expect(inputElement.value).toBe("2020-01-01");
    });

    it("should change the value for the email field", () => {
        const inputElement = getInputElement(registrationState.email.placeholder);
        fireEvent.change(inputElement, {target: {value: "email@email.com"}});
        expect(inputElement.value).toBe("email@email.com");
    });
    
    it("should change the value for the password field", () => {
        const inputElement = getInputElement(registrationState.email.placeholder);
        fireEvent.change(inputElement, {target: {value: "password"}});
        expect(inputElement.value).toBe("password");
    });
});

describe("Registration: Check for submit button", () => {
    it("should render the submit input type", () => {
        render(<MockRegistration/>);
        const registerBtn = screen.getByDisplayValue("Register now");
        expect(registerBtn).toBeInTheDocument();
    });

    it("should call the getAuthStateProps function", () => {
        render(<MockRegistration/>);
        const registerBtn = screen.getByDisplayValue("Register now");
        fireEvent.click(registerBtn);
        expect(mockSubmit).toBeCalled();
    });
});

describe("Registration: Check for log in here link", () => {
    it("should render the submit input type", () => {
        render(<MockRegistration/>);
        const logInLink = screen.getByRole("link", {name: "Log in here"});
        expect(logInLink).toBeInTheDocument();
    });

    it("should change locations once we click the link", () => {
        render(<MockRegistration/>);
        const logInLink = screen.getByRole("link", {name: "Log in here"});
        fireEvent.click(logInLink);
        expect(logInLink.href).toBe(`http://localhost/log-in`);
    });
});
