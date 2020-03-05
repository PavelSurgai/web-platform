export class MediaApiConverter {
  convertSliders = data => {
    const newData = data ? data.map((item, index) => {
      return {
        url: item.url,
        id: index,
        url_image: item.url_image,
      };
    }) : [];
    return newData;
  }
}