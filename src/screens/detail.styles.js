import { StyleSheet } from "react-native";
import { colors } from "../styles/colors";

export const detailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
    borderRadius: 15,
    color: colors.muted,
    marginBottom: 24,
    borderWidth: 1,           
    borderColor: '#00FF00',
    padding:4
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 14,
    marginTop: 12,

  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primaryText,
    
  },
});
