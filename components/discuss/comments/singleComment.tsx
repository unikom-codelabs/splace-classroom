import { faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comment = ({ data, handleVote, session }: any) => {
  return (
    <div className="flex flex-row justify-between items-center mb-2">
      <div>
        <span className=" text-sm font-semibold text-gray-600">
          {data.user.name}
        </span>{" "}
        <span className="text-sm text-gray-600">{data.content}</span>
      </div>
      <button
        className={`flex items-center gap-1 ${
          data.like_comments.find(
            (item: any) => item.user_id === session?.user?.id
          )
            ? "text-primary font-bold"
            : "text-gray-500"
        }`}
        onClick={() => handleVote({ c_id: data.id })}
      >
        <FontAwesomeIcon icon={faAnglesUp} size="sm" />
      </button>
    </div>
  );
};

export default Comment;
