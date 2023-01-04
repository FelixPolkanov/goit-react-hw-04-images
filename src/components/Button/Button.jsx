import React from "react";
import {Button, ButtonDiv} from './Button.styled.jsx'
import PropTypes from 'prop-types';

const Btn = ({ onClick }) => {
    return (
        <ButtonDiv>
        <Button
        type="submit"
        onClick={onClick}
    > Load more
            </Button>
            </ButtonDiv>
    )
};

export default Btn;

Btn.propTypes = {
    onClick: PropTypes.func.isRequired,
};