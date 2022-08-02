import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import CountryCard from "./CountryCard";
import { MemoryRouter } from "react-router-dom";

const argentina = {
  id: "ARG",
  name: "Argentina",
  capital: "Buenos Aires",
  continent: "South America",
  flag_img: "https://flagcdn.com/w320/ar.png",
  population: 45376763,
  subregion: "South America",
}


test('render country data', () => {
  const { container } = render(
    <MemoryRouter>
      <CountryCard country={argentina} />
    </MemoryRouter>
  );
  
  screen.getByAltText(argentina.id);
  expect(container).toHaveTextContent(argentina.name);
  expect(container).toHaveTextContent(argentina.continent);
});