import React from 'react';
import Spinner from 'react-spinkit';

export const EmptySpinner = () => (<div></div>);

export const MaterialSpinner = ({ style, className }) => (
  <div className={`spinner-wrap ${className}`} style={style}>
    <Spinner
      spinnerName="double-bounce"
      noFadeIn
    />
  </div>
);

MaterialSpinner.propTypes = {
  style: React.PropTypes.object,
  className: React.PropTypes.string,
};
