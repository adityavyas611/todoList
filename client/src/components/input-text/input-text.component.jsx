import React from 'react';
import './input-text.styles.scss';

const InputText = (props) => {
    return (
        <input type="text" className={props.className} onChange={props.handleChange} disabled={(props.disabled) ? "disabled" : ""} value={props.value}/>
    );
};

export default InputText;