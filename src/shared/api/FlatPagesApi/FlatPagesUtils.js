export function sortFlatPages(flatpages) {
  return flatpages.sort((a, b) => a.priority - b.priority);
}