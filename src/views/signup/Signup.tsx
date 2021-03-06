import * as React from "react";
import { Formik, FormikHelpers } from "formik";
import {
  SubmitButton,
  Input,
  ResetButton,
  FormikDebug,
  Form,
  FormItem,
} from "formik-antd";
import { message, Button } from "antd";
import "./Signup.css";
import axios from "axios";
import store from "../../redux/store";
import { NavigateFunction, useNavigate } from "react-router-dom";
// interface IErr {
//   [key: string]: string;
// }
// const validate = (values:any, props:any /* only available when using withFormik */) => {
//   const errors : IErr = {};

//   if (!values.email) {
//     errors.email = 'Required';
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = 'Invalid email address';
//   }

//   return errors;
// }

// function validateRequired(value: string) {
//   return value ? undefined : "required1";
// }

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
export const Signup: React.FC = () => {
 const navigate = useNavigate();
  
  return (
    <div
      style={{
        background: "rgb(35, 39, 65)",
        height: "100vh",
        overflow: "hidden",
      }}>
      <div className="formContainer">
        <div className="logintitle">Signup</div>
        <div
          style={{
            marginTop: 10,
          }}>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              passwordConfirm: "",
            }}
            onSubmit={(values, actions) => handleSubmit(values, actions,navigate)}
              // actions.resetForm()

            validate={(values) => validator(values)}
          >
            <Form
              style={{ display: "grid", gridTemplateColumns: "1fr 45fr 1fr" }}
              // labelCol={{ xs: 12 }}
              // wrapperCol={{ xs: 20 }}
              {...layout}>
              <div style={{ flex: 1 }} />
              {/* <FormikDebug/> */}
              <div style={{ background: "white", flex: 1, padding: 40 }}>
                <FormItem name="name" label="Name" required={true}>
                  <Input name="name" placeholder="Name" /><span/>
                </FormItem>
                <FormItem name="email" label="Email" required={true}>
                  <Input name="email" placeholder="Email" /><span/>
                </FormItem>
                <FormItem name="password" label="Password" required={true}>
                  <Input.Password name="password" placeholder="Password" /><span/>
                </FormItem>
                <FormItem
                  name="passwordConfirm"
                  label="Confirm"
                  required={true}>
                  <Input.Password
                    name="passwordConfirm"
                    placeholder="PasswordConfirm"
                  />
                </FormItem>
                {/* <Row style={{ marginTop: 60 }}>
                    <Col offset={8}> */}
                {/* <Button.Group> */}
                <Form.Item name="tailButton" {...tailLayout}>
                  <ResetButton>Reset</ResetButton>
                  <SubmitButton>Submit</SubmitButton>
                  <Button type="link" htmlType="button" href="/login">
                    Login
                  </Button>
                </Form.Item>
                {/* </Button.Group> */}
                {/* </Col>
                  </Row> */}
              </div>
              <pre style={{ flex: 1 }}>
            
              </pre>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default Signup;

function validator(values: {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}): any {
  const errors: any = {};
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = "Required";
  } else if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = "passwords must match";
  }
  // console.log(errors);
  return errors;
}



function handleSubmit(values: { name: string; email: string; password: string; passwordConfirm: string; }, actions: FormikHelpers<{ name: string; email: string; password: string; passwordConfirm: string; }>,navigate: NavigateFunction): any {
  {
    doSignup(values).then(() => {
      actions.setSubmitting(false);
      navigate("/login");
    })
}
}

const doSignup = (values: any) => {
  return axios({
    method: "post",
    url: "https://api-for-missions-and-railways.herokuapp.com/users",
    data: {
      name: values.name,
      email: values.email,
      password: values.password,
    },
  })
    .catch((err) => {
      message.error("ERROR");
    })
    .then((res: any) => {
      console.log(res);
      console.log(res.data.token);
      message.success("Success");
      store.dispatch({ type: "SET_LOGIN", isLogin: true });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", values.name);
      localStorage.setItem("email", values.email);
      localStorage.setItem("password", values.password);
    });
};