import React from 'react';
import moment from 'moment';

import './post_video.css';

const PostVideo = ({post, onVote}) => {

  var video_embed   = post.data.media_embed.content;
  var linkToSource  = post.data.url;
  var linkToReddit  = 'https://www.reddit.com' + post.data.permalink;

  if (post.data.over_18) {
    var thumbnail = '/style/imgs/nsfw.jpg';
  }else {
    if (post.data.preview) {
      var thumbnail = post.data.preview.images[0].source.url;
    }else {
      var thumbnail = '';
    }
  }

  if (video_embed == undefined){
    var video_embed = `<div class='show-content-video-noFrame'><img class='show-content-video-thumbnail' src=${thumbnail}><a class='show-content-video-source' target='_blank' href=${linkToSource}>Link to the source</a></div>`;
  }

  switch (post.data.domain) {
    case 'youtu.be':
      var srcIcon = { backgroundImage: 'url(/style/imgs/youtube.png)'};
      break;
    case 'm.youtube.com':
      var srcIcon = { backgroundImage: 'url(/style/imgs/youtube.png)'};
      break;
    case 'youtube.com':
      var srcIcon = { backgroundImage: 'url(/style/imgs/youtube.png)'};
      break;
    case 'vimeo.com':
      var srcIcon = { backgroundImage: 'url(/style/imgs/vimeo.png)'};
      break;
    case 'streamable.com':
      var srcIcon = { backgroundImage: 'url(/style/imgs/streamable.png)'};
      break;
    case 'liveleak.com':
      var srcIcon = { backgroundImage: 'url(/style/imgs/liveleak.png)'};
      break;
    case 'twitter.com':
      var srcIcon = { backgroundImage: 'url(/style/imgs/twitter.png)'};
      break;
    case 'mobile.twitter.com':
      var srcIcon = { backgroundImage: 'url(/style/imgs/twitter.png)'};
      break;
    case 'vid.me':
      var srcIcon = { backgroundImage: 'url(/style/imgs/vidme.png)'};
      break;
    default:
      var srcIcon = { backgroundColor: 'white'};
  }

  function voting(vote){
    if (sessionStorage.getItem('access_token') && sessionStorage.getItem('access_token') !== 'undefined') {
      var pack = [post, vote];
      onVote(pack);
    }else {
      alert('Sign in to vote');
    }
  }

  function specialCharsReplace(content) {
    return content
      .replace(/&lt;/g,'<')
      .replace(/&gt;/g,'>')
      .replace(/&amp;/g,'&');
  }

  return (
    <div className='show-content'>
      <div className='show-content-video' dangerouslySetInnerHTML={{__html: specialCharsReplace(video_embed)}} />
      <div className='show-content-stats'>
        <span className='show-content-title'>{specialCharsReplace(post.data.title)}</span>
        <br />
        <div className='show-content-source'>
          <div className='source-icon' style={srcIcon}></div>
          <div className='source'>
            <span>Submitted by {post.data.author}</span>
            {console.log(video_embed)}
            <span><a target='_blank' href={linkToSource}>Source</a> · <a target='_blank' href={linkToReddit}>Link to a reddit post</a></span>
          </div>
        </div>
        <div className='show-content-bottom'>
          <div>Comments: {post.data.num_comments} · Submitted {moment.unix(post.data.created).calendar()}</div>


          <div className='show-content-bottom-score'>
            <span>{post.data.score}</span>
            <div className='vote-arrows'>
              {/* TODO: Make this into another component */}

              <button onClick={voting.bind(null, '1')} className='vote-btn upvote'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13 7v-6l11 11-11 11v-6h-13v-10z"/></svg></button>
              <button onClick={voting.bind(null, '-1')} className='vote-btn downvote'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13 7v-6l11 11-11 11v-6h-13v-10z"/></svg></button>
            </div>
          </div>
        </div>


        <br />
      </div>
    </div>
  )
};

export default PostVideo;
