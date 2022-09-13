interface Cover {
  url: string;
  imageId: string;
  width: number;
  height: number;
}

export interface GameListElement {
  slug: string;
  name: string;
  cover?: Cover;
}

export interface GamePageResponse {
  data: GameListElement[];
  nextCursor: string;
}
