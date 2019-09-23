import React, { Component } from 'react';
import { DatePicker, Icon } from 'antd';
import { InputNumber } from 'antd';
import { signup,role, checkUsernameAvailability, checkEmailAvailability } from '../../util/APIUtils';
import './Signup.css';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Select, AutoComplete } from 'antd';

import {
    NAME_MIN_LENGTH,
    NAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH,
    USERNAME_MAX_LENGTH,
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH
} from '../../constants';

import { Form, Input, Button, notification } from 'antd';
import { startOfToday, isToday } from 'date-fns/esm';
const FormItem = Form.Item;
const dateFormat = 'DD/MM/YYYY';
const { Option } = Select;



class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: ''
            },
            username: {
                value: ''
            },
            pen: {
                value: ''
            },
            rank: {
                value: ''
            },
            unit: {
                value: ''
            },
            dob: {
                value: ''
            },
            doe: {
                value: ''
            },

            email: {
                value: ''
            },
            password: {
                value: ''
            },
            utype: {
                value: ''
            },
            unit: {
                value: ''
            },
            allUnits: {
                dataSource: ["SAP", "KAP1", "KAP2", "Alappuzha", "Kollam Rural", "Kottayam", "Idukki"]
            },

        }
        this.onAutoCompleteChange = this.onAutoCompleteChange.bind(this);
        this.onSearch = this.onSearch.bind(this);

        this.onselectChange = this.onselectChange.bind(this);

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
        this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }


    onAutoCompleteChange(val) {

        this.setState({
            ["unit"]: {
                value: val
            }
        });

    }


    onselectChange(val,name) {
const inputName = name;
          this.setState({
              [inputName]: {
                  value: val
              }
          });

      }

    /*onselectChange(value, name) {
        const inputName = name;
        const val = this.value;


        this.setState({
            [inputName]: {
                value: val
            }
        });
    }*/
    onSearch = searchText => {
        //we can set an API call to get unit names

    };
    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;


        this.setState({
            [inputName]: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }


    handleDateChange(date, dateString, name) {
        const inputName = name;
        const val = moment(dateString, 'DD-MM-YYYY');


        this.setState({
            [inputName]: {
                value: val
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const signupRequest = {
            name: this.state.name.value,
            email: this.state.email.value,
            username: this.state.username.value,
            password: this.state.password.value,
            pen: this.state.pen.value,
            rank: this.state.rank.value,
            unit: this.state.unit.value,
            dob: this.state.dob.value,
            doe: this.state.doe.value,
            utype: this.state.utype.value
        };
        signup(signupRequest)
            .then(response => {
                notification.success({
                    message: 'Kerala Police CCTNS App',
                    description: "Thank you! You're successfully registered. Please Login to continue!",
                });
                this.props.history.push("/login");
            }).catch(error => {
                notification.error({
                    message: 'Kerala Police CCTNS APP',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            });
    }

    isFormInvalid() {
        return !(this.state.name.validateStatus === 'success' &&
            this.state.username.validateStatus === 'success' &&
            this.state.email.validateStatus === 'success' &&
            this.state.password.validateStatus === 'success'
        );
    }

    render() {
        return ( <
            div className = "signup-container" >
            <
            h1 className = "page-title" > Sign Up < /h1> <
            div className = "signup-content" >
            <
            Form onSubmit = { this.handleSubmit }
            className = "signup-form" >
            <
            FormItem label = "Officer Full Name"
            validateStatus = { this.state.name.validateStatus }
            help = { this.state.name.errorMsg } >

            <
            Input size = "large"
            name = "name"
            autoComplete = "off"
            placeholder = "Your full name"
            value = { this.state.name.value }
            onChange = {
                (event) => this.handleInputChange(event, this.validateName)
            }
            />   </FormItem >
            <
            FormItem label = "Login Name"
            hasFeedback validateStatus = { this.state.username.validateStatus }
            help = { this.state.username.errorMsg } >
            <
            Input size = "large"
            name = "username"
            autoComplete = "off"
            placeholder = "A unique username"
            value = { this.state.username.value }
            onBlur = { this.validateUsernameAvailability }
            onChange = {
                (event) => this.handleInputChange(event, this.validateUsername)
            }
            />        < /
            FormItem > <
            FormItem label = "PEN"
            hasFeedback validateStatus = { this.state.username.validateStatus }
            help = { this.state.pen.errorMsg } >
            <
            Input size = "large"
            name = "pen"
            autoComplete = "off"
            placeholder = "A unique username"
            value = { this.state.pen.value }
            onBlur = { this.validateUsernameAvailability }
            onChange = {
                (event) => this.handleInputChange(event, this.validateUsername)
            }
            /> < /
            FormItem >

            <
            FormItem label = "Officer Rank" >
            <Select
            name = "rank"
                showSearch
                style={{ width: 200 }}
                onChange = { (value) => this.onselectChange(value,"rank") }
              /*  DatePicker onChange = {
                    (date, dateString) => this.handleDateChange(date, dateString, "dob")*/
                //onSearch = { this.onSearch }
                placeholder="Select Your Rank"
                optionFilterProp="ISHO"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="1">ISHO</Option>
                <Option value="2">SI</Option>
                <Option value="3">SCPO</Option>
                <Option value="4">ASI</Option>
                <Option value="5">CPO</Option>
              </Select>
            < / FormItem >

            <
            FormItem label = "Police Station / Unit" >
            <
            AutoComplete dataSource = {
                this.state.allUnits.dataSource
            }
            style = {
                { width: 200 }
            }
            value = { this.state.unit.value }
            filterOption = {
                (inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
            //onSelect = { this.onAutoCompleteSelect }
            onChange = { this.onAutoCompleteChange }
            //onSearch = { this.onSearch }
            placeholder = "select unit" /
            >
            <
            /
            FormItem >

            <
            FormItem label = "Date Of Birth" >
            <
            DatePicker onChange = {
                (date, dateString) => this.handleDateChange(date, dateString, "dob")
            }
            name = "dob"
            format = { dateFormat }
            defaultValue = {
                moment('01-01-2000')
            }
            value = { this.state.dob.value }
            /> < /
            FormItem >

            <
            FormItem label = "Date Of Entry"
            validateStatus = { this.state.password.validateStatus }
            help = { this.state.password.errorMsg } >
            <
            DatePicker selected = { this.state.startDate }
            onChange = {
                (date, dateString) => this.handleDateChange(date, dateString, "doe")
            }
            name = "doe"
            defaultValue = {
                moment('01-01-2000')
            }
            format = { dateFormat }
            value = { this.state.doe.value }
            /> < /
            FormItem >

            <
            FormItem label = "User Role" >
            <Select
            name = "utype"
                showSearch
                style={{ width: 200 }}
              //  onChange = { this.onselectChange }
              onChange = { (value) => this.onselectChange(value,"utype") }
                //onSearch = { this.onSearch }
                placeholder="Select User Type"
                optionFilterProp="User"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="4">ISHO</Option>
                <Option value="2">ADMIN</Option>
                <Option value="5">GD Charge</Option>
                <Option value="3">IO</Option>
                <Option value="1">USER</Option>
              </Select>

            <
            /FormItem>

            <
            FormItem label = "Email"
            hasFeedback validateStatus = { this.state.email.validateStatus }
            help = { this.state.email.errorMsg } >
            <
            Input size = "large"
            name = "email"
            type = "email"
            autoComplete = "off"
            placeholder = "Your email"
            value = { this.state.email.value }
            onBlur = { this.validateEmailAvailability }
            onChange = {
                (event) => this.handleInputChange(event, this.validateEmail)
            }
            /> < /
            FormItem >


            <
            FormItem label = "Password"
            validateStatus = { this.state.password.validateStatus }
            help = { this.state.password.errorMsg } >
            <
            Input size = "large"
            name = "password"
            type = "password"
            autoComplete = "off"
            placeholder = "A password between 6 to 20 characters"
            value = { this.state.password.value }
            onChange = {
                (event) => this.handleInputChange(event, this.validatePassword)
            }
            />      < /
            FormItem > <
            FormItem >
            <
            Button type = "primary"
            htmlType = "submit"
            size = "large"
            className = "signup-form-button"
            disabled = { this.isFormInvalid() } > Sign up < /Button>
            Already registed ? < Link to = "/login" > Login now! < /Link> < /
            FormItem > <
            /Form>  < /
            div > <
            /div>
        );
    }

    // Validation Functions

    validateName = (name) => {
        if (name.length < NAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
            }
        } else if (name.length > NAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }

    validateEmail = (email) => {
        if (!email) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email may not be empty'
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if (!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email not valid'
            }
        }

        if (email.length > EMAIL_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
            }
        }

        return {
            validateStatus: null,
            errorMsg: null
        }
    }

    validateUsername = (username) => {
        if (username.length < USERNAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
            }
        } else if (username.length > USERNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: null,
                errorMsg: null
            }
        }
    }

    validateUsernameAvailability() {
        // First check for client side errors in username
        const usernameValue = this.state.username.value;
        const usernameValidation = this.validateUsername(usernameValue);

        if (usernameValidation.validateStatus === 'error') {
            this.setState({
                username: {
                    value: usernameValue,
                    ...usernameValidation
                }
            });
            return;
        }

        this.setState({
            username: {
                value: usernameValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkUsernameAvailability(usernameValue)
            .then(response => {
                if (response.available) {
                    this.setState({
                        username: {
                            value: usernameValue,
                            validateStatus: 'success',
                            errorMsg: null
                        }
                    });
                } else {
                    this.setState({
                        username: {
                            value: usernameValue,
                            validateStatus: 'error',
                            errorMsg: 'This username is already taken'
                        }
                    });
                }
            }).catch(error => {
                // Marking validateStatus as success, Form will be recchecked at server
                this.setState({
                    username: {
                        value: usernameValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            });
    }

    validateEmailAvailability() {
        // First check for client side errors in email
        const emailValue = this.state.email.value;
        const emailValidation = this.validateEmail(emailValue);

        if (emailValidation.validateStatus === 'error') {
            this.setState({
                email: {
                    value: emailValue,
                    ...emailValidation
                }
            });
            return;
        }

        this.setState({
            email: {
                value: emailValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkEmailAvailability(emailValue)
            .then(response => {
                if (response.available) {
                    this.setState({
                        email: {
                            value: emailValue,
                            validateStatus: 'success',
                            errorMsg: null
                        }
                    });
                } else {
                    this.setState({
                        email: {
                            value: emailValue,
                            validateStatus: 'error',
                            errorMsg: 'This Email is already registered'
                        }
                    });
                }
            }).catch(error => {
                // Marking validateStatus as success, Form will be recchecked at server
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            });
    }

    validatePassword = (password) => {
        if (password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
            }
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }

//load role from server
//componentDidMount() {
   // role()
    //  .then(response => response.json())
     // .then(data => this.setState({ data }));
 // }
}


export default Signup;
