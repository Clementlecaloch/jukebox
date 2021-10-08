import { HttpClient, HttpHeaders } from "@angular/common/http";


const URL: string = "https://89.82.165.125:5252"

export class SpotifyClass {

  constructor(
    public http: HttpClient
  ) {

  }

  connectSpotify(code: string) {
    let requete = URL + "login-spotify?CODE=" + code

    try {
      return this.http.get(requete).toPromise()
    } catch (errreur) {
      throw errreur
    }
  }

  getUserPlaylist(access_token: any) {
    let requete = URL + "playlists?TOKEN=" + access_token

    try {
      return this.http.get(requete).toPromise()
    } catch (errreur) {
      throw errreur
    }
  }

  refreshTokenAPI(code: any) {
    let requete = URL + "refresh_token?TOKEN=" + code

    try {
      return this.http.get(requete).toPromise()
    } catch (errreur) {
      throw errreur
    }
  }

  getDataByUrl(url: string, access_token: string) {
    let requete = URL + "data-url?URL=" + url + "&TOKEN=" + access_token

    try {
      return this.http.get(requete).toPromise()
    } catch (errreur) {
      throw errreur
    }
  }

  searchWithValue(value: string, access_token: string): Promise<any> {
    let requete = URL + "search?VALUE=" + value + "&TOKEN=" + access_token

    try {
      return this.http.get(requete).toPromise()
    } catch (errreur) {
      throw errreur
    }
  }

  play(uri: string, access_token: string): Promise<any> {
    let requete = URL + "play?URI=" + uri + "&TOKEN=" + access_token

    try {
      return this.http.get(requete).toPromise()
    } catch (errreur) {
      throw errreur
    }
  }
}