import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../redux/store';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  Button,
  Input
} from '@nextui-org/react';
import Link from "next/link";

const LoginBox = () => {
  
  // form validation rules 
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email("Email is invalid"),
    password: Yup.string()
      .required('Password is required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data: any) {
    console.log('dd', data);
  }

  return (
    <div>
      <h3 
        className="f-size-lg font-medium"
        style={{
          marginBottom: "25px"    
        }}
      >
        Login
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mb-4">
          <label className="f-size-sm font-medium">E-Mail *</label>
          <p className="mb-1"></p>
          <Input
            className={`form-control ${errors["email"] ? 'is-invalid' : ''}`}
            type="text"
            {...register("email")}
          />
          <div className="invalid-feedback f-size-sm text-red-600">{errors["email"]?.message}</div>
        </div>
        <div className="form-group">
          <label className="f-size-sm font-medium">Password *</label>
          <p className="mb-1"></p>
          <Input
            className={`form-control ${errors["password"] ? 'is-invalid' : ''}`}
            type="password"
            {...register("password")}
          />
          <div className="invalid-feedback f-size-sm text-red-600">{errors["password"]?.message}</div>
        </div>
        <div className="form-group mb-2">
          <Button 
            auto 
            className="min-w-md f-size-sm font-medium text-skin-white rounded bg-skin-dark"
            type="submit"
            css={{
              height: "30px",
              lineHeight: "30px",
              marginTop: "30px",
              marginBottom: "25px"
            }}
          >
            Submit
          </Button>
        </div>
        <div className="form-group mb-4">
          <div className="f-size-sm">
            No Account?&nbsp;&nbsp;  
            <Link href="/register">
              <span style={{textDecoration: "underline"}}>Register here</span>
            </Link>&nbsp;or&nbsp;
            <Link href="/order">
              <span style={{textDecoration: "underline"}}>Order as a Guest</span>
            </Link>.
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginBox;
