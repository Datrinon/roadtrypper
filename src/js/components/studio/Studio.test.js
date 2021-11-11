import React from "react"
import { render, fireEvent, screen, act, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { MemoryRouter } from "react-router-dom"
import Studio from "./Studio"

import { SAMPLE_DAYS } from "../../../data/sample-days";

describe("Trip Studio's UI elements visibility", () => {
  let studio;

  beforeEach(() => {
    studio = render(<Studio />);
  })

  test('Should see an input for modifying the title of the Trip.', () => {
    const label = studio.getByPlaceholderText("Untitled Trip");

    expect(label).toBeInTheDocument();
  })

  test('should see buttons for adding days and adding points of interest', () => {
    const addDayButton = studio.getByRole("button", { name: /(Add|\+) Day/i });
    const addPOIButton = studio.getByRole("button", { name: /(Add|\+) POI/i });

    expect(addDayButton).toBeInTheDocument();
    expect(addPOIButton).toBeInTheDocument();
  });

  test("should see clickable containers regarding each day of my trip (using the provided mock data).", () => {
    // expect the mock data to have generated the same number of elements on the page.

    // remember, do not depend on implementation details.
    // that means not by the placement of the item or its CSS styling.
    const days = studio.getAllByRole("heading", { level: 2, name: /day/i });

    expect(days.length).toBe(SAMPLE_DAYS.length);
  });
})

// TODO add to trip reducer in part 2 of tests
