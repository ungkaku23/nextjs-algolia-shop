import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  Button,
  Input
} from '@nextui-org/react';

const CheckoutConfirmation = () => {

  const dispatch = useDispatch();

  // form validation rules 
  const validationSchema = Yup.object().shape({
    lastName: Yup.string()
      .required('Last Name is required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data: any) {
    console.log('dd', data);
  }

  return (
    <>
      <div
        className="container p-0"
        style={{
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <div className="row">
          <h3 className="f-size-md lg:f-size-lg font-medium mb-4">
            Verification Of Our Information
          </h3>
          <div className="sm:col-12 md:col-6 form-group mb-2 f-size-sm">
            <div className="font-medium mb-4">Shipping Address</div>
            <div>
              Apple <br/>
              Michael Reich <br/>
              Schwere-Reiter-Strasse 16 <br/>
              DE-80797 Munich <br/>
            </div>
          </div>
          <div className="sm:col-12 md:col-6 form-group mb-2 f-size-sm">
            <div className="font-medium mb-4">Billing Address</div>
            <div>
              Apple <br/>
              Michael Reich <br/>
              Schwere-Reiter-Strasse 16 <br/>
              DE-80797 Munich <br/>
            </div>
          </div>
          <div className="sm:col-12 md:col-6 form-group mt-4 f-size-sm">
            Rechnung senden an: hello@reich-michael.com
          </div>
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
            Events
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="f-size-sm sm:col-12 md:col-6 form-group mb-2">
              <div className="font-medium mb-4">Buffet Window</div>
              <div>
                <label className="f-size-sm font-medium">Last Name *</label>
                <p className="mb-1"></p>
                <Input
                  className={`form-control ${errors["lastName"] ? 'is-invalid' : ''}`}
                  type="text"
                  {...register("lastName")}
                />
                <div className="invalid-feedback f-size-sm text-red-600">{errors["lastName"]?.message}</div>
              </div>
            </div>
            <div className="sm:col-12 md:col-12 form-group mt-4">
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
        </div>
      </div>
    </>
  );
};

export default CheckoutConfirmation;
