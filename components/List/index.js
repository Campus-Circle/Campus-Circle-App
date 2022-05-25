import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

function List(props) {
  return (
    <React.Fragment>
      <div className="flex justify-center items-center flex-col">
        <h1
          className={`text-3xl font-body font-extralight text-primary py-6 ${props.titleClassName}`}
        >
          {props.title}
        </h1>
        <ul
          className={`items-center font-body ${props.listClassName} flex flex-col justify-center md:justify-start md:items-start  p-2 md:p-0 w-full`}
        >
          {props.data.map((item, index) => {
            return (
              <Link
                href={item.link}
                target="_blank"
                key={index}
                className="w-full md:mx-10"
              >
                <li
                  className={`tracking-tight p-3 text-xl my-2 hover:bg-primary/10 text-primary font-medium cursor-pointer transition-all px-10 rounded-md hover:md:translate-x-2  ${props.listItemClassName} `}
                >
                  {item.name}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </React.Fragment>
  );
}

List.propTypes = {
  title: PropTypes.string,
  titleClassName: PropTypes.string,
  listClassName: PropTypes.string,
  listItemClassName: PropTypes.string,
  data: PropTypes.array,
};

export default List;
