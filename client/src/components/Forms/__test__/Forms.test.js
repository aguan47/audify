import { fireEvent, render, screen } from '@testing-library/react';
import Forms from '../Forms';

const mockSubmit = jest.fn();
const mockDispatch = jest.fn();

const MockForms = canSubmit => {
    return(
        <Forms 
            fields={{}} 
            submitText={"Submit this form"} 
            submit={mockSubmit} 
            dispatch={mockDispatch}
            canSubmit={canSubmit}    
        />
    );
}

describe("Forms component", () => {
    it("should have a submit input", () => {
        render(<MockForms canSubmit={true}/>);
        const submitElement = screen.getByDisplayValue("Submit this form");
        expect(submitElement).toBeInTheDocument();
    });

    it("should submit when the submit imput is clicked", () => {
        render(<MockForms canSubmit={true}/>);
        const submitElement = screen.getByDisplayValue("Submit this form");
        fireEvent.click(submitElement);
        expect(mockSubmit).toHaveBeenCalledTimes(1);
    });
}); 