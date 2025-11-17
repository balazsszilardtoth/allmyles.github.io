#!/bin/bash
#
# Image Optimization Script for Allmyles.com
# This script optimizes all images in the img/ directory
#
# Prerequisites:
#   brew install jpegoptim optipng webp imagemagick
#

set -e

echo "🖼️  Image Optimization Script"
echo "=============================="
echo ""

# Colors for output
RED='\033[0:31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if required tools are installed
check_dependencies() {
    local missing=0

    for cmd in jpegoptim optipng cwebp convert; do
        if ! command -v $cmd &> /dev/null; then
            echo -e "${RED}✗${NC} $cmd is not installed"
            missing=1
        else
            echo -e "${GREEN}✓${NC} $cmd is installed"
        fi
    done

    if [ $missing -eq 1 ]; then
        echo ""
        echo -e "${YELLOW}Please install missing dependencies:${NC}"
        echo "  brew install jpegoptim optipng webp imagemagick"
        exit 1
    fi
    echo ""
}

# Function to optimize JPGs
optimize_jpg() {
    local file="$1"
    local original_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")

    echo "  Optimizing JPG: $file"
    jpegoptim --strip-all --max=85 "$file" > /dev/null 2>&1

    local new_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
    local saved=$((original_size - new_size))
    local percent=$((saved * 100 / original_size))

    echo -e "    ${GREEN}✓${NC} Saved ${saved} bytes (${percent}%)"
}

# Function to optimize PNGs
optimize_png() {
    local file="$1"
    local original_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")

    echo "  Optimizing PNG: $file"
    optipng -o7 -quiet "$file"

    local new_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
    local saved=$((original_size - new_size))
    local percent=0
    if [ $original_size -gt 0 ]; then
        percent=$((saved * 100 / original_size))
    fi

    echo -e "    ${GREEN}✓${NC} Saved ${saved} bytes (${percent}%)"
}

# Function to convert to WebP
convert_to_webp() {
    local file="$1"
    local webp_file="${file%.*}.webp"

    if [ -f "$webp_file" ]; then
        echo "    WebP already exists: $webp_file"
        return
    fi

    echo "  Converting to WebP: $file → $webp_file"
    cwebp -q 85 "$file" -o "$webp_file" > /dev/null 2>&1

    local original_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
    local webp_size=$(stat -f%z "$webp_file" 2>/dev/null || stat -c%s "$webp_file")
    local saved=$((original_size - webp_size))
    local percent=$((saved * 100 / original_size))

    echo -e "    ${GREEN}✓${NC} WebP is ${saved} bytes smaller (${percent}%)"
}

# Function to resize images if they're too large
resize_if_needed() {
    local file="$1"
    local max_width=2000

    # Get image width
    local width=$(identify -format "%w" "$file")

    if [ "$width" -gt "$max_width" ]; then
        echo "  Resizing: $file (${width}px → ${max_width}px)"
        convert "$file" -resize "${max_width}x" "$file"
        echo -e "    ${GREEN}✓${NC} Resized"
    fi
}

# Main optimization function
main() {
    echo "Checking dependencies..."
    check_dependencies

    echo "Starting optimization..."
    echo ""

    local total_saved=0
    local files_processed=0

    # Find and optimize all JPG files
    echo "${YELLOW}Processing JPG files...${NC}"
    while IFS= read -r -d '' file; do
        resize_if_needed "$file"
        optimize_jpg "$file"
        convert_to_webp "$file"
        files_processed=$((files_processed + 1))
        echo ""
    done < <(find img -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) -print0)

    # Find and optimize all PNG files
    echo "${YELLOW}Processing PNG files...${NC}"
    while IFS= read -r -d '' file; do
        resize_if_needed "$file"
        optimize_png "$file"
        convert_to_webp "$file"
        files_processed=$((files_processed + 1))
        echo ""
    done < <(find img -type f -iname "*.png" -print0)

    echo "=============================="
    echo -e "${GREEN}✓ Optimization complete!${NC}"
    echo "  Files processed: $files_processed"
    echo ""
    echo "Next steps:"
    echo "  1. Review the optimized images"
    echo "  2. Commit the changes: git add img/"
    echo "  3. Update HTML to use WebP with fallback (see guide)"
}

# Run main function
main
