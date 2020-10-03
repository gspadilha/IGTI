import React from "react";

import "./styles.css";

const InputNumber = ({ id, label, value, onChangeInput, step }) => {
    const onChangeValue = (event) => {
        onChangeInput(event);
    };

    return (
        <div className='form-group col-md-4'>
            <label htmlFor={id}>{label}:</label>
            <input value={value} onChange={onChangeValue} type='number' className='form-control' id={id} step={step} />
        </div>
    );
};

export default InputNumber;
