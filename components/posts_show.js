import React , {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost,deletePost} from '../actions';
import Link from 'next/link';
import Router from 'next/router';

class PostsShow extends Component {
  constructor(props){
      super(props)
      //this.onDeleteClick = this.onDeleteClick.bind(this);

  }

  componentDidMount () {
    if(!this.props.post) {
      const {id} = this.props;
      this.props.fetchPost(id);
    }
  }

  onDeleteClick(event){
      const {id} = this.props;
      console.log(event);
    this.props.deletePost(id, () => {
      Router.push('/');
    });
  }

  render() {
    const {post} = this.props;

    if(!post) {
      return <div>Loading... </div>
    }
    return (
      <div>
        <Link href='/'>
          <a className=''>Back To Index</a>
        </Link>
        <button
          className='btn btn-danger pull-xs-right'
          onClick={this.onDeleteClick.bind(this)}>
          Delete Post
        </button>
         <h3>{post.title} </h3>
         <h6> Categories: { post.categories} </h6>
         <p>{post.content} </p>
      </div>
    )
  }
}

function mapStateToProps({posts} , ownProps){
    return {post : posts[ownProps.id]}
}

export default connect(mapStateToProps , {fetchPost,deletePost})(PostsShow);
