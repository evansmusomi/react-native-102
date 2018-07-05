const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const fs = require("fs");
const UUID = require("uuid-v4");
const googleCloudConfig = {
  projectId: "awesomeplaces-1528951686629",
  keyFilename: "awesome-places.json"
};
const googleCloudStorage = require("@google-cloud/storage")(googleCloudConfig);

admin.initializeApp({
  credential: admin.credential.cert(require("./awesome-places.json"))
});

exports.storeImage = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    if (
      !request.headers.authorization ||
      !request.headers.authorization.startsWith("Bearer ")
    ) {
      console.log("No token present!");
      response.status(403).json({ error: "Unauthorized" });
      return;
    }

    let idToken;
    idToken = request.headers.authorization.split("Bearer ")[1];
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(decodedToken => {
        const body = JSON.parse(request.body);
        fs.writeFileSync(
          "/tmp/uploaded-image.jpg",
          body.image,
          "base64",
          error => {
            console.log(error);
            return response.status(500).json({ error });
          }
        );

        const bucket = googleCloudStorage.bucket(
          "awesomeplaces-1528951686629.appspot.com"
        );
        const uuid = UUID();

        return bucket.upload(
          "/tmp/uploaded-image.jpg",
          {
            uploadType: "media",
            destination: `/places/${uuid}.jpg`,
            metadata: {
              metadata: {
                contentType: "image/jpeg",
                firebaseStorageDownloadTokens: uuid
              }
            }
          },
          (error, file) => {
            if (!error) {
              response.status(201).json({
                imageUrl: `https://firebasestorage.googleapis.com/v0/b/${
                  bucket.name
                }/o/${encodeURIComponent(file.name)}?alt=media&token=${uuid}`,
                imagePath: `places/${uuid}.jpg`
              });
            } else {
              console.log(error);
              response.status(500).json({ error });
            }
          }
        );
      })
      .catch(error => {
        console.log("Token is invalid");
        response.status(403).json({ error: error });
      });
  });
});

exports.deleteImage = functions.database
  .ref("/places/{placeId}")
  .onDelete(event => {
    console.log(event);
    const imagePath = event._data.imagePath;

    const bucket = googleCloudStorage.bucket(
      "awesomeplaces-1528951686629.appspot.com"
    );
    return bucket.file(imagePath).delete();
  });
