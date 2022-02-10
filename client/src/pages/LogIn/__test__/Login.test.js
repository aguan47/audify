import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserContext from '../../../context/UserContext';
import { loginState } from '../../../reducer/formReducer';
import LogIn from '../LogIn';
import '../../../events/Authenticate';

const mockUserContext = {
    name: "",
    isAuth: false,
    accessToken: '',
    refreshToken: ''
}

const MockLogin = () => {
    return(
        <BrowserRouter>
            <UserContext.Provider value={mockUserContext}>
                <LogIn/>
            </UserContext.Provider>
        </BrowserRouter>
    )
}

const mockNavigate = jest.fn();
const mockSubmit = jest.fn();

jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        ...originalModule,
        useNavigate: () => mockNavigate
    }
});

jest.mock('../../../events/Authenticate.js', () => {
    const originalModule = jest.requireActual('../../../events/Authenticate.js');
    return {
        ...originalModule,
        getAuthStateAndProps: () => mockSubmit
    }
});

describe("Login: Back button", () => {
    it("should have a back button", () => {
        render(<MockLogin/>);
        const backBtn = screen.getByText("arrow_back");  //ligature of material icons
        expect(backBtn).toBeInTheDocument();
    });

    it("should go back when clicked", () => {
        render(<MockLogin/>);
        const backBtn = screen.getByText("arrow_back");  //ligature of material icons
        fireEvent.click(backBtn);
        expect(mockNavigate).toBeCalled();
    });
});

describe("Login: Input fields", () => {
    it("should have an input field for the email", () => {
        render(<MockLogin/>);
        const inputElement = screen.getByPlaceholderText(loginState.email.placeholder);
        expect(inputElement).toBeInTheDocument();
    });
    
    it("should have an input field for the password", () => {
        render(<MockLogin/>);
        const inputElement = screen.getByPlaceholderText(loginState.password.placeholder);
        expect(inputElement).toBeInTheDocument();
    });
});

describe("Login: Reflect values entered in the input fields", () => {
    it("should have change the value of the email field when typed", () => {
        render(<MockLogin/>);
        const inputElement = screen.getByPlaceholderText(loginState.email.placeholder);
        fireEvent.change(inputElement, { target: {value: "email@email.com"} });
        expect(inputElement.value).toBe("email@email.com");
    });
    
    it("should have change the value of the password field when typed", () => {
        render(<MockLogin/>);
        const inputElement = screen.getByPlaceholderText(loginState.password.placeholder);
        fireEvent.change(inputElement, { target: {value: "password"} });
        expect(inputElement.value).toBe("password");
    });
});

describe("Login: Check for submit button", () => {
    it("should render the submit input type", () => {
        render(<MockLogin/>);
        const registerBtn = screen.getByDisplayValue("Log in");
        expect(registerBtn).toBeInTheDocument();
    });

    it("should call the getAuthStateProps function", () => {
        render(<MockLogin/>);
        const registerBtn = screen.getByDisplayValue("Log in");
        fireEvent.click(registerBtn);
        expect(mockSubmit).toBeCalled();
    });
});

describe("Login: Check for log in here link", () => {
    it("should render the submit input type", () => {
        render(<MockLogin/>);
        const logInLink = screen.getByRole("link", {name: "Sign up here"});
        expect(logInLink).toBeInTheDocument();
    });

    it("should change locations once we click the link", () => {
        render(<MockLogin/>);
        const logInLink = screen.getByRole("link", {name: "Sign up here"});
        fireEvent.click(logInLink);
        expect(logInLink.href).toBe(`http://localhost/register`);
    });
});