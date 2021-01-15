function get_average(time_entered, time_exited) {
    let avg = (time_entered + time_exited) / 2;
    return avg.toFixed(0);
  }
  
  exports.get_average = get_average;
  