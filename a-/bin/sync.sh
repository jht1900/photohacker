#!/bin/bash
cd ${0%/*}

delete=--delete
#delete=
#test=--dry-run
test=

xfrom=../../../-photohacker-prep
xto=../../../-photohacker

echo
echo "Syncing from $xfrom"
echo "          to $xto"
echo $test
echo

rsync -razv --delete $test --exclude ".DS_Store" --exclude node_modules --exclude .git "$xfrom/"  "$xto/"

