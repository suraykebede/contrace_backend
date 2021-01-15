function key_gen(venue) {
  let key_prefix = Math.random() * 1000;
  let key_suffix = Math.random() * 100;
  return key_prefix.toFixed(0) + "_" + venue + "_" + key_suffix.toFixed(0);
}

exports.key_gen = key_gen;
