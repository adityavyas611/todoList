import React from 'react';
import './button.styles.scss';

const Button = (props) => {
    return (
    <button type="submit" className="button-component" onClick={props.handleAdd}>{props.value}</button>
    );
};

export default Button;