import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../components/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
//Redux
import { connect } from "react-redux";
import { getPosts } from "../action/post";

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return loading ? (
    <Spinner />
  ) : (
    <section className="container">
      <>
        <h1 className="text-primary large">Posts</h1>
        <p className="lead">
          <i className="fas fa-user"></i>Welcome to Community
        </p>
        <PostForm />
        <div className="posts">
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      </>
    </section>
  );
};

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
