import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { editPet } from "../slices/auth";
import EditPetForm from "./Modal/Form";
import PetService from "../services/pet.service";
import { useFormik } from "formik";
import { deletePet } from "../slices/auth";

function PetCard({ image, data }) {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [dict] = useState([]);
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const { name, age, breed, weight } = data;
  const id = currentUser?.id;
  const username = currentUser?.username;
  // Population of the pet breed select tag's options
  useEffect(() => {
    PetService.getDogBreeds().then((response) =>
      response.data.forEach((element) => {
        dict.push({
          value: element.name,
          label: element.name,
        });
      })
    );
  }, []);

  const editToggle = () => {
    toggle ? setToggle(false) : setToggle(true);
  };

  const validate = (values) => {
    const errors = {};
    // Name validation
    if (!values.name) {
      errors.name = "Please enter a valid name.";
    } else if (values.name.length < 3) {
      errors.name = "Name must be more than 2 characters.";
    } else if (values.name.length > 20) {
      errors.name = "Name must be less than 20 characters.";
    }
    // Age validation
    if (!values.age) {
      errors.age = "Please enter a valid age.";
    } else if (values.age > 30) {
      errors.age = "Age must be less than 30.";
    }
    // Weight validation
    if (!values.weight) {
      errors.weight = "Please enter a valid weight.";
    } else if (values.weight > 230) {
      errors.weight = "Weight must be less than 230lb.";
    }
    // Breed validation
    if (!values.breed) {
      errors.breed = "Please enter a valid breed.";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name,
      age,
      weight,
      breed,
    },
    validate,
    onSubmit: (values) => {
      const { name, age, breed, weight } = values;
      let target = data.name;

      dispatch(
        editPet({
          name,
          weight,
          age,
          breed,
          target,
          username,
          id,
        })
      );
      editToggle();
    },
  });

  // Delete selected pet
  function deletePetCell() {
    dispatch(
      deletePet({
        name,
        id,
      })
    );
  }

  return (
    <div className="rounded-xl bg-slate-300 hover:bg-slate-400 p-2 transform transition-all hover:translate-y-2 duration-300 hover:shadow-xl">
      {toggle ? (
        <div className="float-right p-3 text-white rounded bg-zinc-700">
          <button onClick={editToggle}>Cancel</button>
        </div>
      ) : (
        <div className="float-right p-3">
          <button onClick={editToggle} className="text-5xl rounded-2xl -mt-10">
            ...
          </button>
        </div>
      )}

      {toggle ? (
        <div className="m-4">
          <EditPetForm
            formik={formik}
            breeds={dict}
            onSubmit={formik.handleSubmit}
            submitBtnTitle="SAVE"
          />
          {/* Delete Pet Button */}
          <button
            className="rounded w-full bottom-12 p-3 bg-red-500 hover:bg-red-600 text-white"
            onClick={deletePetCell}
          >
            DELETE
          </button>
        </div>
      ) : (
        <>
          <div className="p-8 text-lg rounded-xl">
            <div className="sm:flex gap-12 items-center">
              <div>
                <Image src={image} alt="Pet thumbnail" width={72} height={76} />
              </div>
              <div>
                <h2 className="font-semibold text-2xl">{name}</h2>
                <h4>{breed}</h4>
              </div>
              <div>
                <h4>{age} years old</h4>
                <h4>{weight}lbs</h4>
              </div>
            </div>
          </div>{" "}
        </>
      )}
    </div>
  );
}

export default PetCard;
