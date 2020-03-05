import { sortFlatPages } from './FlatPagesUtils';

export class FlatPagesConverter {
  convertFlatPages = data => {
    const convertedData = data ? data.map(flatpage => {
      const page = flatpage.id !== 36 ? {
        name: flatpage.name,
        priority: flatpage.priority,
        idName: flatpage.id_name,
        id: flatpage.id,
        text: flatpage.text,
      }: [];  
      return page;
    }) : [];
    return sortFlatPages(convertedData);
  }
}