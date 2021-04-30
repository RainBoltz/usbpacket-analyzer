export const delaySync = (milliseonds: number): Promise<Function> => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseonds)
  })
}