import { fireEvent, render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserContext from '../../../context/UserContext';
import Profile from '../Profile';

const mockUserContext = {
    user: {
        name: "First name Last name",
        isAuth: true,
        accessToken: '',
        refreshToken: ''
    },
    setUser: jest.fn()
}

const MockProfile = () => {
    return(
        <BrowserRouter>
            <UserContext.Provider value={mockUserContext}>
                <Profile/>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

const mockDeleteUserProfile = jest.fn();
const mockEditUser = jest.fn();
const mockLoadPicture = jest.fn();

jest.mock('../../../events/Users.js', () => {
    const originalModules = jest.requireActual('../../../events/Users.js');
    return {
        ...originalModules,
        deleteUserProfile: () => mockDeleteUserProfile(),
        editUserInformation: () => mockEditUser()
    }
});

jest.mock('../../../utlities/helper.js', () => {
    const originalModules = jest.requireActual('../../../utlities/helper.js');
    return {
        ...originalModules,
        loadPicture: () => mockLoadPicture()
    }
});

describe("Profile: Profile options: 'Edit profile' button", () => {
    it("should render the edit button", () => {
        render(<MockProfile/>);
        const editBtn = screen.getByText("Edit Profile");
        expect(editBtn).toBeInTheDocument();
    });

    it("should change to 'dont save changes' if the edit button is clicked", () => {
        render(<MockProfile/>);
        const editBtn = screen.getByText("Edit Profile");
        fireEvent.click(editBtn);
        expect(screen.getByText("Don't save changes")).toBeInTheDocument();
    });

    it("should change to 'edit profile' if the edit button is clicked again", () => {
        render(<MockProfile/>);
        const editBtn = screen.getByText("Edit Profile");
        fireEvent.click(editBtn);
        fireEvent.click(editBtn);
        expect(screen.getByText("Edit Profile")).toBeInTheDocument();
    });

    it("should render the 'upload new picture' button if clicked", () => {
        render(<MockProfile/>);
        const editBtn = screen.getByText("Edit Profile");
        fireEvent.click(editBtn);
        expect(screen.getByText("Upload new picture")).toBeInTheDocument();
    });

    it("should NOT render the 'upload new picture' button if clicked twice", () => {
        render(<MockProfile/>);
        const editBtn = screen.getByText("Edit Profile");
        fireEvent.click(editBtn);
        fireEvent.click(editBtn);
        expect(screen.queryByText("Upload new picture")).not.toBeInTheDocument();
    });

    it("should render the 'Save changes' button if clicked", () => {
        render(<MockProfile/>);
        const editBtn = screen.getByText("Edit Profile");
        fireEvent.click(editBtn);
        expect(screen.getByText("Save changes")).toBeInTheDocument();
    });

    it("should NOT render the 'Save changes' button if clicked twice", () => {
        render(<MockProfile/>);
        const editBtn = screen.getByText("Edit Profile");
        fireEvent.click(editBtn);
        fireEvent.click(editBtn);
        expect(screen.queryByText("Save changes")).not.toBeInTheDocument();
    });
});

describe("Profile: Profile Options: Delete your account", () => {
    it("should render the delete your account button", () => {
        render(<MockProfile/>);
        const deleteAcctBtn = screen.getByText("Delete your account");
        expect(deleteAcctBtn).toBeInTheDocument();
    });

    it("should render the confirmation modal if clicked", () => {
        render(<MockProfile/>);
        const deleteAcctBtn = screen.getByText("Delete your account");
        fireEvent.click(deleteAcctBtn);
        expect(screen.getByText("Are you sure you want to to delete your account? You will lose all of your journals.")).toBeInTheDocument();
    });

    it("should go to another page if user is deleted", () => {
        render(<MockProfile/>);
        const deleteAcctBtn = screen.getByText("Delete your account");
        fireEvent.click(deleteAcctBtn)

        const confirmBtn = screen.getByText("Yes, delete my account");
        fireEvent.click(confirmBtn);
        expect(mockDeleteUserProfile).toBeCalled();
    });

    it("should go back if user declines to delete their account", () => {
        render(<MockProfile/>);
        const deleteAcctBtn = screen.getByText("Delete your account");
        fireEvent.click(deleteAcctBtn)

        const confirmBtn = screen.getByText("No");
        fireEvent.click(confirmBtn);
        expect(deleteAcctBtn).toBeInTheDocument();
    });
});

describe("Profile: Editing your account", () => {
    it("should render the input fields to be disabled if 'edit profile' isn't pressed", () => {
        render(<MockProfile/>);
        const nameElement = screen.getByPlaceholderText("Enter your name");
        expect(nameElement).toBeDisabled();
    });

    it("should make the input fields editable if 'edit profile' is clicked", () => {
        render(<MockProfile/>);
        const nameElement = screen.getByPlaceholderText("Enter your name");
        fireEvent.click(screen.getByText("Edit Profile"));
        expect(nameElement).not.toBeDisabled();
    });

    it("should render the values entered once we're editing the profile", () => {
        render(<MockProfile/>);
        const nameElement = screen.getByPlaceholderText("Enter your name");
        fireEvent.click(screen.getByText("Edit Profile"));
        fireEvent.change(nameElement, {target: {value: "My name is"}});
        expect(nameElement.value).toBe("My name is");
    });

    // check for input validation
});

describe("Profile: Uploading new picture", () => {
    it("should allow us to upload a new profile picture if clicked", () => {
        render(<MockProfile/>);
        const editBtn = screen.getByText("Edit Profile");
        fireEvent.click(editBtn);
        fireEvent.change(document.querySelector("input[type=file]"));   // Needs to change the hiddent input
        expect(mockLoadPicture).toBeCalled();
    });
});

describe("Profile: Submit button", () => {
    it("should call the edit user function if submit button clicked", () => {
        render(<MockProfile/>);
        const editBtn = screen.getByText("Edit Profile");
        fireEvent.click(editBtn);
        fireEvent.click(screen.getByText("Save changes"));
        expect(mockEditUser).toBeCalled();
    });
});