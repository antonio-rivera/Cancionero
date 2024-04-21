import { Song } from "../models/Song";

interface ISearchUtils {
  matchAccents(searchText: string): string;
  matchResults(text: string, songs: Array<Song>): Array<Song>;
}
export const searchUtilsModule: ISearchUtils = {
  matchAccents(searchText: string)
  {
      const aclass = /[aáAÁ]/
      const eclass = /[eéEÉ]/
      const iclass = /[iíIÍ]/
      const oclass = /[oóOÓ]/
      const uclass = /[uúUÚ]/
      searchText = searchText.replace(aclass, String.raw`${aclass.toString().replaceAll("/", "")}`)
      searchText = searchText.replace(eclass, String.raw`${eclass.toString().replaceAll("/", "")}`)
      searchText = searchText.replace(iclass, String.raw`${iclass.toString().replaceAll("/", "")}`)
      searchText = searchText.replace(oclass, String.raw`${oclass.toString().replaceAll("/", "")}`)
      searchText = searchText.replace(uclass, String.raw`${uclass.toString().replaceAll("/", "")}`)
      searchText = searchText.replaceAll(/[nNñÑ]/g, "[nNñÑ]");
      return searchText;
  },
  matchResults(text, songs) 
  {
    text = this.matchAccents(text);
    return songs.filter(song => {
      const {title, lyrics, artist} = song;
      const lyricsRe = new RegExp(String.raw`\b${text}\b`, "i")
      const re = new RegExp(`${text}`, "i");
      if(re.exec(title) || lyricsRe.exec(lyrics) || re.exec(artist))
      {
        return true;
      }
    })
  }
}