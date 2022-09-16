import React, { Component } from "react";

export class NewsItem extends Component {
  // //Constructor for class NewsItem
  // constructor(){
  //   super();
  //   console.log("This is constructor")
  // }
  render() {
    let { title, mydesc, imgUrl, newsUrl,author,date} = this.props;
    return (
      <>
        <div className="my-4">
          <div className="card" >
            <img src={imgUrl} className="card-img-top" alt="..." />
            <div className="card-body">
              <h4 className="card-title"> {title}</h4>
              <p className="card-text">{mydesc}</p>
              <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>

              <a href={newsUrl} target ="_blank" className="btn btn-sm btn-primary">
                Read More
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default NewsItem;
