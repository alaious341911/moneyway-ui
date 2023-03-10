import { options } from 'numeral';
import React from 'react';
import Select from 'react-select';
import FormField from './FormField';
// import 'react-select/dist/react-select.css';



  const SelectData = ({ value, setFieldValue, options, name}) => {
    const handleChange = (selectedOption) => {
        setFieldValue(name, selectedOption.value);
        alert(selectedOption.value)
    };

   
  
    return (
        <div>
      <label>Package</label>
        <Select
          options={options}
          value={options.find((option) => option.name === value)}
          onChange={handleChange}
          isSearchable
        />
        </div>
     
    );
  };
  
  export default SelectData;
 
  
  
  