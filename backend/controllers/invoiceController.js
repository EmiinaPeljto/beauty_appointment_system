const invoiceModel = require("../models/invoiceModels");

exports.getInvoice = async (req, res) => {
  try {
    const { appointment_id } = req.params;
    const invoice = await invoiceModel.getInvoice(appointment_id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.status(200).json(invoice);
  } catch (error) {
    console.error("Error fetching invoice:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
