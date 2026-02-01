import Button from "@mui/material/Button";

function LikeButton({ isLiked, likesCount, onToggle }) {
  return (
    <Button
      variant="outlined"
      color={isLiked ? "error" : "inherit"}
      onClick={onToggle}
      sx={{
        "&:hover": {
          bgcolor: isLiked ? "error.dark" : "action.hover",
        },
      }}
    >
      {isLiked ? "❤" : "🤍"} {likesCount}
    </Button>
  );
}

export default LikeButton;
