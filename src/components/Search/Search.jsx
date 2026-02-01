import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

function Search({ value, onChange }) {
  return (
    <TextField
      fullWidth
      size="small"
      placeholder="Поиск по товарам..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">🔍</InputAdornment>
        ),
      }}
    />
  );
}

export default Search;
