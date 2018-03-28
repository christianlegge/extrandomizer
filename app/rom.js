class Rom {
  constructor(bytes) {
    this.bytes = bytes;
  }

  setHeartColor(color) {
    var byte;
    var file_byte;
    switch (color) {
      case "red":
        byte = 0x24;
        file_byte = 0x05;
        break;
      case "blue":
        byte = 0x2C;
        file_byte = 0x0D;
        break;
      case "green":
        byte = 0x3C;
        file_byte = 0x19;
        break;
      case "yellow":
        byte = 0x28;
        file_byte = 0x09;
        break;
    }
    this.bytes[0x6FA1E] = byte;
    this.bytes[0x6FA20] = byte;
    this.bytes[0x6FA22] = byte;
    this.bytes[0x6FA24] = byte;
    this.bytes[0x6FA26] = byte;
    this.bytes[0x6FA28] = byte;
    this.bytes[0x6FA2A] = byte;
    this.bytes[0x6FA2C] = byte;
    this.bytes[0x6FA2E] = byte;
    this.bytes[0x6FA30] = byte;
    this.bytes[0x65561] = file_byte;
  }

  setGrayscaleDungeons() {
    for (var i = 0; i < 3600; i += 2) {
      var c = Color.getColor((this.bytes[0xDD734 + i+1] << 8) + this.bytes[0xDD734 + i]);
      if (c.r == 40 && c.g == 40 && c.b == 40) {

      }
      else {
        var sum = (c.r + c.r + c.g + c.g + c.g + c.b) / 6;
        this.setPaletteColor(0xDD734 + i, new Color(sum, sum, sum), 0);
      }
    }
  }

  setNegativePalettes() {
    var c = Color.getColor((this.bytes[0x05FEA9 + 1] << 8) + this.bytes[0x05FEA9]);
    var c2 = new Color((c.r ^ 0xFF), (c.g ^ 0xFF), (c.b ^ 0xFF));
    this.setPaletteColor(0x05FEA9, new Color(24,127,113), 0);

    for (var i = 0; i < 1456; i += 2) {
      c = Color.getColor((this.bytes[0xDE604 + i + 1] << 8) + this.bytes[0xDE604 + i]);
      c2 = new Color((c.r ^ 0xFF), (c.g ^ 0xFF), (c.b ^ 0xFF));
      this.setPaletteColor(0xDE604 + i, new Color(24,127,113), 0);
    }

    for (var i = 0; i < 3600; i += 2) {
      c = Color.getColor((this.bytes[0xDD734 + i + 1] << 8) + this.bytes[0xDD734 + i]);
      c2 = new Color((c.r ^ 0xFF), (c.g ^ 0xFF), (c.b ^ 0xFF));
      this.setPaletteColor(0xDD734 + i, new Color(24,127,113), 0);
    }
  }

  setPaletteColor(address, color, shade) {
    for (var i = 0; i < shade; i++) {
      color.r = (color.r - (color.r / 5));
      color.g = (color.g - (color.g / 5));
      color.b = (color.b - (color.b / 5));
    }

    color.r = color.r / 255 * 0x1F;
    color.g = color.g / 255 * 0x1F;
    color.b = color.b / 255 * 0x1F;

    var s = (color.b << 10) | (color.g << 5) | (color.r);

    this.bytes[address] = s & 0x00FF;
    this.bytes[address + 1] = (s >> 8) & 0x00FF;
  }
}
