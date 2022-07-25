import { useState } from "react"
import { useDispatch } from "react-redux";
import { addActivity } from "../redux/actions";

export const useForm = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    
    if(name === 'countries' && value !== '') {
      const search = form.countries.find(c => c === value)
      if(!search) {
        setForm({
          ...form,
          countries: form.countries.concat(value)
        })
      }
    } else if (name !== 'countries'){
      setForm({
        ...form,
        [name]: value
      });
    }
  }

  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validateForm(form));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(form));
    if(Object.keys(errors).length === 0) {
      dispatch(addActivity(form));
      e.target.reset();
      setForm(initialForm);
    }
  }

  return {
    form,
    errors,
    handleChange,
    handleBlur,
    handleSubmit
  }
}