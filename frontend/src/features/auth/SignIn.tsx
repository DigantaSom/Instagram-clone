import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { RootState } from '../../redux/store';
import { SignInFormFields } from '../../redux/auth/auth.types';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import authActions from '../../redux/auth/auth.actions';
import userActions from '../../redux/user/user.actions';

import Logo from '../../img/ig-logo.png';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(5, 'Password must be at least 5 characters')
    .required('Password is required'),
});

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.reqUser);
  const jwt = localStorage.getItem('token');

  const initialValues: SignInFormFields = { email: '', password: '' };

  useEffect(() => {
    if (jwt) {
      dispatch(userActions.getUserProfile(jwt) as any);
    }
  }, [dispatch, jwt]);

  useEffect(() => {
    if (user?.username) {
      navigate('/' + user.username);
    }
  }, [navigate, user?.username]);

  const handleSubmit = (
    values: SignInFormFields,
    actions: FormikHelpers<SignInFormFields>
  ) => {
    dispatch(authActions.signInAction(values) as any);
    actions.setSubmitting(false);
  };

  const goToSignUp = () => {
    navigate('/signup');
  };

  return (
    <>
      <div className='border border-slate-300'>
        <Box p={8} display='flex' flexDirection='column' alignItems='center'>
          <img src={Logo} alt='Logo' className='mb-5' />

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {formikProps => (
              <Form className='space-y-8'>
                <Field name='email'>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <Input
                        {...field}
                        id='email'
                        placeholder='Email'
                        className='w-full'
                      />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name='password'>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                    >
                      <Input
                        {...field}
                        id='Password'
                        placeholder='Password'
                        className='w-full'
                      />
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <p className='text-sm text-center'>
                  People who use our service may have uploaded your contact
                  information to Instagram. Learn more
                </p>
                <p className='text-sm text-center'>
                  By signing up, you agree to our Terms, Privacy Policy and
                  Cookies Policy
                </p>
                <Button
                  type='submit'
                  mt={4}
                  colorScheme='blue'
                  className='w-full'
                  isLoading={formikProps.isSubmitting}
                >
                  Log in
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </div>

      <div className='w-full border border-slate-300 mt-5 p-2'>
        <p className='text-sm text-center py-2'>
          Don't have an account?
          <span
            onClick={goToSignUp}
            className='ml-1 text-blue-700 hover:cursor-pointer'
          >
            Sign Up
          </span>
        </p>
      </div>
    </>
  );
};

export default SignIn;
