import React from 'react';

const AppLayout = ({ content }) => (
  <div>
    {content()}
  </div>
);

AppLayout.propTypes = {
  content: React.propTypes.func,
};

export default AppLayout;
