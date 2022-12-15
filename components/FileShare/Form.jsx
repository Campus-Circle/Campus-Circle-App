import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Image from 'next/image';
import Select from 'react-select';

import CampusCircle from '../../assets/CampusCircle.svg';
import useFileShare from '../../hooks/useFileShare';
import { courseOptions, semesterOptions } from '../../utils/constants';

const typeOptions = ['Notes', 'PYQ'];

function FileShareForm() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm();
  const { uploadStorage } = useFileShare();

  const onSubmit = async (data) => {
    console.log(data);
    const result = await uploadStorage(data);
    console.log(result);
  };

  /**
   * ? Type
   * ? Course
   * ? Semester
   * ? File Upload
   */

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-5">
      <Image src={CampusCircle} alt="Campus Circle" width={50} height={50} />
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 my-2">
        Add your notes, pyqs and other study material here.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-4 justify-center w-1/2 h-full p-5">
        <Controller
          control={control}
          name="type"
          rules={{ required: true }}
          render={({ field: { onChange, value, ref } }) => (
            <Select
              ref={ref}
              className="w-full"
              placeholder="Type"
              options={typeOptions.map((item) => ({
                value: item,
                label: item
              }))}
              onChange={(val) => onChange(val.value)}
            />
          )}
        />
        {errors.type && <p className="text-red-500">This field is required</p>}

        <Controller
          control={control}
          name="course"
          rules={{ required: true }}
          render={({ field: { onChange, value, ref } }) => (
            <Select
              ref={ref}
              className="w-full"
              placeholder="Course"
              options={courseOptions}
              onChange={(val) => onChange(val.value)}
            />
          )}
        />
        {errors.course && <p className="text-red-500">This field is required</p>}

        <Controller
          control={control}
          name="semester"
          rules={{ required: true }}
          render={({ field: { onChange, value, ref } }) => (
            <Select
              ref={ref}
              className="w-full"
              placeholder="Semester"
              options={semesterOptions}
              onChange={(val) => onChange(val.value)}
            />
          )}
        />

        {errors.semester && <p className="text-red-500">This field is required</p>}

        <input
          type="text"
          placeholder="Enter Title"
          className="input w-full input-sm input-bordered"
          {...register('title', { required: true })}
        />
        {errors.title && <p className="text-red-500">This field is required</p>}

        <div className="divider" />

        <input
          type="text"
          placeholder="Enter URL"
          className="input w-full"
          {...register('url', {
            required: false
          })}
        />
        {errors.url && <p className="text-red-500">This field is required</p>}
        <div className="divider">OR</div>
        <input
          type="file"
          {...register('file', {
            required: false
          })}
          className="w-full file-input file-input-ghost"
        />
        {errors.file && <p className="text-red-500">This field is required</p>}
        <input type="submit" className="btn btn-secondary w-full" />
      </form>
    </div>
  );
}

export default FileShareForm;
