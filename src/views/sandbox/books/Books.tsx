import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Card, Layout, Menu } from 'antd';
import React, { useEffect } from 'react';
import './css/Books.css';
import axios from 'axios';
const { Header, Content, Footer, Sider } = Layout;

interface IReview{

  id:number;
  title:string,
  review:string,
  reviewer:string,
  url:string,
  details:string;
}

export default function Books() {
  const [allReviewsList, setAllReviewsList] = React.useState<IReview[]>([]);
  
  useEffect (()=>{
    axios({url:"https://api-for-missions-and-railways.herokuapp.com/public/books",headers:{}}).then(
      (res)=>{
        // console.log(res.data);
        setAllReviewsList(res.data);
      }
    )
  } ,[])

  const detailURL = (id:number)=>{
    let str:string = '/detail/'+id;
    return <a href={str}></a>
  }
  const renderReviews = (data:IReview[]) => {
    return data.map((item:IReview, index:number) => {
      return (
        // <div className="review-item" key={index}>
        //   <div className="review-item-title">{item.title}</div>
        //   <div className="review-item-review">{item.review}</div>
        //   <div className="review-item-reviewer">{item.reviewer}</div>
        //   <div className="review-item-url">{item.url}</div>
        //   <div className="review-item-details">{item.details}</div>
        // </div>
        <Card title={item.title} extra={<a href={'/detail/'+item.id}>More</a>} style={{ width: 300,maxHeight: 300 }}>
        <p key={item.id}>{item.review}</p>
      </Card>
      );
    }
    );
  }
  return (
    <div>Content-books
      {renderReviews(allReviewsList)}
    </div>
  )
}