import kuzzle from ".";

class KuzzleService {

  // The Kuzzle Index
  index

  async init(index) {
    this.index = index
    const credentials = {
      username: process.env.REACT_APP_KUZZLE_API_USERNAME,
      password: process.env.REACT_APP_KUZZLE_API_PASSWORD
    };

    await kuzzle.connect();
    await kuzzle.auth.login("local", credentials)
  }

  /**
   * 
   * {
  "reference": "MSCU326690322G1",
  "lat": 4.056272506713866,
  "lon": 51.95722556809199
  Mock en 20p
}
   */
  getContainers() {
    return kuzzle.document.search(this.index, "containers", {}, {
      size: 50
    })
  }

  getContainer(reference) {
    return kuzzle.document.get(this.index, "containers", reference)
  }

  /**
   * 
   * {
  "containerType": "20p",
  "quantity": 500,
  "price": "14",
  "company": "CMA-CGM",
  "destination": "NLRTM"
}
   */
  getAvailabilities() {
    return kuzzle.document.search(this.index, "availabilities")
  }
}


export default new KuzzleService();