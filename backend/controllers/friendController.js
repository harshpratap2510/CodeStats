import { User } from '../models/User.js';

// Add Friend
export const addFriend = async (req, res) => {
  const friendId = req.params.id;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: 'Already added' });
    }

    user.friends.push(friendId);
    await user.save();

    // Get the full user info of the new friend
    const newFriend = await User.findById(friendId).select('_id username email profilePic');

    res.status(200).json({ message: 'Friend added', friend: newFriend });
  } catch (error) {
    console.error('Add friend error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};



// Remove Friend
export const removeFriend = async (req, res) => {
  try {
    const userId = req.user.id;
    const friendId = req.params.id;

    const user = await User.findById(userId);
    user.friends = user.friends.filter(fid => fid.toString() !== friendId);
    await user.save();

    res.status(200).json({ message: "Friend removed." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Friend List
export const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
  .populate({
    path: 'friends',
    select: 'username email profilePic',
    match: { username: { $ne: null } } // optional safeguard
  });


    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      friends: user.friends,
    });
  } catch (error) {
    console.error('Error fetching friends:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


// Search User
export const searchUsers = async (req, res) => {
  try {
    const keyword = req.query.key || "";
    const users = await User.find({
      username: { $regex: keyword, $options: 'i' },
      _id: { $ne: req.user._id }, // exclude self
    }).select("_id username email");
    
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
