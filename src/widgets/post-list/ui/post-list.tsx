import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { useGetAllPostsQuery } from "../../../entities/post/api/get-posts";
import PostItem from "../../../entities/post/ui/post-item";

const POST_QUANTITY = 15;

export default function PostList() {
  const [start, setStart] = useState(0);
  const { ref: refStart, inView: inViewStart } = useInView({
    threshold: 0,
  });

  const { ref: refEnd, inView: inViewEnd } = useInView({
    threshold: 0.5,
  });

  const {
    data = [],
    isLoading,
    isError,
  } = useGetAllPostsQuery({ start, limit: POST_QUANTITY });

  useEffect(() => {
    if (inViewStart) {
      setStart((prevStart) => (prevStart > 0 ? prevStart - 1 : prevStart));
    }
  }, [inViewStart]);

  useEffect(() => {
    if (inViewEnd) {
      setStart((prevEnd) => prevEnd + 1);
    }
  }, [inViewEnd]);

  if (isError) return <div>Ошибка!</div>;

  if (isLoading) return <div>Загрузка...</div>;

  return (
    <div>
      {data.map((post, index) => {
        const ref =
          index === 0 ? refStart : index === data.length - 1 ? refEnd : null;
        return <PostItem key={post.id} ref={ref} post={post} />;
      })}
    </div>
  );
}
