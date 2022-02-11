import { render, screen } from '@testing-library/react';
import ColorBar from '../ColorBar';

describe("ColorBar: Render the correct colors", () => {
    it("should render the red color", () => {
        render(<ColorBar currentColor={"BLUE"}/>);
        const redColor = screen.getByText(/red/i);
        expect(redColor).toBeInTheDocument();
    });

    it("should render the blue color", () => {
        render(<ColorBar currentColor={"BLUE"}/>);
        const blueColor = screen.getByText(/blue/i);
        expect(blueColor).toBeInTheDocument();
    });

    it("should render the green color", () => {
        render(<ColorBar currentColor={"BLUE"}/>);
        const greenColor = screen.getByText(/green/i);
        expect(greenColor).toBeInTheDocument();
    });

    it("should render the yellow color", () => {
        render(<ColorBar currentColor={"BLUE"}/>);
        const yellowColor = screen.getByText(/yellow/i);
        expect(yellowColor).toBeInTheDocument();
    });
});

describe("ColorBar: Selecting colors", () => {
    it("should select the red color", () => {
        render(<ColorBar currentColor={"RED"}/>);
        const redColor = screen.getByText(/red/i);
        expect(redColor).toHaveClass("border-black");
    });

    it("should select the blue color", () => {
        render(<ColorBar currentColor={"BLUE"}/>);
        const blueColor = screen.getByText(/blue/i);
        expect(blueColor).toHaveClass("border-black");
    });

    it("should select the green color", () => {
        render(<ColorBar currentColor={"GREEN"}/>);
        const greenColor = screen.getByText(/green/i);
        expect(greenColor).toHaveClass("border-black");
    });

    it("should select the yellow color", () => {
        render(<ColorBar currentColor={"YELLOW"}/>);
        const yellowColor = screen.getByText(/yellow/i);
        expect(yellowColor).toHaveClass("border-black");
    });

    it("should NOT select the yellow color", () => {
        render(<ColorBar currentColor={"RED"}/>);
        const yellowColor = screen.getByText(/yellow/i);
        expect(yellowColor).not.toHaveClass("border-black");
    });
});