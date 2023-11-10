import React from "react";
import CustomSelect from "../CustomSelect";
import toast, { Toaster } from "react-hot-toast";
export default function PetForm(props) {
  return (
    <form onSubmit={props.onSubmit} className="flex flex-col gap-y-8">
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          className="input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={props.formik.handleChange}
          onBlur={props.formik.handleBlur}
          value={props.formik.values.name}
        />
        {props.formik.touched.name && props.formik.errors.name ? (
          <div className="text-red-500 text-xs italic">
            {props.formik.errors.name}
          </div>
        ) : null}
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input
          id="age"
          name="age"
          type="number"
          className="input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={props.formik.handleChange}
          value={props.formik.values.age}
        />
        {props.formik.touched.age && props.formik.errors.age ? (
          <div className="text-red-500 text-xs italic">
            {props.formik.errors.age}
          </div>
        ) : null}
      </div>
      <div>
        <label htmlFor="weight">Weight</label>
        <input
          id="weight"
          name="weight"
          type="number"
          className="input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={props.formik.handleChange}
          onBlur={props.formik.handleBlur}
          value={props.formik.values.weight}
        />
        {props.formik.touched.weight && props.formik.errors.weight ? (
          <div className="text-red-500 text-xs italic">
            {props.formik.errors.weight}
          </div>
        ) : null}
      </div>
      <CustomSelect
        className="input"
        id="breed"
        name="breed"
        onChange={(value) => props.formik.setFieldValue("breed", value.value)}
        onBlur={props.formik.handleBlur}
        value={props.formik.values.breed}
        options={props.breeds}
      />
      {props.formik.touched.breed && props.formik.errors.breed ? (
        <div className="text-red-500 text-xs italic -mt-8">
          {props.formik.errors.breed}
        </div>
      ) : null}
      <Toaster />
      <button
        className="rounded p-3 mt-8 bg-orange-500 hover:bg-orange-600 text-white w-full"
        type="submit"
      >
        {props.submitBtnTitle}
      </button>
    </form>
  );
}
