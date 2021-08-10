import * as Api from 'api/api'
import { API_URL } from 'utils/config'

class UploadAdapter {
  constructor(loader) {
    // Save Loader instance to update upload progress.
    this.loader = loader;
  }

  async upload() {
    console.log(this.loader)
    const data = new FormData();
    const file = await this.loader.file
    data.append('upload', file);

    return new Promise((resolve, reject) => {
      Api.post({
        url: `${API_URL}/public/upload-images-editor`,
        data,
      }).then((res) => {
        const resData = res;
        resData.default = resData.url;
        resolve(resData);
      }).catch((error) => {
        console.log(error)
        reject(error)
      });
    });
  }

  abort() {
    // Reject promise returned from upload() method.
  }
}

export default UploadAdapter
