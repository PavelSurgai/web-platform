export class CybersportConverter {
  gamesConverter = data => data.map(t => ({ ID: t.ID, name: t.Name, isOpen: true, tourneys: [] }));
}