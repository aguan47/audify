import { fireEvent, render, screen } from '@testing-library/react';
import CaptionInput from '../CaptionInput';

const mockCaptionHandler = jest.fn();

const MockTitleInput = ({caption}) => {
    return(
        <CaptionInput captionHandler={mockCaptionHandler} caption={caption}/>
    );
}

describe("CaptionInput: Check if input, caption and counter is rendered", () => {
    it("should render the input bar", () => {
        render(<MockTitleInput caption={"Hello World"}/>);
        expect(screen.getByPlaceholderText("Enter journal caption")).toBeInTheDocument();
    });

    it("should render the corrrect counter if empty", () => {
        render(<MockTitleInput caption={""}/>);
        expect(screen.getByText("150")).toBeInTheDocument();
    });

    it("should render the correct counter if non-empty", () => {
        render(<MockTitleInput caption={"Hello World"}/>);
        expect(screen.getByText("139")).toBeInTheDocument();
    });

    it("should render the correct caption", () => {
        render(<MockTitleInput caption={"Hello World"}/>);
        expect(screen.getByPlaceholderText("Enter journal caption").value).toBe("Hello World");
    });
});

describe("CaptionInput: Check if input is responsive to change", () => {
    it("should render the input bar", () => {
        render(<MockTitleInput caption={"Hello World"}/>);
        fireEvent.change(screen.getByPlaceholderText("Enter journal caption"), {target: {value: "Sample"}});
        expect(mockCaptionHandler).toBeCalled();
    });
});
