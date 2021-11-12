import React from "react"
import { render, fireEvent, screen, act, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { MemoryRouter } from "react-router-dom"
import Studio from "./Studio"

import { SAMPLE_DAYS } from "../../../data/sample-days";
import SAMPLE_TRIP from "../../../data/sample-trip.json";

describe("Trip Studio's UI elements visibility", () => {
  let studio;

  beforeEach(() => {
    studio = render(<Studio tripData={SAMPLE_TRIP} tripDetailsData={SAMPLE_DAYS} />);
  })

  test('Should see an input for modifying the title of the Trip.', () => {
    const label = studio.getByPlaceholderText("Untitled Trip");

    expect(label).toBeInTheDocument();
  })

  test('Should see the title of existing trip inside the aforementioned input', () => {
    const titleInput = studio.getByPlaceholderText("Untitled Trip");

    expect(titleInput.value).toBe(SAMPLE_TRIP.title)
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

  test('should see a map area.', () => {
    const map = studio.getByTestId("map");

    expect(map).toBeInTheDocument();
    expect(map).toBeVisible();
  })
  
  test('should see the same number of pins as POIs on the trip data.', () => {
    const pins = studio.getAllByAltText(/Waypoint for/i);

    let numPOIs = SAMPLE_DAYS.reduce((numPOIs, day) => {
      numPOIs += day.pois.length;
      return numPOIs;
    }, 0);

    expect(pins.length).toBe(numPOIs);

  })
  
})

describe("Trip Studio UI's interactions", () => {
  let studio;

  beforeEach(() => {
    studio = render(<Studio tripData={SAMPLE_TRIP} tripDetailsData={SAMPLE_DAYS} />);
  })

  test("Can edit the title of the project.", () => {
    const titleInput = studio.getByPlaceholderText("Untitled Trip");
    const dummyValue = "Road Trip to Preston!";

    fireEvent.change(titleInput, {
      target: {
        value: dummyValue
      }
    })
    
    expect(titleInput.value).not.toBe(SAMPLE_TRIP.title);
    expect(titleInput.value).toBe(dummyValue);
  });

  
})
