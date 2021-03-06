import React, { Component } from 'react';
import * as api from '../api'

class AddArticle extends Component {
  state = {
    newArticle: {
      body: '',
      title: '',
      topic: this.props.topic,
      error: {}
    }
  }

  render() {
    return (
      <div>
        <span className='new-article-card-span' onClick={this.props.close}>X</span>
        <div className='new-article-card'>
          <h1>New Article</h1>
          <div className='new-article-body'>
            <input className='title-input' onChange={this.handleTitle} value={this.state.newArticle.title} type="text" placeholder='TITLE' />
            <select onChange={this.handleTopicChange} value={this.state.newArticle.topic}>
              <option value="">Select Topic</option>
              <option value="coding">Coding</option>
              <option value="football">Football</option>
              <option value="cooking">Cooking</option>
            </select>
            <textarea onChange={this.handleArticle} value={this.state.newArticle.body} type="text" placeholder='TEXT' />
            <button onClick={this.handleSubmit}>Post Article</button>
          </div>
        </div>
      </div>
    );
  }
  
  handleSubmit = () => {
    api.addArticle(this.state.newArticle, this.props.loggedUser._id)
      .then(({ article }) => {
        this.props.handlenewArticle(article);
        this.props.close();
      })
      .catch(err => {
        this.setState({ error: { err: true, errCode: err.status, errText: err.statusText } })
      })
  }

  handleArticle = (e) => {
    this.setState({
      newArticle: {
        ...this.state.newArticle,
        body: e.target.value
      }
    })
  }

  handleTitle = (e) => {
    this.setState({
      newArticle: {
        ...this.state.newArticle,
        title: e.target.value
      }
    })
  }

  handleTopicChange = (e) => {

    this.setState({
      newArticle: {
        ...this.state.newArticle, 
        topic: e.target.value
      }
    })
  }
}

export default AddArticle;