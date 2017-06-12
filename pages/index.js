import React ,{Component} from 'react';
import withRedux from 'next-redux-wrapper';
import {createStore,applyMiddleware } from 'redux';
import Link from 'next/link';
import Router from 'next/router'
import thunk from 'redux-thunk';

import reducer  from '../reducers';
import MyHeader from '../components/MyHeader';
import PostsIndex from '../components/posts_index';
import {fetchPosts,initfetchPosts } from '../actions'

const initStore = (initialState = {}) => {

  return createStore(reducer, initialState, applyMiddleware(thunk))
}

class IndexPage extends Component {
  static async getInitialProps ({ store, isServer }) {
    //store.dispatch(serverRenderClock(isServer))
  //  store.dispatch(fetchPosts());
    //store.dispatch(initfetchPosts());
    //await initfetchPosts();
    /*const out = await fetch(ROOT_URL + '/posts'+API_KEY)
    const json = await out.json();
    console.log('json' ,json);
    return store.dispatch({
      type : FETCH_POSTS,
      payload : {data: json}
    });
    */
    console.log('isServer',isServer);
    store.dispatch(await initfetchPosts(isServer));
   //store.dispatch(await fetchPosts());
     return { isServer }
  }

  render() {
    return (
      <div>
      <MyHeader/>
      <div className="container">
        <p>isServer {this.props.isServer}</p>
          <PostsIndex/>

      </div>
    </div>
    )
  }
}
export default withRedux(initStore , null,{fetchPosts})(IndexPage);
