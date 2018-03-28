class Color {
  constructor(r,g,b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  static getColor(bytes) {
    var r = (bytes & 0x1F) / 0x1F * 0xFF;
    var g = ((bytes >> 5) & 0x1F) / 0x1F * 0xFF;
    var b = ((bytes >> 10) & 0x1F) / 0x1F * 0xFF;
    return new Color(r,g,b);
  }
}
