import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 2,
    };
  }

  //componentDitMount is executed after execution of constructor and render
  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=28c5caa07c7f4470bc70a9289ef1ac98&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  //componentDitMount is executed after execution of constructor and render
  async componentDidMount() {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=28c5caa07c7f4470bc70a9289ef1ac98&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  handlePrevClick = async () => {
    // this.setState({ loading: true });
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=28c5caa07c7f4470bc70a9289ef1ac98&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`;
    // let data = await fetch(url);
    // let parsedData = await data.json();

    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // });
    this.setState({
      page: this.state.page - 1
    });
    this.updateNews();

  };

  handleNextClick = async () => {
    // if (
    //   this.state.page + 1 >
    //   Math.ceil(this.state.totalResults / this.props.pageSize)
    // ) {
    // } else {
    //   this.setState({ loading: true });
    //   let url = `https://newsapi.org/v2/top-headlines?country=${
    //     this.props.country
    //   }&category=${
    //     this.props.category
    //   }&apiKey=28c5caa07c7f4470bc70a9289ef1ac98&page=${
    //     this.state.page + 1
    //   }&pageSize=${this.props.pageSize}`;
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false,
    //   });
    // }
    this.setState({
      page: this.state.page + 1,
    });
    this.updateNews();

  };

  render() {
    return (
      <div className="container my-3">
        <h2 style={{ margin: "40px 0px" }} className="text-center">
          Times of India - Top Headlines{" "}
        </h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  mydesc={element.description}
                  imgUrl={element.urlToImage}
                  newsUrl={element.url}
                  title={element.title}
                  author={element.author}
                  date={element.publishedAt}
                />
              </div>
            );
          })}
        </div>
        <div className="d-flex justify-content-around my-4">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
