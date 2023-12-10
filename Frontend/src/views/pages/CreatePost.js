import classnames from "classnames";
import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import axios from 'axios';

// reactstrap components
import {
  Badge,
  Button,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";

import '../../assets/css/pages.css';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import Navbar from "components/Navbars/Navbar.js";
import { Link, Navigate } from "react-router-dom";

async function creatPost(credentials, blogId) {
  return axios({
    method: 'post',
    url: 'http://localhost:8080/api/posts/user/' + blogId,
    headers: {
      Accept: "application/json",
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      crossdomain: true
    },
    data: credentials
  }).then(function (response) {
    this.props.history.push('/')
    console.log(response);
    return response;
  }).catch(function (error) {
    console.log(error);
  });
}


async function getBlogID(userID) {
  return axios({
    method: 'get',
    url: 'http://localhost:8080/api/blogs/user/' + userID,
    headers: {
      Accept: "application/json",
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      crossdomain: true
    }
  }).then(function (response) {
    console.log(response);
    return response;
  }).catch(function (error) {
    console.log(error);
  });
}

class CreatePost extends React.Component {
  state = {
    title:"",
  };
  editorState = {};

  getUser = () => {
    var tmp = localStorage.getItem('user');
    console.log(tmp)
    if (tmp != null) {
      return true
    }
    return false
  }

  async handleSubmit(e) {
    e.preventDefault();
    var tmp = localStorage.getItem('user');
    const blogID = await getBlogID(JSON.parse(tmp).userID)

    // const token = await creatPost({
    //   title: this.state.title,
    //   author: this.state.author,
    //   pubDate: this.state.pubDate,
    //   category: this.state.category,
    //   classification: this.state.classification,
    //   cookingType: null,
    //   cookingStyle: null,
    //   tags: null,
    // });
    // // setToken(token);
    // if (token) {
    //   console.log('creatPost successful');
    //   this.setState({ redirectToHome: true });
    // }
  }


  render() {
    if (!this.getUser()) {
      return <Navigate to="/" />;  // Redirect to the home page
    }
    return (
      <>
        <Navbar className="" />
        <main id="main">


          <section>
            <div className="container">

              <Breadcrumb listTag="div">
                <BreadcrumbItem>
                  <Link to={"/"} tag={Link}>
                    Home
                  </Link>
                </BreadcrumbItem>

                <BreadcrumbItem>
                  <Link to={"/blogs"} tag={Link}>
                    Blog
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbItem
                  active
                  tag="span"
                >
                  Create
                </BreadcrumbItem>
              </Breadcrumb>
            </div>
          </section>


          <section id="blog" className="blog">
            <div className="container" data-aos="fade-up">


              <div className=" entries">

                <Form role="form">

                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative" onChange={input => this.changeFormState("title", input.target.value)}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText  >
                          {/* <i className="fa fa-user" /> */}
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Title" type="text" />
                    </InputGroup>
                  </FormGroup>


                  <FormGroup className="mb-3">

                    <Editor editorState={null}
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                      onEditorStateChange={this.onEditorStateChange} />

                  </FormGroup>

                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id=" customCheckLogin"
                      type="checkbox"
                    />

                  </div>
                  <div className="text-center">
                    <Button
                      className="my-4"
                      color="primary"
                      type="button"
                      onClick={(e)=>{this.handleSubmit(e)}}
                    >
                      Create
                    </Button>
                  </div>
                </Form>

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

export default CreatePost;
