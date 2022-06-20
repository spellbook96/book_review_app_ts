import { Card, Col, message, Row } from "antd";
import axios from "axios";
import React, { useEffect } from "react";

interface IReview {
  id: number;
  title: string;
  review: string;
  reviewer: string;
  url: string;
  details: string;
  isMine: boolean;
}

export default function MyReviews() {
  const [allReviewsList, setAllReviewsList] = React.useState<IReview[]>([]);
  // const [isLoading, setIsLoading] = React.useState(true);
  useEffect(() => {
    axios({
      url: "https://api-for-missions-and-railways.herokuapp.com/books",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        // console.log(res.data);
        setAllReviewsList(res.data);
        // setIsLoading(false);
        message.success("Loaded: MyReviews");

        return "OK";
      })
      .catch((err) => {
        message.error("Cannot connect to server",10);
        return "ERROR";
      });
  }, []);
  return <div><Row gutter={16} key={1}>{renderMyReviews(allReviewsList)}</Row></div>;
}

function renderMyReviews(data: IReview[]) {
  // console.log(data.map((item: IReview) => {return item.isMine}));
  return data.map((item: IReview, index: number) => {
    return (
      item.isMine ? (
      <Col span={8} key={index + data.length}>
        <Card
          title={"『" + item.title + "』"}
          extra={<a href={"/detail/" + item.id}>More</a>}
          style={{ width: 300, height: 120, margin: 16 }}
          key={index + data.length * 2}>
          <p className="review-text" key={item.id}>
            {item.review}
          </p>
        </Card>
      </Col>
      ) : undefined
    );
  });
}
