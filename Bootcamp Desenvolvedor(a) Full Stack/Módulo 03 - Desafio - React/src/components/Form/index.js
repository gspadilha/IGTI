import React from "react";

import "./styles.css";

const Form = ({ children }) => {
    return (
        <section>
            <div className='row'>{children}</div>
        </section>
    );
};

export default Form;
