export const translateStat = (stat: string) => {
  switch (stat) {
    case "intelligence":
      return "Inteligencia"
    case "speed":
      return "Velocidad"
    case "durability":
      return "Resistencia"
    case "power":
      return "Potencia"
    case "combat":
      return "Combate"
    case "strength":
      return "Fuerza"
  }
}
