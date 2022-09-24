import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import LinkButton from "../UI/Button/LinkButton";

function List(props) {
  if (props.data.length === 0) {
    return (
      <React.Fragment>
        <div>
          <p className="text-lg py-3 text-center">No Data Found</p>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="flex justify-center">
        {props.data.length} {props.type}(s) Found
      </div>

      {props.data.map((item) => (
        <LinkButton item={item} />
      ))}
    </React.Fragment>
  );
}

List.propTypes = {
  type: PropTypes.string,
  data: PropTypes.array,
};

export default List;
