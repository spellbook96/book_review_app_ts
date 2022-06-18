import * as React from "react";
import { Formik } from "formik";
import {
  SubmitButton,
  Input,
  ResetButton,
  FormikDebug,
  Form,
  FormItem,
} from "formik-antd";
import { message, Button,} from "antd";
import "./Signup.css";
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
function validateRequired(value: string) {
  return value ? undefined : "required";
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
export const Signup: React.FC = () => {
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
              email: "",
              password: "",
              passwordConfirm: "",
            }}
            onSubmit={(values, actions) => {
              message.success(JSON.stringify(values, null, 3));

              console.log(values);
              actions.setSubmitting(false);
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
              if (!values.passwordConfirm) {
                errors.passwordConfirm = "required";
              } else if (values.password !== values.passwordConfirm) {
                errors.passwordConfirm = "passwords must match";
              }
              console.log(errors);
              return errors;
            }}
            // isValidating={true}
            // validate={values => {
            //   if (!values.lastName) {
            //     return { lastName: "required" }
            //   }
            //   return {}
            // }}
            render={() => (
              <Form
                name="basic"
                style={{ display: "grid", gridTemplateColumns: "1fr 46fr 1fr" }}
                // labelCol={{ xs: 12 }}
                // wrapperCol={{ xs: 20 }}
                {...layout}>
                <div style={{ flex: 1 }} />
                  {/* <FormikDebug /> */}
                <div style={{ background: "white", flex: 1, padding: 40 }}>
                  <FormItem
                    name="email"
                    label="Email"
                    required={true}
                    validate={validateRequired}>
                    <Input name="email" placeholder="Email" />
                  </FormItem>
                  <FormItem
                    name="password"
                    label="Password"
                    required={true}
                    validate={validateRequired}>
                    <Input.Password name="password" placeholder="Password" />
                  </FormItem>
                  <FormItem
                    name="passwordConfirm"
                    label="Confirm"
                    required={true}
                    validate={validateRequired}>
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
                  <span></span>
                </pre>
              </Form>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
