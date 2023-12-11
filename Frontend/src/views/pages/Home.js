
import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
import axios from 'axios';
import moment from 'moment';

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import CardsFooter from "components/Footers/CardsFooter.js";

// index page sections
import Download from "../IndexSections/Download.js";
import Navbar from "components/Navbars/Navbar.js";
import { Link } from "react-router-dom";


function extractContent(s) {
  var span = document.createElement('span');
  span.innerHTML = s;
  return span.textContent || span.innerText;
};


async function getAllPost() {
  return axios({
    method: 'get',
    url: 'http://localhost:8080/api/posts/',
    headers: {
      Accept: "application/json",
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      crossdomain: true
    },
  }).then(function (response) {
    console.log(response);
    let array = [];
    response.data.map((val, index) => {

      let text = extractContent(val.author).replaceAll('\n', " ")
      text = text.length > 30 ? text.substring(0, 30) : text;
      let postedTime = moment().diff(moment(val.pubDate), 'minutes')

      if (postedTime < 60) {
        postedTime = postedTime + " mins ago"
      } else if (postedTime < 1440) {
        postedTime = Math.floor(postedTime / 60) + " hours ago"
      } else if (postedTime < 43200) {
        postedTime = Math.floor(postedTime / 1440) + " days ago"
      } else if (postedTime < 518400) {
        postedTime = Math.floor(postedTime / 43200) + " months ago"
      } else {
        postedTime = Math.floor(postedTime / 518400) + " years ago"
      }

      let blogImg = ["Blogger1.png", "Blogger2.jpg", "Blogger3.jpg", "Blogger4.jpg", "Blogger5.png", "Blogger6.png"]
      let postimg = ["grill.png", "baking.jpg", "Marinate.png", "BakingSoda.png", "Bread.png", "Pan.png"]

      array.push({
        id: val.postID,
        tags: val.tags,
        postImg: postimg[index % 6],
        title: val.title,
        text: text,
        posterIcon: blogImg[index % 6],
        posterName: val.blog.user.fullName,
        postDate: moment(val.pubDate).format("DD MMM YYYY"),
        postPeriod: postedTime
      })
    })
    // console.log(array);

    return array.reverse();
  }).catch(function (error) {
    console.log(error);
  });
}

class Landing extends React.Component {

  state = {
    data: [],
    pageNum: 1
  };


  changePage = (num, totalPageNum) => {
    let tmpPageNum = 1;
    if(num<0){
      tmpPageNum = this.state.pageNum - 1 > 0 ? this.state.pageNum - 1 : 1
    }else if(num == 0){
      tmpPageNum = this.state.pageNum + 1 <= totalPageNum ? this.state.pageNum + 1 : totalPageNum
    }else{
      tmpPageNum = num
    }
    this.setState({
      pageNum: tmpPageNum
    })
  }

  componentDidMount() {
    let data = getAllPost().then(res =>
      this.setState({
        data: res
      })
    );

  }

