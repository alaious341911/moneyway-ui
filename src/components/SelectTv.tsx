import React from 'react';
import Select from 'react-select';
import FormField from './FormField';
import { useAppDispatch, useAppSelector } from '../stores/hooks'
import { setServiceId } from '../stores/internetSlice'
import { InternetPayloadObject } from '../interfaces';
import axios from '../stores/hooks'
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
  <div ref={innerRef} {...innerProps} className="flex items-center" style={{ marginRight: "15px", marginBottom: "50px", }}>
    <img src={data.icon} alt={data.label}  className="rounded-full mr-2 ml-1" style={{ width: "40px", height: "40px", }}/>
    {data.label}
  </div>
);


  const SelectTv = ({ value, setFieldValue, options, name, fetchTvVariation}) => {
    // const IserviceState = useAppSelector((state) => state.internet.serviceId)
    // const dispatch = useAppDispatch()

    // console.log(IserviceState)
    

    
    const handleChange = (selectedOption) => {
        // const ppt: InternetPayloadObject = {
        //     serviceId: [{ variation_code: "mtn-10mb-100",
        //     name: "N100 100MB - 24 hrs",
        //     variation_amount: "100.00",
        //     fixedPrice: "Yes"}],
        //     // Add any additional properties from the interface as needed
        //   };
        console.log(selectedOption.value)
          fetchTvVariation(selectedOption.value)
        setFieldValue(name, selectedOption.value);

       
        // dispatch(setServiceId(ppt))
        // console.log(IserviceState)
    };
  
    return (
        <div>
      <label>Subscription Type</label>
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
  
  export default SelectTv;
 
  
  
  