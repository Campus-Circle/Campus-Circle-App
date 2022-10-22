import React from 'react';
import PropTypes from 'prop-types';
function Info({ children }) {
  return (
    <div className="p-5 bg-yellow-500/10 w-full rounded-md mt-10 text-yellow-500 flex gap-5 border-2 border-yellow-600/20">
      {children}
    </div>
  );
}

Info.propTypes = {
  children: PropTypes.node.isRequired
};

export default Info;
