import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import type { Post } from "../types/post";
import "./style.css";

interface PostItemProps {
  post: Post;
}

const MAX_WORDS_LENGTH = 15;

const PostItem = forwardRef<HTMLInputElement, PostItemProps>(function PostItem(
  { post },
  ref
) {
  const navigate = useNavigate();

  const onShowPost = (id: number) => () => {
    navigate(`posts/${id}`);
  };

  const body =
    post.body.split(" ").splice(0, MAX_WORDS_LENGTH).join(" ") + "...";

  return (
    <div className="post-item" key={post.id} ref={ref}>
      <h5 className="post-item__title">
        №{post.id}. {post.title}
      </h5>
      <p className="post-item__text">{body}</p>
      <button onClick={onShowPost(post.id)}>Просмотр</button>
    </div>
  );
});

export default PostItem;
