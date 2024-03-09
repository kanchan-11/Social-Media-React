import { Button, TextField } from "@mui/material";
import { ErrorMessage, Form, Formik, Field } from "formik";
import React, { useState } from "react";
import * as Yup from "yup"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch } from "react-redux";
import { RegisterUserAction } from "../../redux/Auth/auth.action";
import { useNavigate } from "react-router-dom";

const initialValues = { firstName: "", lastName: "", email: "", password: "", gender: "" }
const validationSchema = {
    email: Yup
        .string()
        .email("Invalid Email")
        .required("Email is required")
    , password: Yup
        .string()
        .min(6, "Password must be atleast 6 characters").
        required("Password is required")
}
const Register = () => {
    
    const [gender, setGender] = useState("");
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const handleSubmit = (values) => {
        values.gender = gender
        console.log("handle submit", values)
        dispatch(RegisterUserAction({ data: values }))
    }
    const handleChange = (event) => {
        setGender(event.target.value)
    }
    return (
        <>
            <Formik onSubmit={handleSubmit}
                // validationSchema={validationSchema} 
                initialValues={initialValues}
            >
                <Form className="space-y-5">
                    <div className="space-y-5">
                        <div>
                            <Field
                                as={TextField}
                                name="firstName"
                                placeholder="Frist Name"
                                type="text"
                                variant="outlined"
                                fullWidth
                            />
                            <ErrorMessage
                                name="firstName"
                                component="div"
                                className="text-red-500"
                            />
                        </div>
                        <div>
                            <Field
                                as={TextField}
                                name="lastName"
                                placeholder="Last Name"
                                type="text"
                                variant="outlined"
                                fullWidth
                            />
                            <ErrorMessage
                                name="lastName"
                                component="div"
                                className="text-red-500"
                            />
                        </div>
                        <div>
                            <Field
                                as={TextField}
                                name="email"
                                placeholder="email"
                                type="email"
                                variant="outlined"
                                fullWidth
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500"
                            />
                        </div>
                        <div>
                            <Field
                                as={TextField}
                                name="password"
                                placeholder="password"
                                type="password"
                                variant="outlined"
                                fullWidth
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500"
                            />
                        </div>
                        <RadioGroup
                            onChange={handleChange}
                            row
                            aria-label="gender"
                            name="gender"
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </RadioGroup>
                        <ErrorMessage
                            name="gender"
                            component="div"
                            className="text-red-500"
                        />
                    </div>
                    <Button sx={{ padding: ".8rem 0rem" }} fullWidth type="submit"
                        variant="contained" color="primary">
                        Register
                    </Button>
                </Form>
            </Formik>
            <div className="flex gap-2 items-center justify-center pt-5">
                <p>Already have an account?</p>
                <Button onClick={()=>navigate("/login")}>Login</Button>
            </div>
        </>
    )
}
export default Register