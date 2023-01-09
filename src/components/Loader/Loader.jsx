import { BallTriangle } from 'react-loader-spinner';
import { Wrapper } from './Loader.styled.jsx';

function LoaderImg () {
    return (
        <Wrapper>
        <BallTriangle
            heigth="200"
            width="200"
            color='blue'
            ariaLabel='loading'
            />
            </Wrapper>
    );
};

export default LoaderImg;