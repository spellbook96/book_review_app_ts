import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Layout, Menu, message, Row } from "antd";
import React, { useEffect } from "react";
import "./css/Books.css";
import axios from "axios";
import {
  NavigateFunction,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import store from "../../../redux/store";
const { Header, Content, Footer, Sider } = Layout;

interface IReview {
  id: number;
  title: string;
  review: string;
  reviewer: string;
  url: string;
  details: string;
}
let navigate: NavigateFunction | ((arg0: string) => void);
export default function Books() {
  const [allReviewsList, setAllReviewsList] = React.useState<IReview[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currPage, setCurrPage] = React.useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  // store.subscribe(() => {
  //   setCurrPage(store.getState().PaginationReducer.currPage);
  // });
  navigate = useNavigate();
  useEffect(() => {
    // console.log("change page");
    const newPage = searchParams.has("offset")
      ? parseInt(searchParams.get("offset")!)
      : 0;
    setCurrPage(newPage);
    axios({
      url:
        "https://api-for-missions-and-railways.herokuapp.com/books?offset=" +
        newPage,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        // console.log(res.data);
        if (res.data.length === 0) {
          message.error("No more reviews");
          navigate("/books?offset=" + (newPage - 9));
          return "ERROR";
        }
        setAllReviewsList(res.data);
        setIsLoading(false);
        message.success(
          "Loaded page: " + (newPage + 1) + "~" + (newPage + 9),
          0.5
        );
        return "OK";
      })
      .catch((err) => {
        message.error("Cannot connect to server", 10);
        return "ERROR";
      });
  }, [searchParams]);

  // const detailURL = (id: number) => {
  //   let str: string = "/detail/" + id;
  //   return <a href={str}></a>;
  // };
  const renderReviews = (data: IReview[]) => {
    const res = data.filter((item, index) => index != 9);
    return res.map((item: IReview, index: number) => {
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

        <Col span={8} key={index + data.length}>
          <Card
            title={"『" + item.title + "』"}
            extra={<a href={"/detail/" + item.id}>More</a>}
            hoverable={true}
            onClick={() => {
              navigate("/detail/" + item.id);
            }}
            style={{ width: 300, height: 120, margin: 16 }}
            key={index + data.length * 2}>
            <p className="review-text" key={item.id}>
              {item.review}
            </p>
          </Card>
        </Col>
      );
    });
  };
  const makeLoadinglist = (n: number) => {
    let arr: any[] = [];
    for (let i = 0; i < n; i++) {
      arr.push(
        <Col span={8} key={i}>
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
        {isLoading ? makeLoadinglist(9) : renderReviews(allReviewsList)}
        {/* <Row gutter={16}>{renderReviews(allReviewsList)}</Row> */}
      </Row>
      <div style={{ textAlign: "center" }}>
        Show page {currPage + 1}-{currPage + 9}
      </div>
      <div style={{ margin: "auto", width: "35%" }}>
        <Button
          style={{ margin: 20, float: "left" }}
          onClick={() => {
            if (currPage !== 0) {
              setSearchParams({ offset: currPage - 9 + "" });
              setIsLoading(true);
            } else {
              message.error("Already at the top");
            }
          }}>
          Prev
        </Button>
        <Button
          style={{ margin: 20, float: "right" }}
          onClick={() => {
            setSearchParams({ offset: currPage - 9 + "" });
            setIsLoading(true);
            navigate("/books?offset=" + (currPage + 9));
          }}>
          Next
        </Button>
      </div>

      <div></div>
    </div>
  );
}
