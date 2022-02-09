import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Field from '../Field';

const mockChangeText = jest.fn();

let mockOptions = {
    name: "name",
    type: "text",
    label: "Name",
    placeholder: "Enter your name",
    value: ""
}

describe("Field element", () => {
    it("should display a label of 'Name'", () => {
        render(<Field label={mockOptions.label} inputOptions={mockOptions} changeText={mockChangeText} />);
        const labelElement = screen.getByText(mockOptions.label);
        expect(labelElement).toBeInTheDocument();
    });

    it("should display an input tag'", () => {
        render(<Field label={mockOptions.label} inputOptions={mockOptions} changeText={mockChangeText} />);
        const inputElement = screen.getByPlaceholderText(mockOptions.placeholder);
        expect(inputElement).toBeInTheDocument();
    });

    it("should call the changeText handler once", () => {
        render(<Field label={mockOptions.label} inputOptions={mockOptions} changeText={mockChangeText} />);
        const inputElement = screen.getByPlaceholderText(mockOptions.placeholder);
        fireEvent.change(inputElement, { target: { value: "My name"} });
        expect(mockChangeText).toHaveBeenCalledTimes(1);
    });
});