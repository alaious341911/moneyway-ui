import React from 'react';
import Select from 'react-select';
import FormField from './FormField';
import { useAppDispatch, useAppSelector } from '../stores/hooks'
import { setServiceId } from '../stores/internetSlice'
import { InternetPayloadObject } from '../interfaces';
import axios from '../stores/hooks'
// import 'react-select/dist/react-select.css';



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
        />
        </div>
     
    );
  };
  
  export default SelectData;
 
  
  
  