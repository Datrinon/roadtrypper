/* eslint-disable no-restricted-globals */

/**
 * This file handles integration tests for the React Router, which uses
 * URLs in order to conditionally render specific components.
 */

import React from "react"
import { render, fireEvent, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { MemoryRouter } from "react-router-dom"
import Studio from "./studio/Studio"

// TODO
// Come back and test this later with *real* routes.
test("Studio section is rendered", () => {
  render(
    <MemoryRouter>
      <Studio />
    </MemoryRouter>
  );

  expect(screen.getByText(/studio/i)).toBeInTheDocument();
})