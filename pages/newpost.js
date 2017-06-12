import React ,{Component} from 'react';
import withRedux from 'next-redux-wrapper';
import {createStore,applyMiddleware } from 'redux';
import Link from 'next/link';
import Router from 'next/router'
import thunk from 'redux-thunk';

import reducer  from '../reducers';
import MyHeader from '../components/MyHeader';
import PostsNew from '../components/posts_new';
import {fetchPosts,initfetchPosts } from '../actions'

const initStore = (initialState = {}) => {

  return createStore(reducer, initialState, applyMiddleware(thunk))
}

class NewPage extends Component {
  static async getInitialProps ({ store, isServer }) {

     return { isServer }
  }

  render() {
    return (
      <div>
      <MyHeader/>
      <div className="container">
        <p>posts new</p>
        <PostsNew/>

      </div>
    </div>
    )
  }
}
export default withRedux(initStore , null,null)(NewPage);
