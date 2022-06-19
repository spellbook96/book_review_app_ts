import { Card, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

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
      newReviewData.details = res.data.details;
      newReviewData.isMine = res.data.isMine;
      setReviewData(newReviewData);
    });

  return reviewData;
}

export default function ReviewDetail() {
  const data = useParams();
  const reviewData = useGetDetail(data.id as string);

  // console.log(data.id);
  return (
    <div>
      <Card title={"『" + reviewData.title + "』"}>
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