  render() {
    let totalPageNum = Math.ceil(this.state.data.length / 6)

    let postArray = [
      {
        id: 1,
        tags: ["Spices", "Culinary"],
        postImg: "grill.png",
        title: "Grill Hack: How To Grill Fish Over Citrus",
        text: "If you’re ready to add some zest to your regular grilling routine, grilling fish over citrus is a fast and easy option to add to your repertoire.",
        posterIcon: "Blogger1.png",
        posterName: "Dianne Russell",
        postDate: "10 August 2023",
        postPeriod: "6 min"
      },
      {
        id: 2,
        tags: ["Organic", "Fresh Produce"],
        postImg: "baking.jpg",
        title: "Adapting to the latest bakery trends",
        text: "BakeAway’s Doug Hall explains how the bake-at-home manufacturer has adapted its product range to suit consumer needs.",
        posterIcon: "Blogger2.jpg",
        posterName: "Kathryn Murphy",
        postDate: "10 July 2023",
        postPeriod: "8 min"
      },
      {
        id: 3,
        tags: ["International Recipes", "World Cuisine"],
        postImg: "Marinate.png",
        title: "Marinade Myths And How To Add Flavor More Effectively",
        text: "Most marinades are liquids that foods swim in before cooking. But marinades themselves are bathed in myth and mystery.",
        posterIcon: "Blogger3.jpg",
        posterName: "Darrell Steward",
        postDate: "01 October 2023",
        postPeriod: "5 min"
      },
      {
        id: 4,
        tags: ["Veganism", "Plant-Based Diet"],
        postImg: "BakingSoda.png",
        title: "How Baking Soda Really Works",
        text: "The funny thing about baking soda is that there are approximately a gazillion uses htmlFor it besides the singular usage spelled out in its very name.",
        posterIcon: "Blogger4.jpg",
        posterName: "Mark Smith",
        postDate: "11 November 2023",
        postPeriod: "6 min"
      },
      {
        id: 5,
        tags: ["Culinary", "Creative Cooking"],
        postImg: "Bread.png",
        title: "Break Up With Your Toaster, Pan-Fry Your Bread Instead",
        text: "Slices crisped in oil add a whole new dimension to your bread-based meals—which, with toast this good, is basically every meal.",
        posterIcon: "Blogger5.png",
        posterName: "Melissa Ricks",
        postDate: "07 January 2023",
        postPeriod: "8 min"
      },
      {
        id: 6,
        tags: ["Healthy Eating", "Green Living"],
        postImg: "Pan.png",
        title: "The Best Nonstick Pans, Tested and Reviewed",
        text: "If cooking were a video game, using nonstick pans would be like playing on easy mode",
        posterIcon: "Blogger6.png",
        posterName: "Dianne Steward",
        postDate: "23 October 2023",
        postPeriod: "5 min"
      }
    ];
    return (
      <>
        <Navbar className="" />

        <main className="">
          <section className="bg-primary pt-5 text-white">
            <div className="container mb-4 py-5">
              <h1 className="display-5 fw-bold text-white">Foodista! Food Blog</h1>
              <p className="fs-3 mb-0 text-white">The Ultimate Foodies delight!</p>
            </div>
          </section>
          <section className="pb-3 pt-3">
            <div className="container pb-5 pt-5">
              <h2 className="h5 text-primary">Latest Articles</h2>
              <h3 className="h1 text-dark">Feast of Flavors</h3>
              <p className="lead mb-4">Welcome to Foodista! The Feast of Flavors and Culinary Adventure beyond the ordinary. We are a food blog
                where every recipe tells a story and every dish takes you on a journey. We explore the uncharted territories of taste,
                bringing you a blend of classic favorites with a twist and exotic dishes from corners of the globe you've yet to discover.
              </p>
              <div className="gy-4 row">
                <div className="col-lg-8 col-xl-9">
                  <div className="gy-4 mb-5 row">
                    {
                      (() => {
                        if (this.state.data.length > 0) {
                          let container = [];
                          let startItem = 0 + 6 * (this.state.pageNum - 1);
                          let enditem = 6 + 6 * (this.state.pageNum - 1);
                          enditem = enditem < this.state.data.length ? enditem : this.state.data.length;
                          // console.log(startItem)
                          // console.log(enditem)

                          for (startItem; startItem < enditem; startItem++) {
                            let val = this.state.data[startItem]
                            container.push(
                              <div className="col-md-6">
                                <div className="card h-100">
                                  {/* <Link to={`posts/${val.id}`} tag={Link}> */}
                                  <Link to={`blog/${val.id}`} tag={Link} onClick={() => { window.scroll(0, 0); }}>
                                    <span>
                                      <img src={require(`assets/img/content/pics/${val.postImg}`)} className="card-img-top img-fluid" alt="..." width="700" height="480" />
                                    </span>
                                  </Link>
                                  <div className="card-body">
                                    <div className="fw-bold mb-1 text-primary">
                                      {

                                        val.tags != null ? val.tags.map((tag, index) => {
                                          let connectStr = index + 1 < val.tags.length ? ", " : "";
                                          return (<a href="#" className="link-primary text-decoration-none">{tag + connectStr}</a>)
                                        }) : null
                                      }
                                    </div>
                                    <a href="#" className="link-dark text-decoration-none">
                                      <h3 className="card-title h4">{val.title}</h3>
                                    </a>
                                    <p className="card-text">
                                      {val.text}
                                    </p>
                                  </div>
                                  <div className="row align-items-center card-footer d-flex justify-content-between py-3 small">
                                    <a href="#" className="align-items-center d-flex link-dark text-decoration-none">
                                      <img src={require(`assets/img/content/pics/${val.posterIcon}`)} className="me-2 rounded-circle" width="48" height="48" alt="..." />
                                      <div className="px-2">
                                        <h4 className="h6 mb-0">{val.posterName}</h4>
                                        <p className="mb-0 ">{val.postDate}</p>
                                      </div>
                                    </a>
                                    <span>{val.postPeriod}</span>
                                  </div>
                                </div>
                              </div>)
                          };
                          return container;
                        }
                      })()
                    }

                  </div>
                  <nav aria-label="Blog navigation">
                    <ul className="justify-assets/content-center  pagination">
                      <li className="mx-1 page-item"><span href="#" className="link-primary page-link" onClick={(e) =>this.changePage(-1,totalPageNum)}>&#8592;</span>
                      </li>
                      {(() => {
                        if (this.state.data.length > 0) {
                          let container = [];
                          for (let i = 0; i < totalPageNum; i++) {
                            container.push(
                              <li className="mx-1 page-item"><span className="link-primary page-link" onClick={(e) =>this.changePage(i+1,totalPageNum)}>{i+1}</span></li>
                            )

                          }
                          return container;
                        }
                      })()

                      }
                      <li className="mx-1 page-item"><span href="#" className="link-primary page-link" onClick={(e) =>this.changePage(0,totalPageNum)}>&#8594;</span>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="col-lg-4 col-xl-3">
                  <div className="mb-4">
                    <h2 className="h5 text-primary">Search</h2>
                    <hr className="mb-4" />
                    <form>
                      <div className="input-group">
                        <input type="text" className="border-end-0 form-control p-3" placeholder="Search" aria-label="Enter Keyword" aria-describedby="keyword-input" />
                        <span className="bg-white input-group-text p-0" id="keyword-input">
                          <button className="align-items-center btn d-inline-flex h-100" type="submit" id="button-addon1" aria-label="Search">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
                              <g>
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9
                            9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7
                            3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"></path>
                              </g>
                            </svg>
                          </button>
                        </span>
                      </div>
                    </form>
                  </div>
                  <div className="mb-4">
                    <h2 className="h5 text-primary">Post Category</h2>
                    <hr className="mb-4" />
                    <form>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked />
                        <label className="form-check-label" htmlFor="inlineRadio1">All</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option1" />
                        <label className="form-check-label" htmlFor="inlineRadio1">Free</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option2" />
                        <label className="form-check-label" htmlFor="inlineRadio2">Premium</label>
                      </div>
                    </form>
                  </div>
                  <div className="mb-4">
                    <h2 className="h5 text-primary">Post Type</h2>
                    <hr className="mb-4" />
                    <form>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio11" value="option1" checked />
                        <label className="form-check-label" htmlFor="inlineRadio1">All</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio22" value="option1" />
                        <label className="form-check-label" htmlFor="inlineRadio1">Article</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio33" value="option2" />
                        <label className="form-check-label" htmlFor="inlineRadio2">Recipe</label>
                      </div>
                    </form>
                  </div>
                  <div className="mb-4">
                    <h2 className="h5 text-primary">Cuisine Locale</h2>
                    <hr className="mb-4" />
                    <ul className="list-unstyled">
                      <li className="mb-3"><a className="link-secondary mb-3 px-0 text-decoration-none" href="#">Indian (4)</a></li>
                      <li className="mb-3"><a className="link-secondary mb-3 px-0 text-decoration-none" href="#">African (7)</a></li>
                      <li className="mb-3"><a className="link-secondary mb-3 px-0 text-decoration-none" href="#">Continental (12)</a></li>
                      <li className="mb-3"><a className="link-secondary mb-3 px-0 text-decoration-none" href="#">Middle Eastern (2)</a></li>
                      <li className="mb-3"><a className="link-secondary mb-3 px-0 text-decoration-none" href="#">American (15)</a></li>
                    </ul>
                  </div>
                  <div className="mb-4">
                    <h2 className="h5 text-primary">Recent Posts</h2>
                    <hr className="mb-4" />
                    <div><a href="#" className="link-dark text-decoration-none"><h3 className="h6">Relaxing and observing the mountain
                      reflection in a lake</h3></a>
                      <p className="small">10 August, 2020</p>
                    </div>
                    <div><a href="#" className="link-dark text-decoration-none"><h3 className="h6">How to enjoy running your
                      business?</h3></a>
                      <p className="small">10 August, 2020</p>
                    </div>
                    <div><a href="#" className="link-dark text-decoration-none"><h3 className="h6">How to notice colors when cycling
                      over a mountain pass?</h3></a>
                      <p className="small">10 August, 2020</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h2 className="h5 text-primary">Tags</h2>
                    <hr className="mb-4" />
                    <div>
                      <a className="btn btn-primary btn-sm mb-1 px-3" href="#">Art</a>
                      <a className="btn btn-primary btn-sm mb-1 px-3" href="#">Interview</a>
                      <a className="btn btn-primary btn-sm mb-1 px-3" href="#">Creative</a>
                      <a className="btn btn-primary btn-sm mb-1 px-3" href="#">DIY</a>
                      <a className="btn btn-primary btn-sm mb-1 px-3" href="#">Color</a>
                      <a className="btn btn-primary btn-sm mb-1 px-3" href="#">Marketing</a>
                      <a className="btn btn-primary btn-sm mb-1 px-3" href="#">Design</a>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h2 className="h5 text-primary">Subscribe</h2>
                    <hr className="mb-4" />
                    <form>
                      <div className="bg-white border input-group overflow-hidden p-1 rounded">
                        <input type="email" className="border-0 form-control" placeholder="Enter email..."
                          aria-label="Recipient's email" aria-describedby="button-addon2" />
                        <button className="btn btn-primary px-3 rounded" type="submit" id="button-addon2">Sign Up</button>
                      </div>
                    </form>
                  </div>
                  <div className="mb-4">
                    <h2 className="h5 text-primary">Follow Us</h2>
                    <hr className="mb-4" />
                    <div>
                      <div className="d-inline-flex flex-wrap"><a href="#" aria-label="facebook" className="lh-1 link-secondary p-1">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                          <path
                            d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
                        </svg>
                      </a> <a href="#" aria-label="twitter" className="lh-1 link-secondary p-1">
                          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                            <path
                              d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
                          </svg>
                        </a> <a href="#" aria-label="instagram" className="lh-1 link-secondary p-1">
                          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                            <path
                              d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                          </svg>
                        </a> <a href="#" aria-label="linkedin" className="lh-1 link-secondary p-1">
                          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                            <path
                              d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
                          </svg>
                        </a> <a href="#" aria-label="youtube" className="lh-1 link-secondary p-1">
                          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                            <path
                              d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <section className="bg-primary text-center text-lg-start text-white">
            <svg viewBox="0 0 1440 185" preserveAspectRatio="none" fill="currentColor" version="1.1"
              xmlns="http://www.w3.org/2000/svg" className="bg-primary d-block text-white" width="100%" height="160">
              <path d="M 0 0 H 1440 V 60 C 1114 355 700 35 516 35 C 333 35 246 199 0 60 V 0 Z" />
            </svg>
            <div className="container pt-5">
              <div className="align-items-center row">
                <div className="col-lg-7 order-lg-2 pb-5 ps-lg-5 pt-5">
                  <h2 className="h5">Work With Us</h2>
                  <h3 className="h1 mb-4">Have a project in mind?</h3> <a className="btn btn-outline-light ps-4 pe-4 rounded-pill"
                    href="#">Let&apos;s Talk</a>
                </div>
                <div className="col-lg-5 order-lg-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1120.661" height="897.38" viewBox="0 0 1120.661 897.38"
                    className="img-fluid">
                    <g data-name="Ideation and office meetings">
                      <path data-name="Path 2420"
                        d="M27.063 896.08h1048.7l44.4-330.3a55.224 55.224 0 00-2.7-25.8l-168.5-472.9a55.236 55.236 0 00-49-36.5L309.763.08a55 55 0 00-43.6 18l-251.9 278.3a54.925 54.925 0 00-14.2 39.6z"
                        fill="#f4f4f4" opacity=".5" />
                      <path data-name="Path 2421"
                        d="M1033.463 774.88a.764.764 0 01-.5-.2l-52.3-52.6a.707.707 0 011-1l52.3 52.6a.668.668 0 010 1 .764.764 0 01-.5.2z"
                        fill="#21252b" />
                      <path data-name="Path 2422"
                        d="M1084.763 741.48a.776.776 0 00-1 .2l-38.4 58.1 9.5-233.7a.7.7 0 00-1.4 0l-10.9 268.1a.7.7 0 101.4 0l1.3-31.7 39.6-60a.658.658 0 00-.1-1z"
                        fill="#21252b" />
                      <path data-name="Path 2423"
                        d="M1048.763 708.28c-.2 0-.3-.1-.5-.2a.769.769 0 01-.1-1l59.9-68.4a.711.711 0 111.1.9l-59.9 68.4a.55.55 0 01-.5.3z"
                        fill="#21252b" />
                      <path data-name="Path 2424"
                        d="M1104.743 675.993c14.13-16.614 18.36-36.234 9.45-43.821s-27.61-.269-41.75 16.346-18.36 36.234-9.45 43.821 27.61.269 41.75-16.346z"
                        fill="var(--bs-primary)" />
                      <path data-name="Path 2425"
                        d="M1114.763 632.68l-52.1 59.4.3.3c8.9 7.6 27.6.2 41.7-16.4 13.9-16.3 18.3-35.4 10.1-43.3z"
                        opacity=".3" />
                      <path data-name="Path 2426"
                        d="M1011.943 752.309c7.19-6.945 2.51-23.459-10.46-36.886s-29.31-18.683-36.5-11.739-2.5 23.459 10.46 36.887 29.31 18.682 36.5 11.738z"
                        fill="var(--bs-primary)" />
                      <path data-name="Path 2427"
                        d="M964.463 704.08l47.7 47.9c-.1.1-.2.2-.2.3-7.2 6.9-23.5 1.7-36.5-11.8-12.8-13.1-17.5-29.2-11-36.4z"
                        opacity=".3" />
                      <path data-name="Path 2428"
                        d="M1074.093 586.259c.99-21.794-7.47-39.882-18.89-40.4s-21.48 16.727-22.47 38.52 7.46 39.882 18.88 40.4 21.49-16.727 22.48-38.52z"
                        fill="var(--bs-primary)" />
                      <path data-name="Path 2429"
                        d="M1032.663 584.38c1-21.8 11.1-39 22.5-38.5l-3.6 78.9c-11.4-.5-19.9-18.6-18.9-40.4z" opacity=".3" />
                      <path data-name="Path 2430"
                        d="M1088.763 764.629c8.69-13.585 9.63-28.506 2.09-33.327s-20.69 2.285-29.38 15.87-9.62 28.506-2.09 33.327 20.69-2.285 29.38-15.87z"
                        fill="var(--bs-primary)" />
                      <path data-name="Path 2431"
                        d="M1061.463 747.18c-8.5 13.3-9.6 27.9-2.6 33l32-48.9-1.9-.9c-7.7-2.8-19.5 4.3-27.5 16.8z"
                        opacity=".3" />
                      <path data-name="Path 2432"
                        d="M1038.963 831.58a.669.669 0 01-.7-.6l-17.1-176.6a.707.707 0 111.4-.2l17.1 176.6c.1.5-.2.8-.7.8z"
                        fill="#21252b" />
                      <path data-name="Path 2433"
                        d="M1025.483 693.124c9.44-1.141 15.31-16.689 13.13-34.729s-11.6-31.738-21.03-30.6-15.3 16.69-13.12 34.729 11.59 31.741 21.02 30.6z"
                        fill="var(--bs-primary)" />
                      <path data-name="Path 2434"
                        d="M1004.363 662.58c-2.2-18 3.7-33.6 13.2-34.7l7.9 65.3c-9.5 1.1-18.9-12.6-21.1-30.6z"
                        opacity=".3" />
                      <path data-name="Path 2435"
                        d="M1025.563 896.48h35.6a12.078 12.078 0 0012.1-12.1v-47.1h-59.8v47.1a12.078 12.078 0 0012.1 12.1z"
                        fill="#868a91" />
                      <path data-name="Path 2436"
                        d="M1074.563 830.88h-62.4a3.2 3.2 0 000 6.4h62.4a3.222 3.222 0 003.2-3.2 3.29 3.29 0 00-3.2-3.2z"
                        fill="#868a91" />
                      <path data-name="Path 2437"
                        d="M1073.263 837.28h-54.4a3.2 3.2 0 110-6.4h-6.6a3.2 3.2 0 000 6.4h1.3v47.2a12.078 12.078 0 0012.1 12.1h19.4a17.662 17.662 0 01-17.3-14.3l-8.6-44h54.2v-1z"
                        fill="#61656d" />
                      <path data-name="Path 2438" d="M564.663 66.88h-143.3v119h143.3z" fill="var(--bs-primary)" />
                      <path data-name="Path 2439" d="M564.663 66.88h-143.3v119h143.3z" fill="#fff" opacity=".8" />
                      <path data-name="Path 2440" d="M554.463 77.58h-122.9v97.6h122.9z" fill="#fff" />
                      <path data-name="Path 2441"
                        d="M431.563 142.28l13.4-10.3a40.513 40.513 0 0148.1-.9l11.1-9.3a40.435 40.435 0 0150.2-1.3l.1.1v54.5h-122.9z"
                        fill="var(--bs-primary)" />
                      <path data-name="Path 2442"
                        d="M431.563 142.28l13.4-10.3a40.513 40.513 0 0148.1-.9l11.1-9.3a40.435 40.435 0 0150.2-1.3l.1.1v54.5h-122.9z"
                        fill="#fff" opacity=".5" />
                      <path data-name="Path 2443" d="M488.263 112.48a9 9 0 10-9-9 9 9 0 009 9z" fill="#b2b6bb" />
                      <path data-name="Path 2444" d="M495.463 129.18l-11.1 9.1-.9-1.4 10.6-8.8z" fill="#fff" />
                      <path data-name="Path 2445" d="M421.363 66.88h-3.1v119h3.1z" fill="#b2b6bb" />
                      <path data-name="Path 2446" d="M115.263 555.08h-67.1a3.4 3.4 0 110-6.8h67.1v6.8z" fill="#b2b6bb" />
                      <path data-name="Path 2447" d="M358.363 551.78h-301.5v283.1h301.5z" fill="#b2b6bb" />
                      <path data-name="Path 2448" d="M650.663 551.78h-528.2v283.1h528.2z" fill="#dadddf" />
                      <path data-name="Path 2449" d="M132.963 575.78h508v243.2h-508zm506.6 1.5h-505v240.2h505z" fill="#b2b6bb" />
                      <path data-name="Path 2450" d="M658.463 555.08h-543.3a3.4 3.4 0 110-6.8h543.2a3.4 3.4 0 01.1 6.8z"
                        fill="#dadddf" />
                      <path data-name="Path 2451" d="M640.963 736.08h-508v1.5h508z" fill="#b2b6bb" />
                      <path data-name="Path 2452" d="M640.963 655.58h-508v1.5h508z" fill="#b2b6bb" />
                      <path data-name="Path 2453" d="M400.263 602.28a5.2 5.2 0 10-5.2-5.2 5.2 5.2 0 005.2 5.2z" fill="#b2b6bb" />
                      <path data-name="Path 2454"
                        d="M398.363 597.08a5.2 5.2 0 013.5-4.9 4.671 4.671 0 00-1.7-.3 5.2 5.2 0 000 10.4 5.079 5.079 0 001.7-.3 5.2 5.2 0 01-3.5-4.9z"
                        opacity=".15" />
                      <path data-name="Path 2455" d="M400.263 681.68a5.2 5.2 0 10-5.2-5.2 5.2 5.2 0 005.2 5.2z" fill="#b2b6bb" />
                      <path data-name="Path 2456"
                        d="M398.363 676.48a5.2 5.2 0 013.5-4.9 4.672 4.672 0 00-1.7-.3 5.2 5.2 0 000 10.4 5.08 5.08 0 001.7-.3 5.3 5.3 0 01-3.5-4.9z"
                        opacity=".15" />
                      <path data-name="Path 2457" d="M400.263 762.08a5.2 5.2 0 10-5.2-5.2 5.2 5.2 0 005.2 5.2z" fill="#b2b6bb" />
                      <path data-name="Path 2458"
                        d="M398.363 756.88a5.2 5.2 0 013.5-4.9 4.671 4.671 0 00-1.7-.3 5.2 5.2 0 000 10.4 5.079 5.079 0 001.7-.3 5.109 5.109 0 01-3.5-4.9z"
                        opacity=".15" />
                      <path data-name="Path 2459" d="M111.863 562.08l10.6-7h528.3v3.2z" fill="#b2b6bb" />
                      <path data-name="Path 2460" d="M70.163 834.88l-5.2 57.7a3.377 3.377 0 006.5 1.8l15.1-59.5z"
                        fill="#dadddf" />
                      <path data-name="Path 2461" d="M72.163 868.38l6.3-1.5 8.1-32h-16.4l-5.2 57.7a3.489 3.489 0 002 3.8z"
                        fill="#b2b6bb" />
                      <path data-name="Path 2462" d="M129.063 834.88l-5.2 57.7a3.377 3.377 0 006.5 1.8l15.1-59.5z"
                        fill="#dadddf" />
                      <path data-name="Path 2463" d="M134.563 841.18l9.4-1.8 1.6-4.6h-16.4l-5.2 57.7a3.489 3.489 0 002 3.8z"
                        fill="#b2b6bb" />
                      <path data-name="Path 2464" d="M580.063 834.88l5.2 57.7a3.377 3.377 0 01-6.5 1.8l-15.1-59.5z"
                        fill="#dadddf" />
                      <path data-name="Path 2465"
                        d="M577.163 865.58l5.6-1.4-2.7-29.3h-16.4l15.1 59.5a3.425 3.425 0 003.2 2.3h.2z" fill="#b2b6bb" />
                      <path data-name="Path 2466" d="M640.563 834.88l5.2 57.7a3.377 3.377 0 01-6.5 1.8l-15.1-59.5z"
                        fill="#dadddf" />
                      <path data-name="Path 2467" d="M634.163 839.88l7.2-1.3-.8-3.7h-16.4l15.1 59.5a3.425 3.425 0 003.2 2.3h.2z"
                        fill="#b2b6bb" />
                      <path data-name="Path 2468"
                        d="M455.063 453.28h64.3a1.493 1.493 0 011.4 1.3l.1 2.2a1.24 1.24 0 01-1.2 1.3h-64.3a1.493 1.493 0 01-1.4-1.3l-.1-2.2a1.184 1.184 0 011.2-1.3z"
                        fill="#21252b" />
                      <path data-name="Path 2469"
                        d="M491.263 453.28h145.5a1.493 1.493 0 011.4 1.3l.1 2.2a1.24 1.24 0 01-1.2 1.3h-145.5a1.493 1.493 0 01-1.4-1.3l-.1-2.2a1.184 1.184 0 011.2-1.3z"
                        fill="#3f4249" />
                      <path data-name="Path 2470"
                        d="M634.963 454.18h-148.3c-.2 0-.5-.2-.5-.4a.43.43 0 01.4-.4h148.3c.2 0 .5.2.5.4a.43.43 0 01-.4.4z"
                        fill="#21252b" />
                      <path data-name="Path 2471"
                        d="M490.963 453.28h22.7a3.365 3.365 0 003.4-3l7.9-92.8a3.921 3.921 0 00-3.8-4.3h-22.7a3.365 3.365 0 00-3.4 3l-7.9 92.8a3.806 3.806 0 003.8 4.3z"
                        fill="#21252b" />
                      <path data-name="Path 2472"
                        d="M494.163 453.28h140.7a3.365 3.365 0 003.4-3l7.9-92.8a3.92 3.92 0 00-3.8-4.3h-140.7a3.365 3.365 0 00-3.4 3l-7.9 92.8a3.862 3.862 0 003.8 4.3z"
                        fill="#3f4249" />
                      <path data-name="Path 2473"
                        d="M573.963 396.68a2.592 2.592 0 002.4 3.8h.3a11.633 11.633 0 01-8.8 4.4c-4.3-.1-6.5-3.6-4.9-7.9s6.4-7.7 10.7-7.6c2.8.1 4.7 1.5 5.2 3.7a5.787 5.787 0 00-4.9 3.6z"
                        opacity=".6" />
                      <path data-name="Path 2474"
                        d="M310.963 463.28c14-123.9-11.2-199.6-20.1-225.7l14.1-3.8 46.6.4 5.9 2.1c1.2 23.2 17.8 127.2 33.8 226.9h-80.3z"
                        fill="#fff" />
                      <path data-name="Path 2475"
                        d="M378.363 874.88l64.9 1.6-25.9-18.5a17.259 17.259 0 01-7.2-13.3l-.9-20.3-35.3.1z" fill="#fc9d9d" />
                      <path data-name="Path 2476"
                        d="M385.563 851.18v-.4a4.227 4.227 0 013.6-4.6l20.7-3-.2-4.1h-34.6l3.1 34.4 28.3-3.1-9.3-3.7a18.483 18.483 0 01-11.6-15.5z"
                        opacity=".15" />
                      <path data-name="Path 2477" d="M261.463 873.68h29.2l5.4-49.4-34.5.1z" fill="#fc9d9d" />
                      <path data-name="Path 2478" d="M268.763 865.38l.7-15.2a4.161 4.161 0 013.6-3.9l21-3.2.5-4.2-32.9.1-.1 35z"
                        opacity=".15" />
                      <path data-name="Path 2479"
                        d="M259.563 435.18v403.9h37.9l33-329.3a4.166 4.166 0 018.3 0l35.1 329.3h37.9l-13.7-403.9z"
                        fill="var(--bs-primary)" />
                      <path data-name="Path 2480"
                        d="M259.563 435.18v403.9h37.9l33-329.3a4.166 4.166 0 018.3 0l35.1 329.3h37.9l-13.7-403.9z"
                        fill="#fff" opacity=".2" />
                      <path data-name="Path 2481"
                        d="M263.663 856.28l.9-.9a17.806 17.806 0 0125.1.3l.5.6a9.349 9.349 0 012.6 6.4v3.8a20.521 20.521 0 001 6.5l3.1 10.3a25.271 25.271 0 011.2 7.7v1.3a3.786 3.786 0 01-3.9 3.6h-35.9a3.723 3.723 0 01-3.9-3.6v-.5a27.267 27.267 0 011.5-8.9l3.6-10.1a21.84 21.84 0 001.3-7.2l.1-2.9a10.071 10.071 0 012.8-6.4z"
                        fill="#3f4249" />
                      <path data-name="Path 2482" d="M258.563 839.08h40.4l.8-8.3h-41.1z" fill="var(--bs-primary)" />
                      <path data-name="Path 2483" d="M258.563 839.08h16.9l.4-8.3h-17.2z" opacity=".15" />
                      <path data-name="Path 2484"
                        d="M254.363 891.78v.5a3.786 3.786 0 003.9 3.6h35.9a3.723 3.723 0 003.9-3.6v-1.3a7.57 7.57 0 00-.1-1.5h-43.6z"
                        opacity=".5" />
                      <path data-name="Path 2485"
                        d="M373.863 863.38v25.3a7.383 7.383 0 007.4 7.4h86a3.116 3.116 0 003.1-3.1 14.089 14.089 0 00-9.6-13.3l-19.4-6.4-24.6-19.1a6.786 6.786 0 00-8.6.2l-10.9 9.3a6.116 6.116 0 01-5.8 1.2l-13.8-4.3a2.965 2.965 0 00-3.8 2.8z"
                        fill="#3f4249" />
                      <path data-name="Path 2486"
                        d="M381.263 896.08h86a3.116 3.116 0 003.1-3.1 10.551 10.551 0 00-.4-3.1h-96a7.417 7.417 0 007.3 6.2z" />
                      <path data-name="Path 2487"
                        d="M416.263 864.28a.764.764 0 01-.5-.2.785.785 0 010-1.1l5.2-5.6a.778.778 0 011.1 1.1l-5.2 5.6a1.421 1.421 0 01-.6.2z"
                        fill="#fff" />
                      <path data-name="Path 2488"
                        d="M420.363 867.48a.764.764 0 01-.5-.2.785.785 0 010-1.1l5.2-5.6a.778.778 0 011.1 1.1l-5.2 5.6a1.421 1.421 0 01-.6.2z"
                        fill="#fff" />
                      <path data-name="Path 2489"
                        d="M424.463 870.68a.764.764 0 01-.5-.2.785.785 0 010-1.1l5.2-5.6a.778.778 0 011.1 1.1l-5.2 5.6a.845.845 0 01-.6.2z"
                        fill="#fff" />
                      <path data-name="Path 2490"
                        d="M283.663 864.78a.6.6 0 01-.4-.1 15.383 15.383 0 00-13.2 0 .894.894 0 01-.8-1.6 16.913 16.913 0 0114.9 0 .962.962 0 01.4 1.2 1.05 1.05 0 01-.9.5z"
                        fill="#fff" />
                      <path data-name="Path 2491"
                        d="M283.663 869.38a.6.6 0 01-.4-.1 15.315 15.315 0 00-13.2 0 .894.894 0 11-.8-1.6 16.913 16.913 0 0114.9 0 .962.962 0 01.4 1.2 1.05 1.05 0 01-.9.5z"
                        fill="#fff" />
                      <path data-name="Path 2492"
                        d="M283.663 873.88a.6.6 0 01-.4-.1 15.383 15.383 0 00-13.2 0 .894.894 0 01-.8-1.6 16.913 16.913 0 0114.9 0 .962.962 0 01.4 1.2 1.05 1.05 0 01-.9.5z"
                        fill="#fff" />
                      <path data-name="Path 2493"
                        d="M396.463 834.48l-37.4-310.9a19.873 19.873 0 00-19.7-17.5h-4.7a4.13 4.13 0 014.1 3.8l34.9 327.5z"
                        opacity=".15" />
                      <path data-name="Path 2494" d="M372.863 839.08h40.3l-.6-8.3h-40.5z" fill="var(--bs-primary)" />
                      <path data-name="Path 2495" d="M372.863 839.08h24l-.9-8.3h-23.9z" opacity=".15" />
                      <path data-name="Path 2496"
                        d="M499.263 267.48l3.5-8.7a47.866 47.866 0 014.9-9.2l9-11.2a.807.807 0 01.9-.4c2.8 1.4 3.1 4 2.1 6.9a38.754 38.754 0 01-3.1 6.1c-.8 1.3.5 1.5 1 .8l19.7-20.4a2.464 2.464 0 013.3-.2 2.4 2.4 0 01.3 3.4c-3.4 4.1-11.2 13.6-11.2 13.6l15.5-12.8a2.59 2.59 0 013.4.2 2.959 2.959 0 01-.1 4.1c-4.5 4.4-14.8 14.8-14.8 14.8l13.8-10.9a2.242 2.242 0 013.1.5 2.459 2.459 0 01-.2 3.3c-4 3.6-11.6 11.6-11.6 11.6l8.7-6.9a1.852 1.852 0 012.4.5 2.105 2.105 0 01-.2 2.5l-30.1 30.3-9.2 12.9-33.1-2.5z"
                        fill="#fc9d9d" />
                      <g data-name="Group 116">
                        <path data-name="Path 2497"
                          d="M518.363 271.78h-.3a.825.825 0 01-.5-1c4-11.1-1-17.2-1.2-17.4a.781.781 0 011.2-1c.2.3 5.8 7 1.5 19 0 .2-.3.4-.7.4z"
                          opacity=".15" />
                      </g>
                      <path data-name="Path 2498"
                        d="M408.863 264.78l32 76.2 57.9-72.9 19.7 18.6-58.9 100.2a23.464 23.464 0 01-41.1-1.2l-34.1-66.5z"
                        fill="#21252b" />
                      <path data-name="Path 2499"
                        d="M350.763 179.58s-40.8-25.6-42.4 5.7l-.6 8.1-2.8 41a4.69 4.69 0 001.1 3.1l23.6 16.1a1.948 1.948 0 002.3-.1l17.5-14.9a4.624 4.624 0 001.6-4.1l-2.6-24.3a31.069 31.069 0 00.8-7.2c.4-12.3 1.5-23.4 1.5-23.4z"
                        fill="#fc9d9d" />
                      <path data-name="Path 2500" d="M354.363 181.48a13.8 13.8 0 10-13.8-13.8 13.8 13.8 0 0013.8 13.8z"
                        fill="#3f4249" />
                      <path data-name="Path 2501" d="M355.363 157.48s14.5 60.8-16.7 64.9c-27 3.6-30-38.5-30-38.5l1.3-27.3z"
                        fill="#fc9d9d" />
                      <path data-name="Path 2502"
                        d="M353.563 161.28l-27.6 2a6.4 6.4 0 00-5.8 6.7 6.259 6.259 0 01-5.8 6.7 1.831 1.831 0 00-1.6 1.8l.4 6.1a1.316 1.316 0 01-1.3 1.5 1.4 1.4 0 01-1.5-1.1l-1.2-5.8-1.2-1.9-6.5 4s-10.5-16.2-5.5-31c2.9-8.4 11.2-11.4 15.2-11.9a4.4 4.4 0 003.1-2c1.6-2.7 5.5-7.4 14.2-7.1a14.637 14.637 0 0112.3 6.8 4.228 4.228 0 005.3 1.5 11.916 11.916 0 0111.7.9c9 5.7 5.4 21.3-4.2 22.8z"
                        fill="#3f4249" />
                      <path data-name="Path 2503" d="M307.763 195.38s2.6.2 4-.9l-4.4 6.8z" opacity=".15" />
                      <path data-name="Path 2504" d="M309.263 179.18s-2-5.7-8-3.1c-6.8 3-5.4 18.4 6.1 19.3 6 .5 4.8-3 3.8-7.7z"
                        fill="#fc9d9d" />
                      <path data-name="Path 2505"
                        d="M300.963 180.08a4.407 4.407 0 013.3-.9 4.006 4.006 0 012.6 2.1 8.207 8.207 0 011.1 4.2l.1 1.3a.7.7 0 01-1.4 0l-.1-1.3a8.474 8.474 0 00-.9-3.5 2.395 2.395 0 00-3.9-.9.775.775 0 01-1-.2c-.2-.1-.1-.5.2-.8z"
                        opacity=".3" />
                      <path data-name="Path 2506"
                        d="M353.763 162.58l-3.2.3a.661.661 0 01-.7-.6c0-.4.2-.7.6-.7l3.2-.3a5.019 5.019 0 001.2-.2 15.086 15.086 0 003.7-1.8.652.652 0 11.7 1.1 15.14 15.14 0 01-4 1.9z"
                        fill="#fc9d9d" />
                      <path data-name="Path 2507"
                        d="M350.463 227.28l-1-9.8c-2.6 2.7-10.1 6.6-18.6 4.6a20.721 20.721 0 01-10.9-6.8.64.64 0 00-1 .8 22.539 22.539 0 0014.4 7.7 22.358 22.358 0 0017.1 3.5z"
                        opacity=".15" />
                      <g data-name="Group 117">
                        <path data-name="Path 2508"
                          d="M340.963 209.98c0 .1-.1.1 0 0-2.6.2-3.8.3-3.8.3a.875.875 0 01-.9-.8.817.817 0 01.8-.9s1.2-.1 3.7-.3a.808.808 0 01.9.7c0 .6-.3 1-.7 1z"
                          opacity=".3" />
                      </g>
                      <g data-name="Group 118">
                        <path data-name="Path 2509"
                          d="M342.363 206.38c-6.8 1-9.9-2.7-11-4.5a.806.806 0 111.4-.8c1 1.8 4.4 5.7 12.6 3a.791.791 0 01.5 1.5 18.981 18.981 0 01-3.5.8z"
                          opacity=".3" />
                      </g>
                      <path data-name="Path 2510" d="M332.963 188.38a2.5 2.5 0 10-2.5-2.5 2.5 2.5 0 002.5 2.5z" fill="#21252b" />
                      <path data-name="Path 2511" d="M334.063 185.58a.5.5 0 10-.5-.5.5.5 0 00.5.5z" fill="#fff" />
                      <path data-name="Path 2512" d="M352.763 188.48a2.5 2.5 0 10-2.5-2.5 2.5 2.5 0 002.5 2.5z" fill="#21252b" />
                      <path data-name="Path 2513" d="M353.863 185.68a.5.5 0 10-.5-.5.5.5 0 00.5.5z" fill="#fff" />
                      <g data-name="Group 119">
                        <path data-name="Path 2514"
                          d="M344.163 200.28l-3.3.2a.752.752 0 01-.1-1.5l3.3-.2a1.503 1.503 0 10-.2-3 .849.849 0 01-.8-.7c-.1-.4.3-.7.7-.8a3.066 3.066 0 013.2 2.7 3.122 3.122 0 01-2.8 3.3z"
                          opacity=".3" />
                      </g>
                      <path data-name="Path 2515"
                        d="M359.863 179.48h-34.3a3.585 3.585 0 00-3.6 3.6v2.8a9.8 9.8 0 1019.6 0v-2.8a3.5 3.5 0 00-.8-2.2h3.8a3.408 3.408 0 00-.7 2.2v2.8a9.8 9.8 0 1019.6 0v-2.8a3.585 3.585 0 00-3.6-3.6zm-19.7 3.6v2.8a8.35 8.35 0 11-16.7.1v-2.8a2.22 2.22 0 012.2-2.2h12.4a2.112 2.112 0 012.1 2.1zm21.9 2.8a8.35 8.35 0 01-16.7.1v-2.8a2.22 2.22 0 012.2-2.2h12.4a2.22 2.22 0 012.2 2.2z"
                        fill="#21252b" />
                      <g data-name="Group 120">
                        <path data-name="Path 2516"
                          d="M387.063 445.18h-84.9a.789.789 0 01-.8-.8.86.86 0 01.8-.8h84.9a.8.8 0 010 1.6z" opacity=".15" />
                      </g>
                      <path data-name="Path 2517" d="M354.363 235.38s3.6 124.4 13.1 208.4h12.2z" opacity=".15" />
                      <path data-name="Path 2518"
                        d="M326.663 444.28l-50.3 6.8s-1.3 3.6-2.9 8.9l-14 6.3v364.3l16.3.1 14.8-317.5c43.1-15.4 36.1-68.9 36.1-68.9z"
                        opacity=".15" />
                      <path data-name="Path 2519"
                        d="M398.863 499.78c.1 0 .2-.1.3-.1l-7.3-55.9h-24.3l4.4 40.5a19.231 19.231 0 0026.9 15.5z"
                        opacity=".15" />
                      <g data-name="Group 121" opacity=".15">
                        <path data-name="Path 2520"
                          d="M373.663 250.98h-38.7l-2.9 2.5a1.96 1.96 0 01-2.5.1l-3.8-2.6h-42.5v4.4h90.4z"
                          fill="var(--bs-primary)" opacity=".15" />
                        <path data-name="Path 2521" d="M373.663 269.88h-90.4v4.4h90.4z" fill="var(--bs-primary)" opacity=".15" />
                        <path data-name="Path 2522" d="M373.663 288.88h-90.4v4.4h90.4z" opacity=".15" />
                        <path data-name="Path 2523" d="M373.663 307.78h-90.4v4.4h90.4z" opacity=".15" />
                        <path data-name="Path 2524" d="M373.663 326.78h-90.4v4.4h90.4z" opacity=".15" />
                        <path data-name="Path 2525" d="M373.663 345.68h-90.4v4.4h90.4z" opacity=".15" />
                        <path data-name="Path 2526" d="M373.663 364.68h-90.4v4.4h90.4z" opacity=".15" />
                        <path data-name="Path 2527" d="M378.163 383.58h-94.9v4.4h94.9z" opacity=".15" />
                        <path data-name="Path 2528" d="M381.163 402.58h-97.9v4.4h97.9z" opacity=".15" />
                        <path data-name="Path 2529" d="M387.063 421.48h-103.8v4.4h103.8z" opacity=".15" />
                      </g>
                      <path data-name="Path 2530"
                        d="M254.963 490.38l2.2-133.3-33.2-44.4-.8-36.6a29.828 29.828 0 0123.5-29.7l56-12c7.8 22.9 27.8 114.5 23.9 220a47.051 47.051 0 01-47 45.2h-15.5a8.969 8.969 0 01-9.1-9.2z"
                        fill="#21252b" />
                      <path data-name="Path 2531"
                        d="M283.263 369.08l-26.1-11.9-2.2 133.3a9.114 9.114 0 009.1 9.3h15.5a44.051 44.051 0 005.2-.3c-.4-45.5-1.5-130.4-1.5-130.4z"
                        opacity=".4" />
                      <path data-name="Path 2532"
                        d="M412.163 280.68l-11.1 217.2a1.95 1.95 0 01-1.9 1.8h-1.8a13.949 13.949 0 01-13.7-11.7c-15.2-98.8-28.3-230.3-29.4-252.5l35.7 11.4c11.6 3.6 22.9 18 22.2 33.8z"
                        fill="#21252b" />
                      <path data-name="Path 2533"
                        d="M397.963 404.98l3.5-44.5h-31.7l2.7 44.5a2.187 2.187 0 002.2 2h21.1a2.267 2.267 0 002.2-2z"
                        fill="#fff" />
                      <path data-name="Path 2534"
                        d="M401.563 356.68h-3.5l-1.6-4.1a.622.622 0 00-.6-.4h-21.3a.675.675 0 00-.6.4l-1.6 4.1h-2.7a.684.684 0 00-.7.7v2.5a.684.684 0 00.7.7h32a.684.684 0 00.7-.7v-2.5a.848.848 0 00-.8-.7z"
                        fill="var(--bs-primary)" />
                      <path data-name="Path 2535"
                        d="M401.563 356.68h-3.5l-1.6-4.1a.622.622 0 00-.6-.4h-21.3a.675.675 0 00-.6.4l-1.6 4.1h-2.7a.684.684 0 00-.7.7v2.5a.684.684 0 00.7.7h32a.684.684 0 00.7-.7v-2.5a.848.848 0 00-.8-.7z"
                        fill="#fff" opacity=".2" />
                      <path data-name="Path 2536"
                        d="M397.763 355.88h-17.6l1.3-3.7h-6.9a.675.675 0 00-.6.4l-1.6 4.1h-2.7a.684.684 0 00-.7.7v2.5a.684.684 0 00.7.7h5.7c.5-1.4 1.1-3.1 1.1-3.1a.875.875 0 01.9-.6h20.7z"
                        opacity=".15" />
                      <path data-name="Path 2537" d="M401.463 361.58l.1-1.1h-31.7l2.7 44.5a2.187 2.187 0 002.2 2h1.5l1.1-43.8z"
                        opacity=".15" />
                      <path data-name="Path 2538" d="M385.563 393.68a11.607 11.607 0 10-12-11.6 11.806 11.806 0 0012 11.6z"
                        fill="var(--bs-primary)" />
                      <path data-name="Path 2539"
                        d="M360.363 375.18l10-4.7.1 2.2a3.185 3.185 0 003.2 3l25.6-.2a3.372 3.372 0 013.4 3.4v.1a3.629 3.629 0 01-3.5 3.6c-3.3 0-7.8.1-7.8.1l7.8-.1a3.45 3.45 0 01.1 6.9l-8.1.1 8.4-.1a3.309 3.309 0 013.3 3.2 3.35 3.35 0 01-3 3.3c-3.4.3-8.5.7-8.5.7l9.1.9a2.616 2.616 0 012.4 2.6v.1a2.689 2.689 0 01-2.7 2.7c-10.6 0-63.5 1.4-63.5 1.4l10.8-28 4.9.3a19.962 19.962 0 008-1.5z"
                        fill="#fc9d9d" />
                      <g data-name="Group 122">
                        <path data-name="Path 2540"
                          d="M398.663 383.28h-5.6a.789.789 0 01-.8-.8.86.86 0 01.8-.8h5.6a.789.789 0 01.8.8.86.86 0 01-.8.8z"
                          opacity=".15" />
                      </g>
                      <g data-name="Group 123">
                        <path data-name="Path 2541"
                          d="M399.063 390.28h-5.7a.789.789 0 01-.8-.8.86.86 0 01.8-.8h5.7a.789.789 0 01.8.8.86.86 0 01-.8.8z"
                          opacity=".15" />
                      </g>
                      <path data-name="Path 2542"
                        d="M223.263 273.58v115.1a21.163 21.163 0 0022.4 21.1l107-6v-27.3l-82.4-5.1 2.2-99.7"
                        fill="#21252b" />
                      <path data-name="Path 2543"
                        d="M249.463 396.48c-8.3.3-15.6-5.9-15.6-16.2l1.5-108.2c.7-11.4 4.1-20.2 13.5-26.3l-2.1.5a29.764 29.764 0 00-23.5 30.7v111.6a21 21 0 0022.5 21l106.9-5.8v-6.3z"
                        opacity=".4" />
                      <path data-name="Path 2544"
                        d="M325.463 374.88l-.1-1.7-42.2-2.7-9.9-79.4a.602.602 0 00-1.2.1l-1.7 80.3 13 .8z" opacity=".4" />
                      <path data-name="Path 2545" d="M498.763 268.08l22.3 15.6-1.6 1.6-1 1.4z" opacity=".15" />
                      <path data-name="Path 2546"
                        d="M352.663 376.48l2.6 16.6a6.849 6.849 0 006.6 5.8l41.1 1.1a2.745 2.745 0 01-2.7 2.7l-47.6 1z"
                        opacity=".15" />
                      <path data-name="Path 2547"
                        d="M427.063 376.28l-16.4-30.8 1.2-31a.851.851 0 00-1.7-.1l-1.2 31c0 .1-.1.2-.1.3l-1.2 18.9 10.8 21.1c8.4 16.5 31.7 17.1 41.1 1.2l.8-1.4a23.431 23.431 0 01-33.3-9.2z"
                        opacity=".4" />
                      <path data-name="Path 2548" d="M437.263 345.78l3.6-4.8-4.8-11.4-1 15.4a1.219 1.219 0 002.2.8z"
                        opacity=".4" />
                      <path data-name="Path 2549" d="M226.563 473.18h19.7l-59.1 422.9h-7.7z" fill="#61656d" />
                      <path data-name="Path 2550" d="M997.163 896.08h-7.7l-59.1-422.9h19.7z" fill="#61656d" />
                      <path data-name="Path 2551" d="M179.463 896.08h3.3l50.7-411a6.173 6.173 0 015.6-5.4l6.4-.6.8-5.8h-19.7z"
                        opacity=".5" />
                      <path data-name="Path 2552"
                        d="M992.263 896.08l-52.6-410.6a5.859 5.859 0 014.6-6.5l6.3-1.3-.5-4.6h-19.7l59.1 422.9h2.8z"
                        opacity=".5" />
                      <path data-name="Path 2553" d="M166.063 473.18h19.7l-59.1 422.9h-7.7z" fill="#61656d" />
                      <path data-name="Path 2554" d="M936.663 896.08h-7.7l-59.1-422.9h19.7z" fill="#61656d" />
                      <path data-name="Path 2555" d="M118.963 896.08h3.3l19.7-149.9 6.1-3.5 36.8-263.7.8-5.8h-19.7z"
                        opacity=".5" />
                      <path data-name="Path 2556" d="M931.763 896.08l-19.2-148.7 6.9-4.8-30-269.5h-19.7l59.1 422.9h2.9z"
                        opacity=".5" />
                      <path data-name="Path 2557" d="M902.863 377.88a1.7 1.7 0 10-1.7-1.7 1.7 1.7 0 001.7 1.7z" fill="#fff" />
                      <path data-name="Path 2558"
                        d="M734.363 264.88l-33.6 67.3-45.8-.9-4.1 21.8 51.6 10.2a21.952 21.952 0 0021.8-8.8l25.4-35.6"
                        fill="var(--bs-primary)" />
                      <path data-name="Path 2559"
                        d="M599.063 322.28l-12.1-1.6-14.4 4.2a1.673 1.673 0 00-1 2.6 2.2 2.2 0 002.3.8l13.8-2.6 8.6 2.8-8.6-2.8-12 3.4a1.5 1.5 0 00-1 2.1 1.9 1.9 0 002.1.8l12.1-2.3 12.5 3.9-12.5-3.9-8.6 3.5a.98.98 0 00-.4 1.5 1.342 1.342 0 001.5.4l10-2.4 11.8 2.9z"
                        fill="#966363" />
                      <path data-name="Path 2560"
                        d="M599.063 322.28l-12.1-1.6-14.4 4.2a1.673 1.673 0 00-1 2.6 2.2 2.2 0 002.3.8l13.8-2.6 8.6 2.8-8.6-2.8-12 3.4a1.5 1.5 0 00-1 2.1 1.9 1.9 0 002.1.8l12.1-2.3 12.5 3.9-12.5-3.9-8.6 3.5a.98.98 0 00-.4 1.5 1.342 1.342 0 001.5.4l10-2.4 11.8 2.9z"
                        opacity=".15" />
                      <path data-name="Path 2561"
                        d="M598.263 318.38l17.8 10.3a7.909 7.909 0 003.4 1l35.5 1.6-4.1 21.8-28.4-5.6a7.078 7.078 0 00-2.9 0l-1.6.3a22.549 22.549 0 01-17.5-2.2h-.1a6.194 6.194 0 00-2.4-.8c-3.1-.3-10.6-1.1-10.6-1.1a.789.789 0 01-.8-.8 4.181 4.181 0 013.9-3.9l5.3-.7c2.8-.4 4.4-3 3.2-5.2l-5.3-9.3a2.484 2.484 0 00-1.6-1.2l-18.8-4.9a1.414 1.414 0 01-1.2-1.6 1.841 1.841 0 012.1-1.4c4.8.6 19.4 2.7 22.8 3.3a2.01 2.01 0 011.3.4z"
                        fill="#966363" />
                      <path data-name="Path 2562" d="M700.863 332.18l6 .2a3.333 3.333 0 003.2-2.2l9.9-36.2z" opacity=".15" />
                      <path data-name="Path 2563"
                        d="M841.263 837.48a28.1 28.1 0 00-1.3 10.3l-.1 28.8a31.488 31.488 0 004.1 14.3l.6 1a8.186 8.186 0 007.2 4.1h8.3a8.234 8.234 0 008-6.3 30.048 30.048 0 00.4-13l-7-30.9a36.166 36.166 0 00-2.5-8.4h-17.7z"
                        fill="var(--bs-primary)" />
                      <path data-name="Path 2564"
                        d="M720.563 712.28l-14.5 111.4a33.342 33.342 0 01-3.5 10.2l-23.8 44.8 5.6 7.6 21.8-10.9 19.4-35a55.215 55.215 0 012.6-17.6l30-110.5z"
                        fill="#966363" />
                      <path data-name="Path 2565"
                        d="M706.163 842.08c1.7-3.2 5.1-11 5.6-14.6l15.7-86.3a12.8 12.8 0 017.6-9.4l19.9-8.2.9-3.3-37.6 8.9-12.3 94.4a33.345 33.345 0 01-3.5 10.2l-23.8 44.8 3.4 5.7z"
                        opacity=".15" />
                      <path data-name="Path 2566"
                        d="M663.363 885.68l15.4-7a23.394 23.394 0 0022-8.3l24.8-30a53.321 53.321 0 014.5 30.7l-3.6 24.9h-2.8l-.8-25.6a2.013 2.013 0 00-3.6-1.2l-15.1 18.5a22.637 22.637 0 01-17.6 8.3h-27.5a2.631 2.631 0 01-2.4-3.6 14.064 14.064 0 016.7-6.7z"
                        fill="var(--bs-primary)" />
                      <path data-name="Path 2567"
                        d="M840.063 824.48a233.581 233.581 0 011.6 31.3l-.2 12.5a10.164 10.164 0 0010.2 9.8h1.7a10.234 10.234 0 0010.1-11.6l-2.9-14.8a91.892 91.892 0 01-1.6-22.8l8-143.8-38.9 11.1z"
                        fill="#966363" />
                      <path data-name="Path 2568"
                        d="M855.563 253.28l-32.9-6.7-53.6.6-19.7 5.3c-12.3 3.9-18.4 14.6-18.2 27.5l1.8 9.4-5.1 17.6c-3 11.4.9 18 8.8 27.2 2.5 2.9 3.8 4.1 4.8 9.6 0 0 4.8 18.1 5.7 25.6a335.191 335.191 0 012.2 51.3l101.2-.2c4.7 0 6.7-5 4.5-9.1 0 0-6.9-13.7-8.2-25.3-4.2-37.8 6.6-82.8 6.6-82.8l21.2-23.5c.6-12.3-7.4-23.8-19.1-26.5z"
                        fill="var(--bs-primary)" />
                      <path data-name="Path 2569"
                        d="M751.863 420.58l-33.6 309.5 148.4-38 1.5-127.3a548.54 548.54 0 00-16.8-141.5l-.7-2.9z"
                        fill="#3f4249" />
                      <g data-name="Group 124">
                        <path data-name="Path 2570"
                          d="M801.563 381.08a.56.56 0 01-.6-.5.587.587 0 01.5-.7l42.3-8.2a.608.608 0 11.2 1.2l-42.3 8.2z"
                          opacity=".15" />
                      </g>
                      <path data-name="Path 2571" d="M784.663 382.88l-12.2-2.4-2.7 2.6 3.2 3.8z" fill="#966363" />
                      <path data-name="Path 2572" d="M784.663 382.88l-12.2-2.4-2.7 2.6 3.2 3.8z" opacity=".15" />
                      <path data-name="Path 2573"
                        d="M828.663 701.58l11.4 123c.5 4.3.9 8.6 1.1 12.8v.1c.4 6.1.5 12.2.4 18.3l-.2 12.5a10.2 10.2 0 009.6 9.8c-4.7-3.7-4.4-9.7-4.5-14.2l-8.5-149a11.076 11.076 0 016.5-10.8l21.9-10.1.1-1.9z"
                        opacity=".15" />
                      <path data-name="Path 2574"
                        d="M654.863 331.68l-4.7 10a8.656 8.656 0 01-9.2 4.9l-17.5-2.8a8.5 8.5 0 00-4.2.2c-3.6 1.2-11.6 3.3-19.2 1.3a.367.367 0 00.3.1h.1a22.549 22.549 0 0017.5 2.2l1.6-.3a7.079 7.079 0 012.9 0l28.4 5.6z"
                        opacity=".15" />
                      <path data-name="Path 2575"
                        d="M782.463 403.68l16.9-3.6 49.2-4.1.5.2c2.4 6.9 3.3 9.2 5.2 13.6l-7.2.3a252.123 252.123 0 01-33.6-1.7 120 120 0 00-31.1.4v-5.1z"
                        opacity=".15" />
                      <path data-name="Path 2576"
                        d="M873.363 270.38l-10.3.7c-8.2 13.6-13.1 24.5-12.6 40.3l-.7 6.3 19.9 50.5-48.7 9.3 7.8 20 63.6-4.2c9.3-.6 15.9-10.6 12.5-20z"
                        fill="var(--bs-primary)" />
                      <path data-name="Path 2577" d="M747.263 431.58l1.1-11 102.1-.3 2.8 11.3z" fill="#21252b" />
                      <path data-name="Path 2578" d="M816.463 431.58a36.337 36.337 0 00-36 31.5l-35 260-27.2 7 32.3-298.5z"
                        opacity=".2" />
                      <path data-name="Path 2579"
                        d="M798.463 425.08l-37.2-64.3a3.483 3.483 0 00-4.2-1.5l-52.5 17.7a3.281 3.281 0 00-1.9 4.7l35.1 61a3.649 3.649 0 004 1.6l54.6-14.4a3.225 3.225 0 002.1-4.8z"
                        fill="#3f4249" />
                      <path data-name="Path 2580"
                        d="M798.463 425.08l-37.2-64.3a3.483 3.483 0 00-4.2-1.5l-52.5 17.7a3.281 3.281 0 00-1.9 4.7l35.1 61a3.649 3.649 0 004 1.6l54.6-14.4a3.225 3.225 0 002.1-4.8z"
                        opacity=".8" />
                      <path data-name="Path 2581"
                        d="M796.663 425.78l-37.2-64.3a3.483 3.483 0 00-4.2-1.5l-52.5 17.8a3.281 3.281 0 00-1.9 4.7l35.1 61a3.649 3.649 0 004 1.6l54.6-14.4a3.438 3.438 0 002.1-4.9z"
                        fill="#21252b" />
                      <path data-name="Path 2582"
                        d="M742.363 392.28a2.226 2.226 0 01-.7-2.3 7.248 7.248 0 00-4.8-.2c-2.4.8-2.9 3-1.1 4.8a7.932 7.932 0 007.5 1.8 2.907 2.907 0 002.2-2.6 6.444 6.444 0 01-3.1-1.5z"
                        fill="#3f4249" />
                      <path data-name="Path 2583"
                        d="M710.545 384.699c.507-.919-.178-2.269-1.532-3.017s-2.862-.61-3.37.309.179 2.269 1.532 3.017 2.863.609 3.37-.309z"
                        opacity=".4" />
                      <path data-name="Path 2584"
                        d="M710.114 384.9c.507-.918-.179-2.269-1.532-3.017s-2.862-.61-3.37.309.179 2.269 1.532 3.017 2.862.61 3.37-.309z"
                        fill="#3f4249" />
                      <path data-name="Path 2585"
                        d="M709.245 384.553c.348-.628-.116-1.549-1.034-2.056s-1.945-.41-2.292.219.116 1.549 1.035 2.056 1.944.408 2.291-.219z"
                        opacity=".5" />
                      <path data-name="Path 2586"
                        d="M706.563 383.58a.962.962 0 01.8-1.4h-.3c-.9 0-1.4.6-1.1 1.4a2.459 2.459 0 002.2 1.4h.3a2.367 2.367 0 01-1.9-1.4z"
                        opacity=".4" />
                      <path data-name="Path 2587"
                        d="M820.863 377.48l-28.3 5.4a3.4 3.4 0 01-1 .1l-17.9-.3a17.135 17.135 0 00-5.5.9l-20.7 7.6a1.755 1.755 0 00-1.1 2.2 1.793 1.793 0 002.2 1.3l19.8-5.2-18.8 10.3a1.948 1.948 0 001.7 3.5l19.2-7.6-17.3 6.8a1.984 1.984 0 00-1.1 2.4 1.853 1.853 0 002.3 1.3l17.6-4.8-15.2 4.2a1.6 1.6 0 00.8 3.1l40.5-8.6 30.8-2.6z"
                        fill="#966363" />
                      <g data-name="Group 125">
                        <path data-name="Path 2588"
                          d="M753.063 403.18a.675.675 0 01-.6-.4.6.6 0 01.4-.8l16.1-6.4a.632.632 0 11.4 1.2l-16.1 6.4z"
                          opacity=".15" />
                      </g>
                      <g data-name="Group 126">
                        <path data-name="Path 2589"
                          d="M756.663 406.18a.634.634 0 01-.6-.5.68.68 0 01.4-.8l15.2-4.2a.632.632 0 11.4 1.2l-15.2 4.2c-.1.1-.1.1-.2.1z"
                          opacity=".15" />
                      </g>
                      <path data-name="Path 2590"
                        d="M755.563 407.48a1.609 1.609 0 001.9 1.2l40.5-8.6 30.8-2.6-7.8-20 1.1 11.6a4.391 4.391 0 01-3.6 4.7l-23.2 3.8z"
                        opacity=".15" />
                      <path data-name="Path 2591" d="M820.863 377.48l4.4-1 8.3 20.6-4.9.4z" opacity=".6" />
                      <path data-name="Path 2592" d="M837.963 267.68a1.7 1.7 0 10-1.7-1.7 1.7 1.7 0 001.7 1.7z" fill="#fff" />
                      <path data-name="Path 2593" d="M797.163 273.38a1.7 1.7 0 10-1.7-1.7 1.7 1.7 0 001.7 1.7z" fill="#fff" />
                      <path data-name="Path 2594" d="M854.963 386.68a1.7 1.7 0 10-1.7-1.7 1.7 1.7 0 001.7 1.7z" fill="#fff" />
                      <path data-name="Path 2595" d="M839.563 307.98a1.7 1.7 0 10-1.7-1.7 1.7 1.7 0 001.7 1.7z" fill="#fff" />
                      <path data-name="Path 2596" d="M879.163 309.08a1.7 1.7 0 10-1.7-1.7 1.7 1.7 0 001.7 1.7z" fill="#fff" />
                      <path data-name="Path 2597" d="M776.263 299.78a1.7 1.7 0 10-1.7-1.7 1.7 1.7 0 001.7 1.7z" fill="#fff" />
                      <path data-name="Path 2598" d="M741.663 311.28a1.7 1.7 0 10-1.7-1.7 1.7 1.7 0 001.7 1.7z" fill="#fff" />
                      <path data-name="Path 2599" d="M726.863 291.98a1.7 1.7 0 10-1.7-1.7 1.7 1.7 0 001.7 1.7z" fill="#fff" />
                      <path data-name="Path 2600" d="M721.763 342.78a1.7 1.7 0 10-1.7-1.7 1.7 1.7 0 001.7 1.7z" fill="#fff" />
                      <path data-name="Path 2601" d="M691.663 355.68a1.7 1.7 0 10-1.7-1.7 1.7 1.7 0 001.7 1.7z" fill="#fff" />
                      <path data-name="Path 2602" d="M670.963 337.28a1.7 1.7 0 10-1.7-1.7 1.7 1.7 0 001.7 1.7z" fill="#fff" />
                      <path data-name="Path 2603" d="M760.563 261.48a1.7 1.7 0 10-1.7-1.7 1.7 1.7 0 001.7 1.7z" fill="#fff" />
                      <path data-name="Path 2604" d="M802.963 321.28a1.7 1.7 0 10-1.7-1.7 1.7 1.7 0 001.7 1.7z" fill="#fff" />
                      <path data-name="Path 2605" d="M790.063 371.48a1.7 1.7 0 10-1.7-1.7 1.7 1.7 0 001.7 1.7z" fill="#fff" />
                      <path data-name="Path 2606" d="M816.863 407.28a1.7 1.7 0 10-1.7-1.7 1.7 1.7 0 001.7 1.7z" fill="#fff" />
                      <path data-name="Path 2607" d="M769.763 344.08a1.7 1.7 0 10-1.7-1.7 1.7 1.7 0 001.7 1.7z" fill="#fff" />
                      <path data-name="Path 2608" d="M758.863 383.88a1.7 1.7 0 10-1.7-1.7 1.7 1.7 0 001.7 1.7z" fill="#fff" />
                      <path data-name="Path 2609" d="M870.163 347.38a1.7 1.7 0 10-1.7-1.7 1.7 1.7 0 001.7 1.7z" fill="#fff" />
                      <path data-name="Path 2610" d="M827.363 354.78a1.7 1.7 0 10-1.7-1.7 1.7 1.7 0 001.7 1.7z" fill="#fff" />
                      <path data-name="Path 2611"
                        d="M817.363 255.98l13-7.9-7.6-1.6-53.6.6-5.2 1.4 12.8 7.6a39.443 39.443 0 0040.6-.1z" opacity=".6" />
                      <path data-name="Path 2612" d="M822.563 163.68a16.5 16.5 0 10-16.5-16.5 16.5 16.5 0 0016.5 16.5z"
                        fill="#21252b" />
                      <path data-name="Path 2613"
                        d="M831.963 160.78a16.485 16.485 0 01-25.2-18.2c.2-.6.4-1.1.6-1.7 7.4 1.1 20.3 7.7 24.6 19.9z"
                        fill="var(--bs-primary)" />
                      <path data-name="Path 2614"
                        d="M814.463 215.78c-.8 17.8-6.1 27.7 3.8 28.1 15.8.7 29.3-13.2 30.1-31s-11.4-32.8-27.3-33.4c-4.2 15.2-5.9 18.5-6.6 36.3z"
                        fill="#21252b" />
                      <path data-name="Path 2615"
                        d="M807.463 216.733c1.35-15.4-10.35-29.016-26.14-30.4s-29.688 9.981-31.038 25.387 10.358 29.016 26.148 30.4 29.68-9.982 31.03-25.387z"
                        fill="#21252b" />
                      <path data-name="Path 2616"
                        d="M815.163 203.68l1 36a6.727 6.727 0 004.9 6.2l4.1 1.1-9.4 5.8a35.026 35.026 0 01-36.4.3l-10.2-6.1 4.6-1.3a6.638 6.638 0 004.8-5.6l4.7-42.8z"
                        fill="#966363" />
                      <path data-name="Path 2617"
                        d="M790.063 230.28l1.7.1a22.153 22.153 0 0023.1-21.2l1.3-31.1a7.388 7.388 0 00-7.1-7.7l-29.1-1.3a9.612 9.612 0 00-10 9.2l-1.2 28.9a22.364 22.364 0 0021.3 23.1z"
                        fill="#966363" />
                      <path data-name="Path 2618" d="M792.463 198.68a2.4 2.4 0 10-2.4-2.4 2.4 2.4 0 002.4 2.4z" fill="#21252b" />
                      <path data-name="Path 2619" d="M791.463 196.28a.5.5 0 10-.5-.5.5.5 0 00.5.5z" fill="#fff" />
                      <path data-name="Path 2620" d="M773.763 198.68a2.4 2.4 0 10-2.4-2.4 2.4 2.4 0 002.4 2.4z" fill="#21252b" />
                      <path data-name="Path 2621" d="M772.763 196.18a.5.5 0 10-.5-.5.5.5 0 00.5.5z" fill="#fff" />
                      <g data-name="Group 127">
                        <path data-name="Path 2622"
                          d="M782.463 210.28l3.2.3a.707.707 0 10.2-1.4l-3.2-.3a1.456 1.456 0 01-1.3-1.6 1.617 1.617 0 011.6-1.4.707.707 0 10.2-1.4 2.9 2.9 0 00-3.1 2.6 2.563 2.563 0 002.4 3.2z"
                          opacity=".3" />
                      </g>
                      <path data-name="Path 2623"
                        d="M760.563 192.58c3.6-2.4 2.2-7.2 2.2-7.2a22.1 22.1 0 01-1.1-6.5c-.1-7.4 3.9-10.3 6-11.3a2.157 2.157 0 001.3-1.9c1.6-23.1 33.3-28.6 49.9-14.8 10 8.4 12.3 17.7 11.5 26.4a5.827 5.827 0 002.9 5.8l-4.3 1.8c-1.7 6.4-4.5 12.3-6.1 16.9-.7 2-4.3-6.2-6-7.1-.2-.1-1.8 2.1-2.8 3.5a1.344 1.344 0 01-2.4-.3 35.313 35.313 0 01-1.5-12.1l.2-3.7c-8.1-1.2-11.2-8.9-11.2-8.9-8 8.9-21.4 7.9-26.8 7.1a2.21 2.21 0 00-2.5 2.1l-.6 13.9a27 27 0 01-4.1-5.4l-3.7 2.6z"
                        fill="#21252b" />
                      <path data-name="Path 2624" d="M813.263 210.38s10.5 1.7 13.6-8.5c3.1-10.3-9.7-13.3-12.4-2.9l-2.4 11.4z"
                        fill="#966363" />
                      <path data-name="Path 2625"
                        d="M824.063 196.08a4.1 4.1 0 00-3.1-1.1 3.872 3.872 0 00-2.7 1.8 7.791 7.791 0 00-1.5 4l-.1 1.1c-.1.8 1.3 1.2 1.4.2l.2-1.2a7.385 7.385 0 011.2-3.3 2.352 2.352 0 013.9-.5.769.769 0 001-.1.806.806 0 00-.3-.9z"
                        opacity=".3" />
                      <path data-name="Path 2626"
                        d="M762.663 198.18a9.679 9.679 0 1018.3-3.6 8.272 8.272 0 014.8.1 10.892 10.892 0 00-.8 3.1 9.679 9.679 0 1010.4-8.9 9.566 9.566 0 00-9 4.6 8.912 8.912 0 00-6-.1 9.706 9.706 0 00-17.7 4.8zm23.4-.3a8.375 8.375 0 117.7 9 8.386 8.386 0 01-7.7-9zm-22.1.4a8.375 8.375 0 117.7 9 8.386 8.386 0 01-7.7-9z"
                        fill="#fff" />
                      <path data-name="Path 2627" d="M816.463 208.98a2.1 2.1 0 10-2.1-2.1 2.1 2.1 0 002.1 2.1z"
                        fill="var(--bs-primary)" />
                      <path data-name="Path 2628"
                        d="M815.563 208.68a2.273 2.273 0 002.5-2.1 2.375 2.375 0 00-.3-1.2 2.342 2.342 0 01.8 1.8 2.061 2.061 0 01-2.3 1.9 1.845 1.845 0 01-1.2-.5.749.749 0 01.5.1z"
                        opacity=".15" />
                      <path data-name="Path 2629"
                        d="M774.763 184.48c9.4.3 15.8-2.6 19.5-5.2a20.222 20.222 0 006-5.7.652.652 0 10-1.1-.7c-.1.1-7.2 10.8-24.4 10.3a.645.645 0 00-.6.6.858.858 0 00.6.7z"
                        fill="#21252b" />
                      <path data-name="Path 2630" d="M815.363 210.48h-3.4l3.6 7.2z" opacity=".15" />
                      <path data-name="Path 2631"
                        d="M779.063 226.58a24.58 24.58 0 0011.4 3.1h2.7a3.4 3.4 0 001-.1h.2c.5-.1 1-.1 1.6-.2.2 0 .4-.1.6-.1a22.98 22.98 0 007.8-2.8.652.652 0 01.7 1.1 25.315 25.315 0 01-10.2 3.3 19.731 19.731 0 01-11.7 4 20.74 20.74 0 01-5-.6z"
                        opacity=".15" />
                      <path data-name="Path 2632"
                        d="M780.663 214.08a.441.441 0 00-.4.6 6.878 6.878 0 0012.4 0c.1-.3 0-.6-.4-.6z" fill="#fff" />
                      <path data-name="Path 2633" d="M654.963 331.18l4.8.1-4.4 22.7-4.5-.9z" opacity=".6" />
                      <path data-name="Path 2634"
                        d="M873.963 367.28l-4.4.8-17.9-45.4-1.5-3.8c1.4-6.5 3.2-15 4.4-20.1a1.186 1.186 0 012.3-.1l20 63.6a3.745 3.745 0 01-2.9 5z"
                        opacity=".15" />
                      <path data-name="Path 2635"
                        d="M736.663 334.08c-7.9-9.2-9.2-18.3-6.2-29.7l3.2-11.8 2.7-12.7v-.2c0-.2-.2-.4-.5-.5a.657.657 0 00-.8.5l-3.3 15-1.6 5.1s-12.9 18.4-8.9 32.4c1.5 5.1 2.4 8.5-.7 12.8l-5.7 8.3c-5.1 4.7-12.7 3.5-12.7 3.5l-50.5-8.2-.9 4.7 46.8 9.2h-.2l5 .9a22.089 22.089 0 0019.6-6.2 18.843 18.843 0 002.2-2.6l13.5-19a5.6 5.6 0 00-1-1.5z"
                        opacity=".15" />
                      <path data-name="Path 2636"
                        d="M925.863 465.68a7.49 7.49 0 01-7.5 7.5h-784.7a7.5 7.5 0 010-15h784.8a7.469 7.469 0 017.4 7.5z"
                        fill="#61656d" />
                      <path data-name="Path 2637"
                        d="M925.863 465.68a7.49 7.49 0 01-7.5 7.5h-784.7a7.5 7.5 0 010-15h784.8a7.469 7.469 0 017.4 7.5z"
                        opacity=".5" />
                      <path data-name="Path 2638"
                        d="M984.763 465.68a7.49 7.49 0 01-7.5 7.5h-700.6a7.5 7.5 0 010-15h700.6a7.555 7.555 0 017.5 7.5z"
                        fill="#61656d" />
                      <path data-name="Path 2639" d="M714.363 119.88h-90.1v114.7h90.1z" fill="#fff" />
                      <path data-name="Path 2640" d="M702.263 131.48h-66v91.6h66z" fill="#ddd" />
                      <path data-name="Path 2641" d="M621.639 234.619h2.6v-114.7h-2.6z" fill="#dadddf" />
                      <path data-name="Path 2642" d="M680.263 189.78a14.3 14.3 0 10-14.3-14.3 14.3 14.3 0 0014.3 14.3z"
                        fill="var(--bs-primary)" />
                      <path data-name="Path 2643" d="M642.063 213.18l14.9-23.4 14.9 23.1z" opacity=".2" />
                      <path data-name="Path 2644" d="M676.963 141.38h-30.9v30.9h30.9z" opacity=".2" />
                      <path data-name="Path 2645"
                        d="M720.463 456.18l3.5-44.5h-31.7l2.7 44.5a2.187 2.187 0 002.2 2h21.1a2.261 2.261 0 002.2-2z"
                        fill="#fff" />
                      <path data-name="Path 2646"
                        d="M723.963 407.88h-3.5l-1.6-4.1a.622.622 0 00-.6-.4h-21.2a.675.675 0 00-.6.4l-1.6 4.1h-2.7a.683.683 0 00-.7.7v2.5a.684.684 0 00.7.7h32a.684.684 0 00.7-.7v-2.5a1.068 1.068 0 00-.9-.7z"
                        fill="var(--bs-primary)" />
                      <path data-name="Path 2647"
                        d="M723.963 407.88h-3.5l-1.6-4.1a.622.622 0 00-.6-.4h-21.2a.675.675 0 00-.6.4l-1.6 4.1h-2.7a.683.683 0 00-.7.7v2.5a.684.684 0 00.7.7h32a.684.684 0 00.7-.7v-2.5a1.068 1.068 0 00-.9-.7z"
                        fill="#fff" opacity=".2" />
                      <path data-name="Path 2648"
                        d="M720.163 407.08h-17.6l1.3-3.7h-6.8a.675.675 0 00-.6.4l-1.6 4.1h-2.7a.683.683 0 00-.7.7v2.5a.684.684 0 00.7.7h5.7c.5-1.4 1.1-3.1 1.1-3.1a.875.875 0 01.9-.6h20.7z"
                        opacity=".15" />
                      <path data-name="Path 2649" d="M723.863 412.78l.1-1.1h-31.7l2.7 44.5a2.187 2.187 0 002.2 2h1.5l1.1-43.8z"
                        opacity=".15" />
                      <path data-name="Path 2650" d="M698.563 432.48a9.005 9.005 0 0118 0" fill="var(--bs-primary)" />
                      <path data-name="Path 2651" d="M722.063 434.98h-28.4l.5 8.7h27.2z" fill="var(--bs-primary)" />
                      <path data-name="Path 2652"
                        d="M1098.763 897.38H.963a.8.8 0 110-1.6h1097.9a.789.789 0 01.8.8.817.817 0 01-.9.8z"
                        fill="#b2b6bb" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </section> */}
        </main>
        <footer className="bg-dark pt-5 text-white">
          <div className="container">
            {/* <div className="row">
              <div className="col-xl-4 me-auto py-3"><a href="#"
                className="d-inline-block h2 mb-4 text-decoration-none text-uppercase text-white-50">PG
                Agency&nbsp;</a>
                <p className="mb-3"> Duis pharetra venenatis felis, ut tincidunt ipsum consequat nec. Fusce et porttitor libero, eu
                  aliquam nisi. Nam finibus ullamcorper semper.</p>
                <div className="mb-4"><a href="#" className="link-light text-decoration-none">+1 234 567-890</a> <br /> <a href="#"
                  className="link-light text-decoration-none">hello@company.com</a>
                </div>
                <div className="d-inline-flex flex-wrap"><a href="#" className="p-1 text-white" aria-label="facebook link">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path
                      d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
                  </svg>
                </a> <a href="#" className="p-1 text-white" aria-label="twitter link">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path
                        d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
                    </svg>
                  </a> <a href="#" className="p-1 text-white" aria-label="instagram link">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path
                        d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                    </svg>
                  </a> <a href="#" className="p-1 text-white" aria-label="linkedin link">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path
                        d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
                    </svg>
                  </a> <a href="#" className="p-1 text-white" aria-label="youtube link">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path
                        d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="col-sm-4 col-xl-2 py-3">
                <h2 className="h5 mb-4 text-uppercase text-white-50">About</h2>
                <ul className="list-unstyled">
                  <li className="mb-3"><a href="#" className="link-light text-decoration-none">Get Quote</a>
                  </li>
                  <li className="mb-3"><a href="#" className="link-light text-decoration-none">Enterprise Plan</a>
                  </li>
                  <li className="mb-3"><a href="#" className="link-light text-decoration-none">Become an Affiliate</a>
                  </li>
                  <li className="mb-3"><a href="#" className="link-light text-decoration-none">Our Portfolio</a>
                  </li>
                </ul>
              </div>

            </div> */}
            <div className="pb-3 pt-3 text-center">
              <hr className="border-secondary mt-0" />
              <p className="mb-0">Copyright &copy; 2023</p>
            </div>
          </div>
        </footer>
        {/* <script src="assets/js/popper.min.js"></script>
        <script src="bootstrap/js/bootstrap.min.js"></script> */}
      </>
    );
  }
}

export default Landing;
