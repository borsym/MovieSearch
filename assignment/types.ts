export interface RatingsSummary {
  aggregateRating?: number;
  voteCount: number;
  __typename: string;
}

export interface Caption {
  plainText: string;
  __typename: string;
}

export interface PrimaryImage {
  id: string;
  width: number;
  height: number;
  url: string;
  caption: Caption;
  __typename: string;
}

export interface TitleType {
  text: string;
  id: string;
  isSeries: boolean;
  isEpisode: boolean;
  __typename: string;
}

export interface Genre {
  text: string;
  id: string;
  __typename: string;
}

export interface Genres {
  genres: Genre[];
  __typename: string;
}

export interface TitleText {
  text: string;
  __typename: string;
}

export interface ReleaseYear {
  year: number;
  endYear?: any;
  __typename: string;
}

export interface ReleaseDate {
  day?: number;
  month?: number;
  year: number;
  __typename: string;
}

export interface Runtime {
  seconds: number;
  __typename: string;
}

export interface EpisodeNumber {
  episodeNumber: number;
  seasonNumber: number;
  __typename: string;
}

export interface NextEpisode {
  id: string;
  __typename: string;
}

export interface PreviousEpisode {
  id: string;
  __typename: string;
}

export interface TitleText2 {
  text: string;
  __typename: string;
}

export interface OriginalTitleText {
  text: string;
  __typename: string;
}

export interface TitleType2 {
  id: string;
  __typename: string;
}

export interface ReleaseYear2 {
  year: number;
  endYear?: number;
  __typename: string;
}

export interface Series2 {
  id: string;
  titleText: TitleText2;
  originalTitleText: OriginalTitleText;
  titleType: TitleType2;
  releaseYear: ReleaseYear2;
  __typename: string;
}

export interface Series {
  episodeNumber: EpisodeNumber;
  nextEpisode: NextEpisode;
  previousEpisode: PreviousEpisode;
  series: Series2;
  __typename: string;
}

export interface PlotText {
  plainText: string;
  __typename: string;
}

export interface Language {
  id: string;
  __typename: string;
}

export interface Plot {
  plotText: PlotText;
  language: Language;
  __typename: string;
}

export interface Result {
  id: string;
  ratingsSummary: RatingsSummary;
  episodes?: any;
  primaryImage: PrimaryImage;
  titleType: TitleType;
  genres: Genres;
  titleText: TitleText;
  releaseYear: ReleaseYear;
  releaseDate: ReleaseDate;
  runtime: Runtime;
  series: Series;
  meterRanking?: any;
  plot: Plot;
}

export interface TitleProps {
  page: string;
  next: string;
  entries: number;
  results: Result[];
}
