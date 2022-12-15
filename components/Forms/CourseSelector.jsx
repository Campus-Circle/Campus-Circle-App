import React, { useMemo } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { courseOptions, semesterOptions } from '../../utils/constants';

function CourseSelector({ Options, setOptions, onApply, isButtonDisabled }) {
  const handleChange = (type) => (data) => setOptions({ ...Options, [type]: data });

  const isSubmitDisabled = useMemo(() => {
    if (Options?.semester?.value != undefined && Options?.course?.value != undefined) return false;
    return true;
  }, [Options]);

  return (
    <React.Fragment>
      <Select
        placeholder="Select Course"
        className="flex-1"
        options={courseOptions}
        isSearchable={false}
        onChange={handleChange('course')}
      />
      <Select
        placeholder="Select Semester"
        className="flex-1"
        options={semesterOptions}
        onChange={handleChange('semester')}
        isSearchable={false}
      />
      <button
        className="btn flex-1"
        onClick={onApply}
        disabled={isSubmitDisabled}
        style={{
          display: isButtonDisabled ? 'none' : 'block'
        }}>
        Apply
      </button>
    </React.Fragment>
  );
}

CourseSelector.propTypes = {
  Options: PropTypes.object,
  setOptions: PropTypes.func,
  onApply: PropTypes.func,
  isButtonDisabled: PropTypes.bool
};

export default CourseSelector;
