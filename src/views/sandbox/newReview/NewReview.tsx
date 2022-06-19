import { message } from "antd";
import axios from "axios";
import { Formik, FormikHelpers, FormikProps } from "formik";
import {
  Form,
  FormikDebug,
  Input,
  ResetButton,
  SubmitButton,
} from "formik-antd";
import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
let navigate: NavigateFunction = () => {};
export default function NewReview() {
  navigate = useNavigate();
  return (
    <div className="newReviewContainer">
      NewReview
      <Formik
        initialValues={{
          title: "",
          url: "",
          detail: "",
          review: "",
        }}
        onSubmit={(values, actions) => handleSubmit(values, actions)}
        validate={(values) => handleValidate(values)}>
        {(props) => myRender(props)}
      </Formik>
    </div>
  );
}

function handleSubmit(
  values: { title: string; url: string; detail: string; review: string },
  actions: FormikHelpers<{
    title: string;
    url: string;
    detail: string;
    review: string;
  }>
): any {
  console.log(values);
  console.log("123");
  let res = postReview(values) as string;
  console.log(res);
  if (res === "OK") {
    navigate("/");
  }else{
    actions.setSubmitting(false);
    navigate("/new")
  }
}

function postReview(values: {
  title: string;
  url: string;
  detail: string;
  review: string;
}): any {
  axios({
    method: "post",
    url: "https://api-for-missions-and-railways.herokuapp.com/new",
    data: {
      title: values.title,
      url: values.url,
      detail: values.detail,
      review: values.review,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .catch((err: { response: { status: any } }) => {
      switch (err.response.status) {
        case 403:
          message.error("You are not authorized use");
          break;
        case 400:
          message.error("validation error");
          message.error("ERROR");
          break;
        case 500:
          message.error("Error occurred at server.");
          break;
        default:
          message.error("Cannot connect to server");
      }
      return "NO";
    })
    .then((res: any) => {
      if (res.status === 200) {
        message.success("Review posted successfully");
        return "OK";
      }
    });
}
function handleValidate(values: {
  title: string;
  url: string;
  detail: string;
  review: string;
}): any {
  let errors: any = {};
  if (!values.title) errors.title = "Title is required";
  if (!values.review) errors.review = "Review is required";
  return errors;
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
function myRender(
  props: FormikProps<{
    title: string;
    url: string;
    detail: string;
    review: string;
  }>
): JSX.Element {
  return (
    <div>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal">
        <Form.Item name="title" label="Title" required={true}>
          <Input name="title" allowClear={true} />
          <span />
        </Form.Item>
        <Form.Item name="url" label="URL" required={false}>
          <Input name="url" allowClear={true} />
          <span />
        </Form.Item>
        <Form.Item name="detail" label="Detail" required={false}>
          <Input name="detail" allowClear={true} />
          <span />
        </Form.Item>
        <Form.Item name="review" label="Review" required={true}>
          <Input.TextArea
            name="review"
            rows={4}
            allowClear={true}
            showCount={true}
          />
          <span />
        </Form.Item>
      </Form>
      <Form.Item name="tailButton" {...tailLayout}>
        <ResetButton>Reset</ResetButton>
        <SubmitButton onClick={() => props.handleSubmit()}>Submit</SubmitButton>
      </Form.Item>
      <FormikDebug />
    </div>
  );
}
