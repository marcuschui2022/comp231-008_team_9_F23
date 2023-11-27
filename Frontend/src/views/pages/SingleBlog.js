import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";

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
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";

import '../../assets/css/pages.css';

import Navbar from "components/Navbars/Navbar.js";
import { Link } from "react-router-dom";

class SingleBlog extends React.Component {
  state = {};
  // componentDidMount() {
  //   document.documentElement.scrollTop = 0;
  //   document.scrollingElement.scrollTop = 0;
  //   this.refs.main.scrollTop = 0;
  // }

  render() {
    return (
      <>
        <Navbar className="" />
        <main id="main">


          <section>
            <div className="container">

              <Breadcrumb listTag="div">
                <BreadcrumbItem tag="a">
                  <Link to={"/"} tag={Link}>
                    Home
                  </Link>
                </BreadcrumbItem>

                <BreadcrumbItem tag="a">
                  <Link to={"/blogs"} tag={Link}>
                    Blog
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbItem
                  active
                  tag="span"
                >
                  Single Blog
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
          </section>


          <section id="blog" className="blog">
            <div className="container" data-aos="fade-up">

              <div className="row">

                <div className="col-lg-8 entries">

                  <article className="entry entry-single">

                    <div className="entry-img">
                      <img src={require(`assets/img/content/pics/baking.jpg`)} alt="" className="img-fluid" />
                    </div>

                    <h2 className="entry-title">
                      Dolorum optio tempore voluptas dignissimos cumque fuga qui quibusdam quia
                    </h2>

                    <div >
                      <ul className="entry-meta">
                        <li className="d-flex align-items-center pr-3"><i className="fa fa-user pr-1" /><a href="#">John Doe</a></li>
                        <li className="d-flex align-items-center pr-3"><i className="fa fa-clock-o pr-1" /> <a href="#"><time datetime="2020-01-01">Jan 1, 2020</time></a></li>
                        <li className="d-flex align-items-center pr-3"><i className="fa fa-commenting pr-1" /> <a href="#">12 Comments</a></li>
                      </ul>
                    </div>

                    <div className="entry-content">
                      <p>
                        Similique neque nam consequuntur ad non maxime aliquam quas. Quibusdam animi praesentium. Aliquam et laboriosam eius aut nostrum quidem aliquid dicta.
                        Et eveniet enim. Qui velit est ea dolorem doloremque deleniti aperiam unde soluta. Est cum et quod quos aut ut et sit sunt. Voluptate porro consequatur assumenda perferendis dolore.
                      </p>

                      <p>
                        Sit repellat hic cupiditate hic ut nemo. Quis nihil sunt non reiciendis. Sequi in accusamus harum vel aspernatur. Excepturi numquam nihil cumque odio. Et voluptate cupiditate.
                      </p>


                      <p>
                        Sed quo laboriosam qui architecto. Occaecati repellendus omnis dicta inventore tempore provident voluptas mollitia aliquid. Id repellendus quia. Asperiores nihil magni dicta est suscipit perspiciatis. Voluptate ex rerum assumenda dolores nihil quaerat.
                        Dolor porro tempora et quibusdam voluptas. Beatae aut at ad qui tempore corrupti velit quisquam rerum. Omnis dolorum exercitationem harum qui qui blanditiis neque.
                        Iusto autem itaque. Repudiandae hic quae aspernatur ea neque qui. Architecto voluptatem magni. Vel magnam quod et tempora deleniti error rerum nihil tempora.
                      </p>

                      <h3>Et quae iure vel ut odit alias.</h3>
                      <p>
                        Officiis animi maxime nulla quo et harum eum quis a. Sit hic in qui quos fugit ut rerum atque. Optio provident dolores atque voluptatem rem excepturi molestiae qui. Voluptatem laborum omnis ullam quibusdam perspiciatis nulla nostrum. Voluptatum est libero eum nesciunt aliquid qui.
                        Quia et suscipit non sequi. Maxime sed odit. Beatae nesciunt nesciunt accusamus quia aut ratione aspernatur dolor. Sint harum eveniet dicta exercitationem minima. Exercitationem omnis asperiores natus aperiam dolor consequatur id ex sed. Quibusdam rerum dolores sint consequatur quidem ea.
                        Beatae minima sunt libero soluta sapiente in rem assumenda. Et qui odit voluptatem. Cum quibusdam voluptatem voluptatem accusamus mollitia aut atque aut.
                      </p>
                      <img src={require(`assets/img/content/pics/BakingSoda.png`)} className="img-fluid" alt="" />

                      <h3>Ut repellat blanditiis est dolore sunt dolorum quae.</h3>
                      <p>
                        Rerum ea est assumenda pariatur quasi et quam. Facilis nam porro amet nostrum. In assumenda quia quae a id praesentium. Quos deleniti libero sed occaecati aut porro autem. Consectetur sed excepturi sint non placeat quia repellat incidunt labore. Autem facilis hic dolorum dolores vel.
                        Consectetur quasi id et optio praesentium aut asperiores eaque aut. Explicabo omnis quibusdam esse. Ex libero illum iusto totam et ut aut blanditiis. Veritatis numquam ut illum ut a quam vitae.
                      </p>
                      <p>
                        Alias quia non aliquid. Eos et ea velit. Voluptatem maxime enim omnis ipsa voluptas incidunt. Nulla sit eaque mollitia nisi asperiores est veniam.
                      </p>

                    </div>

                    <div className="d-flex entry-footer">

                      <i className="fa fa-folder-o pr-1"></i>
                      <ul className="item pr-3">
                        <li><a href="#">Business</a></li>
                      </ul>

                      <i className="fa fa-tags pr-1"></i>
                      <ul className="item">
                        <li><a href="#">Creative</a></li>
                        <li><a href="#">Tips</a></li>
                        <li><a href="#">Marketing</a></li>
                      </ul>
                    </div>

                  </article>

                  <div className="mt-5 entry blog-author d-flex align-items-center">
                    <img src={require(`assets/img/content/pics/Blogger2.jpg`)} className="rounded-circle float-left" width="120" alt="" />
                    <div className="pl-2">
                      <h4>Jane Smith</h4>
                      <p>
                        Itaque quidem optio quia voluptatibus dolorem dolor. Modi eum sed possimus accusantium. Quas repellat voluptatem officia numquam sint aspernatur voluptas. Esse et accusantium ut unde voluptas.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 blog-comments">

                    <h4 className="comments-count">1 Comments</h4>

                    <div id="comment-1" className="comment">
                      <div className="d-flex">
                        <div className="comment-img pr-4"><img src={require(`assets/img/content/pics/Blogger1.png`)} width="90" alt="" /></div>
                        <div>
                          <h5><a href="">Georgia Reader</a> </h5>
                          <time datetime="2020-01-01">01 Jan, 2020</time>
                          <p>
                            Et rerum totam nisi. Molestiae vel quam dolorum vel voluptatem et et. Est ad aut sapiente quis molestiae est qui cum soluta.
                            Vero aut rerum vel. Rerum quos laboriosam placeat ex qui. Sint qui facilis et.
                          </p>
                        </div>
                      </div>
                    </div>


                    <div className="reply-form">
                      <h4>Leave a Reply</h4>
                      <form action="">
                        <div className="row">
                          <div className="col form-group">
                            <textarea name="comment" className="form-control" placeholder="Your Comment*"></textarea>
                          </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Post Comment</button>
                      </form>
                    </div>

                  </div>
                </div>

                <div className="col-lg-4">

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
                        <label className="form-check-label" for="inlineRadio1">All</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option1" />
                        <label className="form-check-label" for="inlineRadio1">Free</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option2" />
                        <label className="form-check-label" for="inlineRadio2">Premium</label>
                      </div>
                    </form>
                  </div>
                  <div className="mb-4">
                    <h2 className="h5 text-primary">Post Type</h2>
                    <hr className="mb-4" />
                    <form>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio11" value="option1" checked />
                        <label className="form-check-label" for="inlineRadio1">All</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio22" value="option1" />
                        <label className="form-check-label" for="inlineRadio1">Article</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio33" value="option2" />
                        <label className="form-check-label" for="inlineRadio2">Recipe</label>
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

        </main>
        {/* <script src="assets/js/popper.min.js"></script>
        <script src="bootstrap/js/bootstrap.min.js"></script> */}
      </>
    );
  }
}

export default SingleBlog;
