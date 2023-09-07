const { load } = require("..");

try {
  load();
} catch (error) {
  console.error(error);
}
