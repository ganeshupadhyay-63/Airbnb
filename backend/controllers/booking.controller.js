import Listing from "../models/listing.model.js";
import Booking from "../models/booking.model.js";
import User from "../models/user.model.js";


export const createBooking = async (req, res) => {
  try {
    let { id } = req.params;
    let { checkIn, checkOut, totalRent } = req.body;

    // Validate userId presence
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized: User not logged in" });
    }

    // Find listing by id
    let listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Validate dates
    if (new Date(checkIn) >= new Date(checkOut)) {
      return res.status(400).json({ message: "Invalid checkIn/checkOut date" });
    }

    // Check if listing already booked
    if (listing.isBooked) {
      return res.status(400).json({ message: "Listing is already booked" });
    }

    // Create booking
    let booking = await Booking.create({
      checkIn,
      checkOut,
      totalRent,
      host: listing.host,
      guest: req.userId,
      listing: listing._id,
    });

    await booking.populate("host", "email");
     await booking.populate("listing");

    // Update user bookings
    let user = await User.findByIdAndUpdate(
      req.userId,
      { $push: { booking:listing} },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update listing as booked
    listing.guest = req.userId;
    listing.isBooked = true;
    await listing.save();

    return res.status(201).json( booking );
  } catch (error) {
    return res.status(500).json({ message: `Booking error: ${error.message || error}` });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    let { id } = req.params;

    // Find listing first
    let listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Reset listing booking status
    listing.isBooked = false;
    let guestId = listing.guest; // save before resetting
    listing.guest = null;
    await listing.save();

    // Remove booking from user's list
    let user = await User.findByIdAndUpdate(
      guestId,
      { $pull: { booking: listing._id } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Booking cancelled" });

  } catch (error) {
    return res.status(500).json({ message: `Cancel booking error: ${error.message || error}` });
  }
};

