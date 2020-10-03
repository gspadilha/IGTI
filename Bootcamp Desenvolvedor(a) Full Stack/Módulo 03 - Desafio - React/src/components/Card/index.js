import React from "react";

import "./styles.css";

const Card = (props) => {
    const { index, montante, diferenca, percentual } = props;

    return (
        <div className='card'>
            <div>
                <span>{index}</span>
            </div>
            <div>
                <span>{montante}</span>
                <span>{diferenca}</span>
                <span>{percentual}</span>
            </div>
        </div>
    );
};

export default Card;
