import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
//Redux
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../action/post";

const PostItem = ({
  deletePost,
  addLike,
  removeLike,
  auth,
  post: { _id, name, avatar, user, likes, text, comments, date },
  ShowActions,
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <a href={"/profile/user/" + user}>
        <img className="round-img" src={avatar} alt="pic" />
        <h4>{name}</h4>
      </a>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">
        Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
      </p>
      <button
        type="button"
        className="btn btn-light"
        onClick={() => addLike(_id)}
      >
        <i className="fas fa-thumbs-up"></i>
        {likes.length > 0 && <span>{likes.length}</span>}
      </button>
      <button
        type="button"
        className="btn btn-light"
        onClick={() => removeLike(_id)}
      >
        <i className="fas fa-thumbs-down"></i>
      </button>
      {ShowActions && (
        <>
          {" "}
          <a href={"/post/" + _id} className="btn btn-primary">
            Discussion{" "}
            {comments.length > 0 && (
              <span className="comment-count">{comments.length}</span>
            )}
          </a>
        </>
      )}
      {!auth.loading && user === auth.user._id && (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => deletePost(_id)}
        >
          <i className="fas fa-times"></i>
        </button>
      )}
    </div>
  </div>
);

PostItem.defaultProps = {
  ShowActions: true,
};
PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
