import { Card, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {DeleteOutlined } from "@ant-design/icons";
interface IReview {
  id: string;
  title: string;
  review: string;
  reviewer: string;
  url: string;
  details: string;
  isMine: boolean;
}
function useGetDetail(id: string) {
  const [reviewData, setReviewData] = useState<IReview>({
    id: "",
    title: "",
    review: "",
    reviewer: "",
    url: "",
    details: "",
    isMine: false,
  });

  const newReviewData = {
    id: "",
    title: "",
    review: "",
    reviewer: "",
    url: "",
    details: "",
    isMine: false,
  };
  useEffect(() => {
    axios({
      method: "get",
      url: "https://api-for-missions-and-railways.herokuapp.com/books/" + id,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .catch((err) => {
        switch (err.response.status) {
          case 400:
            message.error("Validation error");
            break;
          case 403:
            message.error("You are not authorized use");
            break;
          case 404:
            message.error("This book is not reviewd yet");
            break;
          case 500:
            message.error("Error occured at server");
            break;
          default:
            message.error("Cannot connect to server");
            break;
        }
      })
      .then((res: any) => {
        console.log(res);
        newReviewData.id = res.data.id;
        newReviewData.title = res.data.title;
        newReviewData.review = res.data.review;
        newReviewData.reviewer = res.data.reviewer;
        newReviewData.url = res.data.url;
        newReviewData.details = res.data.detail;
        newReviewData.isMine = res.data.isMine;
        setReviewData(newReviewData);
      });
  }, []);
  return reviewData;
}

export default function ReviewDetail() {
  const data = useParams();
  const reviewData = useGetDetail(data.id as string);

  // console.log(data.id);
  return (
    <div>
      <Card title={"『" + reviewData.title + "』"} extra={operationBar()}>
        <Card type="inner" title="Book ID">
          {reviewData.id}
        </Card>
        <Card style={{ marginTop: 16 }} type="inner" title="Reviewer">
          {reviewData.reviewer}
        </Card>
        <Card style={{ marginTop: 16 }} type="inner" title="URL">
          {reviewData.url}
        </Card>
        <Card style={{ marginTop: 16 }} type="inner" title="Detail">
          {reviewData.details}
        </Card>
        <Card style={{ marginTop: 16 }} type="inner" title="Review">
          {reviewData.review}
        </Card>
      </Card>
    </div>
  );
}

const operationBar = () => {
  return (
    <div>
      <DeleteOutlined onClick={deleteClickHandle}/>
    </div>
  );
}

const deleteClickHandle=() =>{
    message.success("Deleted");
    return 1;
}