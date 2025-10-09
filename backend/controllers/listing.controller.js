import uploadOnCloudinary from "../config/cloudinary.js";
import Listing from "../models/listing.model.js";
import User from "../models/user.model.js"; 

export const addListing = async (req, res) => {
  try {
    const host = req.userId;
    const { title, description, rent, city, landmark, category } = req.body;

    // Upload images
    let image1 = await uploadOnCloudinary(req.files.image1[0].path);
    let image2 = await uploadOnCloudinary(req.files.image2[0].path);
    let image3 = await uploadOnCloudinary(req.files.image3[0].path);

    // Create listing
    const listing = await Listing.create({
      title,
      description,
      rent,
      city,
      landmark,
      category,
      image1,
      image2,
      image3,
      host,
    });

    // Update user's listing array
    const user = await User.findByIdAndUpdate(
      host,
      { $push: { listing: listing._id } },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(201).json(listing);
  } catch (error) {
    return res.status(500).json({ message: `AddListing error: ${error.message}` });
  }
};

export const getListing = async (req, res) => {
  try {
    const listings = await Listing.find().sort({ createdAt: -1 });
    return res.status(200).json(listings);
  } catch (error) {
    return res.status(500).json({ message: `getListing error: ${error.message}` });
  }
};

export const findListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    return res.status(200).json(listing);
  } catch (error) {
    return res.status(500).json({ message: `findListing error: ${error.message}` });
  }
};

export const updateListing = async (req, res) => {
  try {
    let image1;
    let image2;
    let image3;

    let { id } = req.params;
    let { title, description, rent, city, landmark, category } = req.body;
    if(req.files.image1){
       image1 = req.files?.image1 ? await uploadOnCloudinary(req.files.image1[0].path) : existingListing.image1;
    }
    if(req.files.image2){
       image2 = req.files?.image2 ? await uploadOnCloudinary(req.files.image2[0].path) : existingListing.image2;
    }
    if(req.files.image3){
       image3 = req.files?.image3 ? await uploadOnCloudinary(req.files.image3[0].path) : existingListing.image3;
    }
    let host = req.userId; // Get host from authenticated user

    // Find existing listing
    const existingListing = await Listing.findById(id);
    if (!existingListing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Update listing
    const updatedListing = await Listing.findByIdAndUpdate(
      id,
      {
        title,
        description,
        rent,
        city,
        landmark,
        category,
        image1,
        image2,
        image3,
        host,
      },
      { new: true }
    );

    return res.status(200).json(updatedListing);
  } catch (error) {
    console.error("Update listing error:", error);
    return res.status(500).json({ message: "Failed to update listing", error: error.message });
  }
};

export const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the listing
    const listing = await Listing.findByIdAndDelete(id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Remove the listing reference from the user's listing array
    const user = await User.findByIdAndUpdate(
      listing.host,
      { $pull: { listing: listing._id } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    console.error("DeleteListing Error:", error);
    return res.status(500).json({ message: `DeleteListing Error: ${error.message}` });
  }
};

export const ratingListing = async(req,res)=>{
  try{
    let {id} = req.params
    let {ratings} = req.body
    let listing = await Listing.findById(id)
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    listing.ratings = Number(ratings)
    await listing.save();
    return res.status(200).json({rating:listing.ratings})

  }catch(error){
    return res.status(500).json({ message: `Rating Error: ${error}` });
  }
}
export const search = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const listing = await Listing.find({
      $or: [
        { landmark: { $regex: query, $options: "i" } },
        { city: { $regex: query, $options: "i" } },
        { title: { $regex: query, $options: "i" } },
      ],
    });

    return res.status(200).json(listing);
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};




