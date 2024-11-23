import React from 'react';
import styled from 'styled-components';

const FormWrapper = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .form-control {
    margin: 10px;
    padding: 10px;
    width: 200px;
    border: 1px solid #ced4da;
    border-radius: 5px;
    font-size: 16px;
  }

  .form-control:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }

  .btn {
    margin: 10px;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }

  .btn:hover {
    background-color: #0056b3;
  }
`;

const SearchForm = () => {
  return (
    <FormWrapper>
      <input type="text" className="form-control" placeholder="Départ" />
      <input type="text" className="form-control" placeholder="Destination" />
      <input type="date" className="form-control" />
      <input type="number" className="form-control" placeholder="1 passager" />
      <button type="submit" className="btn">Rechercher</button>
    </FormWrapper>
  );
};

export default SearchForm;
