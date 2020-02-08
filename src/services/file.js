const AWS = require('aws-sdk')

const s3 = new AWS.S3()

const Bucket = 'starpact-wish'

const uploadFile = async ({ Key, Body }) => {
  try {
    const response = await s3
      .upload({ Bucket, Key, Body, ACL: 'public-read' })
      .promise()
    return response
  } catch (e) {
    console.log(e)
  }
}

const getFileUrl = async Key => {
  const url = await s3.getSignedUrlPromise('getObject', {
    Bucket,
    Key,
  })

  return url
}

module.exports = {
  uploadFile,
  getFileUrl,
}
