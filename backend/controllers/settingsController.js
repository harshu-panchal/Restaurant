const SiteSettings = require('../models/SiteSettings');
const asyncHandler = require('../utils/asyncHandler');

// SiteSettings is a singleton: getOrCreate always returns the one document,
// creating it with schema defaults on first use so the public site never
// has to handle a "settings missing" state.
async function getOrCreate() {
  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = await SiteSettings.create({});
  }
  return settings;
}

const getSettings = asyncHandler(async (req, res) => {
  const settings = await getOrCreate();
  res.json({ success: true, data: settings });
});

const updateSettings = asyncHandler(async (req, res) => {
  const settings = await getOrCreate();
  Object.assign(settings, req.body);
  await settings.save();
  res.json({ success: true, data: settings });
});

module.exports = { getSettings, updateSettings };
