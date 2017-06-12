import React ,{Component} from 'react';
import withRedux from 'next-redux-wrapper';
import {createStore,applyMiddleware } from 'redux';
import Link from 'next/link';
import Router from 'next/router'
import thunk from 'redux-thunk';

import reducer  from '../reducers';
import MyHeader from '../components/MyHeader';
import PostsShow from '../components/posts_show';
import {fetchPosts,initfetchPosts , FETCH_POSTS} from '../actions'

const initStore = (initialState = {}) => {

  return createStore(reducer, initialState, applyMiddleware(thunk))
}

class ShowPage extends Component {
  static async getInitialProps ({ store, isServer }) {

     return { isServer }
  }

  render() {
    return (
      <div>
      <MyHeader/>
      <div className="container">
        <p>posts show {this.props.url.query.id}</p>
        <PostsShow  id={this.props.url.query.id} />

      </div>
    </div>
    )
  }
}
export default withRedux(initStore , null,null)(ShowPage);
