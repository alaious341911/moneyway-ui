import React from 'react';
import Select from 'react-select';
import FormField from './FormField';
// import 'react-select/dist/react-select.css';



// const options = [
//     { value: 'mtn', label: 'MTN' },
//     { value: 'glo', label: 'Glo' },
//     { value: 'airtel', label: 'Airtel' },
//     { value: '9mobile', label: '9Mobile' }
//   ];
  
  const MySelect = ({ value, setFieldValue, options, name}) => {
    const handleChange = (selectedOption) => {
        setFieldValue(name, selectedOption.value);
    };
  
    return (
        <div>
      <label>Network</label>
        <Select
          options={options}
          value={options.find((option) => option.value === value)}
          onChange={handleChange}
          isSearchable
        />
        </div>
     
    );
  };
  
  export default MySelect;
 
  
  
  