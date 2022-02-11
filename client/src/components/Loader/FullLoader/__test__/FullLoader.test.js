import { render } from '@testing-library/react';
import FullLoader from '../FullLoader';

describe("FullLoader", () => {
    it("should show the loader", () => {
        render(<FullLoader show={true}/>);
        expect(document.querySelector(".FullLoader")).toBeInTheDocument();
    });
});