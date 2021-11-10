import React from "react"
import { render, fireEvent, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { MemoryRouter } from "react-router-dom"
import Studio from "./Studio"

describe("Trip Studio's UI elements visibility", () => {
  let studio;

  beforeAll(() => {
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

  test("should see clickable containers regarding each day of my trip (using sample data).", () => {
    const mockId = -1;

    studio = render(<Studio projectId={mockId} />);

    // 
  });
  
})

// TODO add to trip reducer in part 2 of tests
