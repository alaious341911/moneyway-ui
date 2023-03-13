import { options } from 'numeral';
import React from 'react';
import Select from 'react-select';



  const SelectBankList = ({ value, setFieldValue, options, name, setShowAccountFiled}) => {
    const handleChange = (selectedOption) => {
       setFieldValue(name, selectedOption.value);
       setShowAccountFiled(true)
    };

   
  
    return (
        <div className='mb-5'>
      <label>Bank</label>
        <Select
          options={options}
          value={options.find((option) => option.name === value)}
          onChange={handleChange}
          isSearchable
        />
        </div>
     
    );
  };
  
  export default SelectBankList;
 
  
  
  