import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './sign-up.styles.scss';

import { signUpStart } from '../../redux/user/user.actions';

export class SignUp extends Component {
   constructor(props) {
      super(props);

      this.state = {
         displayName: '',
         email: '',
         password: '',
         confirmPassword: '',
      };
   }

   handleSubmit = async (event) => {
      event.preventDefault();
      const { displayName, email, password, confirmPassword } = this.state;
      const { signUpStart } = this.props;

      if (password !== confirmPassword) {
         alert("password don't match");
         return;
      }

      signUpStart({ displayName, email, password });
   };

   handleChange = (event) => {
      const { value, name } = event.target;
      this.setState({ [name]: value });
   };

   render() {
      const { displayName, email, password, confirmPassword } = this.state;
      return (
         <div className='sign-up'>
            <h2>I I do not have an account</h2>
            <span>Sign Up with your email and password</span>
            <form className='sign-up-form' onSubmit={this.handleSubmit}>
               <FormInput
                  name='displayName'
                  type='text'
                  value={displayName}
                  handleChange={this.handleChange}
                  label='Display Name'
                  required
               />
               <FormInput
                  name='email'
                  type='email'
                  value={email}
                  handleChange={this.handleChange}
                  label='Email'
                  required
               />
               <FormInput
                  name='password'
                  type='password'
                  value={password}
                  handleChange={this.handleChange}
                  label='Password'
                  required
               />
               <FormInput
                  name='confirmPassword'
                  type='password'
                  value={confirmPassword}
                  handleChange={this.handleChange}
                  label='Confirm Password'
                  required
               />
               <div className='buttons'>
                  <CustomButton type='submit'>Sign Up</CustomButton>
               </div>
            </form>
         </div>
      );
   }
}

const mapDispatchToProps = (dispatch) => ({
   signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials)),
});

export default connect(null, mapDispatchToProps)(SignUp);
