import React from 'react';
import style from './index.module.scss';

const Button = ({children, ...args}) => {
    return <button className={style.buttonContainer} {...args}>{children}</button>
};

export default Button;