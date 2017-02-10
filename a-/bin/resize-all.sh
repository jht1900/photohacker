#!/bin/bash

# Use sips to resize all photos in folder SRC and output to DEST

SRC="/Volumes/PEACH/jht-air/Desktop-air/-Clouds-Card/"
if [ "$1" != "" ]; then FILE=$1; fi

DEST="/Volumes/PEACH/jht-air/Desktop-air/-Clouds-Cards-Medium/"
if [ "$2" != "" ]; then DEST=$2; fi

for filename in $(ls $SRC)
do
	#echo ${filename}
	sips --resampleWidth 1024 "${SRC}${filename}" --out "${DEST}${filename}"
done

