import React, { useMemo } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

function CourseSelector({ Options, setOptions, onApply, isButtonDisabled }) {
  const handleChange = (type) => (data) => setOptions({ ...Options, [type]: data });

  const CourseOptions = [
    {
      value: 'CSE',
      label: 'Computer Science Engineering'
    },
    {
      value: 'ECE',
      label: 'Electronics and Communication Engineering'
    },
    {
      value: 'EE',
      label: 'Electrical Engineering'
    },
    {
      value: 'ME',
      label: 'Mechanical Engineering'
    },
    {
      value: 'CE',
      label: 'Civil Engineering'
    }
  ];

  const SemesterOptions = Array(8)
    .fill(0)
    .map((_, index) => {
      return {
        value: index + 1,
        label: `${index + 1} Semester`
      };
    });

  const isSubmitDisabled = useMemo(() => {
    if (Options?.semester?.value != undefined && Options?.course?.value != undefined) return false;
    return true;
  }, [Options]);

  return (
    <React.Fragment>
      <Select
        placeholder="Select Course"
        className="flex-1"
        options={CourseOptions}
        isSearchable={false}
        onChange={handleChange('course')}
      />
      <Select
        placeholder="Select Semester"
        className="flex-1"
        options={SemesterOptions}
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
