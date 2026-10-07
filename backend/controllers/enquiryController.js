const Enquiry = require('../models/Enquiry');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

const createEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.create(req.body);
  res.status(201).json({ success: true, data: { id: enquiry._id } });
});

const getAllEnquiries = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.eventType) filter.eventType = req.query.eventType;

  const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, data: enquiries });
});

const getEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);
  if (!enquiry) throw new ApiError(404, 'Enquiry not found');
  res.json({ success: true, data: enquiry });
});

const VALID_STATUSES = ['New', 'Contacted', 'In Discussion', 'Quoted', 'Confirmed', 'Completed', 'Cancelled'];

const updateEnquiryStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!VALID_STATUSES.includes(status)) {
    throw new ApiError(400, 'Invalid status value');
  }
  const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!enquiry) throw new ApiError(404, 'Enquiry not found');
  res.json({ success: true, data: enquiry });
});

const deleteEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
  if (!enquiry) throw new ApiError(404, 'Enquiry not found');
  res.json({ success: true, data: { id: req.params.id } });
});

module.exports = {
  createEnquiry,
  getAllEnquiries,
  getEnquiry,
  updateEnquiryStatus,
  deleteEnquiry,
};
