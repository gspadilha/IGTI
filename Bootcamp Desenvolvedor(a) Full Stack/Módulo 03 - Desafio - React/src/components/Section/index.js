import React from "react";

import "./styles.css";

const Section = ({ title, children }) => {
    return (
        <section>
            <h2 className='title'>{title}</h2>
            <div className='sections'>{children}</div>
        </section>
    );
};

export default Section;
