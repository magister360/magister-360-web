export const config = {
  secretKeyParts: [
    "(mu2GhF2zTD",
    "DJ:$r.PZy[=",
    "=N$HbxmJiMf",
    "Py%6Le&9K*u",
    "VNd61L",
  ],
  getSecretKey: () => config.secretKeyParts.join(""),
};
