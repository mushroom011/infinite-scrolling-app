import { useNavigate, useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "../../../entities/post/api/get-posts";

export default function PostPage() {
  const { postId } = useParams();
  const { data, error, isLoading } = useGetPostByIdQuery(postId!);
  const navigate = useNavigate();
  return (
    <div>
      {error ? (
        <>
          <h2>Ошибка!</h2>
          <div>
            <button onClick={() => navigate(-1)}>Назад</button>
          </div>
        </>
      ) : isLoading ? (
        <>Загрузка...</>
      ) : data ? (
        <>
          <h3>
            №{data.id}. {data.title}
          </h3>
          <p>{data.body}</p>
          <div>
            <button onClick={() => navigate(-1)}>Назад</button>
          </div>
        </>
      ) : null}
    </div>
  );
}
