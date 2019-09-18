import RNFetchBlob from 'rn-fetch-blob'

function hasDataUrl(src) {
  return src && src.startsWith('data:')
}

async function convertToBase64Url(url, callback) {
  const { fs } = RNFetchBlob

  let imagePath = null

  RNFetchBlob.config({
    fileCache: true,
  })
    .fetch('GET', url)
    .then(resp => {
      imagePath = resp.path()
      return resp.readFile('base64')
    })
    .then(base64Url => {
      console.info(base64Url)
      callback(base64Url)
      return fs.unlink(imagePath)
    })
    .catch(error => console.info(error))
}

export default {
  hasDataUrl,
  convertToBase64Url,
}
