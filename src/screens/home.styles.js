import { StyleSheet } from "react-native";
import { colors } from "../styles/colors";

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.primary,
    marginBottom: 6,
  },
  hint: {
    fontSize: 14,
    color: colors.muted,
    marginBottom: 16,
  },
});
