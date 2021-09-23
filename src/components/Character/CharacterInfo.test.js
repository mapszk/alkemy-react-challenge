import React from "react"
import CharacterInfo from "./CharacterInfo"
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"

const testHeroe = {
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
const testVillain = {
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
  let component
  describe("Rendering", () => {
    beforeEach(() => {
      component = render(<CharacterInfo info={testHeroe} />)
    })
    test("Component renders", () => {
      expect(component.container).toBeDefined()
    })
  })
  describe("Alignment good", () => {
    beforeEach(() => {
      component = render(<CharacterInfo info={testHeroe} />)
    })
    test("Heroes must have a 'bg-success' class", () => {
      const heroeTag = component.getByText("Héroe")
      expect(heroeTag).toHaveTextContent("Héroe")
      expect(heroeTag).toHaveClass("bg-success")
    })
  })
  describe("Alignment good", () => {
    beforeEach(() => {
      component = render(<CharacterInfo info={testVillain} />)
    })
    test("Villains must have a 'bg-danger' class", () => {
      const heroeTag = component.getByText("Villano")
      expect(heroeTag).toHaveTextContent("Villano")
      expect(heroeTag).toHaveClass("bg-danger")
    })
  })
})
