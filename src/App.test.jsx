import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders empty state when storage is corrupted", () => {
    localStorage.setItem("todos", "{bad-json");

    render(<App />);

    expect(screen.getByText(/No Task Yet/i)).toBeInTheDocument();
  });

  it("renders sanitized todos from storage", () => {
    localStorage.setItem(
      "todos",
      JSON.stringify([
        { id: 1, text: "valid task", completed: false },
        { id: 2, text: "done task", completed: true },
        { text: "invalid missing fields" },
      ]),
    );

    render(<App />);

    expect(screen.getByText("valid task")).toBeInTheDocument();
    expect(screen.getByText("done task")).toBeInTheDocument();
    expect(screen.queryByText("invalid missing fields")).not.toBeInTheDocument();
  });
});
