import React from 'react';
import './assets/scss';
import './assets/images';

const Error = ({ header, paragraph }) => {
  const setClass = () => {
    const itemImageClass = ['errorMessage', 'class'];
    return itemImageClass;
  };

  return (
    <div className={setClass().join(' ')}>
      <div className={'errorMessageContainer'}>
        <div className={'errorMessageImg'} />
        <h1>{header}</h1>
        <p>{paragraph}</p>
      </div>
    </div>
  );
};

export default Error;
