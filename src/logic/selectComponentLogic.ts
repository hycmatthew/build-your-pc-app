export const selectComponentLogic = (budget: number, type: number) => {
  return budget < 10000 ? budget*0.25 : budget*0.20
} 