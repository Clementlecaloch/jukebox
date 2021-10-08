import { HttpClient, HttpHeaders } from "@angular/common/http";


  /** Définit le type des headers pour les requêtes Http */
  const HTTP_OPTIONS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*'
    })
  };
  
  const URL : string = "https://89.82.165.125:5252"
  
  export class ClcApi {
  
    constructor(
      private http: HttpClient
    ) {
  
    }
  
    /**
     * Select * from table where
     * @param nomTable nom de la table a requeter
     * @param where optionnel
     */
    public query(nomTable: string, where?: string) {
      let requete = URL + 'query?TABLE=' + nomTable
      if (where) {
        requete += '&WHERE=' + where
      }
  
      try {
        return this.http.get(requete).toPromise()
      } catch (errreur) {
        throw errreur
      }
    }

    /**
     * Select * from table where
     * @param nomTable nom de la table a requeter
     * @param where optionnel
     */
     public queryUneLigne(nomTable: string, where: string) {
      let requete = URL + 'queryUneLigne?TABLE=' + nomTable
      requete += '&WHERE=' + where
  
      try {
        const res = this.http.get(requete).toPromise()
        return res
      } catch (errreur) {
        throw errreur
      }
    }

    /**
     * Select * from table where
     * @param valueRequete requete complete
     */
     public queryLibre(valueRequete: string) {
      let requete = URL + "queryLibre?" + valueRequete
    
      try {
        return this.http.get(requete).toPromise()
      } catch (errreur) {
        throw errreur
      }
     }
  }