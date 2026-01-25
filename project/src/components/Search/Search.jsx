import styles from "./Search.module.css";

function Search({ value, onChange }) {
  return (
    <input
      className={styles.input}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Поиск по товарам..."
    />
  );
}

export default Search;
