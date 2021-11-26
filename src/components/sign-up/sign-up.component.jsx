import React, { useState } from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './sign-up.styles.scss';

import { signUpStart } from '../../redux/user/user.actions';

const SignUp = ({ signUpStart }) => {
   const [userCredentials, setCredentials] = useState({
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
   });

   const { displayName, email, password, confirmPassword } = userCredentials;

   const handleSubmit = async (event) => {
      event.preventDefault();

      if (password !== confirmPassword) {
         alert("password don't match");
         return;
      }

      signUpStart({ displayName, email, password });
   };

   const handleChange = (event) => {
      const { value, name } = event.target;
      setCredentials({ ...userCredentials, [name]: value });
   };

   return (
      <div className='sign-up'>
         <h2>I I do not have an account</h2>
         <span>Sign Up with your email and password</span>
         <form className='sign-up-form' onSubmit={handleSubmit}>
            <FormInput
               name='displayName'
               type='text'
               value={displayName}
               handleChange={handleChange}
               label='Display Name'
               required
            />
            <FormInput
               name='email'
               type='email'
               value={email}
               handleChange={handleChange}
               label='Email'
               required
            />
            <FormInput
               name='password'
               type='password'
               value={password}
               handleChange={handleChange}
               label='Password'
               required
            />
            <FormInput
               name='confirmPassword'
               type='password'
               value={confirmPassword}
               handleChange={handleChange}
               label='Confirm Password'
               required
            />
            <div className='buttons'>
               <CustomButton type='submit'>Sign Up</CustomButton>
            </div>
         </form>
      </div>
   );
};

const mapDispatchToProps = (dispatch) => ({
   signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials)),
});

export default connect(null, mapDispatchToProps)(SignUp);
