import * as React from "react";
import { Formik } from "formik";
import {
  SubmitButton,
  Input,
  Checkbox,
  ResetButton,
  FormikDebug,
  Form,
  FormItem,
} from "formik-antd";
import { message, Button, Row, Col } from "antd";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import store from "../../redux/store";
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
//   return value ? undefined : "required";
// }

interface ILogin {
  email: string;
  password: string;
}
const setUserName = (email: string, password: string) => {
  return axios({
    method: "get",
    url: "https://api-for-missions-and-railways.herokuapp.com/users",
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  })
    .catch((err) => {
      message.error("Try again later");
    })
    .then((res: any) => {
      console.log(res);
      localStorage.setItem("userName", res.data.name);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      store.dispatch({
        type: "SET_LOGIN",
        isLogin: true,
        userName: res.data.name,
        email: email,
        password: password,
      });
    });
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
export const Login: React.FC = () => {
  let navigate = useNavigate();
  console.log("checking login");
  if (store.getState().LoginReducer.isLogin || localStorage.getItem("token")) {
    navigate("/");
  }

  const doLogin = (values: ILogin) => {
    axios({
      method: "post",
      url: "https://api-for-missions-and-railways.herokuapp.com/signin",
      data: {
        email: values.email,
        password: values.password,
      },
    })
      .catch((err) => {
        console.log(err);
        switch (err.response.status) {
          case 403:
            message.error("Invalid email or password");
            break;
          case 404:
            message.error("Server connection failure");
            break;
          case 500:
            message.error("Error occurred at server.");
            break;
          default:
            message.error("Cannot connect database server.");
            break;
        }
      })
      .then((res: any) => {
        console.log(res.data);
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          setUserName(values.email, values.password).then(() => {
            message.success("Login successful, redirecting...",1);
            navigate("/");
          });
        }
      });
  };
  return (
    <div
      style={{
        background: "rgb(35, 39, 65)",
        height: "100vh",
        overflow: "hidden",
      }}>
      <div className="formContainer">
        <div className="logintitle">Login</div>
        <div
          style={{
            marginTop: 10,
          }}>
          <Formik
            initialValues={{
              email: "",
              password: "",
              remember: false,
            }}
            onSubmit={(values, actions) => {
              // message.success(JSON.stringify(values, null, 3));
              doLogin(values);
              console.log(values);
              actions.setSubmitting(false);
              navigate("/login");
              // actions.resetForm()
            }}
            validate={(values) => {
              const errors: any = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              if (!values.password) {
                errors.password = "Required";
              }
              return errors;
            }}
            // isValidating={true}
            // validate={values => {
            //   if (!values.lastName) {
            //     return { lastName: "required" }
            //   }
            //   return {}
            // }}
          >
            {() => (
              <Form
                name="normal_login"
                style={{ display: "grid", gridTemplateColumns: "1fr 46fr 1fr" }}
                // labelCol={{ xs: 12 }}
                // wrapperCol={{ xs: 20 }}
                {...layout}>
                <div style={{ flex: 1 }} />
                <div style={{ background: "white", flex: 1, padding: 40 }}>
                  <FormItem name="email" label="Email" required={true}>
                    <Input name="email" placeholder="Email" />
                  </FormItem>
                  <FormItem name="password" label="Password" required={true}>
                    <Input.Password name="password" placeholder="Password" />
                  </FormItem>
                  <FormItem
                    name="remember"
                    valuePropName="checked"
                    labelCol={{ xs: 4 }}
                    wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox name="remember">remember</Checkbox>
                  </FormItem>

                  {/* <Row style={{ marginTop: 60 }}>
                  <Col offset={8}> */}
                  {/* <Button.Group> */}
                  <Form.Item name="tailButton" {...tailLayout}>
                    <ResetButton>Reset</ResetButton>
                    <SubmitButton>Login</SubmitButton>
                    <Button type="link" htmlType="button" href="/signup">
                      Sign Up
                    </Button>
                  </Form.Item>
                  {/* </Button.Group> */}
                  {/* </Col>
                </Row> */}
                </div>
                <pre style={{ flex: 1 }}>
                  {/* <FormikDebug /> */}
                  <span></span>
                </pre>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
