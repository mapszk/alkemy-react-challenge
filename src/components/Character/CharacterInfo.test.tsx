import React from "react"
import CharacterInfo from "./CharacterInfo"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import { CharacterLongData } from "src/types/CharacterLongData"

const testHeroe: CharacterLongData = {
  id: 1,
  name: "Batman",
  image: "https://placeimg.com/500/500",
  stats: {
    intelligence: 1,
    strength: 1,
    speed: 1,
    durability: 1,
    power: 1,
    combat: 1,
  },
  alignment: "good",
  weight: 90.5,
  height: 190.5,
  fullName: "Full Name Test",
  aliases: ["Alias1", "Alias2"],
  eyeColor: "Brown",
  hairColor: "Black",
  work: "Business",
}
const testVillain: CharacterLongData = {
  id: 1,
  name: "Joker",
  image: "https://placeimg.com/500/500",
  stats: {
    intelligence: 1,
    strength: 1,
    speed: 1,
    durability: 1,
    power: 1,
    combat: 1,
  },
  alignment: "bad",
  weight: 90.5,
  height: 190.5,
  fullName: "Full Name Test",
  aliases: ["Alias1", "Alias2"],
  eyeColor: "Brown",
  hairColor: "Green",
  work: "",
}

describe("<CharacterInfo/>", () => {
  describe("Rendering", () => {
    beforeEach(() => {
      render(<CharacterInfo info={testHeroe} />)
    })
    it("Should render name, alignment, full name, aliases, weight, height, work, hair and eye color", () => {
      expect(screen.getByText(testHeroe.name)).toBeInTheDocument()
      expect(
        screen.getByText(testHeroe.alignment === "good" ? "Héroe" : "Villano")
      ).toBeInTheDocument()
      expect(screen.getByText(testHeroe.fullName)).toBeInTheDocument()
      expect(screen.getByText(testHeroe.aliases.join(", "))).toBeInTheDocument()
      expect(
        screen.getByText(testHeroe.weight.toFixed(2) + "kg")
      ).toBeInTheDocument()
      expect(
        screen.getByText(testHeroe.height.toFixed(2) + "cm")
      ).toBeInTheDocument()
      expect(screen.getByText(testHeroe.work)).toBeInTheDocument()
      expect(screen.getByText(testHeroe.hairColor)).toBeInTheDocument()
      expect(screen.getByText(testHeroe.eyeColor)).toBeInTheDocument()
    })
  })
  describe("Alignment good", () => {
    beforeEach(() => {
      render(<CharacterInfo info={testHeroe} />)
    })
    it("Heroes should have a 'bg-success' class", () => {
      const heroeTag = screen.getByText("Héroe")
      expect(heroeTag).toHaveTextContent("Héroe")
      expect(heroeTag).toHaveClass("bg-success")
    })
  })
  describe("Alignment bad", () => {
    beforeEach(() => {
      render(<CharacterInfo info={testVillain} />)
    })
    it("Villains should have a 'bg-danger' class", () => {
      const heroeTag = screen.getByText("Villano")
      expect(heroeTag).toHaveTextContent("Villano")
      expect(heroeTag).toHaveClass("bg-danger")
    })
  })
})
