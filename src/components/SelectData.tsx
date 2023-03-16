import React from 'react';
// import Select from 'react-select';
import FormField from './FormField';
import { useAppDispatch, useAppSelector} from '../stores/hooks'
import { setServiceId } from '../stores/internetSlice'
import { InternetPayloadObject } from '../interfaces';
import axios from '../stores/hooks'
import Select, { components } from 'react-select';


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
  <div ref={innerRef} {...innerProps} className="flex items-center" style={{ marginRight: "15px", marginBottom: "50px", }}>
    <img src={data.icon} alt={data.label}  className="rounded-full mr-2 ml-1" style={{ width: "20px", height: "20px", }}/>
    {data.label}
  </div>
);

  const SelectData = ({ value, setFieldValue, options, name, fetchDataVariation}) => {
    const IserviceState = useAppSelector((state) => state.internet.serviceId)
    const dispatch = useAppDispatch()

    console.log(IserviceState)
    

    
    const handleChange = (selectedOption) => {
       
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
 
  
  
  