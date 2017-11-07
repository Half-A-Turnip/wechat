import axios from 'axios'
import md5 from 'md5'
//获取上传图片参数
export const uploadPromise = new Promise((resolve, reject) => {
  axios.get('/other/picManage/getStsInfo').then((response) => {
    resolve(response)
  }).catch((error) => {
    console.log(error)
    reject(error)
  })
})
//上传图片
export function uploadFile(data, file) {
  let OSS = window.OSS.Wrapper
  let name = file.lastModified + md5(file.name)
  let client = new OSS({
    region: 'oss-cn-hangzhou',
    accessKeyId: data.accessKeyId,
    accessKeySecret: data.accessKeySecret,
    stsToken: data.securityToken,
    bucket: 'baoyitech'
  })
  return client.multipartUpload(name, file)
}
//获取上传图片参数
export function getFileWidthAndHeight(file){
  return new Promise((resolve, reject) => {
    var reader = new FileReader()
    reader.onload = (theFile)=> {
      var image = new Image()
      image.onload = () =>{
        resolve(image)
      }
      image.src = theFile.target.result
    }
    reader.readAsDataURL(file)
  })

}
