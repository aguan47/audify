import { render } from '@testing-library/react';
import Loader from '../Loader';

describe("Loader", () => {
    it("should show the loader", () => {
        render(<Loader/>);
        expect(document.querySelector(".Loader")).toBeInTheDocument();
    });
});