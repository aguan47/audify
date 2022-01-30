import { Link } from 'react-router-dom';
import Container from '../../components/Container/Container';

const LandingPage = () => {
    document.title = "Welcome"

    let btnDesign = "m-5 bg-primary-bg text-primary-btn py-3 px-5 rounded-full font-bold";
    return (
        <Container>
            <div className='w-screen h-screen bg-primary-btn flex flex-col justify-center items-center'>
                <h1 className='text-7xl text-white font-bold'>Audify.</h1>
                <p className='text-white text-xl font-thin'>A voice journal </p>
                <div className='m-10'>
                    <Link to={"/log-in"} className={btnDesign}>Log in</Link>
                    <Link to={"/register"} className={btnDesign}>Register</Link>
                </div>
            </div>
        </Container>
    );
}

export default LandingPage;