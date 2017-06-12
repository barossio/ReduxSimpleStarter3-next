import axios from 'axios';
import fetch from 'isomorphic-unfetch';

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const FETCH_POST = 'FETCH_POST';
export const DELETE_POST = 'DELETE_POST';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=baross';

export function fetchPosts(){
  console.log('fetchPosts')
  return function (dispatch){
     axios.get(ROOT_URL + '/posts'+API_KEY)
    .then( (response) => {
      console.log('response',response);
      dispatch( {
        type : FETCH_POSTS,
        payload : response
      })
    })


  }

}

export async function  initfetchPosts(){
  console.log('initfetchPosts')
  const out = await fetch(ROOT_URL + '/posts'+API_KEY)
  const json = await out.json();
  console.log('json' ,json);
  return {
    type : FETCH_POSTS,
    payload : {data: json}
  }

}

export function createPost (values , callback) {
  console.log('createPost')
  return function(dispatch){
    axios.post(ROOT_URL + '/posts'+API_KEY , values)
    .then((response) => {
      dispatch({
        type : CREATE_POST,
        payload : response
      });
      callback();
    });


  }
}

export function fetchPost(id){
  return function(dispatch){
    axios.get(ROOT_URL + '/posts' + '/'+id+API_KEY)
    .then(response => {
      dispatch({
        type : FETCH_POST,
        payload : response
      })
    })

  }

}

export function deletePost (id , callback) {
  return function(dispatch){
    axios.delete(ROOT_URL + '/posts' + '/'+id+API_KEY)
    .then((response) => {
      dispatch({
        type : DELETE_POST,
        payload : id
      });
      callback();
    });
  }

}
