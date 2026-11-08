import { useNavigation } from "react-router";
export default function RoutePending() {
  const navigation = useNavigation();
  return navigation.state === "idle" ? null : (
    <p className="pending" role="status">
      {navigation.state === "submitting" ? "Saving…" : "Loading next page…"}
    </p>
  );
}
