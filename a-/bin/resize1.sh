#!/bin/bash

# Use sips to resize one photo SRC and output to DEST

SRC="/Volumes/PEACH/jht-air/Desktop-air/-Clouds-Card/IMG_6424.jpg"
if [ "$1" != "" ]; then FILE=$1; fi

DEST="/Volumes/PEACH/jht-air/Desktop-air/-Clouds-Cards-Medium/"
if [ "$2" != "" ]; then DEST=$2; fi

filename="${SRC##*/}"
echo ${filename}

sips --resampleWidth 640 "${SRC}" --out "${DEST}${filename}"
