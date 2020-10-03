import React, { Component } from 'react';

//import css from './input.module.css';

export default class Input extends Component {
    handleInputChange = (event) => {
        const text = event.target.value;
        this.props.onChange(text);
    }

    render() {
        const {
            id,
            name,
            value,
            label,
            type,
            size
        } = this.props;

        const inputName = typeof name === 'undefined' ? id : name;
        const inputType = typeof type === 'undefined' ? 'text' : type;
        const inputSize = typeof size === 'undefined' ? 's12' : size;

        return (
            <div className={`input-field col s12 ${inputSize}`} >
                <input id={id} name={inputName} type={inputType} value={value} onChange={this.handleInputChange} />
                <label htmlFor={id}>{label}</label>
            </div>
        )
    }
}
