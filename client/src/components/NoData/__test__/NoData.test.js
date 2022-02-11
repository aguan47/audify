import { render, screen } from '@testing-library/react';
import NoData from '../NoData';

describe("NoData", () => {
    it("should show the image", () => {
        render(<NoData/>);
        expect(screen.getByAltText("Two empty task lists")).toBeInTheDocument();
    });

    it("should show the accompanying text", () => {
        render(<NoData/>);
        expect(screen.getByText("No journals found!")).toBeInTheDocument();
    });
});