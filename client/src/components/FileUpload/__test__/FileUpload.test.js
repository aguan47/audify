import { fireEvent, render, screen } from '@testing-library/react';
import FileUpload from '../FileUpload';

const mockFileHandler = jest.fn();

describe("FileUpload", () => {
    it("should have a button for uploading files", () => {
        render(<FileUpload changeHandler={mockFileHandler}/>);
        const fileUploadBtn = screen.getByText(/upload new picture/i);
        expect(fileUploadBtn).toBeInTheDocument();
    });

    it("should call the handler if clicked", () => {
        render(<FileUpload changeHandler={mockFileHandler}/>);
        
        // this was hidden by default using CSS. This is the only way I can grab the input
        const fileUploadInput = document.querySelector("input[type=file]"); 
        fireEvent.change(fileUploadInput);
        expect(mockFileHandler).toBeCalled();
    });
});