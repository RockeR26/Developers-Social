import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
//Redux
import { connect } from "react-redux";
import { deleteComment } from "../action/post";

const CommentItem = ({
  pid,
  comment: { _id, text, user, avatar, name, date },
  auth,
  deleteComment,
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <a href={"/profile/user/" + user}>
          <img className="round-img" src={avatar} alt="profile" />
          <h4>{name}</h4>
        </a>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Commented on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id && (
          <button
            className="btn btn-danger"
            onClick={(e) => deleteComment(pid, _id)}
          >
            <i className="fas fa-trash"></i>
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  pid: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
