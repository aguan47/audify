import { fireEvent, render, screen } from '@testing-library/react';
import TitleInput from '../TitleInput';

const mockTitleHandler = jest.fn();

const MockTitleInput = ({title}) => {
    return(
        <TitleInput titleHandler={mockTitleHandler} title={title}/>
    );
}

describe("TitleInput: Check if input, title and counter is rendered", () => {
    it("should render the input bar", () => {
        render(<MockTitleInput title={"Hello World"}/>);
        expect(screen.getByPlaceholderText("Enter journal title")).toBeInTheDocument();
    });

    it("should render the corrrect counter if empty", () => {
        render(<MockTitleInput title={""}/>);
        expect(screen.getByText("000")).toBeInTheDocument();
    });

    it("should render the correct counter if non-empty", () => {
        render(<MockTitleInput title={"Hello World"}/>);
        expect(screen.getByText("011")).toBeInTheDocument();
    });

    it("should render the correct title", () => {
        render(<MockTitleInput title={"Hello World"}/>);
        expect(screen.getByPlaceholderText("Enter journal title").value).toBe("Hello World");
    });
});

describe("TitleInput: Check if input is responsive to change", () => {
    it("should render the input bar", () => {
        render(<MockTitleInput title={"Hello World"}/>);
        fireEvent.change(screen.getByPlaceholderText("Enter journal title"), {target: {value: "Sample"}});
        expect(mockTitleHandler).toBeCalled();
    });
});
