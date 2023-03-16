import { options } from 'numeral';
import React from 'react';
import Select from 'react-select';
import FormField from './FormField';
// import 'react-select/dist/react-select.css';


const CustomOption = ({ data, innerRef, innerProps }) => (
  <div ref={innerRef} {...innerProps} className="flex items-center" style={{ marginRight: "5px",marginBottom: "30px", }}>
    {data.label}
  </div>
);
  const SelectDataVariation = ({ value, setFieldValue, options, name, amount, originalPayload}) => {
    const handleChange = (selectedOption) => {
      const filteredPayload = originalPayload.filter(item => item.variation_code === selectedOption.value);
        setFieldValue(name, selectedOption.value);
        setFieldValue(amount, filteredPayload[0].variation_amount)
         console.log(filteredPayload[0].variation_amount)
    };

   
  
    return (
        <div>
      <label>Package</label>
        <Select
          options={options}
          value={options.find((option) => option.name === value)}
          onChange={handleChange}
          isSearchable
          components={{ Option: CustomOption }}
        />
        </div>
     
    );
  };
  
  export default SelectDataVariation;
 
  
  
  