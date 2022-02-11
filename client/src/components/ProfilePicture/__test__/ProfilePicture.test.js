import { fireEvent, render, screen } from '@testing-library/react';
import ProfilePicture from '../ProfilePIcture';

const mockChangePictureHandler = jest.fn();
const pictureURL = 'https://static.javatpoint.com/computer/images/internet.png';


const MockProfilePicture = ({isEdit}) => {
    return(
        <ProfilePicture
            profilePicture={pictureURL}
            changePictureHandler={() => mockChangePictureHandler()}
            isEdit={isEdit}
        />
    );
}

describe("Profile Picture", () => {
    it("should show the correct profile picture", () => {
        render(<MockProfilePicture isEdit={false}/>);
        const profilePic = screen.getByRole("img");
        expect(profilePic.src).toBe(pictureURL);
    });

    it("should NOT show the file upload button if we're not editing the profile picture", () => {
        render(<MockProfilePicture isEdit={false}/>);
        const editBtn = screen.queryByText(/upload new picture/i);
        expect(editBtn).not.toBeInTheDocument();
    });

    it("should show the file upload button if we're editing the profile picture", () => {
        render(<MockProfilePicture isEdit={true}/>);
        const editBtn = screen.getByText(/upload new picture/i);
        expect(editBtn).toBeInTheDocument();
    });

    it("should call the handler if clicked", () => {
        render(<MockProfilePicture isEdit={true}/>);
        fireEvent.change(document.querySelector("input[type=file]"));   // Needs to change the hiddent input
        expect(mockChangePictureHandler).toBeCalled();
    }); 
});