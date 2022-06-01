import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  Checkbox,
  Button,
  Input
} from '@nextui-org/react';

const CheckoutAddressForm = () => {

  const dispatch = useDispatch();

  // form validation rules 
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('First Name is required'),
    lastName: Yup.string()
      .required('Last name is required'),
    company: Yup.string()
      .required('Company is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    street: Yup.string()
      .required('Street is invalid')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const generalFormData = [
    {
      name: "firstName",
      label: "First Name",
      required: true
    }, {
      name: "lastName",
      label: "Last Name",
      required: true
    }, {
      name: "company",
      label: "Company",
      required: true
    }, {
      name: "phoneNumber",
      label: "Phone Number",
      required: false
    }, {
      name: "email",
      label: "E-mail",
      required: true
    }
  ];

  const shippingAddressFormData = [
    {
      name: "street",
      label: "Street",
      required: false
    }, {
      name: "plz",
      label: "PLZ",
      required: false
    }, {
      name: "ort",
      label: "Ort",
      required: false
    }, {
      name: "addressSupplement",
      label: "Address Supplement",
      required: false
    }, {
      name: "email",
      label: "Room Information (Floor/Building/Stand)",
      required: false
    }
  ];

  function onSubmit(data: any) {
    console.log('dd', data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className="container p-0"
        style={{
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <div className="row">
          <h3 className="f-size-md lg:f-size-lg font-medium mb-4">
            General Data
          </h3>
          {
            generalFormData.map((o: any, idx: any) => (
              <div 
                key={`gf${idx}`}
                className="sm:col-12 md:col-6 form-group mb-2"
              >
                <label className="f-size-sm font-medium">{o.label} {o.required ? "*" : ""}</label>
                <p className="mb-1"></p>
                <Input
                  className={o.required ? (`form-control ${errors[o.name] ? 'is-invalid' : ''}`) : "form-control"}
                  type="text"
                  {...register(o.name)}
                />
                {
                  o.required 
                  ? <div className="invalid-feedback f-size-sm text-red-600">{errors[o.name]?.message}</div>
                  : null 
                }
              </div>
            ))
          }
        </div>
      </div>
      
      <div
        className="container p-0"
        style={{
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <div className="row">
          <h3 className="f-size-md lg:f-size-lg font-medium mb-4">
            Shipping Address
          </h3>
          {
            shippingAddressFormData.map((o: any, idx: any) => (
              <div
                key={`saddr${idx}`}
                className="sm:col-12 md:col-6 form-group mb-2"
              >
                <label className="f-size-sm font-medium">{o.label} {o.required ? "*" : ""}</label>
                <p className="mb-1"></p>
                <Input
                  className={o.required ? (`form-control ${errors[o.name] ? 'is-invalid' : ''}`) : "form-control"}
                  type="text"
                  {...register(o.name)}
                />
                {
                  o.required 
                  ? <div className="invalid-feedback f-size-sm text-red-600">{errors[o.name]?.message}</div>
                  : null 
                }
              </div>
            ))
          }
          <div className="sm:col-12 md:col-12 form-group mb-2">
            <p className="mb-1"></p>
            <Checkbox 
              className="form-control"
              size="sm" 
              color="primary"
              name="addressConfirmation"
            >
              Billing address differs from delivery address
            </Checkbox>
          </div>
        </div>
      </div>
      <div className="sm:col-12 md:col-12 form-group">
        <Button 
          auto 
          className="min-w-md f-size-sm font-medium text-skin-white rounded bg-skin-dark"
          type="submit"
          css={{
            height: "30px",
            lineHeight: "30px"
          }}
        >
          Next Step
        </Button>
      </div>
    </form>
  );
};

export default CheckoutAddressForm;
