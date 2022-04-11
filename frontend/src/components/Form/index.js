import { useState } from 'react';
import './form.css';

const Input = ({
  label_name,
  input_id,
  input_name,
  handleChange,
  formData,
  required,
}) => {
  return (
    <div className="input-component">
      <label htmlFor={input_id}>{label_name}</label>
      <input
        id={input_id}
        value={formData[input_name]}
        name={input_name}
        onChange={handleChange}
        required={required}
      />
    </div>
  );
};

const Form = ({ submit }) => {
  const [formData, setFormData] = useState({
    scoreX: '',
    scoreY: '',
  });
  const [errors, setErrors] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prevent submit if the form is not filled !
    if (formData.scoreX === '' || formData.scoreY === '') {
      setErrors('Please fill the form !');
    } else {
      submit(formData);
    }
  };

  const handleChange = (e) => {
    setErrors(null);
    const value = e.target.value;
    if (value === '') {
      setFormData({ ...formData, [e.target.name]: '' });
    } else if (!isNaN(parseInt(value))) {
      setFormData({ ...formData, [e.target.name]: parseInt(value) });
    }
  };

  return (
    <>
      <form>
        <div className="form-content">
          <Input
            label_name="team X"
            input_id="teamX"
            input_name="scoreX"
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
          <div className="divider"></div>
          <Input
            label_name="team Y"
            input_id="teamY"
            input_name="scoreY"
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
        </div>
        {errors && <div className="form-errors">{errors}</div>}
        <div className="form-action">
          <button type='submit' onClick={handleSubmit}>Ask possiblity to API</button>
        </div>
      </form>
    </>
  );
};

export default Form;
