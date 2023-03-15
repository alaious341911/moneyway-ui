import React from 'react';
// import Select from 'react-select';
import FormField from './FormField';
import { useAppDispatch, useAppSelector } from '../stores/hooks'
import { setServiceId } from '../stores/internetSlice'
import { InternetPayloadObject } from '../interfaces';
import axios from '../stores/hooks'
import Select, { components } from 'react-select';
// import 'react-select/dist/react-select.css';


const CustomOption = ({ data, innerRef, innerProps }) => (
  <div ref={innerRef} {...innerProps} className="flex items-center">
    <img src={data.icon} alt={data.label} style={{ marginRight: "10px" }} className="rounded-full mr-2 ml-1"/>
    {data.label}
  </div>
);

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
    marginTop: "50px",
   
  }),
  menu: (provided, state) => ({
    ...provided,
    marginTop: "20px", // Increase the top margin of the menu
  }),
};

  const SelectData = ({ value, setFieldValue, options, name, fetchDataVariation}) => {
    const IserviceState = useAppSelector((state) => state.internet.serviceId)
    const dispatch = useAppDispatch()

    console.log(IserviceState)
    

    
    const handleChange = (selectedOption) => {
        // const ppt: InternetPayloadObject = {
        //     serviceId: [{ variation_code: "mtn-10mb-100",
        //     name: "N100 100MB - 24 hrs",
        //     variation_amount: "100.00",
        //     fixedPrice: "Yes"}],
        //     // Add any additional properties from the interface as needed
        //   };
        console.log(selectedOption.value)
          fetchDataVariation(selectedOption.value)
        setFieldValue(name, selectedOption.value);

       
        // dispatch(setServiceId(ppt))
        // console.log(IserviceState)
    };
  
    return (
        <div>
      <label>Service Provider</label>
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
  
  export default SelectData;
 
  
  
  