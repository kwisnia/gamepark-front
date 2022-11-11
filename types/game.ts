interface Cover {
  url: string;
  imageId: string;
  width: number;
  height: number;
  hash: string;
}

export interface GameListElement {
  slug: string;
  name: string;
  cover?: Cover;
}

export interface GameDetails {
  ageRatings: AgeRating[] | null;
  aggregatedRating: number;
  aggregatedRatingCount: number;
  artworks: Cover[] | null;
  category: Category;
  cover: Cover;
  dlcs: GameDetails[] | null;
  expandedGames: GameDetails[] | null;
  expansions: GameDetails[] | null;
  externalGames: ExternalGame[] | null;
  firstReleaseDate: string;
  genres: Category[] | null;
  involvedCompanies: InvolvedCompany[] | null;
  name: string;
  parentGame: null;
  platforms: Platform[] | null;
  rating: number;
  ratingCount: number;
  releaseDates: ReleaseDate[] | null;
  remakes: GameDetails[] | null;
  remasters: any[] | null;
  screenshots: Cover[] | null;
  similarGames: GameListElement[] | null;
  slug: string;
  storyline: string;
  summary: string;
  igdbUrl: string;
  versionParent: null;
  versionTitle: string;
  videos: Video[] | null;
}

export interface AgeRating {
  gameID: number;
  ageRatingID: number;
  ageRating: Category;
  organizationID: number;
  organization: Category;
  synopsys: string;
}

export interface Category {
  id: number;
  name: Name;
}

export enum Name {
  Empty = "",
  Microsoft = "microsoft",
  Shooter = "Shooter",
  Steam = "steam",
  Twitch = "twitch",
  XboxMarketplace = "xbox_marketplace",
}

export interface ExternalGame {
  category: Category;
  categoryID: number;
  gameID: number;
  uid: string;
  url: string;
}

export interface InvolvedCompany {
  gameID: number;
  company: Company;
  companyID: number;
  developer: boolean;
  publisher: boolean;
  porting: boolean;
  supporting: boolean;
}

export interface Company {
  name: string;
  slug: string;
  startDate: string;
  description: string;
}

export interface Platform {
  id: number;
  name: string;
  abbreviation: string;
  generation: number;
  logo: Logo;
  slug: string;
  igdbUrl: string;
}

export interface Logo {
  image: Cover;
  platform_id: number;
}

export interface ReleaseDate {
  gameID: number;
  region: Category;
  regionID: number;
  human: string;
  date: string;
  platformID: number;
  category: Category;
  categoryID: number;
}

export interface Video {
  videoId: string;
  name: string;
  GameID: number;
}

export enum IGDBImageSize {
  ScreenshotBig = "screenshot_big",
  ScreenshotHuge = "screenshot_huge",
  ScreenshotMed = "screenshot_med",
  Thumb = "thumb",
  CoverBig = "cover_big",
  CoverSmall = "cover_small",
  LogoMed = "logo_med",
  Micro = "micro",
  HD = "720p",
  FullHD = "1080p",
}
