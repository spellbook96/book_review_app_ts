import { Avatar, message } from "antd";
import { Formik, FormikHelpers, FormikProps } from "formik";
import {
  FormikDebug,
  Input,
  ResetButton,
  SubmitButton,
  Form,
} from "formik-antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import "./Profile.css";
import axios from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";
import store from "../../../redux/store";
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
function postName( userName:string){
  console.log(userName);
  axios({
    method: "put",
    url: "https://api-for-missions-and-railways.herokuapp.com/users",
    data: {
      name: userName,
    },
    headers:{
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }).catch(err => {
    switch(err.response.status){
      case 403:
        message.error("You are not authorized to do this");
        break;
      case 400:
        message.error("400:Validation error");
        break;
      case 500:
        message.error("Error occurred at server",10);
        break;
      default:
        message.error("Cannot connect to server",10);
    }
  }).then((res:any)=>{
    if(res.status === 200){
    message.success("Name updated",5);
    store.dispatch({type:'UPDATE_NAME',userName:userName});
    navigate("/");
    }
    else{
      message.error("Cannot update name",5);
    }
  })
}
let navigate: NavigateFunction = () => {};
export default function Profile() {
  navigate = useNavigate();
  return (
    <div style={{}}className="newReviewContainer"> 
      <div className="profileAvatar" ><Avatar size={150} gap={20}  icon={<UserOutlined /> } /></div>
      <Formik
        initialValues={{
          userName: localStorage.getItem("userName"),
          email: localStorage.getItem("email"),
          password: localStorage.getItem("password"),
          token: localStorage.getItem("token"),
        }}
        onSubmit={(values, actions) => handleSubmit(values, actions)}
        validate={(values) => handleValidate(values)}>
        {(props) => myRender(props)}
      </Formik>
    </div>
  );
}

function handleSubmit(
  values: {
    userName: string | null;
    email: string | null;
    password: string | null;
    token: string | null;
  },
  action: FormikHelpers<{
    userName: string | null;
    email: string | null;
    password: string | null;
    token: string | null;
  }>
) {
  postName(values.userName as string);
  action.setSubmitting(false);
}

function myRender(
  props: FormikProps<{
    userName: string | null;
    email: string | null;
    password: string | null;
    token: string | null;
  }>
) {
  return (
    <div>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal">
        <Form.Item name="userName"  label="Name">
          <Input name="userName" />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input name="email" disabled={true} />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input disabled={true} name="password" />
        </Form.Item>
        <Form.Item name="token" label="Token">
          <Input disabled={true} name="token" />
        </Form.Item>
        <Form.Item name="submit" {...tailLayout}>
          <ResetButton>Reset</ResetButton>
          <SubmitButton onClick={() => props.handleSubmit()}>Submit</SubmitButton>
        </Form.Item>

        </Form>
    </div>
  );
}

function handleValidate(values: {
  userName: string | null;
  email: string | null;
  password: string | null;
  token: string | null;
}) {
  const error: any = {};
  if (values.userName === "") {
    error.userName = "Name Required";
  }
  return error;
}
