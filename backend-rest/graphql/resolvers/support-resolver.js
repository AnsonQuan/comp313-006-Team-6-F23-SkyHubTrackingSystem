//Customer Support Resolver
const support = require("../models/customerSupport");

//Adds an inquiry
const addInquiry = async (root, params) => {
  const supportModel = new support(params);
  const newInquiry = await supportModel.save();
  if (!newInquiry) {
    throw new Error("Error");
  }
  return newInquiry;
};

const getInquiries = async () => {
  const inquiries = await support.find().exec();
  if (!inquiries) {
    throw new Error("Error");
  }
  return inquiries;
};

const getInquiryById = async (root, params) => {
  const inquiryFound = await support.findById(params.id).exec();
  if (!inquiryFound) {
    throw new Error("Error");
  }
  return inquiryFound;
};

const updateInquiry = async (root, params) => {
  const updatedInquiry = await support
    .findByIdAndUpdate(params.id, params)
    .exec();
  if (!updatedInquiry) {
    throw new Error("Error");
  }
  return updatedInquiry;
};

module.exports = {
  addInquiry,
  getInquiries,
  getInquiryById,
  updateInquiry,
};
