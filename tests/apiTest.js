const { load } = require("..");

try {
  load({
    AID: "64f85986a29cd2b639ef36ff",
    KEY: "64f867f1a29cd2b639ef37f8",
  });
} catch (error) {
  console.error(error);
}
