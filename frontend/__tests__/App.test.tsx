// import React from "react";
// import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store/reduxStore";

import NavItemLogo from "../components/NavItem/NavItemLogo";

describe("App Component", () => {
  it("ItemLogo renders 'TRIBUY'", () => {
    //ARRANGE
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NavItemLogo />
        </BrowserRouter>
      </Provider>
    );
    //ACT
    //ASSERT
    expect(
      screen.getByRole("heading", {
        level: 1,
      })
    ).toHaveTextContent("TRIBUY");
  });
});
