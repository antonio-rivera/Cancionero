import { Song } from "../models/Song";

interface ISearchUtils {
  matchAccents(searchText: string): string;
  matchResults(text: string, songs: Array<Song>): Array<Song>;
}
export const searchUtilsModule: ISearchUtils = {
  matchAccents(searchText: string) {
    const aclass = /[aáAÁ]/g
    const eclass = /[eéEÉ]/g
    const iclass = /[iíIÍ]/g
    const oclass = /[oóOÓ]/g
    const uclass = /[uúUÚ]/g
    searchText = searchText.replaceAll(aclass, String.raw`${aclass.toString().replaceAll(/[\/g]/g, "")}`)
    searchText = searchText.replaceAll(eclass, String.raw`${eclass.toString().replaceAll(/[\/g]/g, "")}`)
    searchText = searchText.replaceAll(iclass, String.raw`${iclass.toString().replaceAll(/[\/g/]/g, "")}`)
    searchText = searchText.replaceAll(oclass, String.raw`${oclass.toString().replaceAll(/[\/g/]/g, "")}`)
    searchText = searchText.replaceAll(uclass, String.raw`${uclass.toString().replaceAll(/[\/g/]/g, "")}`)
    searchText = searchText.replaceAll(/[nNñÑ]/g, "[nNñÑ]");
    return searchText;
  },
  matchResults(text, songs) {
    text = this.matchAccents(text);
    return songs.filter(song => {
      const { title, lyrics, artist } = song;
      const lyricsRe = new RegExp(String.raw`\b${text}\b`, "i")
      const re = new RegExp(`${text}`, "i");
      if (re.exec(title) || lyricsRe.exec(lyrics) || re.exec(artist)) {
        return true;
      }
    })
  }
}