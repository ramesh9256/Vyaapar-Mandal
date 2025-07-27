const Notice = require('../models/noticeModel');

exports.createNotice = async (req, res) => {
  try {
    const { title, content } = req.body;

    const notice = await Notice.create({
      title,
      content,
      postedBy: req.user.userId,
    });

    res.status(201).json({ msg: 'Notice posted', notice });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to create notice', error: err.message });
  }
};

exports.getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.status(200).json(notices);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch notices', error: err.message });
  }
};

exports.deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    await Notice.findByIdAndDelete(id);
    res.status(200).json({ msg: 'Notice deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to delete notice', error: err.message });
  }
};
