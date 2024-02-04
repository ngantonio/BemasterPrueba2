export default {
  SERVER_PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET || "mytokensecret",
  MONGODB: {
    URI:
      process.env.MONGODB_URI ||
      "mongodb+srv://bemaster:kKPd3LNU2RnzDiAT@cluster0.7zb7nxv.mongodb.net/?retryWrites=true&w=majority",
    USER: "bemaster",
    PASSW: "kKPd3LNU2RnzDiAT",
  },
};
