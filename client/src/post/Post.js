import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../components/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
//Redux
import { connect } from "react-redux";
import { getPost } from "../action/post";

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <section className="container">
      <>
        <a href="/posts" className="btn btn-light">
          Go Back
        </a>
        <PostItem post={post} ShowActions={false} />
        <CommentForm pid={post._id} />
        <div className="comments">
          {post.comments.map((c) => (
            <CommentItem key={c._id} comment={c} pid={post._id} />
          ))}
        </div>
      </>
    </section>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { getPost })(Post);
