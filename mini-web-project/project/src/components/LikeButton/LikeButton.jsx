import styles from "./LikeButton.module.css";

function LikeButton({ isLiked, likesCount, onToggle }) {
  return (
    <button
      className={`${styles.button} ${isLiked ? styles.liked : ""}`}
      onClick={onToggle}
    >
      {isLiked ? "❤" : "🤍"} {likesCount}
    </button>
  );
}

export default LikeButton;
