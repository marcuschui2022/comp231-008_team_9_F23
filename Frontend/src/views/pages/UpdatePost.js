import classnames from "classnames";
import React, { useState, Component } from 'react';
import { ContentState, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';

import axios from 'axios';
import moment from 'moment';

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
import { data } from "jquery";

async function getPostByID(postID) {
  return axios({
    method: 'get',
    url: 'http://localhost:8080/api/posts/' + postID,
    headers: {
      Accept: "application/json",
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      crossdomain: true
    },
  }).then(function (response) {
    // console.log(response);
    let res = response.data

    let postedTime = moment().diff(moment(res.pubDate), 'minutes')

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
    let obj = {
      id: postID,
      tags: res.tags,
      blogImg: "baking.jpg",
      title: res.title,
      text: res.author,
      classification: res.classification,
    }
    return obj;
  }).catch(function (error) {
    console.log(error);
  });
}


class UpdatePost extends React.Component {

  state = {
    data: null
  };

  componentDidMount() {
    let id = (window.location.pathname).split("/")[2]

    let data = getPostByID(id).then(res => {
      console.log(res.text)
      const blocksFromHtml = htmlToDraft(res.text)

      const { contentBlocks, entityMap } = blocksFromHtml
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      )
       

      this.setState({
        data: res,

        editorState: EditorState.createWithContent(contentState)//EditorState.createWithContent()
        
      })
    });
  }

  changeFormState = (attr, value) => {
    this.setState({
      [attr]: value
    });
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    });
  };

  getUser = () => {
    var tmp = localStorage.getItem('user');
    // console.log(tmp)
    if (tmp != null) {
      return true
    }
    return false
  }

  async handleSubmit(e) {
    e.preventDefault();
    var tmp = localStorage.getItem('user');
    // const blogID = await getBlogID(JSON.parse(tmp), this.state.title)
    // console.log(blogID)
    // if (blogID) {
    //   var tmpToken = {
    //     title: this.state.title,
    //     author: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
    //     pubDate: toIsoString(new Date()),
    //     category: "FREE",
    //     classification: this.state.classification,
    //     cookingType: null,
    //     cookingStyle: null,
    //     tags: null,
    //   }
    //   console.log(tmpToken)

    //   const token = await creatPost(tmpToken, blogID);
    //   if (token) {
    //     console.log('creatPost successful');
    //     this.setState({ redirectToHome: true });

    //   }
    // }
    // // setToken(token);
  }


  render() {
    const { editorState } = this.state;

    if (!this.getUser() || this.state.redirectToHome) {
      return <Navigate to="/" />;  // Redirect to the home page
    }
    return (
      <>
        <Navbar className="" />
        <main id="main">

          {(() => {
            if (this.state.data != null) {
              console.log(this.state.data)


              return (<><section>
                <div className="container">

                  <Breadcrumb listTag="div">
                    <BreadcrumbItem>
                      <Link to={"/"} tag={Link}>
                        Home
                      </Link>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                      <Link to={"/posted"} tag={Link}>
                        Post
                      </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem
                      active
                      tag="span"
                    >
                      Update
                    </BreadcrumbItem>
                  </Breadcrumb>
                </div>
              </section>


                <section id="blog" className="blog">
                  <div className="container" data-aos="fade-up">


                    <div className=" entries">

                      <Form role="form">

                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative"  onChange={input => this.changeFormState("title", input.target.value)}>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText  >
                                {/* <i className="fa fa-user" /> */}
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input value={this.state.data.title} placeholder="Title" type="text" />
                          </InputGroup>
                        </FormGroup>


                        <FormGroup className="mb-3">

                          <Editor
                            editorState={editorState}
                            onEditorStateChange={this.onEditorStateChange}
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                          />

                        </FormGroup>

                        <FormGroup className="mb-3">
                          <Input
                            name="select"
                            type="select"
                            placeholder="Role"
                            value={this.state.data.classification}
                            onChange={input => this.changeFormState("classification", input.target.value)}
                          >
                            <option hidden>Please select Typle</option>
                            {/* <option value="ARTICLE">blog</option> */}
                            <option value="ARTICLE">Article</option>
                            <option value="RECIPE">recipe</option>
                          </Input>
                        </FormGroup>

                        <div className="text-center">
                          <Button
                            className="my-4"
                            color="primary"
                            type="button"
                            onClick={(e) => { this.handleSubmit(e) }}
                          >
                            Update
                          </Button>
                        </div>
                      </Form>

                    </div>

                  </div>


                </section></>)

            }

          })()}


        </main>
        {/* <script src="assets/js/popper.min.js"></script>
        <script src="bootstrap/js/bootstrap.min.js"></script> */}
      </>
    );
  }
}

export default UpdatePost;
