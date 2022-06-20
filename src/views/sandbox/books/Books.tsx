import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Card, Col, Layout, Menu, message, Row } from "antd";
import React, { useEffect } from "react";
import "./css/Books.css";
import axios from "axios";
import { useParams } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

interface IReview {
  id: number;
  title: string;
  review: string;
  reviewer: string;
  url: string;
  details: string;
}

export default function Books() {
  const [allReviewsList, setAllReviewsList] = React.useState<IReview[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  useEffect(() => {
    axios({
      url: "https://api-for-missions-and-railways.herokuapp.com/public/books",
      headers: {},
    }).then((res) => {
      // console.log(res.data);
      setAllReviewsList(res.data);
      setIsLoading(false);
      message.success("Loaded: All Reviews");
      return "OK";
    })
    .catch((err) => {
      message.error("Cannot connect to server",10);
      return "ERROR";
    }
    );
  }, []);

  const detailURL = (id: number) => {
    let str: string = "/detail/" + id;
    return <a href={str}></a>;
  };
  const renderReviews = (data: IReview[]) => {
    return data.map((item: IReview, index: number) => {
      return (
        // <div className="review-item" key={index}>
        //   <div className="review-item-title">{item.title}</div>
        //   <div className="review-item-review">{item.review}</div>
        //   <div className="review-item-reviewer">{item.reviewer}</div>
        //   <div className="review-item-url">{item.url}</div>
        //   <div className="review-item-details">{item.details}</div>
        // </div>
        // isLoading
        ///
        index !== 9 ? (
        <Col span={8} key={index+data.length}>
          <Card
            title={"『" + item.title + "』"}
            extra={<a href={"/detail/" + item.id}>More</a>}
            style={{ width: 300, height: 120, margin: 16 }} key={index+data.length*2}>
            <p className="review-text" key={item.id}>
              {item.review}
            </p>
          </Card>
        </Col>
        ) : undefined
      );
    });
  };
  const makeLoadinglist = (n: number) => {
    let arr: any[] = [];
    for (let i = 0; i < n; i++) {
      arr.push(
        <Col span={8}>
          <Card
            loading={true}
            style={{ width: 300, height: 120, margin: 16 }}></Card>
        </Col>
      );
    }
    return arr;
  };
  return (
    <div>
      {/* Content-books */}
      <Row gutter={16} key={1}>
        {isLoading ? makeLoadinglist(9) :  renderReviews(allReviewsList) }
        {/* <Row gutter={16}>{renderReviews(allReviewsList)}</Row> */}
      </Row>
    </div>
  );
}
