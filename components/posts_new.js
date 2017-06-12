import React ,{Component} from 'react' ;
import {Field , reduxForm} from 'redux-form';
import Link from 'next/link';
import Router from 'next/router';
import {connect} from 'react-redux';
import {createPost} from '../actions'

class PostsNew extends Component {
  renderField(field){
    const {meta :{touched , error }}  = field;
    //const {touched , error }  = field.meta;
    const className = 'form-group ' + (touched && error ? ' has-danger' : '');
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className='form-control'
            type='text'
            {...field.input}
        />
          <div className='text-help'>
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  onSubmit(values) {
    console.log('values',values);
    this.props.createPost(values , () => {
        Router.push('/');
    });
  }


  render(){
    const {handleSubmit} = this.props;

    return (
    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
      <Field name='title'
        label='Title'
       component={this.renderField}/>
       <Field name='categories'
        label='Categories'
        component={this.renderField}/>
        <Field name='content'
         label='Post Content'
         component={this.renderField}/>
         <button type='submit' className='btn btn-primary' > Submit </button>
         <Link href='/'>
            <a className='btn btn-danger'>
           Cancel
           </a>
         </Link>
    </form>
    )

  }
}

function validate (values){
//  console.log(values);
  const errors = {};
  //validate
 if(!values.title ){
   errors.title = "Enter a Title!";
 }else{
   if(values.title.length < 3){
     errors.title = "Enter a Title that is at least 3 char!";
   }
 }

 if(!values.categories){
   errors.categories = "Enter a Categories!";
 }
 if(!values.content){
   errors.content = "Enter a Content!";
 }
  //if errors is empty  ok
  return errors;
}

export default reduxForm({
  validate ,
  form : 'PostsNewForm'
})(
  connect(null,{createPost})(PostsNew)
);