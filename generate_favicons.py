#!/usr/bin/env python3
"""
Generate PNG favicon icons from SVG source for PWA compatibility.
Creates all required sizes for comprehensive favicon support.

Required sizes:
- 16x16   - Browser tab favicon
- 32x32   - High-DPI browser tabs, taskbar shortcuts
- 180x180 - iOS Home Screen
- 192x192 - Android/PWA
- 512x512 - PWA splash screen, high-res display
"""

import base64
import os
import struct
import zlib
import math


def create_gear_png(width, height, filepath):
    """Create a PNG with Express IT gear logo pattern."""

    def png_chunk(chunk_type, data):
        chunk = chunk_type + data
        checksum = zlib.crc32(chunk) & 0xFFFFFFFF
        return struct.pack(">I", len(data)) + chunk + struct.pack("I", checksum)

    # PNG signature
    signature = b"\x89PNG\r\n\x1a\n"

    # IHDR chunk (RGBA for transparency)
    ihdr_data = struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)
    ihdr = png_chunk(b"IHDR", ihdr_data)

    # Brand colors (RGB)
    pink = (233, 30, 99)
    grey = (107, 114, 128)

    # Calculate gear positions (scaled to icon size)
    cx1 = width * 0.375  # Pink gear center (left)
    cy1 = height * 0.375
    cx2 = width * 0.625  # Grey gear center (right)
    cy2 = height * 0.625

    # Scale factors based on 64x64 reference
    scale = min(width, height) / 64

    # Gear geometry (must match icon.svg exactly)
    pink_radius = 13 * scale
    grey_radius = 10 * scale
    pink_inner = 6.5 * scale
    grey_inner = 4.5 * scale
    pink_outer_teeth = 16 * scale
    grey_outer_teeth = 14 * scale

    def is_in_gear(cx, cy, body_radius, inner_radius, outer_teeth, teeth_count):
        """Check if point is in gear shape."""
        dx = x - cx
        dy = y - cy
        dist = (dx * dx + dy * dy) ** 0.5

        if dist > outer_teeth:
            return False, None

        if dist < inner_radius:
            return True, "center"

        # Calculate angle for tooth pattern
        angle = (math.atan2(dy, dx) * 180 / math.pi + 360) % 360

        # Check if in tooth gap
        sector = 360 / teeth_count
        in_gap = (angle % sector) > (sector * 0.65)

        if in_gap and dist > body_radius * 0.88:
            return False, None

        return True, "body"

    raw_data = b""
    for y in range(height):
        raw_data += b"\x00"  # filter byte
        for x in range(width):
            # Check pink gear
            in_pink, pink_part = is_in_gear(
                cx1, cy1, pink_radius, pink_inner, pink_outer_teeth, 24
            )
            if in_pink:
                if pink_part == "center":
                    raw_data += bytes([255, 255, 255, 255])  # White center with alpha
                else:
                    raw_data += bytes(list(pink) + [255])  # Pink with alpha
                continue

            # Check grey gear
            in_grey, grey_part = is_in_gear(
                cx2, cy2, grey_radius, grey_inner, grey_outer_teeth, 16
            )
            if in_grey:
                if grey_part == "center":
                    raw_data += bytes([255, 255, 255, 255])  # White center with alpha
                else:
                    raw_data += bytes(list(grey) + [255])  # Grey with alpha
                continue

            # Transparent background
            raw_data += bytes([0, 0, 0, 0])

    compressed = zlib.compress(raw_data, 9)
    idat = png_chunk(b"IDAT", compressed)

    # IEND chunk
    iend = png_chunk(b"IEND", b"")

    # Combine all chunks
    png_data = signature + ihdr + idat + iend

    # Write to file
    with open(filepath, "wb") as f:
        f.write(png_data)

    print(f"Created: {filepath} ({width}x{height})")


def main():
    """Generate all required PNG favicon sizes."""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_dir = os.path.join(script_dir, "assets", "images")

    # All required sizes
    sizes = [
        (16, 16, "favicon-16x16.png"),
        (32, 32, "favicon-32x32.png"),
        (180, 180, "apple-touch-icon.png"),
        (192, 192, "icon-192.png"),
        (512, 512, "icon-512.png"),
    ]

    print("Generating Express IT favicon icons...")
    print("=" * 50)

    for width, height, filename in sizes:
        filepath = os.path.join(output_dir, filename)
        create_gear_png(width, height, filepath)

    print("=" * 50)
    print("\nFavicon icons generated successfully!")
    print("\nFiles created in assets/images/:")
    for width, height, filename in sizes:
        print(f"  - {filename} ({width}x{height})")

    print("\nNote: For optimal quality, SVG (icon.svg) is recommended for web use.")
    print("PNG versions are generated for legacy browser/PWA compatibility.")


if __name__ == "__main__":
    main()
