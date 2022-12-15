import dayjs from 'dayjs';
import React from 'react';
import useStorage from '../../../hooks/useStorage';

function DocCard({ item }) {
  const { loadFile } = useStorage();

  const fileOpen = async () => {
    const data = await loadFile(item);
    window.open(data.url, '_blank');
  };

  console.log(item);

  return (
    <React.Fragment>
      <button className="card w-full" onClick={fileOpen}>
        <div className="card-title">
          {item.title}
          {item.StoredInDB && (
            <p className="badge badge-primary rounded-md font-normal italic text-white">
              Campus Circle
            </p>
          )}
        </div>
        <div className="p-2">
          <p className="text-sm text-gray-500 dark:text-gray-400 my-2 justify-start items-start ">
            Uploaded by: {item.umail}
          </p>
          <p className="text-sm text-left text-gray-500 dark:text-gray-400 my-2">
            Uploaded on: {dayjs(item.uploadedOn).format('DD/MM/YYYY')}
          </p>
        </div>
      </button>
    </React.Fragment>
  );
}

export default DocCard;
