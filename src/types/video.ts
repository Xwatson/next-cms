export interface Video {
  id: number;
  categoryId: number;
  typeId1: number;
  groupId: number;
  name: string;
  subTitle: string;
  enName: string;
  status: number;
  letter: string;
  color: string;
  tag: string;
  class: string;
  pic: string;
  picThumb: string;
  picSlide: string;
  picScreenshot: string | null;
  actor: string;
  director: string;
  writer: string;
  behind: string;
  blurb: string;
  remarks: string;
  pubdate: string;
  total: number;
  serial: string;
  tv: string;
  weekday: string;
  area: string;
  lang: string;
  year: string;
  version: string;
  state: string;
  author: string;
  jumpUrl: string;
  tpl: string;
  tplPlay: string;
  tplDown: string;
  isend: number;
  lock: number;
  level: number;
  copyright: number;
  points: number;
  pointsPlay: number;
  pointsDown: number;
  hits: number;
  hitsDay: number;
  hitsWeek: number;
  hitsMonth: number;
  duration: string;
  up: number;
  down: number;
  score: number;
  scoreAll: number;
  scoreNum: number;
  time: number;
  timeAdd: number;
  timeHits: number;
  timeMake: number;
  trysee: number;
  doubanId: number;
  doubanScore: number;
  reurl: string;
  relVod: string;
  relArt: string;
  pwd: string;
  pwdUrl: string;
  pwdPlay: string;
  pwdPlayUrl: string;
  pwdDown: string;
  pwdDownUrl: string;
  content: string;
  playFrom: string;
  playServer: string;
  playNote: string;
  playUrl: string;
  downFrom: string;
  downServer: string;
  downNote: string;
  downUrl: string;
  plot: number;
  plotName: string;
  plotDetail: string;
}

export interface VideoCreateInput extends Partial<Omit<Video, "id">> {
  name: string;
  categoryId: number;
}

export interface VideoUpdateInput extends Partial<Video> {
  id: number;
}

export interface VideoListParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
  categoryId?: number;
  status?: number;
}
