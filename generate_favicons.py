#!/usr/bin/env python3
"""
Generate PNG favicon icons from SVG source for PWA compatibility.
Creates 192x192 and 512x512 PNG icons.
"""

import base64
import os

def create_pink_png(width, height, filepath):
    """Create a simple pink PNG with the Express IT logo pattern."""
    import struct
    import zlib
    
    # Create a simple PNG with pink background and gear-like pattern
    # Using raw PNG construction for minimal dependencies
    
    def png_chunk(chunk_type, data):
        chunk = chunk_type + data
        checksum = zlib.crc32(chunk) & 0xffffffff
        return struct.pack('>I', len(data)) + chunk + struct.pack('I', checksum)
    
    # PNG signature
    signature = b'\x89PNG\r\n\x1a\n'
    
    # IHDR chunk
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0)
    ihdr = png_chunk(b'IHDR', ihdr_data)
    
    # IDAT chunk - create image data
    # Pink brand color: #e91e63 = (233, 30, 99)
    r, g, b = 233, 30, 99
    
    raw_data = b''
    for y in range(height):
        raw_data += b'\x00'  # filter byte
        for x in range(width):
            # Create a simple gear-like pattern
            cx, cy = width // 2, height // 2
            dx = x - cx
            dy = y - cy
            dist = (dx * dx + dy * dy) ** 0.5
            
            # Outer gear ring
            outer_radius = min(width, height) * 0.45
            inner_radius = min(width, height) * 0.38
            
            # Center hole
            center_radius = min(width, height) * 0.12
            
            if center_radius <= dist <= outer_radius:
                # Pink gear color
                raw_data += bytes([r, g, b])
            elif dist < center_radius:
                # White center
                raw_data += bytes([255, 255, 255])
            else:
                # Transparent
                raw_data += bytes([0, 0, 0, 0])
    
    compressed = zlib.compress(raw_data, 9)
    idat = png_chunk(b'IDAT', compressed)
    
    # IEND chunk
    iend = png_chunk(b'IEND', b'')
    
    # Combine all chunks
    png_data = signature + ihdr + idat + iend
    
    # Write to file
    with open(filepath, 'wb') as f:
        f.write(png_data)
    
    print(f"Created: {filepath} ({width}x{height})")

def main():
    """Generate all required PNG favicon sizes."""
    output_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'assets', 'images')
    
    # Generate PNG icons
    create_pink_png(192, 192, os.path.join(output_dir, 'icon-192.png'))
    create_pink_png(512, 512, os.path.join(output_dir, 'icon-512.png'))
    
    print("\nPNG favicon icons generated successfully!")
    print("Note: For production use, consider using a vector graphics tool to create")
    print("properly styled icons from the SVG source (assets/images/icon.svg)")

if __name__ == '__main__':
    main()

