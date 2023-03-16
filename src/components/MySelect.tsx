import React from 'react';
import Select from 'react-select';
import FormField from './FormField';
// import 'react-select/dist/react-select.css';


const customStyles = {
  option: (provided, state) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    padding: "5px 10px",
    fontFamily: 'Inter',
    fontStyle: "normal",
    fontWight: "400",
    fontSize: "14px",
    lineHeight: "20px",
    color: "#101828",
    // marginTop: "100px",
   
  }),
  menu: (provided, state) => ({
    ...provided,
    marginTop: "10px", // Increase the top margin of the menu
  }),
};

const CustomOption = ({ data, innerRef, innerProps }) => (
  <div ref={innerRef} {...innerProps} className="flex items-center" style={{ marginRight: "15px",marginBottom: "50px", }}>
    <img src={data.icon} alt={data.label}  className="rounded-full mr-2 ml-1"/>
    {data.label}
  </div>
);
  
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
          components={{ Option: CustomOption }}
      styles={customStyles}
        />
        </div>
     
    );
  };
  
  export default MySelect;
 
  
  
  