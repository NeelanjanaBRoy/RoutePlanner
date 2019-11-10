#!/bin/bash
echo "Delete app migrations"

if [ -z "$1" ]
then
echo "No argument supplied"
else
for dir in $1/*/ ; do
if [ -d $dir/migrations ]; then
cd $dir/migrations/
         find . -not -name '__init__.py' -delete
         echo "$(basename $dir) migrations deleted successfully"
       fi
    done
fi
