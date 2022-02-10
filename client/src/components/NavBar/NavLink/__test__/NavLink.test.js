import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavLink from '../NavLink';

const MockNavLink = ({path, pathName}) => {
    return(
        <BrowserRouter>\
            <NavLink path={path} pathName={pathName}/>
        </BrowserRouter>
    );
}

describe("NavLink", () => {
    it("should display the given path name", () => {
        render(<MockNavLink path={"/home"} pathName={"Home"}/>);
        const homeLink = screen.getByText("Home");
        expect(homeLink).toBeInTheDocument();
    });

    it("should show the correct path", () => {
        render(<MockNavLink path={"/home"} pathName={"Home"}/>);
        const homeLink = screen.getByText("Home");
        expect(homeLink.parentElement.href).toBe("http://localhost/home");
    });
});
