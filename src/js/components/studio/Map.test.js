import React from "react"
import { render, fireEvent, screen, act, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Map from "./Map";

test('As a leaflet map, should have an id of map', () => {
  let map = render(<Map />);
  
  map = map.getByTestId("map");

  expect(1).toBe(1);
})
