import { createStore } from "redux";

export default function configureStore() {
  const store = createStore(() => ({
    message: "Redux Message",
    data: { data: "Data Message" },
  }));

  return store;
}
