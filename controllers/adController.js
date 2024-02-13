import Ad from "../models/ad.js";

// Function to convert degree to radians
const convertToRadians = (degree) => {
  return (degree * Math.PI) / 180;
};

const uploadAd = async (req, res, next) => {
  try {
    let latRad = convertToRadians(req.body.location.latitude);
    let lonRad = convertToRadians(req.body.location.longitude);
    let radiusRad = convertToRadians(req.body.location.radius);

    const ad = new Ad({
      location: {
        ...req.body.location,
        latRad: latRad,
        lonRad: lonRad,
        radiusRad: radiusRad,
      },
      image: req.body.image,
    });

    let resp = await ad.save();

    return res.status(201).json({ success: true, data: resp });
  } catch (err) {
    return next(err);
  }
};

const getAds = async (req, res, next) => {
  try {
    const userLatRad = convertToRadians(parseFloat(req.query.lon));
    const userLonRad = convertToRadians(parseFloat(req.query.lat));

    // Query to find ads within the user's location (Haversine formula)
    const query = {
      $expr: {
        $and: [
          {
            $lte: [
              userLatRad,
              { $add: ["$location.latRad", "$location.radiusRad"] },
            ],
          },
          {
            $gte: [
              userLatRad,
              { $subtract: ["$location.latRad", "$location.radiusRad"] },
            ],
          },
          {
            $lte: [
              userLonRad,
              { $add: ["$location.lonRad", "$location.radiusRad"] },
            ],
          },
          {
            $gte: [
              userLonRad,
              { $subtract: ["$location.lonRad", "$location.radiusRad"] },
            ],
          },
        ],
      },
    };

    const ads = await Ad.find(query);
    return res.status(200).json({ success: true, ads });
  } catch (err) {
    return next(err);
  }
};

export default { uploadAd, getAds };
