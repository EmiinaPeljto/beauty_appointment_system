const favouritesModel = require("../models/favouritesModel");

exports.getFavoritesByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const favourites = await favouritesModel.getFavouritesByUserId(user_id);
    res.status(200).json({ data: favourites });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching favourites", error: error.message });
  }
};

exports.deleteFavouriteById = async (req, res) => {
  try {
    const { user_id, salon_id } = req.params;
    const result = await favouritesModel.deleteFavouriteById(user_id, salon_id);
    res
      .status(200)
      .json({ message: "Favourite deleted successfully", data: result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting favourite", error: error.message });
  }
};

exports.addFavourite = async (req, res) => {
  try {
    const { user_id, salon_id } = req.params;
    const result = await favouritesModel.addFavourite(user_id, salon_id);
    res
      .status(201)
      .json({ message: "Favourite added successfully", data: result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding favourite", error: error.message });
  }
};
