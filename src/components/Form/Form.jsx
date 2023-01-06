import { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Validator from 'simple-react-validator';

import { addCustomer } from '../../actions/customers';
import { FieldName } from '../../constants';

import './style.css';

const VALIDATION_RULES = {
  [FieldName.FirstName]: 'required|alpha_space',
  [FieldName.LastName]: 'required|alpha_space',
  [FieldName.Email]: 'required|email',
  [FieldName.BirthDate]: 'required|regex:[0-9]{4}-[0-9]{2}-[0-9]{2}',
};

const DEFAULT_FORM_DATA = {
  [FieldName.FirstName]: '',
  [FieldName.LastName]: '',
  [FieldName.Email]: '',
  [FieldName.BirthDate]: '',
};

const Form = () => {
  const validatorRef = useRef(
    new Validator({
      element: (message) => <p className="form__error">{message}</p>,
    }),
  );
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [, setIsError] = useState(false);

  const dispatch = useDispatch();

  const handleFieldChange = useCallback(
    (name) => (evt) => {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: evt.target.value }));
    },
    [],
  );

  const handleSubmit = useCallback(
    (evt) => {
      evt.preventDefault();
      if (validatorRef.current.allValid()) {
        dispatch(addCustomer(formData));
        setFormData(DEFAULT_FORM_DATA);
        validatorRef.current.hideMessages();
        setIsError(false);
      } else {
        validatorRef.current.showMessages();
        setIsError(true);
      }
    },
    [formData, dispatch],
  );

  return (
    <form action="#" className="form" onSubmit={handleSubmit}>
      <div className="form__field">
        <label htmlFor={FieldName.FirstName} className="form__label">
          First name:
        </label>
        <input
          type="text"
          name={FieldName.FirstName}
          id={FieldName.FirstName}
          value={formData[FieldName.FirstName]}
          className="form__input"
          placeholder="Please, type your first name..."
          onChange={handleFieldChange(FieldName.FirstName)}
        />
        {validatorRef.current.message(
          FieldName.FirstName,
          formData[FieldName.FirstName],
          VALIDATION_RULES[FieldName.FirstName],
        )}
      </div>
      <div className="form__field">
        <label htmlFor={FieldName.LastName} className="form__label">
          Last name:
        </label>
        <input
          type="text"
          name={FieldName.LastName}
          id={FieldName.LastName}
          value={formData[FieldName.LastName]}
          className="form__input"
          placeholder="Please, type your last name..."
          onChange={handleFieldChange(FieldName.LastName)}
        />
        {validatorRef.current.message(
          FieldName.LastName,
          formData[FieldName.LastName],
          VALIDATION_RULES[FieldName.LastName],
        )}
      </div>
      <div className="form__field">
        <label htmlFor={FieldName.Email} className="form__label">
          Email:
        </label>
        <input
          type="email"
          name={FieldName.Email}
          id={FieldName.Email}
          value={formData[FieldName.Email]}
          className="form__input"
          placeholder="Please, type your email..."
          onChange={handleFieldChange(FieldName.Email)}
        />
        {validatorRef.current.message(
          FieldName.Email,
          formData[FieldName.Email],
          VALIDATION_RULES[FieldName.Email],
        )}
      </div>
      <div className="form__field">
        <label htmlFor={FieldName.BirthDate} className="form__label">
          Date of birth:
        </label>
        <input
          type="date"
          name={FieldName.BirthDate}
          id={FieldName.BirthDate}
          value={formData[FieldName.BirthDate]}
          className="form__input"
          placeholder="Please, type your date of birth..."
          onChange={handleFieldChange(FieldName.BirthDate)}
        />
        {validatorRef.current.message(
          FieldName.BirthDate,
          formData[FieldName.BirthDate],
          VALIDATION_RULES[FieldName.BirthDate],
        )}
      </div>
      <button type="submit" className="form__submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
