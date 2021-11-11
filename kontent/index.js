const KontentDelivery = require("@kentico/kontent-delivery");
require("dotenv").config();

const deliveryClient = new KontentDelivery.DeliveryClient({
  projectId: process.env.KONTENT_PROJECT_ID,
  globalQueryConfig: {
    useSecuredMode: true,
  },
  secureApiKey: process.env.KONTENT_API_KEY,
});

module.exports = deliveryClient;
