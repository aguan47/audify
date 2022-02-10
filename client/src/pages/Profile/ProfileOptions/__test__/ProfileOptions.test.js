import { fireEvent, render, screen } from '@testing-library/react';
import ProfileOptions from '../ProfileOptions';

const mockEditEventHandler = jest.fn();
const mockDeleteEventHandler = jest.fn();

const MockProfileOptions = ({mockButtonState}) => {
    return (
        <ProfileOptions
            buttonState={mockButtonState}
            editEventHandler={mockEditEventHandler}
            deleteEventHandler={mockDeleteEventHandler}
        />
    );
}

describe("ProfileOptions: Edit button text", () => {
    const mockButtonState = {
        buttonClass: "mock",
        buttonText: "Edit Profile"
    }

    it("should have an edit profile button", () => {
        render(<MockProfileOptions mockButtonState={mockButtonState}/>);
        const editButton = screen.getByText(mockButtonState.buttonText);
        expect(editButton).toBeInTheDocument();
    });

    it("can be clicked", () => {
        render(<MockProfileOptions mockButtonState={mockButtonState}/>);
        const editButton = screen.getByText(mockButtonState.buttonText);
        fireEvent.click(editButton);
        expect(mockEditEventHandler).toBeCalled();
    });

    it("shows 'dont save changes' once clicked", () => {
        mockButtonState.buttonText = "Don't save changes";
        render(<MockProfileOptions mockButtonState={mockButtonState}/>);
        let editButton = screen.getByText(mockButtonState.buttonText);
        fireEvent.click(editButton);
        expect(editButton).toBeInTheDocument();
    });
});

describe("ProfileOptions: Delete button text", () => {
    const mockButtonState = {
        buttonClass: "mock",
        buttonText: "Edit Profile"
    }

    it("should have a 'delete your account' button'", () => {
        render(<MockProfileOptions mockButtonState={mockButtonState}/>);
        const deleteAcctBtn = screen.getByText("Delete your account");
        expect(deleteAcctBtn).toBeInTheDocument();
    });

    it("can delete the account once clicked", () => {
        render(<MockProfileOptions mockButtonState={mockButtonState}/>);
        const deleteAcctBtn = screen.getByText("Delete your account");
        fireEvent.click(deleteAcctBtn);
        expect(mockDeleteEventHandler).toBeCalled();
    });
});