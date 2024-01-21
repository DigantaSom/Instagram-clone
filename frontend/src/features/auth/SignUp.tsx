import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  FormControl,
  Input,
  FormErrorMessage,
  Button,
  useToast,
} from '@chakra-ui/react';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { RootState } from '../../redux/store';
import { SignUpFormFields } from '../../redux/auth/auth.types';

import authActions from '../../redux/auth/auth.actions';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';

import Logo from '../../img/ig-logo.png';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(5, 'Password must be at least 5 characters')
    .required('Password is required'),
});

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const signedUpUser = useAppSelector((state: RootState) => state.auth.signup);
  const toast = useToast();

  const initialValues: SignUpFormFields = {
    email: '',
    name: '',
    username: '',
    password: '',
  };

  useEffect(() => {
    if (signedUpUser?.username) {
      navigate('/login');

      toast({
        title: `Welcome to Instagram, @${signedUpUser.username}`,
        description: 'Your account has been created.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [navigate, signedUpUser?.username, toast]);

  const handleSubmit = (
    values: SignUpFormFields,
    actions: FormikHelpers<SignUpFormFields>
  ) => {
    dispatch(authActions.signUpAction(values) as any);
    actions.setSubmitting(false);
  };

  const goToSignIn = () => {
    navigate('/login');
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

                <Field name='name'>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <Input
                        {...field}
                        id='name'
                        placeholder='Full Name'
                        className='w-full'
                      />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name='username'>
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.username && form.touched.username}
                    >
                      <Input
                        {...field}
                        id='username'
                        placeholder='Username'
                        className='w-full'
                      />
                      <FormErrorMessage>
                        {form.errors.username}
                      </FormErrorMessage>
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
                  Sign up
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </div>

      <div className='w-full border border-slate-300 mt-5 p-2'>
        <p className='text-sm text-center py-2'>
          Have an account?
          <span
            onClick={goToSignIn}
            className='ml-1 text-blue-700 hover:cursor-pointer'
          >
            Log in
          </span>
        </p>
      </div>
    </>
  );
};

export default SignUp;
